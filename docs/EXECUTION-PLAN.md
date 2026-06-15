# The Holston Road — Execution Plan

**Version:** 1.0
**Date:** 2026-04-25
**Status:** Pending greenlight
**Owner:** Cody Boring
**Companion docs:** `holston-road-brand-strategy.md`, `HOLSTON-ROAD-MASTER-PLAN.md`

This document operationalizes the brand strategy and master plan into a phased, dated, owner-assigned execution plan. It then re-audits itself and produces a tightened v2 that is the actual plan we work from.

---

## Part I — The Full Plan (v1)

### 0. North Star

> The Holston Road is a frontier-identity trail through Northeast Tennessee. Music is one chapter of five, not the whole book. Voice: "We didn't wait for permission." Anchors: Rocky Mount, Sycamore Shoals, Netherland Inn, Exchange Place. Soft launch: Overmountain Muster, September 25, 2026. Full launch: Spring 2027.

### Success criteria (12 months from soft launch)

| Metric | Target | Measure |
|---|---|---|
| Unique trail visitors | 25,000 | Plausible |
| Email subscribers | 3,000 | ConvertKit |
| Passport check-ins | 5,000 | DB |
| Active partner venues with MOU | 7 | Signed agreements |
| Press mentions | 15 | Media monitoring |
| Funded revenue (grants + memberships + merch) | $75,000 | Books |
| AR250 partnerships secured | 3 | Letters of agreement |

### Kill/pause criteria

We stop or replan if any of the following fire:

- 0 of the 4 state-managed anchor sites grant participation by end of Phase 1
- Total funding committed at end of Phase 2 < $20,000
- Domain `theholstonroad.org` permanently unavailable AND no acceptable alternative
- Cody time available drops below 8 hrs/week for 3 consecutive weeks

---

## Phase 0 — Foundation & Decisions (Week 0, current week)

**Goal:** Lock the decisions that everything downstream depends on.

| Task | Owner | Deliverable |
|---|---|---|
| Confirm strategic pivot from music-trail to frontier-trail framing | Cody | Written confirmation in this doc |
| Acquire `theholstonroad.org` (or fallback `holstonroad.org`) | Cody | Domain registered |
| Claim social handles `@theholstonroad` on IG, TikTok, YouTube, FB | Cody | Handles secured |
| Set up `hello@theholstonroad.org` mailbox | Cody | Working inbox |
| Decide entity structure (new 501c3 vs. fiscal sponsor vs. Rocky Mount-housed program) | Cody + advisor | Written decision |
| Schedule intro calls: Rocky Mount board, Sycamore Shoals director, Netherland Inn, Exchange Place | Cody | 4 calls on calendar |
| Draft and circulate one-page "what is The Holston Road" memo to anchor partners | Cody | PDF + email |
| Confirm Cherokee Nation / Eastern Band Cherokee consultation pathway | Cody | Named contact at EBC Office of Cultural Resources |

**Exit gate:** Domain owned, 4 partner calls scheduled, entity path chosen, EBC contact identified.

---

## Phase 1 — Brand & Narrative Reset (Weeks 1–3)

**Goal:** The site stops being a music-trail clone. Visual identity, voice, and structure match the strategy.

### 1.1 Codebase rebrand

| Task | Owner | Files |
|---|---|---|
| Replace seed data: chapters, anchor venues, waysides | Dev | `src/db/seeds/holston-road.ts`, schema additions for waysides |
| Rewrite 5 chapter slugs and content: `the-river`, `the-road`, `the-agreement`, `the-march`, `the-state` | Content + Dev | `src/routes/chapters/*` |
| Rewrite homepage hero: "We didn't wait for permission." + "A trail through America's first frontier." | Content + Dev | `src/routes/index.tsx` |
| Replace palette: river green `#1a472a`, forge orange `#c45c1a`, limestone `#78716c`, iron black `#0c0a09` | Dev | `src/lib/colors.ts`, Tailwind theme |
| Sharpen visual: drop default `rounded-3xl`, reduce gradient/glow, increase weight | Dev | Components, CSS |
| Replace About page with frontier mission statement | Content + Dev | `src/routes/about.tsx` |
| Rewrite all microcopy: present tense, active verbs, no academic hedging | Content | Site-wide string sweep |
| New favicon + OG image (interim) | Dev | `public/`, SEO helpers |

