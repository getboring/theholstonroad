# The Holston Road — Blueprint v3
## Product, Brand, and Business Model — Reset

**Date:** 2026-04-28
**Status:** Strategic blueprint, supersedes prior plans on direction; prior plans (v2 execution plan, master plan, brand strategy) remain valid on tone, voice, and content
**Companion docs:** `EXECUTION-PLAN.md` (operational), `HERITAGE-TRAIL-MODELS.md` (research), `holston-road-brand-strategy.md` (voice + identity), `HOLSTON-ROAD-MASTER-PLAN.md` (original master plan)

This document synthesizes the best of our existing strategy with the six heritage-trail models researched in `HERITAGE-TRAIL-MODELS.md`, and describes a leaner, sharper, more fundable product than what any prior plan defined.

---

## 0. Executive summary (one screen)

**What it is:** The Holston Road is a publication and a marker network. It tells the story of how America's first frontier learned to govern itself, and it puts that story on roadside markers across Northeast Tennessee.

**What it isn't:** It is not a tourism app, a SaaS product, a state tourism program, or a music trail. It is a 21st-century public history publication backed by physical infrastructure.

**Three layers of product:**

| Layer | What it is | Who it serves |
|---|---|---|
| **The Markers** | A growing network of interpretive roadside markers, each a "Hook / Fact / Question" provocation | Everyone passing by, free, forever |
| **The Publication** | A magazine-style website with chapters, audio, photo essays, podcast, newsletter | Travelers planning, locals reading, students learning |
| **The Patrons** | A membership + sponsorship program funding the markers and the publication | Supporters who want their name behind it |

**Three productized experiences:**

| Loop | Length | Theme | Anchor |
|---|---|---|---|
| **The River Loop** | ~15 mi | Chapter 1 (River) + Chapter 2 (Road) | Netherland Inn, Exchange Place |
| **The Agreement Loop** | ~20 mi | Chapter 3 (Agreement) | Sycamore Shoals, Tipton-Haynes |
| **The March Loop** | ~35 mi | Chapter 4 (March) + Chapter 5 (State) | Sycamore Shoals → Rocky Mount |

Master loop combines all three (~75 mi), but each loop ships independently.

**Business model:** Grants (largest line, ~50%) + memberships (~20%) + marker sponsorships (~15%) + educational licensing + merch (~15%). Year-1 target: $50–75k. Year-3 target: $250k. Year-5 endgame: National Heritage Area designation.

**Soft launch:** September 25, 2026 (Overmountain Muster). **Headline year:** 2030 (Battle of Kings Mountain 250th).

---

## 1. The product, simply stated

> The Holston Road is a network of roadside markers and a publication that connects them. Together, they tell one story in five chapters.

That's it. Not an app. Not a passport platform. Not a destination site. A marker network and a publication.

Every other thing the brand does — the loops, the audio, the podcast, the passport, the membership, the merch, the events — is in service of those two core products.

This framing matters because it defines the **unit of work**:

- The unit of work is a marker. Each marker is fundable, photographable, dedicateable, sponsorable, scholarly-reviewed, locally co-funded, and publishable as a page on the website.
- The unit of audience is a reader. Not a visitor, not a user, not a member — a reader. The site is something you read.

This is a Mississippi-Blues-Trail-shaped product, executed with frontier-identity content, presented through a publication-grade website.

---

## 2. The frontier voice (kept)

The voice from `holston-road-brand-strategy.md` is unchanged:

> "We didn't wait for permission."

Present tense. Active verbs. No academic hedging. Hook / Fact / Question structure on every marker. Cherokee, enslaved labor, free-Black-community context integral, not retrofitted. Editorial board reviews every word before publish.

This voice scales from a single marker plate (40 words) to a chapter narrative (1,200 words) to a podcast episode (20 minutes). The voice is the consistency layer across every surface.

---

## 3. Brand architecture

