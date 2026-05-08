'use server'

import { revalidatePath } from 'next/cache'

export type InquiryStatus = 'new' | 'contacted' | 'confirmed' | 'completed'

export interface Inquiry {
  id: string
  name: string
  phone: string
  email: string
  eventType: string
  eventDate: string
  budget: string
  message: string
  status: InquiryStatus
  createdAt: string
}

async function getKV(): Promise<KVNamespace | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const ctx = await getCloudflareContext({ async: true })
    return (ctx.env as { MONO_KV?: KVNamespace }).MONO_KV ?? null
  } catch {
    return null
  }
}

async function read(): Promise<Inquiry[]> {
  const kv = await getKV()
  if (kv) {
    const data = await kv.get('inquiries', { type: 'json' })
    return Array.isArray(data) ? (data as Inquiry[]) : []
  }
  const { promises: fs } = await import('fs')
  const { join } = await import('path')
  try {
    return JSON.parse(await fs.readFile(join(process.cwd(), 'data', 'inquiries.json'), 'utf-8'))
  } catch {
    return []
  }
}

async function write(list: Inquiry[]): Promise<void> {
  const kv = await getKV()
  if (kv) {
    await kv.put('inquiries', JSON.stringify(list))
    return
  }
  const { promises: fs } = await import('fs')
  const { join, dirname } = await import('path')
  const file = join(process.cwd(), 'data', 'inquiries.json')
  await fs.mkdir(dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf-8')
}

export async function submitInquiry(
  _prev: { ok?: boolean; err?: string } | null,
  fd: FormData
) {
  const name = ((fd.get('name') as string | null) ?? '').trim()
  const phone = ((fd.get('phone') as string | null) ?? '').trim()
  const email = ((fd.get('email') as string | null) ?? '').trim()
  const eventType = (fd.get('eventType') as string | null) ?? ''
  const eventDate = ((fd.get('eventDate') as string | null) ?? '').trim()
  const budget = (fd.get('budget') as string | null) ?? ''
  const message = ((fd.get('message') as string | null) ?? '').trim()

  if (!name || !phone || !eventType) {
    return { ok: false, err: "Заповніть обов'язкові поля: ім'я, телефон і тип події." }
  }

  const entry: Inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    phone,
    email,
    eventType,
    eventDate,
    budget,
    message,
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  const list = await read()
  list.unshift(entry)
  await write(list)
  revalidatePath('/admin')
  return { ok: true }
}

export async function getInquiries(): Promise<Inquiry[]> {
  return read()
}

export async function setStatus(id: string, status: InquiryStatus): Promise<void> {
  const list = await read()
  const i = list.findIndex((x) => x.id === id)
  if (i !== -1) {
    list[i].status = status
    await write(list)
    revalidatePath('/admin')
  }
}
