export type Category = 'Electronics' | 'Apparel' | 'Home & Kitchen'

export type Product = {
  id: number
  name: string
  category: Category
  price: number
  rating: number
  reviews: number
  image: string
  description: string
}

export const products: Product[] = [
  { id: 1, name: 'Arc Wireless Headphones', category: 'Electronics', price: 189, rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', description: 'Quiet clarity for the long way around.' },
  { id: 2, name: 'Form Ceramic Speaker', category: 'Electronics', price: 129, rating: 4.7, reviews: 84, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85', description: 'Room-filling sound in a considered form.' },
  { id: 3, name: 'Field Overshirt', category: 'Apparel', price: 98, rating: 4.8, reviews: 61, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85', description: 'A soft, structured layer for every day.' },
  { id: 4, name: 'Merino Rib Knit', category: 'Apparel', price: 74, rating: 4.6, reviews: 43, image: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=900&q=85', description: 'Warmth without the weight.' },
  { id: 5, name: 'Lumen Table Lamp', category: 'Home & Kitchen', price: 156, rating: 4.9, reviews: 97, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'A warm glow for slower evenings.' },
  { id: 6, name: 'Stoneware Pour Over', category: 'Home & Kitchen', price: 58, rating: 4.8, reviews: 72, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', description: 'Ritual, refined.' },
  { id: 7, name: 'Mono Desk Clock', category: 'Home & Kitchen', price: 46, rating: 4.5, reviews: 35, image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=85', description: 'Keep time beautifully.' },
  { id: 8, name: 'Core Everyday Tote', category: 'Apparel', price: 64, rating: 4.7, reviews: 56, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85', description: 'Carry the essentials with ease.' },
]

export const categories = ['All', 'Electronics', 'Apparel', 'Home & Kitchen'] as const
export type CategoryFilter = (typeof categories)[number]

export const formatPrice = (price: number) => `$${price.toFixed(2)}`

export const getCartCount = (cart: Record<number, number>) => Object.values(cart).reduce((sum, count) => sum + count, 0)

export const getCartTotal = (cart: Record<number, number>) => Object.entries(cart).reduce((sum, [id, count]) => {
  const product = products.find((item) => item.id === Number(id))
  return sum + (product ? product.price * count : 0)
}, 0)

export const getProduct = (id: number) => products.find((product) => product.id === id)

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating'

export const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-low': 'Price: low to high',
  'price-high': 'Price: high to low',
  rating: 'Top rated',
}

export const filterProducts = (query: string, category: CategoryFilter, sort: SortOption) => {
  const filtered = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || product.category === category
    return matchesQuery && matchesCategory
  })
  return filtered.sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    return a.id - b.id
  })
}

export const getProductCountLabel = (count: number) => `${count} ${count === 1 ? 'piece' : 'pieces'}`

export const getOrderTotal = (subtotal: number) => subtotal + (subtotal > 0 ? 8 : 0)

export const getCartProducts = (cart: Record<number, number>) => Object.entries(cart)
  .map(([id, quantity]) => ({ product: getProduct(Number(id)), quantity }))
  .filter((item): item is { product: Product; quantity: number } => Boolean(item.product))

export const getCartSubtotal = (cart: Record<number, number>) => getCartTotal(cart)

export const getCartItemCount = (cart: Record<number, number>) => getCartCount(cart)

export const getOrderShipping = (subtotal: number) => subtotal > 0 ? 8 : 0

export const getCartSummary = (cart: Record<number, number>) => {
  const subtotal = getCartSubtotal(cart)
  return { subtotal, shipping: getOrderShipping(subtotal), total: getOrderTotal(subtotal) }
}

export const getProductImage = (product: Product) => product.image

export const getProductById = (id: number) => getProduct(id)

export const getProducts = () => products

export const getCategories = () => categories

export const getSortLabels = () => sortLabels

export const getFeaturedProducts = () => products.slice(0, 4)

export const getProductReviewsLabel = (reviews: number) => `${reviews} reviews`

export const getCategoryLabel = (category: Category) => category

export const getProductPriceLabel = (price: number) => formatPrice(price)

export const getProductRatingLabel = (rating: number) => `${rating.toFixed(1)} out of 5 stars`

export const getShippingMessage = (subtotal: number) => subtotal >= 150 ? 'You qualify for complimentary shipping.' : 'Complimentary shipping on orders over $150.'

export const getProductDescription = (product: Product) => product.description

export const getProductName = (product: Product) => product.name

export const getProductCategory = (product: Product) => product.category

export const getProductRating = (product: Product) => product.rating

export const getProductReviews = (product: Product) => product.reviews

export const getProductId = (product: Product) => product.id

export const getProductPrice = (product: Product) => product.price