### 1.2 Wayside content type (the differentiator)

| Task | Owner | Deliverable |
|---|---|---|
| Add `waysides` Drizzle schema: `chapter_id`, `slug`, `hook`, `fact`, `question`, `lat`, `lng`, `anchor_venue_id` | Dev | Migration + types |
| Build `/waysides` index and `/waysides/$slug` detail route | Dev | Routes |
| Render wayside as inline block on chapter pages and venue pages | Dev | Component `WaysideCard` |
| Write 8 launch waysides (one per anchor + key road stops) | Cody (writer) | Markdown drafts → DB seed |

### 1.3 Logo & identity commission

| Task | Owner | Deliverable |
|---|---|---|
| Brief designer on H-mark concept (river + road convergence, iron-stamped feel) | Cody | Design brief |
| Commission logo + simple brand guidelines PDF | Designer | Logo SVG + 6-page guidelines |
| Apply logo + typography lockup to header, footer, social, email signature | Dev | Site update |

**Exit gate:** Site at `theholstonroad.org` shows frontier identity, not music-trail identity. 8 waysides live. Logo commissioned (final delivery may slide into Phase 2).

---

## Phase 2 — Trail Experience MVP (Weeks 4–8)

**Goal:** Visitors can read the story, see the trail on a real map, find each site, and plan a basic visit.

### 2.1 Real interactive map

| Task | Owner | Deliverable |
|---|---|---|
| Replace decorative SVG with MapLibre GL JS + OpenStreetMap | Dev | `<TrailMap>` component |
| Plot 4 anchors + ~6 road stops with chapter color coding | Dev | Pin layer |
| Draw primary route polyline (Kingsport → Bristol → Piney Flats → Elizabethton → Johnson City → Kingsport) | Dev | GeoJSON in repo |
| Wire pin click → site detail; mobile gesture support | Dev | UX polish |

### 2.2 Site detail rebuild

| Task | Owner | Deliverable |
|---|---|---|
| Site detail template: chapter assignment, hook, story, "what you can do here today," hours, address, links, related waysides | Dev + Content | `src/routes/sites/$slug.tsx` |
| Photography shoots: 4 anchors, 4 road stops | Photographer | ~120 hero/detail images, R2 hosted |
| Cherokee + enslaved-labor + free-Black-community context built into relevant site pages | Cody + EBC consultant | Content integrated |

### 2.3 Itinerary helper (lite)

| Task | Owner | Deliverable |
|---|---|---|
| "I have 4 hours / 1 day / a weekend" preset itineraries (hardcoded curated routes, not algorithmic) | Content + Dev | 3 itinerary pages under `/plan` |
| Driving times calculated server-side via OSRM or hardcoded | Dev | Utility |

### 2.4 Email + analytics

| Task | Owner | Deliverable |
|---|---|---|
| ConvertKit integration; "The Watauga Dispatch" newsletter form | Dev | Replaces stub `NewsletterSignup` |
| Plausible analytics installed | Dev | Verified events firing |

**Exit gate:** Real map. Real site pages. 3 hardcoded itineraries. Newsletter capturing emails. No "coming soon" stubs visible.

---

## Phase 3 — Content Production & Partner MOUs (Weeks 6–12, parallel)

**Goal:** The story is told, recorded, and partnered. Audio is real, not stubbed.

### 3.1 Audio production

| Task | Owner | Deliverable |
|---|---|---|
| Script 5 chapter intros + 4 anchor deep-dives + 3 road stops | Cody (writer) | 12 scripts |
| Record VO with professional talent (not academic narration) | Contractor | Raw audio |
| Sound design: ambient (river, hooves, forge), sparse atmospheric music | Contractor | Mixed audio |
| Build real audio player component (replace "coming soon") | Dev | `<AudioStory>` |
| Host audio in R2; add transcripts for accessibility + SEO | Dev | URLs + transcript pages |

