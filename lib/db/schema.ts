import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	password_hash: text("password_hash").notNull(),
});

export const eventTable = sqliteTable("event", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	city: text("city").notNull(),
	startDate: text("start_date").notNull(),
	type: text("type").notNull(),
});

export const userEventTable = sqliteTable("user_event", {
	id: text("id").notNull().primaryKey(),
	eventId: text("event_id")
		.notNull()
		.references(() => eventTable.id),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull(),
});