```
THE HOLSTON ROAD
│
├── THE MARKERS             — physical interpretive panels
│   ├── numbered M-001 onward
│   └── each = a /m/[slug] page on the publication
│
├── THE LOOPS               — productized driving experiences
│   ├── The River           (Chapter 1–2)
│   ├── The Agreement       (Chapter 3)
│   └── The March           (Chapter 4–5)
│
├── THE PUBLICATION         — the website as magazine
│   ├── Chapters            (5 long-form narratives)
│   ├── Markers             (one page per marker)
│   ├── Sites               (anchor venues + road stops)
│   ├── Loops               (planned routes)
│   ├── Field Notes         (blog: stories, dispatches, interviews)
│   └── About               (editorial board, mission, sources)
│
├── THE DISPATCH            — newsletter, weekly
│
├── THE ROAD                — podcast, biweekly
│
├── THE PASS                — membership + passport, optional
│   ├── Traveler            (free, email subscriber)
│   ├── Settler             ($25/yr)
│   ├── Frontiersman        ($75/yr)
│   └── Wataugan            ($250/yr)
│
└── THE PATRONS             — marker sponsorship program
    ├── Supporter           ($500 — name on plate back)
    ├── Sponsor             ($5,000 — marker dedicated in honor)
    └── Founder             ($25,000 — marker series sponsor + named partnership)
```

This architecture has zero overlap with The Crooked Road. It looks like a publishing house that owns physical infrastructure, not a tourism brand. That's the differentiation we want.

---

## 4. The website as publication

### Mental model

Stripe Press × Atavist × Atlas Obscura × the New York Times "By the Book" verticals × a state historical marker registry. Not a tourism site.

### Visual direction (refining brand strategy doc)

- River green `#1a472a`, forge orange `#c45c1a`, limestone `#78716c`, iron black `#0c0a09`, paper white `#fafaf7`
- One serif (display) + one sans (body) + one mono (numerals, marker IDs, coordinates)
- Generous whitespace. Long line lengths only for body copy. Always 1 column on mobile.
- Real photography. Dramatic weather. No stock. No banjo iconography.
- Sharp corners (drop `rounded-3xl` defaults from current site)
- Marker visual motif: a stylized iron plate with rounded corners, debossed type — recurring across the site
- "Hook / Fact / Question" formatted consistently as a typographic system: hook in display serif, fact in body sans, question in italic

### Site architecture

```
/                       Home (publication front page)
/chapters/              Chapter index
/chapters/the-river     Chapter narrative + audio + related markers
/chapters/the-road
/chapters/the-agreement
/chapters/the-march
/chapters/the-state
/markers/               Marker index (filterable by chapter, loop, county)
/m/[id]                 Single marker page (the QR target)
/sites/                 Anchor venues + road stops
/sites/[slug]           Site detail
/loops/                 The three loops
/loops/the-river
/loops/the-agreement
/loops/the-march
/field-notes/           Blog (interviews, dispatches)
/about/                 Editorial board, mission, sources cited
/patrons/               Sponsorship + membership
/dispatch/              Newsletter archive + signup
/road/                  Podcast archive
/pass/                  Membership signup + passport (Phase 2)
```

### The marker page (`/m/[id]`) is the most important page on the site

Every marker has a stable URL. The QR code on the physical marker points there. The page contains:

1. The marker ID and coordinates (mono font header)
2. Hero photo of the marker in situ
3. The Hook / Fact / Question text (verbatim from the marker)
4. Audio (3–5 min, embedded; transcript below)
5. The fuller story (~600 words, Editorial Board reviewed)
6. Sources cited (academic discipline)
7. Sponsors of this marker (back-of-plate listing on the page)
8. Related markers, related chapter, related loop
9. "How to get here" with map embed
10. Share + sponsor-this-marker CTAs

This page works in person (someone scanning the QR while standing at the marker) and from home (someone reading the publication on a Tuesday night). Same URL, same content. That unification is the whole point.

---

## 5. The marker network (the central physical product)

### Sizing

| Phase | Markers | Cumulative cost (install) |
|---|---|---|
| Year 1 (2026) | 5 (one per chapter) | $25,000 |
| Year 2 (2027) | +7 (12 total) | +$35,000 = $60k |
| Year 3 (2028) | +13 (25 total) | +$65,000 = $125k |
| Year 5 (2030) | 50 total | $250k |
| Year 10 | 100+ | network |

### Per-marker economics (Mississippi Blues Trail model)

| Source | Per marker |
|---|---|
| NEA / NEH grant (regional pool) | $1,500 |
| TN Historical Commission / TN Arts | $1,500 |
| Local civic co-sponsor (county tourism, civic group, family foundation) | $2,000 |
| The Holston Road operating fund | covers gap |
| **Total per marker** | $5,000 |

