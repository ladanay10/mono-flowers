import { getInquiries } from '@/app/actions'
import { AdminTable } from './AdminTable'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const inquiries = await getInquiries()

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-logo">
          <span>MONO</span>
          <em>flowers</em>
          <span className="admin-sep">·</span>
          <span className="admin-panel-label">Панель управління</span>
        </div>
        <a href="/" className="admin-back-link">
          ← На сайт
        </a>
      </header>

      <main className="admin-main">
        <AdminTable inquiries={inquiries} />
      </main>
    </div>
  )
}
