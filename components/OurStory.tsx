'use client'

import { Heart, Leaf, Sparkles, Award } from 'lucide-react'

const brandValues = [
  {
    icon: Leaf,
    title: 'Crafted with Care',
    description: 'Every piece is thoughtfully sourced and made to withstand the test of time, not trends.',
  },
  {
    icon: Heart,
    title: 'Designed for Daily Life',
    description: 'We create objects that fit naturally into your routine — beautiful, useful, and uncomplicated.',
  },
  {
    icon: Sparkles,
    title: 'Considered Materials',
    description: 'Natural fibers, recycled metals, and low-impact processes are the foundation of everything we make.',
  },
  {
    icon: Award,
    title: 'Built to Last',
    description: 'Quality over quantity. Every product is backed by our promise of enduring craftsmanship.',
  },
]

export function OurStory() {
  return (
    <main className="pb-24">
      <section className="relative overflow-hidden bg-[#1c1c1a] text-[#f8f7f4]">
        <div className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">Our Story</p>
              <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Objects shaped by <em className="font-normal text-[#b95d3d]">intention</em>.
              </h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-[#c9c7be]">
                Founded in a small workshop in 2018, nōma began as a quiet search for everyday objects
                that feel as good as they look — pieces that age gracefully and earn their place in your home.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[5/6]">
              <img
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=85"
                alt="Artisan crafting ceramics in a sunlit workshop"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-1">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">The Beginning</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
              A simple idea.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#6b6962] lg:col-span-2">
            <p>
              We started nōma with one question: why is it so hard to find well-made everyday things?
              The kind of objects you reach for morning and night, that quietly improve each day and
              grow more beautiful with use.
            </p>
            <p>
              We began with ceramics — hand-thrown mugs, bowls, and plates made by a small studio
              in the countryside. From there, the collection grew slowly: a linen weave here, a piece
              of cast metal there, always following the same simple rule: <span className="text-[#1c1c1a] font-medium">if we wouldn&apos;t live with it ourselves, we don&apos;t make it.</span>
            </p>
            <p>
              Today we collaborate with artisans across three continents. Every piece still passes through
              our hands before it reaches yours.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f0eeea] py-20 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">What We Believe</p>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
              Brand Values
            </h2>
            <p className="mt-6 text-base leading-8 text-[#6b6962]">
              Four principles that guide every decision we make, from the materials we source to the
              packaging we use.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
            {brandValues.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-sm border border-[#deddd7] bg-[#f8f7f4] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#b95d3d]/40 hover:shadow-lg"
              >
                <div className="flex size-11 items-center justify-center rounded-full bg-[#b95d3d]/10 text-[#b95d3d] transition-colors group-hover:bg-[#b95d3d] group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b6962]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1 space-y-6 self-center text-base leading-8 text-[#6b6962]">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">The Journey</p>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-[#1c1c1a] sm:text-5xl">
              Made slowly, <em className="font-normal text-[#b95d3d]">lived fully</em>.
            </h2>
            <p>
              We visit every workshop we work with, sit at the same tables as the makers, and learn the
              craft behind each object. These relationships are how we ensure quality — and how we know
              that what we sell is made fairly, honestly, and with pride.
            </p>
            <p>
              We hope our pieces become part of your own rituals: the morning pour, the evening read,
              the Sunday table. The things you don&apos;t notice at first — then can&apos;t imagine living without.
            </p>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <div className="aspect-[3/4] overflow-hidden rounded-sm sm:mt-10">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=85"
                alt="Ceramic artisan hands"
                className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=85"
                alt="Linen textiles folded on table"
                className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
