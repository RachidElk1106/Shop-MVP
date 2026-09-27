import type { Product } from '@/components/Shop'

export type ShippingInfo = {
  fullName: string
  email: string
  address: string
  city: string
}

export type PaymentMethod = 'cod' | 'card-soon'

export type OrderLineItem = {
  id: number
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export type OrderSnapshot = {
  orderId: string
  shipping: ShippingInfo
  paymentMethod: PaymentMethod
  items: OrderLineItem[]
  subtotal: number
  total: number
  createdAt: string
}

export type ProductWithQuantity = Product & { quantity: number }

export function buildOrderLines(items: ProductWithQuantity[]): OrderLineItem[] {
  return items.map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.quantity,
    unitPrice: p.price,
    lineTotal: p.price * p.quantity,
  }))
}

export function generateOrderId(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const prefix =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)]
  const suffix = Math.floor(10000 + Math.random() * 90000).toString()
  return `${prefix}${suffix}`
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export type ValidationErrors = Partial<Record<keyof ShippingInfo, string>>
