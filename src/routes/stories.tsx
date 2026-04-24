import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, ArrowRight, Mic, Video } from 'lucide-react'

export const Route = createFileRoute('/stories')({
  component: StoriesPage,
  head: () => ({
    meta: [
      { title: 'Stories — The Holston Road' },
      { name: 'description', content: 'Audio stories, articles, and documentary content from The Holston Road.' },
    ],
  }),
})

const stories = [
  {
    title: 'The Boat That Never Came Back',
    type: 'audio',
    chapter: 'The River',
    duration: '4:30',
    description: 'The flatboat era on the Holston River, when pioneers built one-way vessels and broke them up at journey\'s end for lumber.',
  },
  {
    title: 'Two Dollars and a Strong Stomach',
    type: 'audio',
    chapter: 'The Road',
    duration: '5:15',
    description: 'The reality of stagecoach travel on the Old Stage Road, with stops at relay stations and trading posts.',
  },
  {
    title: 'The Lease That Became a Nation',
    type: 'audio',
    chapter: 'The Agreement',
    duration: '6:00',
    description: 'How twenty families negotiated directly with the Cherokee and wrote their own laws in 1772.',
  },
  {
    title: 'September 24, 1780',
    type: 'audio',
    chapter: 'The March',
    duration: '7:45',
    description: 'The day 900 Overmountain Men camped at Rocky Mount, ate William Cobb\'s bacon, and loaded his bullets.',
  },
  {
    title: 'Six Weeks at Rocky Mount',
    type: 'audio',
    chapter: 'The State',
    duration: '5:30',
    description: 'Andrew Jackson waiting for his law license in a log house that was also the seat of government.',
  },
]

const articles = [
  {
    title: 'The Watauga Association: America\'s First Frontier Government',
    date: 'April 2026',
    excerpt: 'In 1772, twenty families walked into Cherokee land and wrote their own constitution. It was illegal. It worked anyway.',
  },
  {
    title: 'Following the Overmountain Men: A Tri-Cities Road Trip',
    date: 'March 2026',
    excerpt: 'A complete driving itinerary following the route of the 900 men who marched from Sycamore Shoals to Kings Mountain.',
  },
  {
    title: 'Visiting Rocky Mount State Historic Site: What to Expect',
    date: 'February 2026',
    excerpt: 'The first territorial capital of the Southwest Territory is a working historic farm with living history interpreters.',
  },
]

function StoriesPage() {
  return (
    <main>
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">Stories</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-river-200">
            Audio stories, articles, and documentary content that bring the frontier to life.
            Listen at the sites, or experience the trail from anywhere.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Audio Stories */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Mic className="h-6 w-6 text-river-700" />
              <h2 className="font-display text-2xl font-bold text-stone-900">Audio Stories</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {stories.map((story) => (
                <div
                  key={story.title}
                  className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-river-100 text-river-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-forge-600">
                      {story.chapter}
                    </span>
                    <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">
                      {story.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">{story.description}</p>
                    <span className="mt-2 inline-block text-xs text-stone-400">{story.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-river-700" />
              <h2 className="font-display text-2xl font-bold text-stone-900">Articles</h2>
            </div>
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.title}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-stone-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div>
                    <span className="text-xs text-stone-400">{article.date}</span>
                    <h3 className="mt-1 font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600">{article.excerpt}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-stone-300 transition group-hover:text-river-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Podcast */}
          <div className="rounded-2xl bg-river-800 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="h-6 w-6 text-forge-400" />
              <h2 className="font-display text-2xl font-bold">The Road Podcast</h2>
            </div>
            <p className="mb-6 max-w-xl text-river-200">
              Bi-weekly interviews with historians, living history interpreters, and present-day frontier-types
              in the Tri-Cities region. Coming soon.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-river-700 px-4 py-2 text-sm">Apple Podcasts</span>
              <span className="rounded-full bg-river-700 px-4 py-2 text-sm">Spotify</span>
              <span className="rounded-full bg-river-700 px-4 py-2 text-sm">YouTube</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
