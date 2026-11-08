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
            The DES Content Studio is ready, but it must be connected
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
            <li>For this Vite application, enter <code>VITE</code> as the Custom Prefix (without a trailing underscore). Connect <strong>Preview</strong> first; add Production only after Preview has been tested and approved. Use the Free plan unless DES has separately approved a paid plan.</li>
            <li>In Sanity, add the production domain and exact Vercel Preview origin to API CORS origins; enable authenticated requests for Studio.</li>
            <li>Connect a Google or GitHub sign-in method, then invite approved administrators individually. Do not share a common password.</li>
          </ol>
          <p className="partner-admin-security-note">
            The Sanity project ID and dataset are public configuration. Never read Sanity read/write tokens from <code>import.meta.env</code> or expose them in browser code.
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
