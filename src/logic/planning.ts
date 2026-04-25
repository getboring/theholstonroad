import type { Event, Venue } from '../db/schema'

export interface EventPlanningDetails {
	event: Event
	linkedVenue: Venue | null
	planningCity: string | null
}

function normalizeText(value: string | null | undefined): string {
	return (value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function normalizePhone(value: string | null | undefined): string | null {
	const digits = (value ?? '').replace(/\D/g, '')
	return digits.length > 0 ? digits : null
}

function getVenueNameVariants(venue: Venue): string[] {
	const normalizedName = normalizeText(venue.name)
	const withoutLeadingArticle = normalizedName.replace(/^the /, '')
	const parentheticalMatch = venue.name.match(/\(([^)]+)\)/)?.[1]
	const parentheticalName = normalizeText(parentheticalMatch)

	return Array.from(
		new Set(
			[normalizedName, withoutLeadingArticle, parentheticalName].filter(
				(variant): variant is string => variant.length >= 4,
			),
		),
	)
}

export function formatVenueTypeLabel(type: Venue['type']): string {
	const typeLabels: Record<Venue['type'], string> = {
		major: 'Anchor venue',
		affiliated: 'Road stop',
		festival: 'Festival site',
		wayside: 'Wayside exhibit',
		virtual: 'Virtual stop',
	}

	return typeLabels[type]
}

export function getVenueCapacity(venue: Venue): number | null {
	if (!venue.metadata || typeof venue.metadata !== 'object' || !('capacity' in venue.metadata)) {
		return null
	}

	const capacity = Number(venue.metadata.capacity)
	return Number.isFinite(capacity) ? capacity : null
}

export function getVenueHistory(venue: Venue): string | null {
	if (!venue.metadata || typeof venue.metadata !== 'object' || !('history' in venue.metadata)) {
		return null
	}

	return typeof venue.metadata.history === 'string' ? venue.metadata.history : null
}

export function getVenueHours(venue: Venue): string | null {
	if (!venue.metadata || typeof venue.metadata !== 'object' || !('hours' in venue.metadata)) {
		return null
	}

	return typeof venue.metadata.hours === 'string' ? venue.metadata.hours : null
}

export function getLinkedVenue(event: Event, venues: Venue[]): Venue | null {
	if (event.venueId) {
		return venues.find((venue) => venue.id === event.venueId) ?? null
	}

	const contactPhone =
		event.metadata && typeof event.metadata === 'object' && 'contactPhone' in event.metadata
			? normalizePhone(event.metadata.contactPhone)
			: null

	if (contactPhone) {
		const venuesByPhone = venues.filter((venue) => normalizePhone(venue.phone) === contactPhone)
		if (venuesByPhone.length === 1) {
			return venuesByPhone[0]
		}
	}

	const searchableText = normalizeText([event.name, event.description].filter(Boolean).join(' '))
	const nameMatches = venues.filter((venue) =>
		getVenueNameVariants(venue).some((variant) => searchableText.includes(variant)),
	)

	if (nameMatches.length > 0) {
		return [...nameMatches].sort((left, right) => right.name.length - left.name.length)[0]
	}

	return null
}

export function getEventPlanningCity(
	event: Event,
	venues: Venue[],
	linkedVenue: Venue | null,
): string | null {
	if (linkedVenue?.city) {
		return linkedVenue.city
	}

	const searchableText = normalizeText([event.name, event.description].filter(Boolean).join(' '))
	const cities = Array.from(
		new Set(venues.map((venue) => venue.city).filter((city): city is string => Boolean(city))),
	).sort((left, right) => right.length - left.length)

	for (const city of cities) {
		if (searchableText.includes(normalizeText(city))) {
			return city
		}
	}

	return null
}

export function enrichEvents(events: Event[], venues: Venue[]): EventPlanningDetails[] {
	return events.map((event) => {
		const linkedVenue = getLinkedVenue(event, venues)
		return {
			event,
			linkedVenue,
			planningCity: getEventPlanningCity(event, venues, linkedVenue),
		}
	})
}

export function getVenueEvents(
	venue: Venue,
	eventDetails: EventPlanningDetails[],
): EventPlanningDetails[] {
	return eventDetails.filter((eventDetail) => eventDetail.linkedVenue?.id === venue.id)
}