**Budget:** $3,500 cap.

### 3.2 Print materials

| Task | Owner | Deliverable |
|---|---|---|
| Fold-out broadside map design (19th-century newspaper aesthetic, modern utility) | Designer | Print-ready PDF |
| Passport booklet design (24-page pocket-sized, "the question" per spread) | Designer | Print-ready PDF |
| Print run: 2,000 maps + 500 passports | Print vendor | Stock on hand |

**Budget:** $3,000 cap.

### 3.3 Partner MOUs

| Task | Owner | Deliverable |
|---|---|---|
| Draft standard MOU: usage rights, mutual cross-promotion, no-fee participation, data sharing | Cody + counsel | MOU template |
| Sign with Rocky Mount, Sycamore Shoals, Netherland Inn, Exchange Place | Cody | 4 MOUs minimum |
| Pursue: Birthplace of Country Music Museum, Tipton-Haynes, Fort Watauga (DAR) | Cody | 3+ additional |
| Distribute printed maps to partner sites, regional CVBs, hotel concierges | Cody | Distribution log |

### 3.4 AR250 alignment (the marketing accelerator)

| Task | Owner | Deliverable |
|---|---|---|
| Pitch TN America 250 Commission for designation/funding | Cody | Application submitted |
| Coordinate with Overmountain Victory Trail Association for Sept 25 cross-promotion | Cody | Joint event plan |
| NPS Overmountain Victory NHT outreach | Cody | Named contact + scope of cooperation |

**Exit gate:** 12 audio stories live. Broadside map and passport printed. Minimum 4 anchor MOUs signed. AR250 application submitted.

---

## Phase 4 — Soft Launch at Overmountain Muster (Week 13–14, ~Sept 25, 2026)

**Goal:** Public moment that establishes the trail as the canonical digital home of the AR250 Overmountain story.

| Task | Owner | Deliverable |
|---|---|---|
| Press release: "The Holston Road Launches" | Cody + PR | Distributed regionally + heritage press |
| Launch event at Sycamore Shoals + Rocky Mount during Muster weekend | Cody + partners | Joint programming |
| Influencer/regional travel blogger invites | Marketing | 5–10 confirmed attendees |
| First newsletter: "Welcome to The Road" | Content | Sent to list |
| Paid social campaign (geo-targeted to Tri-Cities + 2hr radius: Knoxville, Asheville, Charlotte, Roanoke) | Marketing | $2k spend |
| #MyHolstonRoad UGC campaign launches | Social | Content prompts published |
| First media interviews (Bristol Herald Courier, Johnson City Press, ETSU radio) | Cody | Coverage logged |

**Exit gate:** Site live, event executed, ≥3 press hits, ≥500 net new email subscribers in launch week.

---

## Phase 5 — Revenue & Community Systems (Months 4–9)

**Goal:** Convert traffic into membership, revenue, and durable community.

### 5.1 Membership + auth

| Task | Owner |
|---|---|
| `better-auth` integration (passwordless + Google) | Dev |
| Membership tiers: Traveler (free) / Settler ($25) / Frontiersman ($75) / Wataugan ($250) | Dev |
| Stripe integration with annual billing + member-only content gating | Dev |
| Member-only audio extras (interviews, longer cuts) | Content |

### 5.2 Digital passport

| Task | Owner |
|---|---|
| Check-in via QR code (printed at sites) and GPS proximity fallback | Dev |
| User dashboard: progress, badges, share graphics | Dev |
| Tier rewards fulfillment workflow (sticker → patch → membership) | Cody |

### 5.3 Merch store

| Task | Owner |
|---|---|
| Printful or Shopify embed: passport booklet ($12), patches ($8), stickers ($3), tee ($28) | Dev |
| Fulfillment via partner sites (in-person sales splits) | Cody |

