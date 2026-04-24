import { createFileRoute } from '@tanstack/react-router'
import { Compass, MapPin, Calendar, BookOpen, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About — The Holston Road' },
      { name: 'description', content: 'The Holston Road is a trail through America\'s First Frontier — not to visit the past, but to understand how the frontier still works.' },
    ],
  }),
})

function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            The frontier still works.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-river-200">
            The Holston Road is not a heritage trail. It is a frontier trail — for people who believe
            the best American stories are the ones where ordinary people did extraordinary things
            without waiting for someone else to organize it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-3xl font-bold text-stone-900">Our Mission</h2>
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              Most heritage trails are rear-view mirror products. They say: "Come look at what happened here."
              They assume the audience is already interested in history. They speak in the past tense.
              They attract the already-converted.
            </p>
            <p>
              The Holston Road does the opposite. It says: "This is where a <em>type of American</em> was forged —
              the kind who doesn't wait for permission, who builds their own government when the existing one fails,
              who resupplies an army from their own farm, who reinvents their town when the river trade dries up."
            </p>
            <p>
              That type is not extinct. The Holston Road is for people who recognize themselves in that story.
            </p>
          </div>
        </div>
      </section>

      {/* Five Chapters Detail */}
      <section className="border-y border-stone-200 bg-stone-100 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-stone-900">
            The Five Chapters
          </h2>

          <div className="space-y-8">
            {[
              {
                num: '01',
                title: 'The River',
                desc: 'Before there were roads, there was the river. The Holston brought the first settlers, the first trade, the first conflicts. The Netherland Inn stands at the intersection of river and road — the only registered historic site in the nation that was both a boatyard and a stage stop.',
                site: 'Netherland Inn, Kingsport',
              },
              {
                num: '02',
                title: 'The Road',
                desc: 'The Old Stage Road connected the frontier to the world. For fifty years, stagecoaches carried mail, passengers, and news through mud and mountain gaps. Exchange Place was a relay station — a living history farm where the rhythm of the 1820s continues today.',
                site: 'Exchange Place, Kingsport',
              },
              {
                num: '03',
                title: 'The Agreement',
                desc: 'When the government failed them, the settlers made their own. The Watauga Association was the first autonomous white government in the British colonies. Twenty families walked into Cherokee land and wrote their own constitution. It was 1772. They were not asking for permission.',
                site: 'Sycamore Shoals, Elizabethton',
              },
              {
                num: '04',
                title: 'The March',
                desc: "When threatened, the frontier didn't hide. It marched 330 miles over mountains to fight the Battle of Kings Mountain — the turning point of the Revolutionary War in the South. On September 24, 1780, 900 men camped at Rocky Mount, ate William Cobb's bacon, and loaded his bullets.",
                site: 'Rocky Mount, Piney Flats',
              },
              {
                num: '05',
                title: 'The State',
                desc: "From wilderness to territory to state in one generation. Rocky Mount served as the capital of the Southwest Territory from 1790 to 1792. William Blount ran a territory from a farmhouse. Andrew Jackson waited six weeks here for permission to practice law.",
                site: 'Rocky Mount, Piney Flats',
              },
            ].map((chapter) => (
              <div key={chapter.num} className="flex gap-6 rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
                <div className="hidden font-display text-5xl font-bold text-stone-200 sm:block">
                  {chapter.num}
                </div>
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold text-stone-900">
                    {chapter.title}
                  </h3>
                  <p className="mb-3 text-stone-600 leading-relaxed">{chapter.desc}</p>
                  <p className="text-sm font-medium text-river-700">{chapter.site}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-stone-900">Our Partners</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-stone-600">
            The Holston Road is built on the work of historic sites, museums, and communities
            that have been telling this story for generations.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Rocky Mount State Historic Site', role: 'Flagship Anchor' },
              { name: 'Sycamore Shoals State Historic Area', role: 'Anchor Site' },
              { name: 'Netherland Inn', role: 'Anchor Site' },
              { name: 'Exchange Place Living History Farm', role: 'Anchor Site' },
              { name: 'Birthplace of Country Music Museum', role: 'Present Site' },
              { name: 'Tipton-Haynes Estate', role: 'Road Stop' },
            ].map((partner) => (
              <div key={partner.name} className="rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="mb-1 font-semibold text-stone-900">{partner.name}</h3>
                <p className="text-sm text-stone-500">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Credibility */}
      <section className="border-t border-stone-200 bg-stone-100 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold text-stone-900">Stewarded by the Frontier</h2>
          <p className="mb-8 text-lg leading-relaxed text-stone-700">
            The Holston Road is led by people who live this history. Cody Boring serves as
            Executive Director of Rocky Mount State Historic Site — the first territorial capital
            and a flagship anchor of the trail. The 2024 Heritage Assessment by Tennessee State
            Historian Dr. Carroll Van West was conducted at his invitation.
          </p>
          <p className="text-stone-600">
            This trail is not invented by consultants. It is stewarded by people who
            believe the frontier story belongs to everyone — and that the best way to tell it
            is to put people on the road where it happened.
          </p>
        </div>
      </section>
    </main>
  )
}
