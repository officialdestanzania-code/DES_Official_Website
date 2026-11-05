import { Link } from 'react-router-dom'
import { Studio } from 'sanity'
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react'
import { isSanityConfigured } from '../sanity/sanityEnv'
import { studioConfig } from '../sanity/studioConfig'
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
            to Sanity through Vercel before administrators can sign in and publish content.
          </p>
          <a
            href="https://vercel.com/marketplace/sanity"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-admin-install"
          >
            Install Sanity on Vercel <ExternalLink size={16} />
          </a>
          <ol>
            <li>Install Sanity on the existing <strong>des-official-website</strong> Vercel project. Create a new Sanity account/project or connect an account DES already owns.</li>
            <li>Choose the environment-variable prefix <code>VITE_</code> and apply it to <strong>Preview and Production</strong>. Use the Free plan unless a paid plan has been separately approved.</li>
            <li>In Sanity, add <code>https://des.co.tz</code> and the exact Preview domain to API CORS origins; enable authenticated requests for Studio.</li>
            <li>Connect a Google or GitHub sign-in method, then invite approved administrators individually. Do not share a common password.</li>
          </ol>
          <p className="partner-admin-security-note">
            Keep Sanity read/write tokens private. Only the project ID and dataset name should use the public <code>VITE_</code> prefix.
          </p>
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
