"use server";

import { db, lucia, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const FormSchema = z
	.object({
		current_password: z
			.string({
				invalid_type_error: "Невалидна текуща парола",
			})
			.refine(async (password) => {
				const { user } = await validateRequest();
				if (!user) return false;

				const { current_password } = await db
					.selectDistinct({
						current_password: userTable.password_hash,
					})
					.from(userTable)
					.where(eq(userTable.id, user.id))
					.then((val) => val[0]);

				const isValidPassword = await verify(
					current_password,
					password,
					{
						memoryCost: 19456,
						timeCost: 2,
						outputLen: 32,
						parallelism: 1,
					},
				);

				return isValidPassword;
			}, "Текущата ви парола е грешна"),
		new_password: z
			.string({
				invalid_type_error: "Невалидна нова парола",
			})
			.min(6, "Новата ви парола е твърде къса")
			.max(255, "Новата ви парола е твърде дълга"),
		confirm_password: z.string({
			invalid_type_error: "Невалидна текуща парола",
		}),
	})
	.refine(
		({ current_password, new_password }) =>
			current_password != new_password,
		{
			message: "Новата ви парола трябва да е различна от текущата ви",
			path: ["new_password"],
		},
	)
	.refine(
		({ new_password, confirm_password }) =>
			new_password == confirm_password,
		{
			message: "Паролите не съвпадат",
			path: ["confirm_password"],
		},
	);

export type State = {
	errors?: {
		current_password?: string[];
		new_password?: string[];
		confirm_password?: string[];
	};
	message?: string[] | null;
};

export async function changePassword(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const { user } = await validateRequest();
	if (!user) {
		return {};
	}

	const validatedFields = await FormSchema.safeParseAsync({
		current_password: formData.get("current_password"),
		new_password: formData.get("new_password"),
		confirm_password: formData.get("confirm_password"),
	});

	if (!validatedFields.success) {
		const { fieldErrors, formErrors } = validatedFields.error.flatten();

		return {
			errors: fieldErrors,
			message: formErrors,
		};
	}

	const { new_password } = validatedFields.data;

	const password_hash = await hash(new_password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	await db
		.update(userTable)
		.set({ password_hash })
		.where(eq(userTable.id, user.id));

	await lucia.invalidateUserSessions(user.id);
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	return {
		message: ["Паролата ви беше променена успешно!"],
	};
}
