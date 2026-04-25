import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, ArrowRight, Mic, Radio } from 'lucide-react'
import AudioPlayer from '../components/AudioPlayer'
import { createPageHead } from '../lib/seo'

export const Route = createFileRoute('/stories')({
  component: StoriesPage,
  head: () =>
    createPageHead({
      title: 'Stories — The Holston Road',
      description:
        'Read the live trail chapters and follow along as The Holston Road audio stories move from production into release.',
      path: '/stories',
    }),
})

const audioStories = [
  {
    title: 'The Day the Warehouse Became a Studio',
    chapter: 'The 1927 Sessions',
    duration: '6:30',
    description: 'Ralph Peer arrived in Bristol with a microphone and a hunch. Twelve days later, country music had a birthplace.',
  },
  {
    title: 'The Railroad That Brought the Sound',
    chapter: 'The Railroad',
    duration: '5:15',
    description: 'How the Virginia & Tennessee Railroad turned Bristol into a crossroads of American music.',
  },
  {
    title: 'Maybelle Carter and the Thumb Brush',
    chapter: 'The Musicians',
    duration: '7:00',
    description: 'The guitar technique that changed American music — and the woman who invented it.',
  },
  {
    title: 'From the Mountain to the Microphone',
    chapter: 'The Sound',
    duration: '5:45',
    description: 'How Appalachian ballads, blues, and gospel collided in the Tri-Cities to create something new.',
  },
  {
    title: 'State Street, September',
    chapter: 'Rhythm & Roots',
    duration: '6:15',
    description: 'The story of Bristol Rhythm & Roots Reunion — from a small street festival to a national destination.',
  },
]

const storyChapters = [
  {
    title: 'The Sound',
    href: '/chapters/the-sound',
    excerpt: 'How Appalachian ballads, gospel, and blues converged in the Tri-Cities.',
  },
  {
    title: 'The Railroad',
    href: '/chapters/the-railroad',
    excerpt: 'The railroad carried musicians, songs, and the sound of the mountains outward.',
  },
  {
    title: 'The 1927 Sessions',
    href: '/chapters/the-sessions',
    excerpt: 'The recordings that made Bristol the birthplace of country music.',
  },
  {
    title: 'Rhythm & Roots',
    href: '/chapters/the-festival',
    excerpt: 'How a downtown festival became one of the region’s clearest signs that the music is still alive.',
  },
  {
    title: 'The Next Generation',
    href: '/chapters/the-next-generation',
    excerpt: 'Where the tradition is being taught, played, and carried forward today.',
  },
] as const

function StoriesPage() {
  return (
    <main>
      <section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">Stories</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-burgundy-200">
            The trail chapters are live now. Audio stories are still in production, and they’ll
            appear here as they’re ready.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Mic className="h-6 w-6 text-burgundy-700" />
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Audio series in production
              </h2>
            </div>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-stone-600">
              These are the first story topics planned for the listening experience. We’ll replace
              the placeholders below with live audio as each episode is finished.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {audioStories.map((story) => (
                <AudioPlayer
                  key={story.title}
                  title={story.title}
                  chapter={story.chapter}
                  duration={story.duration}
                  description={story.description}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-burgundy-700" />
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Read the trail chapters now
              </h2>
            </div>
            <div className="space-y-4">
              {storyChapters.map((chapter) => (
                <Link
                  key={chapter.href}
                  to={chapter.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-stone-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div>
                    <h3 className="mt-1 font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600">{chapter.excerpt}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-stone-300 transition group-hover:text-burgundy-700" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-burgundy-800 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="h-6 w-6 text-amber-400" />
              <h2 className="font-display text-2xl font-bold">The Back Porch Podcast</h2>
            </div>
            <p className="mb-6 max-w-xl text-burgundy-200">
              We’re still scoping the first interview run with musicians, venue owners, and
              historians. Join the newsletter and we’ll announce it when the first season is ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-burgundy-700 px-4 py-2 text-sm">Launch updates</span>
              <span className="rounded-full bg-burgundy-700 px-4 py-2 text-sm">Guest announcements</span>
              <span className="rounded-full bg-burgundy-700 px-4 py-2 text-sm">Behind-the-scenes notes</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