This unit economics is the single most important thing we're inheriting from the Mississippi Blues Trail. It scales. It's politically robust. Every marker funds itself locally.

### Marker design

- Cast aluminum, debossed type, river-green plate with iron-black text
- 24" × 30", roadside-mountable
- Front: Hook + Fact + Question + marker ID + small map
- Back: Editorial credit ("Researched and written by [Editorial Board]"), sponsors, year, QR code to `/m/[id]`
- Coordinated visual identity with Va Crooked Road's trailblazer signage *concept* but visually distinct (iron + forge palette vs. wood + green)

### Marker placement

- Roadside ROW where TDOT permits (most markers)
- Anchor venue grounds where partner consents (Rocky Mount, Sycamore Shoals, etc.)
- Public/civic sites (state parks, county courthouses, public libraries) where local consent obtained
- Some markers placed at sites where the venue is no longer extant — pure ROW markers — which dramatically expands what stories we can tell vs. an MOU-dependent model

### Year-1 markers (the launch five, one per chapter)

| # | Title | Chapter | Location |
|---|---|---|---|
| M-001 | "The boat that never came back" | River | Netherland Inn (Kingsport) |
| M-002 | "Two dollars and a strong stomach" | Road | Old Stage Road corridor (Sullivan County) |
| M-003 | "The lease that became a nation" | Agreement | Sycamore Shoals (Elizabethton) |
| M-004 | "September 24, 1780" | March | Rocky Mount (Piney Flats) |
| M-005 | "Six weeks at Rocky Mount" | State | Rocky Mount (Piney Flats) |

These five give us all five chapters represented physically, anchored at three locations, with two locations Cody can directly enable (Rocky Mount) or strongly influence (Sycamore Shoals via TN State Parks relationship).

---

## 6. The three loops (productized routes)

Each loop is a complete consumable product. A visitor can do one loop in a half-day and feel they've experienced something real.

| Loop | Drive time | Markers (Year 1) | What you do |
|---|---|---|---|
| **The River** | ~1 hour | 1 | Netherland Inn → Long Island → Exchange Place; paddle access at Boone Lake |
| **The Agreement** | ~1.5 hours | 1 | Sycamore Shoals → Carter Mansion → Tipton-Haynes |
| **The March** | ~2.5 hours | 3 | Bristol (Sapling Grove) → Rocky Mount → Sycamore Shoals (Overmountain route) |

Each loop has its own page, downloadable PDF, audio guide (chapter audio plus marker audio), and QR-coded printed map insert.

**Visitor experience:** Choose a loop based on time available. Drive it. Scan markers. Audio plays through phone speaker or carplay. Each marker QR also offers "remember this" — bookmarks the marker on your free Traveler account (email-only, no app).

This replaces the "itinerary builder" complexity in v2. Three curated loops > algorithmic itinerary generation for v1.

---

## 7. The Patrons (the business model)

### Why patronage, not transactions

Tourism trails are usually freemium destinations with merch. We're a publication with public infrastructure. The natural model is patronage — like PBS, Wikipedia, This American Life, but tied to physical artifacts.

### The five revenue streams, ranked by Year-1 contribution

| Stream | Year 1 | Year 3 | Notes |
|---|---|---|---|
| **Grants** | $35–60k | $80–150k | NEA, NEH, ARC, AR250, TN Arts, TN Historical, regional foundations. Largest line. |
| **Marker sponsorships** | $10–20k | $40–75k | $500–25,000 per gift. Tied to specific markers. Recognized publicly. |
| **Memberships (The Pass)** | $5–15k | $25–50k | $25/$75/$250 tiers. Auto-renew via Stripe. |
| **Educational licensing** | $2–5k | $15–30k | Curriculum packages to TN/VA/NC districts. |
| **Merch** | $3–8k | $15–25k | Map booklets, patches, books. |
| **Year totals** | **$55–108k** | **$175–330k** | |

Conservative midpoint Year 1: ~$70k. Master plan target was $75k. Achievable, but funded by patronage + grants, not transactions.

### Marker sponsorship program (the differentiator)

This is the single most powerful fundraising mechanic we have, borrowed and amplified from Mississippi Blues Trail's local co-sponsorship pattern.

**Three named gift levels:**

