import { Link } from 'react-router-dom'
import { Studio } from 'sanity'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { isSanityConfigured, studioConfig } from '../sanity/studioConfig'
import './PartnerAdminPage.css'

export default function PartnerAdminPage() {
  if (!isSanityConfigured) {
    return (
      <main className="partner-admin-setup">
        <div className="partner-admin-setup-card">
          <ShieldCheck size={34} />
          <span className="partner-admin-eyebrow">DES CONTENT ADMIN</span>
          <h1>Admin CMS is not connected yet</h1>
          <p>
            The partner management workspace is ready, but it must be connected
            to a Sanity project before administrators can sign in and publish content.
          </p>
          <ol>
            <li>Create a Sanity project and a dataset named <strong>production</strong>.</li>
            <li>Add the project ID and dataset to Vercel environment variables:
              <code>VITE_SANITY_PROJECT_ID</code> and <code>VITE_SANITY_DATASET</code>.
            </li>
            <li>Add <code>https://des.co.tz</code> and the Preview domain to Sanity API CORS origins with authenticated requests enabled.</li>
            <li>Invite approved administrators in Sanity Manage; do not share a common password.</li>
          </ol>
          <Link to="/partners" className="partner-admin-back">
            <ArrowLeft size={16} /> Return to partner directory
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="partner-admin-studio">
      <Studio config={studioConfig} />
    </div>
  )
}
