"use client";

import { State, login } from "@/actions/login";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(login, initialState);

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Влезте в профила си
					</h2>
				</div>

				<p className="mt-10 text-center text-sm text-gray-500">
					Нямате регистриран профил?{" "}
					<Link
						href="/dashboard/signup"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Създай
					</Link>
				</p>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action={dispatch}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Потребителско име
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="username"
									autoComplete="username"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div
								id="customer-error"
								aria-live="polite"
								aria-atomic="true"
							>
								{state.errors?.username &&
									state.errors.username.map(
										(error: string) => (
											<p
												className="mt-2 text-sm text-red-500"
												key={error}
											>
												{error}
											</p>
										),
									)}
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Парола
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div
								id="customer-error"
								aria-live="polite"
								aria-atomic="true"
							>
								{state.errors?.password &&
									state.errors.password.map(
										(error: string) => (
											<p
												className="mt-2 text-sm text-red-500"
												key={error}
											>
												{error}
											</p>
										),
									)}
							</div>
						</div>
						<div
							id="customer-error"
							aria-live="polite"
							aria-atomic="true"
						>
							{state.message && (
								<p className="mt-2 text-sm text-red-500">
									{state.message}
								</p>
							)}
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Влез
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