### 5.4 Content engine

| Task | Owner |
|---|---|
| "The Road" podcast bi-weekly | Content |
| Weekly Watauga Dispatch newsletter | Content |
| 3x/week short-form video (TikTok/Reels) | Social |
| 2x/month SEO blog targeting Tri-Cities + AR250 keywords | Content |

**Exit gate:** Memberships generating $1,500+/mo. Passport check-ins surfacing in dashboards. Podcast and video cadence held for 8 consecutive weeks.

---

## Phase 6 — AR250 Amplification & Scale (Year 2+, 2026–2033)

**Goal:** Ride the 2026–2033 Revolutionary 250th window to national reach. Become the canonical digital home of the Overmountain story.

| Track | Outcome |
|---|---|
| Annual Mountains-of-Music-style flagship event ("The Muster," Sept 25 each year) | Recurring AR250 milestone |
| Educational curriculum licensed to TN/VA/NC school districts | $5k–25k/yr |
| Expanded route: connect southward to Kings Mountain (SC) for full Overmountain Victory Trail | Multi-state product |
| TDOT trailblazer signage installed (multi-year political track started Phase 1) | Quasi-official infrastructure |
| ETSU + Reece Museum economic-impact study (Crooked Road / Va Tech equivalent) | Funder-grade evidence |
| Second tenant onboarded to underlying Trailhead platform | Platform leverage proven |

---

## Budget Envelope (Year 1)

| Category | Cost |
|---|---|
| Logo + brand identity | $2,500 |
| Audio production | $3,500 |
| Photography | $1,500 |
| Print (map + passports + run) | $3,000 |
| Hosting / SaaS (CF, ConvertKit, Stripe, MapLibre) | $1,500 |
| Marketing / paid social | $5,000 |
| Launch event | $3,000 |
| Legal / entity / insurance | $2,500 |
| Contingency | $5,000 |
| **Total** | **$27,500** |

Master plan estimated $50k. v1 above is leaner because we're keeping the existing repo (no greenfield platform build) and deferring user-account/passport/merch infra to Phase 5 where revenue funds it.

---

## Team

| Role | Hours/wk | Filled by |
|---|---|---|
| Product Lead | 10 | Cody |
| Developer | 15 | TBD (contract or sweat) |
| Content / writer | 10 | Cody (with copy editor) |
| Design (burst) | 20 hrs total | Contractor |
| Photography (burst) | 16 hrs total | Contractor |
| Audio production (burst) | 30 hrs total | Contractor |
| Social / marketing | 5 | TBD or intern |

---

# Part II — Re-Audit of the Plan

Reading the v1 plan above as if I didn't write it. What's wrong with it?

## Risks the v1 plan underweights

1. **Single-person dependency.** Cody is Product Lead, primary writer, primary partner-relationship owner, and Executive Director of one of the anchor sites simultaneously. The plan assumes 10 hrs/wk Cody time but loads ~25 hrs/wk of work onto him in Phase 1 alone. **This is the #1 schedule risk.**

2. **State-managed sites move slowly.** Sycamore Shoals (TN State Parks) and Rocky Mount (TN Historical Commission) are not free agents. MOUs may need legal review at state DGS or AG level. Realistic timeline: 60–120 days, not 4 weeks. The Phase 3 "minimum 4 anchor MOUs signed" gate is aggressive.

3. **Bristol music coalition diplomacy is missing entirely.** Demoting Birthplace of Country Music Museum from "anchor" to "Chapter 2 present-site" *will* create friction. The Birthplace, Paramount Bristol, and Believe in Bristol have spent 15 years building Bristol = music. They need to be told a story they can repeat in their own words, not handed a fait accompli.

4. **EBC consultation is a check-the-box item in v1.** That's exactly the wrong posture. Cherokee inclusion done lazily is worse than not doing it. The strategy doc explicitly warns: "must tell the full story or it will be rightly rejected." This needs a real relationship, time, and a named EBC partner who reviews content before it ships — not a sentence in Phase 0.

