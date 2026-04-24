/**
 * Seed runner for Trailhead D1 database
 * Supports multi-tenant seeding with idempotency checks
 */

import { execSync } from "node:child_process"
import * as crookedRoad from "./crooked-road"
import * as holstonRoad from "./holston-road"

const DB_PATH = "/Users/codyboring/projects/trailhead/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/f03272be288e4dea1c88177a64a04460a0b5f8e9d8892f8e2b9956c57bc67174.sqlite"

function toSnakeCase(str: string): string {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

function toSqliteTimestamp(d: Date): number {
	return Math.floor(d.getTime() / 1000)
}

function escapeSql(value: unknown): string {
	if (value === null || value === undefined) return "NULL"
	if (typeof value === "boolean") return value ? "1" : "0"
	if (typeof value === "number") return String(value)
	if (value instanceof Date) return String(toSqliteTimestamp(value))
	if (typeof value === "object") return `'${JSON.stringify(value).replace(/'/g, "''")}'`
	return `'${String(value).replace(/'/g, "''")}'`
}

function normalizeRows(rows: Record<string, unknown>[]): Record<string, unknown>[] {
	if (rows.length === 0) return []
	const allKeys = new Set<string>()
	for (const row of rows) {
		for (const key of Object.keys(row)) {
			allKeys.add(key)
		}
	}
	const keys = Array.from(allKeys)
	return rows.map((row) => {
		const normalized: Record<string, unknown> = {}
		for (const key of keys) {
			normalized[key] = row[key] ?? null
		}
		return normalized
	})
}

function buildInsert(table: string, rows: Record<string, unknown>[]): string {
	if (rows.length === 0) return ""
	const normalized = normalizeRows(rows)
	const columns = Object.keys(normalized[0]).map(toSnakeCase)
	const colStr = columns.map((c) => `"${c}"`).join(", ")
	const values = normalized
		.map((row) => {
			const vals = Object.values(row).map(escapeSql)
			return `(${vals.join(", ")})`
		})
		.join(",\n")
	return `INSERT INTO "${table}" (${colStr}) VALUES\n${values};`
}

function trailExists(slug: string): boolean {
	try {
		const result = execSync(
			`sqlite3 "${DB_PATH}" "SELECT COUNT(*) FROM trails WHERE slug = '${slug}';"`,
			{ encoding: "utf-8" }
		)
		return result.trim() !== "0"
	} catch {
		return false
	}
}

interface SeedModule {
	trail: Record<string, unknown>
	majorVenues: Record<string, unknown>[]
	waysides: Record<string, unknown>[]
	recurringEvents: Record<string, unknown>[]
	specialEvents: Record<string, unknown>[]
	dmoContacts: Record<string, unknown>[]
}

function seedTenant(mod: SeedModule, name: string): { sql: string; counts: Record<string, number> } {
	const now = Math.floor(Date.now() / 1000)
	const trailRow = { ...mod.trail, isActive: true, createdAt: new Date(now * 1000), updatedAt: new Date(now * 1000) }
	const venueRows = mod.majorVenues.map((v) => ({ ...v, isActive: true, createdAt: new Date(now * 1000), updatedAt: new Date(now * 1000) }))
	const waysideRows = mod.waysides.map((w) => ({ ...w, isActive: true, createdAt: new Date(now * 1000), updatedAt: new Date(now * 1000) }))
	const eventRows = [...mod.recurringEvents, ...mod.specialEvents].map((e) => ({ ...e, isActive: true, createdAt: new Date(now * 1000), updatedAt: new Date(now * 1000) }))
	const dmoRows = mod.dmoContacts.map((d) => ({ ...d, isActive: true, createdAt: new Date(now * 1000), updatedAt: new Date(now * 1000) }))

	const statements: string[] = []
	statements.push(buildInsert("trails", [trailRow]))
	statements.push(buildInsert("venues", venueRows))
	statements.push(buildInsert("waysides", waysideRows))
	statements.push(buildInsert("events", eventRows))
	statements.push(buildInsert("dmo_contacts", dmoRows))

	return {
		sql: statements.join("\n\n"),
		counts: {
			venues: venueRows.length,
			waysides: waysideRows.length,
			events: eventRows.length,
			dmos: dmoRows.length,
		},
	}
}

const tenants: { name: string; slug: string; mod: SeedModule }[] = [
	{ name: "The Crooked Road", slug: "crooked-road", mod: crookedRoad as unknown as SeedModule },
	{ name: "The Holston Road", slug: "holston-road", mod: holstonRoad as unknown as SeedModule },
]

console.log("Trailhead Multi-Tenant Seed Runner")
console.log("====================================\n")

for (const tenant of tenants) {
	if (trailExists(tenant.slug)) {
		console.log(`⏭️  Skipping ${tenant.name} — already seeded (slug: ${tenant.slug})`)
		continue
	}

	console.log(`🌱 Seeding ${tenant.name}...`)
	const { sql, counts } = seedTenant(tenant.mod, tenant.name)

	try {
		execSync(`sqlite3 "${DB_PATH}"`, { input: sql, encoding: "utf-8" })
		console.log(`   Venues: ${counts.venues}`)
		console.log(`   Waysides: ${counts.waysides}`)
		console.log(`   Events: ${counts.events}`)
		console.log(`   DMO Contacts: ${counts.dmos}`)
		console.log(`   ✅ ${tenant.name} seeded successfully\n`)
	} catch (e) {
		console.error(`   ❌ Seed failed for ${tenant.name}:`, e)
		process.exit(1)
	}
}

console.log("All tenants seeded. Trailhead is ready.")
