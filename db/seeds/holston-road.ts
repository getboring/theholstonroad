/**
 * Seed data for The Holston Road — America's First Frontier
 * This is Tenant #2 for the Trailhead platform.
 * Completely independent from The Crooked Road.
 */

import { ulid } from "ulidx"

// =============================================================================
// TRAIL
// =============================================================================

export const trail = {
	id: ulid(),
	slug: "holston-road",
	name: "The Holston Road",
	tagline: "We didn't wait for permission.",
	description:
		"A trail through America's First Frontier — from the Holston River to the Old Stage Road, from the Watauga Association to the Overmountain Men, from territory to statehood.",
	location: "Northeast Tennessee",
	website: "https://holstonroad.org",
	primaryColor: "#1a3c28",
	secondaryColor: "#c45c1a",
	metadata: {
		routeLength: 75,
		counties: ["Sullivan", "Washington", "Carter", "Hawkins"],
		founded: 2026,
		economicImpact: "Heritage tourism and regional economic development",
		mission:
			"To connect travelers with the frontier story of Northeast Tennessee — where self-government, reinvention, and determination built a state.",
	},
}

const trailId = trail.id

// =============================================================================
// MAJOR VENUES
// =============================================================================

export const majorVenues = [
	{
		id: ulid(),
		trailId,
		slug: "rocky-mount",
		name: "Rocky Mount State Historic Site",
		type: "major" as const,
		description:
			"The 1770s home of William Cobb and the first capital of the Southwest Territory (1790-1792). Where the Overmountain Men camped on September 24, 1780, before marching to Kings Mountain. Where Governor William Blount lived and governed. Where Andrew Jackson waited six weeks for his law license. The oldest original territorial capitol still standing in the United States.",
		shortDescription: "First territorial capital of the Southwest Territory; Overmountain Men supply depot",
		city: "Piney Flats",
		state: "TN",
		address: "200 Hyder Road, Piney Flats, TN 37686",
		phone: "423-538-7396",
		website: "https://www.rockymountmuseum.com",
		features: ["Museum", "Living History", "First-Person Interpretation", "Historic Log House", "Museum of Overmountain History"],
		metadata: {
			history: "Built 1770-1772 by William Cobb. Capital of Southwest Territory 1790-1792. Overmountain Men camped here Sept 24, 1780.",
			capacity: 175,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "sycamore-shoals",
		name: "Sycamore Shoals State Historic Area",
		type: "major" as const,
		description:
			"The site of the Transylvania Purchase (1775), the Watauga Association, and the September 25, 1780 gathering of 1,100 Overmountain Men before the Battle of Kings Mountain. Features a reconstructed Fort Watauga, visitor center, and the annual outdoor drama 'The Wataugans.'",
		shortDescription: "Overmountain Men muster site; Fort Watauga; Transylvania Purchase",
		city: "Elizabethton",
		state: "TN",
		address: "1651 W. Elk Ave, Elizabethton, TN 37643",
		phone: "423-543-5808",
		website: "https://tnstateparks.com/parks/sycamore-shoals",
		features: ["Fort Watauga Reconstruction", "Visitor Center", "Outdoor Drama", "River Access", "Living History"],
		metadata: {
			history: "March 1775: Transylvania Purchase signed. Sept 25, 1780: 1,100 Overmountain Men gathered here.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "netherland-inn",
		name: "Netherland Inn",
		type: "major" as const,
		description:
			"Built 1802-1803 by William King as a salt shipping hub on the Holston River. The only registered historical site in the nation that was once both a stage stop and a boatyard. Notable guests include Daniel Boone and Presidents Jackson, Johnson, and Polk. The Daniel Boone Wilderness Trail begins here.",
		shortDescription: "Only national site that was both a stage stop and a boatyard; Wilderness Trail origin",
		city: "Kingsport",
		state: "TN",
		address: "2144 Netherland Inn Road, Kingsport, TN 37660",
		phone: "423-429-7730",
		website: "https://thenetherlandinn.com",
		features: ["Historic Inn", "Museum of Pioneer Transportation", "Flatboat Replica", "Daniel Boone Cabin", "Holston River Access"],
		metadata: {
			history: "Built 1802-1803. Stage stop on the Great Stage Road. Boatyard on the Holston River.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "exchange-place",
		name: "Exchange Place Living History Farm",
		type: "major" as const,
		description:
			"A 62-acre living history farm on the National Register of Historic Places. Originally a stagecoach relay station and trading post on the Old Stage Road (post-1812). The Preston family operated it for 125 years as their 'Tennessee Farm.' Today it demonstrates antebellum farm life with heritage livestock, heirloom gardens, and artisan demonstrations.",
		shortDescription: "1850s living history farm; former stagecoach relay station on Old Stage Road",
		city: "Kingsport",
		state: "TN",
		address: "4812 Orebank Road, Kingsport, TN 37664",
		phone: "423-329-6471",
		website: "https://exchangeplacetn.org",
		features: ["Living History Farm", "Heritage Livestock", "Blacksmithing", "Open-Hearth Cooking", "Annual Festivals"],
		metadata: {
			history: "Stagecoach relay station and trading post on Old Stage Road. Preston family farm 1845-1970.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "birthplace-of-country-music",
		name: "Birthplace of Country Music Museum",
		type: "major" as const,
		description:
			"A Smithsonian affiliate museum telling the story of the 1927 Bristol Sessions — the 'big bang of country music' that introduced the Carter Family and Jimmie Rodgers to the world. Located on State Street, the historic dividing line between Tennessee and Virginia.",
		shortDescription: "Smithsonian affiliate museum celebrating the 1927 Bristol Sessions",
		city: "Bristol",
		state: "TN",
		address: "101 Country Music Way, Bristol, VA/TN 24201",
		phone: "423-573-1927",
		website: "https://birthplaceofcountrymusic.org",
		features: ["Museum", "Recording Studio", "Radio Bristol", "Live Performances", "Smithsonian Affiliate"],
		metadata: {
			history: "1927 Bristol Sessions recorded Jimmie Rodgers and the Carter Family. Congress designated Bristol 'Birthplace of Country Music' in 1998.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "tipton-haynes-estate",
		name: "Tipton-Haynes Estate",
		type: "major" as const,
		description:
			"Built in 1784 by Colonel John Tipton along the Old Stage Road. Tipton signed both the Virginia and Tennessee Constitutions and was a delegate to the U.S. and State of Franklin Constitutional Conventions. The estate is the site of the Battle of the Lost State of Franklin (1788). Features a historic home, Egyptian Revival law office, visitor center, and nature trail.",
		shortDescription: "Site of the Battle of the Lost State of Franklin (1788); historic stage road estate",
		city: "Johnson City",
		state: "TN",
		address: "1320 Tipton-Haynes Lane, Johnson City, TN 37604",
		phone: "423-926-3631",
		website: "https://tipton-haynes.org",
		features: ["Historic Home", "Law Office", "Visitor Center", "Nature Trail", "Living History"],
		metadata: {
			history: "Built 1784 by Col. John Tipton on Stage Road. Site of Battle of the Lost State of Franklin, 1788.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "dungans-mill",
		name: "Dungan's Mill and Stone House",
		type: "major" as const,
		description:
			"A three-story limestone house and mill built in 1778 by master craftsman Jeremiah Dungan. Tennessee's oldest continuously operating business, grinding grain for over 240 years. The house was constructed from stone salvaged from an old fort in Washington County.",
		shortDescription: "Tennessee's oldest continuously operating business; built 1778",
		city: "Johnson City",
		state: "TN",
		address: "Watauga Road, Johnson City, TN",
		features: ["Historic Mill", "Limestone House", "Working Grist Mill", "Farm Supply Store"],
		metadata: {
			history: "Built 1778 by Jeremiah Dungan. Tennessee's oldest continuously operating business.",
		},
	},
]

// =============================================================================
// WAYSIDE EXHIBITS
// =============================================================================

export const waysides = [
	{
		id: ulid(),
		trailId,
		slug: "the-river",
		name: "The River",
		location: "Holston River Valley, Kingsport, TN",
		county: "Sullivan",
		content: {
			summary:
				"Before there were roads, there was the river. The Holston brought the first settlers, powered the first economy, and defined the landscape.",
			narrative:
				"The Holston River is the spine of this region. For centuries before European arrival, the Cherokee knew Long Island of the Holston as a sacred treaty ground. In the late 1700s, flatboats carried settlers and trade goods downstream to the Tennessee River and on to New Orleans. By 1820, keel boats made regular eight-day trips between Kingsport and Knoxville. Kingsport's early economy depended on being the farthest upstream point from which flatboats could be launched. The river made this place a gateway before it was ever a town.",
			historicalFigures: [
				{ name: "William King", description: "Built the Netherland Inn as a salt shipping hub on the Holston in 1802-1803. The city of Kingsport bears his name." },
				{ name: "Daniel Boone", description: "On March 10, 1775, Boone and 30 axmen set out from Long Island of the Holston to cut the Wilderness Road through Cumberland Gap." },
			],
			nearbyAttractions: ["Netherland Inn", "Warriors' Path State Park", "Boone Lake", "Long Island of the Holston"],
			quote: "The boat that never came back — flatboats were broken up at journey's end, their lumber used to build houses in the new territory.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-road",
		name: "The Road",
		location: "Old Stage Road Corridor, Sullivan County, TN",
		county: "Sullivan",
		content: {
			summary:
				"For fifty years, this was the only way through. Mud, bandits, broken wheels, and a fifty-cent fare. The people who traveled it were either desperate or determined. Usually both.",
			narrative:
				"The Old Stage Road — also called the Great Stage Road — connected Knoxville to Abingdon beginning in the 1790s. Stagecoaches ran two to three times per week, carrying mail, passengers, and news through mud and mountain gaps. The Lee Highway (US 11) was not paved until the 20th century. Key stops included the Tipton-Haynes Estate, the Isaac Hammer House, Rocky Mount, the Netherland Inn, and Exchange Place — where horses were changed and travelers found shelter. When the railroad arrived in 1856, the stagecoaches disappeared. But the road remains, buried under modern pavement, still connecting the same towns.",
			historicalFigures: [
				{ name: "Col. John Tipton", description: "Built his home along the Stage Road in 1784. A legislator who signed both the Virginia and Tennessee constitutions." },
				{ name: "John Gaines", description: "Developed Exchange Place post-1812 as a trading hub on the Old Stage Road, where horses, goods, and stores were freely exchanged." },
			],
			nearbyAttractions: ["Exchange Place", "Tipton-Haynes Estate", "Isaac Hammer House", "Martin Kitzmiller House", "Bashor Mill"],
			quote: "It was not until 1856 that rail service reached Bristol. Then shortly after 1900, the era of the automobile began. By 1915, regular scheduled taxi service was offered between Bristol and Kingsport.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-agreement",
		name: "The Agreement",
		location: "Sycamore Shoals, Elizabethton, TN",
		county: "Carter",
		content: {
			summary:
				"Twenty families walked into Cherokee land, realized no government would protect them, and wrote their own constitution. It was 1772. They were not asking for permission.",
			narrative:
				"The Watauga Association was the first autonomous white government in the British colonies. When surveyors revealed that the Watauga settlements were on Cherokee land — south of Donelson's Line and west of the Proclamation Line of 1763 — the settlers didn't retreat. They negotiated a 10-year lease directly with the Cherokee and created their own judicial system with five commissioners. In 1775, Richard Henderson negotiated the Transylvania Purchase here, acquiring 20 million acres from the Cherokee for 10,000 pounds of trade goods. A young warrior named Dragging Canoe warned the settlers they had purchased a 'dark and bloody ground.' He was right. But the ground was theirs.",
			historicalFigures: [
				{ name: "James Robertson", description: "Led settlers to the Watauga in 1771. Co-founder of the Watauga Association and later co-founder of Nashville." },
				{ name: "John Sevier", description: "Defender of Fort Watauga in 1776. Later governor of the State of Franklin and first governor of Tennessee." },
				{ name: "Dragging Canoe", description: "Cherokee warrior who opposed land sales. Led the Chickamauga in attacks on frontier settlements for 20 years." },
			],
			nearbyAttractions: ["Sycamore Shoals State Historic Area", "Reconstructed Fort Watauga", "Watauga River"],
			quote: "Theodore Roosevelt called the Watauga Association 'the first truly free government in America.'",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-march",
		name: "The March",
		location: "Rocky Mount, Piney Flats, TN",
		county: "Sullivan",
		content: {
			summary:
				"When threatened, the frontier didn't hide. It marched 330 miles over snow-covered mountains to fight a battle that turned the tide of a war.",
			narrative:
				"On September 24, 1780, approximately 900 Overmountain Men camped at Rocky Mount. William Cobb fed them bacon, supplied them with gunpowder and horses, and sent his own sons to fight. The next day, they crossed the Watauga River at Sycamore Shoals and joined 1,100 more men under Colonels Shelby, Sevier, and Campbell. They marched through snow 'shoe mouth deep' over Roan Mountain, down into North Carolina, and on to Kings Mountain, South Carolina. On October 7, 1780 — one hour and five minutes after the battle began — British Major Patrick Ferguson was dead and his Loyalist army defeated. Thomas Jefferson called it 'the turn of the tide to success.'",
			historicalFigures: [
				{ name: "William Cobb", description: "Supplied over 900 Overmountain Men with bacon, horses, bullets, and food from his farm at Rocky Mount on September 24, 1780." },
				{ name: "Isaac Shelby", description: "Led troops from Sapling Grove (Bristol) to the muster. Later became the first governor of Kentucky." },
				{ name: "William Campbell", description: "Organized the Abingdon muster of 400 men on September 24, 1780. Led the Virginia troops to Kings Mountain." },
				{ name: "Pharaoh Cobb", description: "Son of William Cobb. Participated in the Battle of Kings Mountain alongside the Overmountain Men." },
			],
			nearbyAttractions: ["Rocky Mount State Historic Site", "Sycamore Shoals State Historic Area", "Abingdon Muster Grounds (VA)", "Choates Ford (Bluff City)"],
			quote: "'Ferguson and his party are no more.' — Col. William Campbell, October 20, 1780",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-state",
		name: "The State",
		location: "Rocky Mount to Knoxville, TN",
		county: "Sullivan",
		content: {
			summary:
				"You are standing in the first American capital built west of the mountains. Before Washington had a White House, William Blount ran a territory from this farmhouse.",
			narrative:
				"North Carolina ceded its western lands to the federal government in 1790. On May 26, the Southwest Territory was organized — the first federal territory west of the Alleghenies. President George Washington appointed William Blount as governor. Blount arrived in October 1790 and set up his headquarters at William Cobb's home, Rocky Mount. For two years, censuses were written here, treaties with the Cherokee were negotiated, and the machinery of government was built from scratch. In 1792, Blount moved the capital to Knoxville. On June 1, 1796, Tennessee became the 16th state. Andrew Jackson had lived at Rocky Mount for six weeks while waiting for his law license — a young man on the frontier, about to help build a state.",
			historicalFigures: [
				{ name: "William Blount", description: "Governor of the Southwest Territory 1790-1796. Signed the U.S. Constitution. Shepherded Tennessee to statehood." },
				{ name: "John Sevier", description: "First governor of Tennessee (1796-1801, 1803-1809). Leader of the Overmountain Men at Kings Mountain." },
				{ name: "Andrew Jackson", description: "Lived at Rocky Mount for six weeks while waiting for his license to practice law. Later seventh President of the United States." },
			],
			nearbyAttractions: ["Rocky Mount State Historic Site", "Blount Mansion (Knoxville)", "James White's Fort (Knoxville)"],
			quote: "Thomas Jefferson praised Tennessee's constitution as 'the least imperfect and most republican of the state constitutions.'",
		},
		isVirtual: false,
	},
]

// =============================================================================
// RECURRING EVENTS
// =============================================================================

export const recurringEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "overmountain-muster",
		name: "Overmountain Muster & River Crossing",
		description:
			"Step back in time and relive the story of the Overmountain Men and their historic gathering at Sycamore Shoals. Living history interpreters present colonial-era demonstrations in and around Fort Watauga. The Overmountain Victory Trail Association recreates the historic 1780 river crossing at 2 PM on September 25.",
		startDate: new Date("2026-09-25T10:00:00"),
		endDate: new Date("2026-09-25T17:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "yearly", month: 9, dayOfMonth: 25 },
		admission: "Free",
		metadata: {
			performers: ["Washington County Militia", "Overmountain Victory Trail Association"],
			contactPhone: "423-543-5808",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "fall-folk-arts-festival",
		name: "Fall Folk Arts Festival at Exchange Place",
		description:
			"Regional artisans demonstrate 19th-century crafts including broom making, wood whittling, basket weaving, and harvest-time activities typical of an 1850s farm. Costumed interpreters bring antebellum farm life to life.",
		startDate: new Date("2026-09-27T10:00:00"),
		endDate: new Date("2026-09-28T17:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "yearly", month: 9, dayOfMonth: 27 },
		admission: "Free",
		metadata: {
			contactPhone: "423-329-6471",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "spring-garden-fair",
		name: "Spring Garden Fair at Exchange Place",
		description:
			"Annual spring celebration at Exchange Place Living History Farm featuring heirloom plants, heritage crafts, and demonstrations of 19th-century gardening and farming practices.",
		startDate: new Date("2026-05-16T10:00:00"),
		endDate: new Date("2026-05-16T17:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "yearly", month: 5, dayOfMonth: 16 },
		admission: "Free",
		metadata: {
			contactPhone: "423-329-6471",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "rocky-mount-frontier-days",
		name: "Rocky Mount Frontier Days",
		description:
			"Annual living history event at Rocky Mount State Historic Site featuring first-person interpretation of 18th-century frontier skills, crafts, and daily life. Special focus on the Overmountain Men and the Southwest Territory era.",
		startDate: new Date("2026-10-10T10:00:00"),
		endDate: new Date("2026-10-11T16:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "yearly", month: 10, dayOfMonth: 10 },
		admission: "Admission varies",
		metadata: {
			contactPhone: "423-538-7396",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "the-wataugans",
		name: "The Wataugans Outdoor Drama",
		description:
			"An outdoor drama depicting the settlement of the Watauga region and the events of the Overmountain March. Performed on nine nights each July at Sycamore Shoals State Historic Area.",
		startDate: new Date("2026-07-15T20:00:00"),
		endDate: new Date("2026-07-23T22:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "yearly", month: 7, dayOfMonth: 15 },
		admission: "Ticketed",
		metadata: {
			contactPhone: "423-543-5808",
		},
	},
]

// =============================================================================
// SPECIAL EVENTS
// =============================================================================

export const specialEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "bristol-rhythm-roots-2026",
		name: "Bristol Rhythm & Roots Reunion",
		description:
			"Three days of roots music across 20+ stages in historic downtown Bristol, TN/VA. Celebrating the legacy of the 1927 Bristol Sessions — the 'big bang of country music.'",
		startDate: new Date("2026-09-18T16:00:00"),
		endDate: new Date("2026-09-20T23:00:00"),
		isRecurring: false,
		admission: "Wristband required",
		metadata: {
			performers: ["120+ acts across roots, Americana, bluegrass, and country"],
			ticketUrl: "https://bristolrhythm.com",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "kingsport-fun-fest-2026",
		name: "Kingsport Fun Fest",
		description:
			"Nine-day signature festival featuring over 100 activities and events with an annual attendance of 180,000. Named a Top-20 July Event by the Southeast Tourism Society.",
		startDate: new Date("2026-07-17T10:00:00"),
		endDate: new Date("2026-07-25T22:00:00"),
		isRecurring: false,
		admission: "Free and ticketed events",
		metadata: {
			performers: ["Concerts, hot air balloons, family activities"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "transylvania-purchase-commemoration",
		name: "Transylvania Purchase Commemoration",
		description:
			"Annual commemoration of the March 1775 treaty at Sycamore Shoals where Richard Henderson and the Transylvania Company purchased 20 million acres from the Cherokee. Living history demonstrations and treaty reenactment.",
		startDate: new Date("2026-03-21T10:00:00"),
		endDate: new Date("2026-03-21T16:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			contactPhone: "423-543-5808",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "christmas-in-the-country",
		name: "Christmas in the Country at Exchange Place",
		description:
			"Holiday celebration at Exchange Place Living History Farm featuring 19th-century Christmas traditions, open-hearth cooking, caroling, and heritage crafts.",
		startDate: new Date("2026-12-05T10:00:00"),
		endDate: new Date("2026-12-06T17:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			contactPhone: "423-329-6471",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "sycamore-shoals-spring-muster",
		name: "Spring Muster at Sycamore Shoals",
		description:
			"Living history weekend at Fort Watauga featuring colonial militia drills, 18th-century craft demonstrations, and interpretations of frontier life in the Watauga Settlement.",
		startDate: new Date("2026-05-16T10:00:00"),
		endDate: new Date("2026-05-17T16:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			contactPhone: "423-543-5808",
		},
	},
]

// =============================================================================
// DMO CONTACTS
// =============================================================================

export const dmoContacts = [
	// West Zone (Sullivan County / Bristol / Kingsport)
	{ id: ulid(), trailId, name: "Visit Kingsport", zone: "west" as const, phone: "423-343-9145", website: "https://visitkingsport.com", city: "Kingsport" },
	{ id: ulid(), trailId, name: "Discover Bristol", zone: "west" as const, phone: "423-989-4850", website: "https://discoverbristol.org", city: "Bristol" },
	{ id: ulid(), trailId, name: "Sullivan County Tourism", zone: "west" as const, phone: "423-323-1897", website: "https://visitsullivancountytn.com", city: "Blountville" },

	// Central Zone (Johnson City / Washington County)
	{ id: ulid(), trailId, name: "Visit Johnson City", zone: "central" as const, phone: "423-434-6294", website: "https://visitjohnsoncitytn.com", city: "Johnson City" },
	{ id: ulid(), trailId, name: "Washington County Tourism", zone: "central" as const, phone: "423-753-0203", website: "https://washingtoncountytn.org", city: "Jonesborough" },

	// East Zone (Elizabethton / Carter County)
	{ id: ulid(), trailId, name: "Carter County Tourism", zone: "east" as const, phone: "423-547-3850", website: "https://cartercountytn.gov", city: "Elizabethton" },
	{ id: ulid(), trailId, name: "Elizabethton-Carter County Chamber", zone: "east" as const, phone: "423-543-2122", website: "https://elizabethtonchamber.com", city: "Elizabethton" },

	// North Zone (Virginia border / Abingdon)
	{ id: ulid(), trailId, name: "Abingdon CVB", zone: "north" as const, phone: "276-676-2282", website: "https://visitabingdonvirginia.com", city: "Abingdon" },
	{ id: ulid(), trailId, name: "Washington County VA Tourism", zone: "north" as const, phone: "276-676-2282", website: "https://washingtoncountyva.com", city: "Abingdon" },
]
