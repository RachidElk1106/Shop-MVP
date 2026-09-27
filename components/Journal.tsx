'use client'

import { ArrowUpRight, Calendar, Tag } from 'lucide-react'

const featuredArticle = {
  title: 'The Makers of Porto: A Visit to the Caldas Ceramics Studio',
  excerpt:
    'Last spring we spent a week on the Atlantic coast, sitting at the workbench of third-generation ceramicist Maria Caldas and her small team. Here is what we learned about patience, clay, and the art of making things that last generations.',
  category: 'Maker Stories',
  date: 'September 12, 2026',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
}

const articles = [
  {
    title: 'Five Everyday Rituals and the Objects That Shape Them',
    excerpt:
      'Small daily acts become meaningful when paired with things you love. Here are five quiet rituals our team returns to, season after season.',
    category: 'Living',
    date: 'September 3, 2026',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'A Short Guide to Looking After Your Linens',
    excerpt:
      'Stone-washed linen is one of the most forgiving fabrics you can own — but a little care goes a long way. Here is everything we have learned.',
    category: 'Care Guides',
    date: 'August 21, 2026',
    image: 'https://images.unsplash.com/photo-1616627417931-99493760dab6?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Introducing the Field Chronograph, Version Two',
    excerpt:
      'Two years after our first watch release, we revisit the design with three small refinements suggested by you, our community.',
    category: 'New Arrivals',
    date: 'August 9, 2026',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'How We Source: The Long Road to a Single Piece of Oak',
    excerpt:
      'Our Studio Desk Lamp begins its life in a sustainably managed forest in southern Germany. This is the story of the 4,000-mile journey it takes to reach you.',
    category: 'Behind the Scenes',
    date: 'July 28, 2026',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'At Home With: Architect Lin Wei in Her Taipei Apartment',
    excerpt:
      'In the first of a new series, we visit a long-time nōma friend to see how she arranges our pieces among her own collection of found objects and design archives.',
    category: 'Interiors',
    date: 'July 14, 2026',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Notes on Seasonality: Transitioning Your Kitchen for Autumn',
    excerpt:
      'As the air cools and the light softens, here are three simple ways to bring warmth back into the heart of your home this season.',
    category: 'Living',
    date: 'July 1, 2026',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=85',
  },
]

type ArticleCardProps = {
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  featured?: boolean
}

function ArticleCard({ title, excerpt, category, date, image, featured = false }: ArticleCardProps) {
  return (
    <article className={`group cursor-pointer ${featured ? '' : ''}`}>
      <div className={`relative overflow-hidden rounded-sm ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-[#f0eeea]`}>
        <img
          src={image}
          alt=""
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      </div>
      <div className={featured ? 'mt-8' : 'mt-5'}>
        <div className={`flex items-center gap-4 text-[11px] tracking-[0.12em] text-[#77756e] uppercase ${featured ? 'sm:text-xs' : ''}`}>
          <span className="inline-flex items-center gap-1.5">
            <Tag className="size-3 text-[#b95d3d]" strokeWidth={2} />
            {category}
          </span>
          <span className="h-3 w-px bg-[#d3d2cc]" />
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3" strokeWidth={2} />
            {date}
          </span>
        </div>
        <h3 className={`mt-3 font-serif leading-tight tracking-[-0.02em] text-[#1c1c1a] transition-colors group-hover:text-[#b95d3d] ${featured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'}`}>
          {title}
        </h3>
        <p className={`mt-4 leading-7 text-[#6b6962] ${featured ? 'text-base lg:text-lg lg:leading-8 max-w-3xl' : 'text-sm sm:text-[15px]'}`}>
          {excerpt}
        </p>
        <div className={`mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[#b95d3d] uppercase transition-transform duration-200 group-hover:translate-x-1 ${featured ? 'sm:text-sm' : ''}`}>
          Read article
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </div>
      </div>
    </article>
  )
}

export function Journal() {
  return (
    <main className="pb-24">
      <section className="mx-auto max-w-[1380px] px-5 pb-14 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">The Journal</p>
          <h1 className="font-serif text-5xl leading-[1] tracking-[-0.05em] sm:text-7xl lg:text-[88px]">
            Stories from the <em className="font-normal text-[#b95d3d]">workshop</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#6b6962]">
            Dispatches from our studios, conversations with makers, notes on slow living,
            and a closer look at the craftsmanship behind every object we make.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 pb-16 lg:px-10 lg:pb-20">
        <div className="border-b border-[#deddd7] pb-12 lg:pb-16">
          <ArticleCard
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            category={featuredArticle.category}
            date={featuredArticle.date}
            image={featuredArticle.image}
            featured
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#b95d3d] uppercase">Latest</p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">More reading</h2>
          </div>
          <button className="inline-flex w-fit items-center gap-2 border-b border-[#1c1c1a] pb-1 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-[#b95d3d] hover:text-[#b95d3d]">
            View all entries
            <ArrowUpRight className="size-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {articles.map((article) => (
            <ArticleCard
              key={article.title}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              date={article.date}
              image={article.image}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
