import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"
import { ulid } from "ulidx"

// =============================================================================
// TRAILS (Tenants)
// =============================================================================

export const trails = sqliteTable("trails", {
	id: text("id").primaryKey().$defaultFn(() => ulid()),
	slug: text("slug").notNull().unique(),
	name: text("name").notNull(),
	tagline: text("tagline"),
	description: text("description"),
	location: text("location"),
	website: text("website"),
	logoUrl: text("logo_url"),
	primaryColor: text("primary_color"),
	secondaryColor: text("secondary_color"),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	metadata: text("metadata", { mode: "json" }).$type<{
		routeLength?: number
		counties?: string[]
		founded?: number
		economicImpact?: string
		mission?: string
	}>(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => ({
	slugIdx: uniqueIndex("trails_slug_idx").on(table.slug),
}))

// =============================================================================
// VENUES
// =============================================================================

export const venues = sqliteTable("venues", {
	id: text("id").primaryKey().$defaultFn(() => ulid()),
	trailId: text("trail_id").notNull().references(() => trails.id, { onDelete: "cascade" }),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	type: text("type", { enum: ["major", "affiliated", "festival", "wayside", "virtual"] }).notNull(),
	description: text("description"),
	shortDescription: text("short_description"),
	address: text("address"),
	city: text("city"),
	state: text("state"),
	zip: text("zip"),
	latitude: text("latitude"),
	longitude: text("longitude"),
	phone: text("phone"),
	email: text("email"),
	website: text("website"),
	imageUrl: text("image_url"),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	features: text("features", { mode: "json" }).$type<string[]>(),
	metadata: text("metadata", { mode: "json" }).$type<{
		capacity?: number
		history?: string
		anniversary?: string
		performers?: string[]
	}>(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => ({
	trailSlugIdx: uniqueIndex("venues_trail_slug_idx").on(table.trailId, table.slug),
	trailTypeIdx: index("venues_trail_type_idx").on(table.trailId, table.type),
	trailCityIdx: index("venues_trail_city_idx").on(table.trailId, table.city),
}))

// =============================================================================
// EVENTS
// =============================================================================

export const events = sqliteTable("events", {
	id: text("id").primaryKey().$defaultFn(() => ulid()),
	trailId: text("trail_id").notNull().references(() => trails.id, { onDelete: "cascade" }),
	venueId: text("venue_id").references(() => venues.id, { onDelete: "set null" }),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	startDate: integer("start_date", { mode: "timestamp" }).notNull(),
	endDate: integer("end_date", { mode: "timestamp" }),
	isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
	recurrenceRule: text("recurrence_rule", { mode: "json" }).$type<{
		frequency: "weekly" | "monthly" | "yearly"
		dayOfWeek?: number
		dayOfMonth?: number
		month?: number
	}>(),
	admission: text("admission"),
	imageUrl: text("image_url"),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	metadata: text("metadata", { mode: "json" }).$type<{
		performers?: string[]
		ticketUrl?: string
		contactName?: string
		contactPhone?: string
	}>(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => ({
	trailSlugIdx: uniqueIndex("events_trail_slug_idx").on(table.trailId, table.slug),
	trailDateIdx: index("events_trail_date_idx").on(table.trailId, table.startDate),
	venueIdx: index("events_venue_idx").on(table.venueId),
}))

// =============================================================================
// WAYSIDE EXHIBITS (rich narrative content)
// =============================================================================

export const waysides = sqliteTable("waysides", {
	id: text("id").primaryKey().$defaultFn(() => ulid()),
	trailId: text("trail_id").notNull().references(() => trails.id, { onDelete: "cascade" }),
	venueId: text("venue_id").references(() => venues.id, { onDelete: "set null" }),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	location: text("location"),
	county: text("county"),
	content: text("content", { mode: "json" }).$type<{
		summary?: string
		narrative?: string
		historicalFigures?: Array<{ name: string; description: string }>
		nearbyAttractions?: string[]
		quote?: string
	}>(),
	isVirtual: integer("is_virtual", { mode: "boolean" }).notNull().default(false),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => ({
	trailSlugIdx: uniqueIndex("waysides_trail_slug_idx").on(table.trailId, table.slug),
	trailCountyIdx: index("waysides_trail_county_idx").on(table.trailId, table.county),
}))

// =============================================================================
// DMO CONTACTS (regional tourism offices)
// =============================================================================

export const dmoContacts = sqliteTable("dmo_contacts", {
	id: text("id").primaryKey().$defaultFn(() => ulid()),
	trailId: text("trail_id").notNull().references(() => trails.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	zone: text("zone", { enum: ["west", "central", "east", "north", "south"] }),
	phone: text("phone"),
	email: text("email"),
	website: text("website"),
	city: text("city"),
	county: text("county"),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => ({
	trailZoneIdx: index("dmo_trail_zone_idx").on(table.trailId, table.zone),
}))

// =============================================================================
// RELATIONS
// =============================================================================

export const trailsRelations = relations(trails, ({ many }) => ({
	venues: many(venues),
	events: many(events),
	waysides: many(waysides),
	dmoContacts: many(dmoContacts),
}))

export const venuesRelations = relations(venues, ({ one, many }) => ({
	trail: one(trails, {
		fields: [venues.trailId],
		references: [trails.id],
	}),
	events: many(events),
	waysides: many(waysides),
}))

export const eventsRelations = relations(events, ({ one }) => ({
	trail: one(trails, {
		fields: [events.trailId],
		references: [trails.id],
	}),
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.id],
	}),
}))

export const waysidesRelations = relations(waysides, ({ one }) => ({
	trail: one(trails, {
		fields: [waysides.trailId],
		references: [trails.id],
	}),
	venue: one(venues, {
		fields: [waysides.venueId],
		references: [venues.id],
	}),
}))

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Trail = typeof trails.$inferSelect
export type NewTrail = typeof trails.$inferInsert
export type Venue = typeof venues.$inferSelect
export type NewVenue = typeof venues.$inferInsert
export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
export type Wayside = typeof waysides.$inferSelect
export type NewWayside = typeof waysides.$inferInsert
export type DmoContact = typeof dmoContacts.$inferSelect
export type NewDmoContact = typeof dmoContacts.$inferInsert
