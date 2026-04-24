import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"
import { eq, and } from "drizzle-orm"

export function getDb(d1: D1Database) {
	return drizzle(d1, { schema })
}

const HOLSTON_ROAD_SLUG = "holston-road"

export async function getHolstonRoadTrail(d1: D1Database) {
	const db = getDb(d1)
	return db.select().from(schema.trails).where(eq(schema.trails.slug, HOLSTON_ROAD_SLUG)).get()
}

export async function getHolstonRoadVenues(d1: D1Database) {
	const db = getDb(d1)
	const trail = await getHolstonRoadTrail(d1)
	if (!trail) return []
	return db
		.select()
		.from(schema.venues)
		.where(eq(schema.venues.trailId, trail.id))
		.orderBy(schema.venues.name)
		.all()
}

export async function getHolstonRoadVenueBySlug(d1: D1Database, slug: string) {
	const db = getDb(d1)
	const trail = await getHolstonRoadTrail(d1)
	if (!trail) return null
	return db
		.select()
		.from(schema.venues)
		.where(and(eq(schema.venues.trailId, trail.id), eq(schema.venues.slug, slug)))
		.get()
}

export async function getHolstonRoadEvents(d1: D1Database) {
	const db = getDb(d1)
	const trail = await getHolstonRoadTrail(d1)
	if (!trail) return []
	return db
		.select()
		.from(schema.events)
		.where(eq(schema.events.trailId, trail.id))
		.orderBy(schema.events.startDate)
		.all()
}

export async function getHolstonRoadWaysides(d1: D1Database) {
	const db = getDb(d1)
	const trail = await getHolstonRoadTrail(d1)
	if (!trail) return []
	return db
		.select()
		.from(schema.waysides)
		.where(eq(schema.waysides.trailId, trail.id))
		.orderBy(schema.waysides.name)
		.all()
}

export async function getHolstonRoadDmoContacts(d1: D1Database) {
	const db = getDb(d1)
	const trail = await getHolstonRoadTrail(d1)
	if (!trail) return []
	return db
		.select()
		.from(schema.dmoContacts)
		.where(eq(schema.dmoContacts.trailId, trail.id))
		.orderBy(schema.dmoContacts.name)
		.all()
}