| Level | Gift | Recognition |
|---|---|---|
| **Supporter** | $500 | Name on the back of a marker plate (alongside other supporters) |
| **Sponsor** | $5,000 | Marker dedicated "in honor of" or "in memory of" — phrase included on plate back; named at dedication ceremony |
| **Founder** | $25,000 | Sponsors a series (e.g., all 5 March markers); named partnership; advisory seat |

This converts a fundraising ask into something a donor can *show their family*. A grandparent can sponsor a marker in honor of an Overmountain ancestor, drive the family to it, point at the plate. That's a powerful product.

### The Pass (membership)

| Tier | $/yr | Benefits |
|---|---|---|
| Traveler | free | Email-based passport (token URL), Dispatch newsletter, basic site |
| Settler | $25 | Member-only audio, longer-cut interviews, 10% merch discount, early event RSVP |
| Frontiersman | $75 | Above + physical passport booklet, annual patch, partner discounts at participating sites |
| Wataugan | $250 | Above + name listed on Patrons page, annual dinner, advisory access |

Memberships fund operations; sponsorships fund markers; grants fund both.

---

## 8. Tech stack (radically simplified)

### What changes from v2

We're NOT building:
- A custom interactive map (use Google My Maps embed or Leaflet with hardcoded GeoJSON; upgrade later if needed)
- A custom audio player (use native `<audio>` with QR-friendly URLs)
- A custom passport infrastructure (use a SaaS like LoyalBrew or Driftscape if/when we cross 200 paper-passport users/month)
- A native iOS/Android app (we are a website + markers + email; that is the complete product)
- An itinerary builder (three curated loops, no algorithm)

We ARE building:
- A great publication-grade website
- A marker page system with stable URLs
- Stripe-backed memberships and sponsorships (Phase 2)
- A great email program

### Stack

The current stack (TanStack Start + CF Workers + D1 + Drizzle + Tailwind v4) is correct. Keep it. The adjustment is in *what we build with it*, not *what we build it on*.

| Layer | Choice |
|---|---|
| Framework | TanStack Start (existing) |
| Hosting | Cloudflare Workers (existing) |
| DB | D1 + Drizzle (existing) |
| Auth (Phase 2) | better-auth, passwordless |
| Payments (Phase 2) | Stripe |
| Email | ConvertKit (Dispatch) + Resend (transactional) |
| Map | Google My Maps embed → Leaflet w/ hardcoded GeoJSON → MapLibre (only if traffic justifies) |
| Audio hosting | R2 |
| CMS | Markdown in repo for chapters; D1 for markers + sites + sponsorships |
| SaaS passport (if needed) | Driftscape or LoyalBrew (~$100–300/mo) |

**Bottom line:** We're rebuilding the *content and information architecture* of the existing repo, not the infrastructure.

---

## 9. Editorial system (the trust layer)

This is the asset Mississippi Blues Trail has and Crooked Road downplays. We replicate it.

### Editorial Advisory Board (3 named members)

| Role | Candidate |
|---|---|
| Chair / Lead Historian | Dr. Carroll Van West (TN State Historian) or designate |
| Cherokee Cultural Reviewer | Eastern Band Cherokee Nation Office of Cultural Resources designate |
| Music Heritage Liaison | Believe in Bristol or Birthplace of Country Music Museum staff |

Compensation: $500 honorarium per member per year for review work. Total $1,500/yr.

### Review process

1. Cody drafts marker text, chapter narrative, or major site copy
2. Submitted to Editorial Board with sources cited
3. Each member reviews within 14 days; flags factual concerns, voice issues, omissions
4. Cody revises; second pass if needed
5. Published with editorial credit footer ("Reviewed by the Editorial Board")
6. Each marker plate carries the Editorial Board name on the back

### Why this matters

Heritage trails get factual hits. Mississippi Blues Trail rarely does. The reason is the named, credentialed editorial layer. We adopt it Day 1.

---

## 10. Phased rollout (aligned to this blueprint)

This replaces the v2 calendar with a marker-first sequence.

### Phase 0 — Foundation (Weeks 0–2, current)