5. **TDOT signage is treated as Phase 6.** It's a 3–7 year political process. The Crooked Road's signage took ~5 years from designation. If we want it for the 250th, the application has to start in Phase 1, not later.

6. **AR250 timing is tighter than the plan implies.** Major AR250 calendar moments: Battle of Kings Mountain 250th (October 7, 2030), Overmountain Men march 250th (September 1780 → 2030). The Sept 25, 2026 Muster is **a** moment, not *the* moment. The real once-in-history moment is 2030. This affects multi-year funding pitches dramatically — plan must explicitly orient toward 2030 as the headline year, with 2026 as the launch beachhead.

7. **Domain assumption.** Plan assumes `theholstonroad.org` available. Not verified. Backup names not chosen. If unavailable and `holstonroad.org` also taken, naming becomes a Phase 0 fire.

8. **No fiscal sponsor option named.** 501c3 formation takes 3–9 months. Without a fiscal sponsor, grant pursuit in Phase 3 is mechanically impossible. The Tennessee Historical Commission, ETSU, or a regional community foundation could each potentially serve. This needs a Phase 0 decision, not a "we'll figure it out."

9. **Content production is lumped at Phase 3 but blocks Phase 2.** Audio production is in Phase 3, but the strategy is that the *story* is the product. The 5 chapter narratives must be written *before* Phase 1 visual rebuild ships, or chapter pages launch with placeholder text. That's a Week-1 task.

10. **Passport in Phase 5 might still be too early.** Master plan has it Phase 2 ("experience"); v1 moved it to Phase 5 (correct). But even Phase 5 risks building infra before there's enough traffic to justify gamification. Alternative: ship a *paper* passport (no DB, no auth, no QR code) and let the digital version wait until 1k members exist.

11. **No diplomatic plan for "what if Bristol says no?"** If Birthplace of Country Music Museum declines participation because they don't want to be "Chapter 2," what's the fallback? The trail can survive without Bristol's institutional sites — but the plan should say so explicitly and not pretend we have leverage we don't.

