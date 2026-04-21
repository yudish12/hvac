import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, Phone, Clock, CheckCircle2, Circle, Trash2, MessageSquare } from 'lucide-react'
import Pagination from '../../components/admin/Pagination'

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => { fetchEnquiries() }, [])

  async function fetchEnquiries() {
    setLoading(true)
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setEnquiries(data || [])
    setLoading(false)
  }

  async function toggleRead(enquiry) {
    await supabase.from('enquiries').update({ is_read: !enquiry.is_read }).eq('id', enquiry.id)
    fetchEnquiries()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this enquiry?')) return
    await supabase.from('enquiries').delete().eq('id', id)
    fetchEnquiries()
  }

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      if (filter === 'unread') return !e.is_read
      if (filter === 'read') return e.is_read
      return true
    })
  }, [enquiries, filter])

  const unreadCount = enquiries.filter((e) => !e.is_read).length

  useEffect(() => { setPage(1) }, [filter, pageSize])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500">{enquiries.length} total • {unreadCount} unread</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-6">
        {[
          { value: 'all', label: 'All' },
          { value: 'unread', label: `Unread (${unreadCount})` },
          { value: 'read', label: 'Read' },
        ].map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              filter === f.value ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((enquiry) => (
            <div key={enquiry.id}
              className={`bg-white rounded-xl border p-5 transition-all ${
                enquiry.is_read ? 'border-slate-100' : 'border-primary-200 bg-primary-50/30 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {!enquiry.is_read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
                    <h3 className="font-bold text-slate-900 text-sm">{enquiry.name}</h3>
                    {enquiry.requirement && (
                      <span className="text-[11px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{enquiry.requirement}</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {enquiry.phone}</span>
                    {enquiry.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {enquiry.email}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(enquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {enquiry.message && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 leading-relaxed">{enquiry.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleRead(enquiry)} title={enquiry.is_read ? 'Mark as unread' : 'Mark as read'}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-colors">
                    {enquiry.is_read ? <Circle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(enquiry.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <Pagination
              page={page}
              pageSize={pageSize}
              totalItems={filtered.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[10, 25, 50, 100]}
            />
          </div>
        </div>
      )}
    </div>
  )
}