- Domain + handles
- Fiscal sponsor confirmed
- Editorial Advisory Board: 3 verbal commitments
- EBC consultation pathway opened
- Bristol coalition listening tour completed
- All 5 chapter narratives drafted
- TN Music Pathways application initiated for Rocky Mount, Sycamore Shoals, Netherland Inn, Exchange Place
- Marker design system briefed to designer
- NEA Our Town / Challenge America research begun for Year-1 marker funding

### Phase 1 — The Publication (Weeks 3–7)

- Site visually rebuilt: frontier identity, river-green/forge-orange palette, publication-grade typography
- 5 chapter pages live with Editorial-Advisory-reviewed text
- 5 marker pages live (`/m/M-001` through `/m/M-005`) with placeholder hero photos and audio drafts
- Marker design finalized; vendor selected; first cast scheduled
- Three loop pages live with hardcoded routes + Google My Maps embed
- About page lists Editorial Board with bios
- ConvertKit live; first Dispatch sent to soft list
- TDOT trailblazer signage application formally filed (multi-year track begins)

### Phase 2 — The Markers (Weeks 8–14)

- 5 markers cast, dedicated, installed at:
  - M-001 Netherland Inn (Aug 2026)
  - M-003 Sycamore Shoals (Aug 2026)
  - M-004, M-005 Rocky Mount (Aug 2026)
  - M-002 Old Stage Road ROW (Sept 2026)
- Each dedication is a press event; marker becomes news
- Audio production: 5 chapter intros + 5 marker audio (10 total) recorded
- Sponsor program launches: first 10 Supporter gifts targeted; 1–2 Sponsor gifts targeted
- Photography: anchor sites + each marker location, all five chapters
- Print broadside map (500 units) and pocket passport (250 units) produced
- Anchor MOUs: minimum 2 (Rocky Mount + Sycamore Shoals); target 4

### Phase 3 — Soft Launch at Muster (Sept 25, 2026)

- All 5 markers live
- Joint event at Sycamore Shoals + Rocky Mount with Overmountain Victory Trail Association
- Press tour: Bristol Herald Courier, Johnson City Press, Knoxville News-Sentinel, regional NPR
- Paid social campaign ($3k) targeting Tri-Cities + 2hr radius
- First podcast episode released
- ≥3 press hits, ≥500 net new email subscribers

### Phase 4 — Patrons & Pass (Months 4–9, late 2026 / early 2027)

- Stripe + better-auth: memberships go live (Settler/Frontiersman/Wataugan)
- Sponsor a Marker public page with named gift levels
- First Wataugan dinner held (Q1 2027)
- 12 markers funded for installation in 2027 (year 2)
- Podcast cadence held biweekly
- Dispatch weekly

### Phase 5 — Scale (Year 2: 2027)

- 7 additional markers installed (12 cumulative)
- Educational curriculum licensed to first 2–3 districts
- ETSU partnership formalized (Center for Appalachian Studies & Services as host candidate for future NHA fiduciary)
- ETSU economic-impact study commissioned (Crooked Road / Va Tech equivalent)
- TN Music Pathways anchors live; cross-promotion with TDTD launched
- First non-Holston-Road tenant onboarded to Trailhead platform (proof of platform leverage)

### Phase 6 — The 2030 push (Years 3–5: 2028–2030)

- 50 markers cumulative by 2030
- Route extended to connect with Overmountain Victory NHT through North Carolina to Kings Mountain SC for Battle 250th
- National Heritage Area feasibility study commissioned with NPS guidance
- Federal designation legislation introduced via TN delegation
- Battle of Kings Mountain 250th (October 7, 2030) becomes the launch moment for the Holston Road Heritage Area designation campaign
- Year-5 revenue target: $400k+, sustaining a small permanent staff

---

## 11. Financial model (Year 1 detailed)

### Revenue

| Source | Conservative | Target |
|---|---|---|
| Grants (NEA Challenge America, TN Arts, TN Historical, regional foundations) | $25,000 | $50,000 |
| Marker sponsorships (5 markers × ~$2k local co-sponsor + 2 individual Sponsor gifts) | $12,000 | $20,000 |
| Memberships (200 Settler + 50 Frontiersman + 5 Wataugan = $9,750) | $5,000 | $12,000 |
| Educational licensing | $1,500 | $5,000 |
| Merch | $3,000 | $7,000 |
| **Total** | **$46,500** | **$94,000** |

### Costs

