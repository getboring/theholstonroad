import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, MapPin, Calendar, BookOpen, Mountain, Scroll, Shield, Landmark } from 'lucide-react'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const chapters = [
  {
    slug: 'the-river',
    title: 'The River',
    subtitle: 'Chapter 1',
    icon: <MapPin className="h-6 w-6" />,
    description: 'Before there were roads, there was the river. The Holston brought the first settlers, the first trade, the first conflicts.',
    anchor: 'Netherland Inn',
    color: 'bg-river-700',
  },
  {
    slug: 'the-road',
    title: 'The Road',
    subtitle: 'Chapter 2',
    icon: <Scroll className="h-6 w-6" />,
    description: 'The Old Stage Road connected the frontier to the world. Stagecoaches carried mail, passengers, and news through mud and mountain gaps.',
    anchor: 'Exchange Place',
    color: 'bg-stone-600',
  },
  {
    slug: 'the-agreement',
    title: 'The Agreement',
    subtitle: 'Chapter 3',
    icon: <Shield className="h-6 w-6" />,
    description: 'When the government failed them, the settlers made their own. The Watauga Association and the first self-governing community west of the mountains.',
    anchor: 'Sycamore Shoals',
    color: 'bg-river-600',
  },
  {
    slug: 'the-march',
    title: 'The March',
    subtitle: 'Chapter 4',
    icon: <Mountain className="h-6 w-6" />,
    description: 'When threatened, the frontier didn\'t hide. It marched 330 miles over mountains to fight a battle that turned the tide of a war.',
    anchor: 'Rocky Mount',
    color: 'bg-forge-600',
  },
  {
    slug: 'the-state',
    title: 'The State',
    subtitle: 'Chapter 5',
    icon: <Landmark className="h-6 w-6" />,
    description: 'From wilderness to territory to state in one generation. The Southwest Territory, William Blount, and the road to Tennessee\'s birth.',
    anchor: 'Rocky Mount',
    color: 'bg-river-800',
  },
]

function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-river-900 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
            <path d="M0,70 Q25,50 50,70 T100,70 L100,100 L0,100 Z" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-forge-400">
            Northeast Tennessee
          </p>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            We didn't wait
            <br />
            for permission.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-river-200">
            The Holston Road is a trail through America's First Frontier — from the river
            to the road, from the Watauga Association to the Overmountain Men. This is
            where America learned to govern itself.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/the-trail"
              className="flex items-center gap-2 rounded-full bg-forge-500 px-8 py-3.5 font-medium text-white transition hover:bg-forge-600"
            >
              Explore the Trail <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 rounded-full border border-river-600 px-8 py-3.5 font-medium text-river-100 transition hover:bg-river-800"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Chapter Preview */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
              Five Chapters. One Story.
            </h2>
            <p className="mx-auto max-w-2xl text-stone-600">
              The Holston Road follows one continuous narrative through the places where
              the frontier became America. Start anywhere, or follow them in order.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                to={`/chapters/${chapter.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className={`h-2 ${chapter.color}`} />
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${chapter.color} text-white`}>
                      {chapter.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                        {chapter.subtitle}
                      </p>
                      <h3 className="font-display text-xl font-bold text-stone-900">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-stone-600">
                    {chapter.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-400">
                      Anchor: {chapter.anchor}
                    </span>
                    <ArrowRight className="h-4 w-4 text-stone-300 transition group-hover:text-forge-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="border-y border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="font-display text-4xl font-bold text-river-700">75</p>
              <p className="text-sm text-stone-600">Miles of trail</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-forge-600">12</p>
              <p className="text-sm text-stone-600">Historic sites</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-river-700">5</p>
              <p className="text-sm text-stone-600">Chapters to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sites Preview */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 font-display text-3xl font-bold text-stone-900">Anchor Sites</h2>
              <p className="text-stone-600">The core stops on The Holston Road</p>
            </div>
            <Link
              to="/sites"
              className="hidden items-center gap-1 text-sm font-medium text-river-700 transition hover:text-river-800 sm:flex"
            >
              See all sites <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Rocky Mount', city: 'Piney Flats', tag: 'Chapters 4 & 5' },
              { name: 'Sycamore Shoals', city: 'Elizabethton', tag: 'Chapters 3 & 4' },
              { name: 'Netherland Inn', city: 'Kingsport', tag: 'Chapters 1 & 2' },
              { name: 'Exchange Place', city: 'Kingsport', tag: 'Chapter 2' },
            ].map((site) => (
              <Link
                key={site.name}
                to="/sites"
                className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-river-600" />
                  <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    {site.city}
                  </span>
                </div>
                <h3 className="mb-1 font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">
                  {site.name}
                </h3>
                <p className="text-xs text-stone-500">{site.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-forge-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            The frontier still works.
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-forge-100">
            Join the trail. Check in at the sites. Collect your stamps. Become a Frontiersman.
          </p>
          <Link
            to="/the-trail"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-forge-700 transition hover:bg-stone-100"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  )
}
