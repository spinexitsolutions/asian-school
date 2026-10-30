export default function ExportEnquiries() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
      <a href="/api/enquiries/export" className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }}>
        ⬇ Download all as Excel (CSV)
      </a>
    </div>
  )
}