| Category | Cost |
|---|---|
| Marker fabrication + installation (5 markers × $5k) | $25,000 |
| Marker design system + vendor onboarding | $1,500 |
| Logo + brand identity | $1,200 |
| Audio production (10 pieces) | $2,500 |
| Photography (3 shoot days) | $3,500 |
| Print (500 maps + 250 passports) | $1,500 |
| Hosting / SaaS | $1,500 |
| Paid acquisition | $8,000 |
| Editorial Board honoraria | $1,500 |
| EBC consultation | $2,000 |
| Copy editor | $1,000 |
| Launch event | $3,000 |
| Legal / fiscal sponsor admin | $1,500 |
| Cody stipend (10 hrs/wk × 50 weeks × $40/hr) | $20,000 |
| Contingency | $5,000 |
| **Total** | **$78,200** |

**Year 1 net at conservative revenue:** -$31,700 (gap closed by carryover grants or bridge funding)
**Year 1 net at target revenue:** +$15,800

The marker fabrication line is the dominant cost. It also produces the most fundable, photographable, news-eligible artifact in the entire program. Every dollar spent on a marker buys a permanent piece of public infrastructure with the Holston Road brand on it. That's an excellent dollar.

---

## 12. What this replaces from earlier plans

| Earlier | This blueprint |
|---|---|
| Custom passport infrastructure | SaaS when needed; paper-first |
| MapLibre custom map | Google My Maps embed; upgrade later |
| Custom audio player component | Native `<audio>` with QR-friendly URLs |
| Single 75-mile trail | Three independent loops + master loop |
| Anchor-venue-dependent product | Marker-network-dependent product (more robust) |
| Itinerary builder algorithm | Three curated loop pages |
| Generic SaaS-startup tone | Publication-grade, scholar-fronted editorial |
| Tourism brand framing | Public history publication framing |
| Year-1 site count = 7 anchor MOUs | Year-1 site count = 5 markers (no MOU required for ROW) |

The biggest change: **the product center of gravity moves from "venue partnerships" to "marker installations."** Markers don't need permission from venue operators (mostly); they need TDOT or county or state-park permits. This is dramatically easier political work, and it produces a permanent, sponsorable, publishable artifact every time.

---

## 13. What remains true from earlier plans

- The brand strategy (`holston-road-brand-strategy.md`) is correct in voice, tone, palette, identity. Adopt unchanged.
- The five-chapter narrative (River / Road / Agreement / March / State) is correct. Keep.
- The frontier positioning ("We didn't wait for permission") is correct. Keep.
- The AR250 alignment is correct. Sharpen the 2030 framing.
- The Cherokee + enslaved-labor + free-Black-community integration requirement is correct. Hold the line.
- The fiscal sponsor + Editorial Advisory Board approach (v2) is correct. Keep.
- The current TanStack Start + CF Workers + D1 stack is correct. Keep.

---

## 14. Decision points (to greenlight before Phase 1)

| Decision | Default | Open question |
|---|---|---|
| Adopt this blueprint as the operating direction? | Yes | Cody's call |
| Brand name remains "The Holston Road"? | Yes | Confirm |
| Marker network is the central physical product, not venue partnerships? | Yes | Confirm — this is the biggest strategic shift |
| Keep existing repo, rebuild content/IA, don't fork? | Yes | Confirm |
| Editorial Board approach, named scholar-fronted? | Yes | Confirm — and identify candidates this week |
| Three loops + master loop, not one trail + itinerary builder? | Yes | Confirm |
| Patronage business model (grants + sponsorships + memberships), not transactional? | Yes | Confirm |
| 2030 (Kings Mountain 250th) is the headline year, 2026 the beachhead? | Yes | Confirm |
| National Heritage Area as the 2030 endgame? | Yes | Confirm — this is the big audacious bet |

---

## 15. The single sentence

If The Crooked Road asks "do you want to hear where country music came from?", The Holston Road answers:

> "There's a marker on the road where America learned to govern itself. Stand at it. Read what happened. Then ask yourself what you'd do."

That's the brand. The markers are the medium. The publication is the voice. The patrons fund it. The 250th is the moment. National Heritage Area is the legacy.

---

## Document control

| Version | Date | Change |
|---|---|---|
| v3 | 2026-04-28 | New blueprint synthesizing brand strategy, master plan, v2 execution plan, and six heritage-trail models into one product/business spec |