12. **No editorial review for historical accuracy.** The voice is provocative ("the Watauga Association was illegal"). Some of those provocations are factually contestable (the Watauga Association's legality is genuinely disputed by historians). Without a named historical advisor reviewing copy before ship, the brand will collect easily-avoidable factual hits. Master plan named Dr. Carroll Van West as advisor — v1 didn't carry that forward.

13. **Marketing budget is light.** $5k paid social for soft launch is fine; for a 12-month plan trying to hit 25k uniques, $5k total is undersized. Realistic ad spend for that goal is $15–25k over 12 months.

14. **No mention of accessibility or Spanish-language content.** TN Tourism is a state-level requirement to address. Not catastrophic for a soft launch but flagged.

15. **The "minimum viable trail" threshold is undefined.** What's the smallest version of this that can ship credibly if half the partners say no? The plan assumes 4 anchors. Real minimum: 2 anchors (Rocky Mount as Cody-controlled + Sycamore Shoals as state-park-with-existing-program). Plan should name the floor.

## What the plan over-spends on

- **Logo at $2,500.** A wordmark + simple H-mark from a regional designer is $800–1,200. Save the rest.
- **Audio at $3,500 for 12 stories at launch.** Ship 5 (chapter intros only) for launch; produce 7 anchor/road-stop pieces in Phase 5 once data shows people are listening. Saves ~$1,500.
- **2,000-map print run for soft launch.** Print 500. Reorder once distribution is proven.

## What the plan under-spends on

- **Editorial/historical review** — needs $1,500 budgeted for advisor honoraria and a copy editor.
- **EBC consultation** — needs a real budget line ($1,000–2,500) for an EBC reviewer's time. Not optional, not free.
- **Paid acquisition** — bump to $12,000 across the year.
- **Photographer** — $1,500 is one shoot day. Need 3 days minimum across seasons. Bump to $3,500.

---

# Part III — The Improved Plan (v2)

The plan we actually work from. Differences from v1 marked **[NEW]** or **[CHANGED]**.

## Structural changes

1. **[CHANGED]** AR250 framing: 2030 (Battle of Kings Mountain 250th) is the headline year. 2026 launch is the beachhead. All multi-year funder pitches lead with 2030.
2. **[NEW]** Phase 0 lengthened to 2 weeks and gains hard prerequisites: domain confirmed, fiscal sponsor named, EBC partner named, Bristol coalition meeting held.
3. **[NEW]** A "minimum viable trail" floor: 2 anchors (Rocky Mount + Sycamore Shoals). Everything beyond is upside, not requirement.
4. **[CHANGED]** Chapter narratives written in Phase 0 and 1, not Phase 3. Audio recording stays in Phase 3, but text ships first.
5. **[NEW]** Editorial Advisory Board (3 people: TN historian, EBC reviewer, music heritage liaison) with a documented review-before-publish process.
6. **[NEW]** TDOT signage application initiated in Phase 1 as long-running parallel track.
7. **[CHANGED]** Passport stays in Phase 5 but ships paper-first; digital deferred until 1k members.
8. **[CHANGED]** Marketing budget rebalanced: total Year 1 $32,500 (up from $27,500), with paid acquisition bumped to $12k.
9. **[NEW]** Bristol coalition diplomacy track in Phase 0–1: structured listening tour with Believe in Bristol, BCMM, Paramount before any public framing of "music is Chapter 2."

## v2 phase calendar

| Phase | Weeks | Headline outcome |
|---|---|---|
| **Phase 0 — Foundation** | Weeks 0–2 | Domain owned, fiscal sponsor + EBC + Bristol contacts named, anchor calls held, Editorial Advisory Board recruited, all 5 chapter narratives drafted |
| **Phase 1 — Brand & Narrative Reset** | Weeks 3–5 | Site visually rebuilt to frontier identity, 8 waysides live, chapter pages live with reviewed text, TDOT signage application filed |
| **Phase 2 — Trail Experience MVP** | Weeks 6–10 | Real interactive map, real site detail pages, 3 hardcoded itineraries, ConvertKit live, photography from 2 shoot days deployed |
| **Phase 3 — Content & Partners** | Weeks 8–14 (overlaps Phase 2) | 5 chapter audio stories, 500-unit print run, ≥2 anchor MOUs (floor) / ≥4 (target), AR250 application submitted, Bristol coalition aligned |
| **Phase 4 — Soft Launch at Muster** | Weeks 14–15 (Sept 25, 2026) | Press, paid social, joint event with OVTA, ≥3 press hits, ≥500 new email subscribers |
| **Phase 5 — Revenue & Community** | Months 4–9 | Stripe + better-auth memberships live, paper passport shipping, podcast cadence held, $1,500+/mo recurring |
| **Phase 6 — AR250 Amplification (2027–2030)** | Months 10+ | Multi-year ARC + AR250 grants secured, ETSU economic-impact study commissioned, TDOT signage installed, route extended to Kings Mountain for 2030 |

## v2 Phase 0 (revised, 2 weeks)

| Task | Owner | Decision/Deliverable |
|---|---|---|
| Verify domain availability; register `theholstonroad.org` or chosen fallback | Cody | Domain owned |
| **[NEW]** Choose fiscal sponsor (recommended: regional community foundation like East Tennessee Foundation, or ETSU Foundation, or Tennessee Historical Commission) | Cody | Sponsor named, paperwork started |
| **[NEW]** Recruit Editorial Advisory Board (3 people): TN State Historian or designate (Dr. Carroll Van West or designate); EBC Cultural Resources reviewer; Bristol music heritage liaison (Believe in Bristol or BCMM staff) | Cody | 3 verbal commitments |
| **[NEW]** Bristol coalition listening tour: meetings with Believe in Bristol, BCMM Director, Paramount Bristol GM. Frame: "we're building a frontier trail; music is one of five chapters; here's how it amplifies your work" | Cody | Meeting notes, coalition position documented |
| **[NEW]** Draft and circulate 5 chapter narratives (~1,200 words each) for Editorial Advisory Board review | Cody | 5 drafts, marked-up returns |
| Schedule anchor partner calls (Rocky Mount, Sycamore Shoals, Netherland Inn, Exchange Place) | Cody | Calls held, MOU drafts shared |
| Claim social handles | Cody | Done |
| Set up `hello@theholstonroad.org` + ConvertKit account | Cody | Working |

**Phase 0 exit gate (mandatory all):**
- [ ] Domain owned
- [ ] Fiscal sponsor confirmed
- [ ] EBC partner named
- [ ] Bristol coalition meeting held with documented position
- [ ] Editorial Advisory Board: 3 verbal commitments
- [ ] All 5 chapter narratives drafted

If any gate fails, replan before Phase 1.

## v2 Phase 1 additions

- **[NEW]** TDOT trailblazer signage application initiated. Multi-year track. Document filed with TN Historical Commission and TDOT.
- **[CHANGED]** Chapter pages launch with Editorial-Advisory-reviewed text (not provisional).
- **[NEW]** Visible "About the story" page citing advisory board members and review process. Builds factual credibility from day one.

## v2 budget (revised)

| Category | v1 | v2 | Why changed |
|---|---|---|---|
| Logo + identity | $2,500 | $1,200 | Smaller scope, regional designer |
| Audio production | $3,500 | $2,000 | Ship 5 chapter intros only at launch |
| Photography | $1,500 | $3,500 | 3 shoot days, multi-season |
| Print | $3,000 | $1,500 | 500-unit launch run |
| Hosting / SaaS | $1,500 | $1,500 | — |
| Paid acquisition | $5,000 | $12,000 | Realistic 12-mo target |
| Launch event | $3,000 | $3,000 | — |
| Legal / entity | $2,500 | $1,500 | Fiscal sponsor reduces formation cost |
| **[NEW]** Editorial advisory honoraria | — | $1,500 | $500 × 3 |
| **[NEW]** EBC consultation | — | $2,000 | Real partnership, not lip service |
| **[NEW]** Copy editor (chapter narratives + ongoing) | — | $1,000 | Voice consistency |
| Contingency | $5,000 | $4,000 | Tighter |
| **Total** | **$27,500** | **$34,700** | +$7,200 |

## v2 minimum viable trail

If by Phase 3 exit we have only 2 partner MOUs (Rocky Mount + Sycamore Shoals): **we still launch**, scoped as a 2-anchor trail with the road stops as self-guided exterior visits. The narrative still works. The trail expands as additional partners come in over the following 12 months.

If Bristol coalition rejects the framing: we proceed without BCMM/Paramount as named partners. The 1927 Sessions story is in the public domain; we tell it on our own pages and respectfully avoid claiming partnership we don't have. We revisit in Year 2 once we have traffic to offer.

## v2 hard kill criteria

We stop and reassess if **any** of these fire:

- Fewer than 2 anchor MOUs by Phase 3 exit
- Fiscal sponsor not secured by Phase 1 exit (blocks all grants)
- EBC partner withdraws or refuses participation (we cannot ship the Cherokee content honestly without them)
- Cody hours <8/wk for 3 consecutive weeks during Phases 1–3
- Total committed funding <$15,000 at Phase 2 exit

## v2 immediate next actions (this week)

1. Verify and register domain
2. Identify and approach 3 Editorial Advisory Board candidates
3. Email EBC Office of Cultural Resources to open consultation
4. Schedule Bristol coalition listening-tour meetings (3 calls)
5. Begin drafting 5 chapter narratives (target 1,200 words each, due end of Phase 0 week 2)
6. Identify fiscal sponsor candidates and request intro meeting
7. Draft anchor partner one-pager

---

## Document control

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-04-25 | Initial plan + audit + v2 |

This is a living document. v2 supersedes v1 as the operating plan; v1 is preserved above for the audit trail.
