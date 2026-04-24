import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"
import { eq } from "drizzle-orm"

export function getDb(d1: D1Database) {
	return drizzle(d1, { schema })
}

export async function getTrails(d1: D1Database) {
	const db = getDb(d1)
	return db.select().from(schema.trails).where(eq(schema.trails.isActive, true)).all()
}

export async function getTrailBySlug(d1: D1Database, slug: string) {
	const db = getDb(d1)
	return db.select().from(schema.trails).where(eq(schema.trails.slug, slug)).get()
}

export async function getTrailVenues(d1: D1Database, trailId: string) {
	const db = getDb(d1)
	return db
		.select()
		.from(schema.venues)
		.where(eq(schema.venues.trailId, trailId))
		.orderBy(schema.venues.name)
		.all()
}

export async function getTrailVenuesByType(d1: D1Database, trailId: string, type: string) {
	const db = getDb(d1)
	return db
		.select()
		.from(schema.venues)
		.where(eq(schema.venues.trailId, trailId))
		.orderBy(schema.venues.name)
		.all()
}

export async function getTrailEvents(d1: D1Database, trailId: string) {
	const db = getDb(d1)
	return db
		.select()
		.from(schema.events)
		.where(eq(schema.events.trailId, trailId))
		.orderBy(schema.events.startDate)
		.all()
}

export async function getTrailWaysides(d1: D1Database, trailId: string) {
	const db = getDb(d1)
	return db
		.select()
		.from(schema.waysides)
		.where(eq(schema.waysides.trailId, trailId))
		.orderBy(schema.waysides.name)
		.all()
}

export async function getTrailDmoContacts(d1: D1Database, trailId: string) {
	const db = getDb(d1)
	return db
		.select()
		.from(schema.dmoContacts)
		.where(eq(schema.dmoContacts.trailId, trailId))
		.orderBy(schema.dmoContacts.zone, schema.dmoContacts.name)
		.all()
}
