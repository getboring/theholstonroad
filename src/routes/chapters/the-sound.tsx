import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, MapPin } from 'lucide-react'
import { createPageHead } from '../../lib/seo'

export const Route = createFileRoute('/chapters/the-sound')({
  component: ChapterSound,
  head: () =>
    createPageHead({
      title: 'The Sound — The Holston Road',
      description:
        'The mountains shaped the music. Appalachian ballads, blues, and gospel collided in the Tri-Cities to create something entirely new.',
      path: '/chapters/the-sound',
    }),
})

function ChapterSound() {
  return (
    <main>
      <section className="bg-burgundy-800 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-burgundy-300">Chapter 1</p>
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">The Sound</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-burgundy-200">
            The mountains shaped the music. Appalachian ballads, blues, and gospel collided
            in the Tri-Cities to create something entirely new.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
          <p>
            Before there were recording studios, there were front porches. Before there were radio stations,
            there were church congregations. And before there was country music, there were the sounds
            of the mountains — ballads brought from the British Isles, spirituals from African American
            churches, and blues from the Deep South.
          </p>
          <p>
            The Tri-Cities sat at the intersection of these traditions. Bristol, on the Tennessee-Virginia
            border, was a crossroads. The railroad brought musicians from Appalachia, the Piedmont, and
            the Mississippi Delta. They traded songs, borrowed techniques, and created a new sound that
            didn't exist anywhere else.
          </p>
          <p>
            The Carter Family learned their songs from old British ballads and church hymns. Jimmie Rodgers
            blended blues yodeling with mountain lyrics. The result was a music that sounded like
            America — not one region, but many, distilled into something you could dance to, cry to,
            or sing along with on a front porch.
          </p>
          <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-6">
            <p className="font-display text-lg font-bold text-amber-900">The Question</p>
            <p className="mt-2 text-stone-700">
              What song from your childhood would you sing if someone handed you a microphone?
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Related Venues</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/sites/$slug" params={{ slug: 'birthplace-of-country-music-museum' }} className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-100 text-burgundy-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition">Birthplace of Country Music Museum</h3>
                <p className="text-sm text-stone-600">Bristol, TN — Where the story is preserved</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <span className="text-stone-400">Previous: —</span>
          <Link
            to="/chapters/the-railroad"
            className="flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
          >
            Next: The Railroad <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
