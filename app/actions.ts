'use server'

import { promises as fs } from 'fs'
import path from 'path'
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

const DATA_FILE = path.join(process.cwd(), 'data', 'inquiries.json')

async function read(): Promise<Inquiry[]> {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

async function write(list: Inquiry[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8')
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

export async function setStatus(
  id: string,
  status: InquiryStatus,
  _fd: FormData
): Promise<void> {
  const list = await read()
  const i = list.findIndex((x) => x.id === id)
  if (i !== -1) {
    list[i].status = status
    await write(list)
    revalidatePath('/admin')
  }
}
