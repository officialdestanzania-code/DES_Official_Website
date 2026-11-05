import { lazy, Suspense } from 'react'

const PartnerAdminPage = lazy(() => import('./PartnerAdminPage'))

export default function PartnerAdminRoute() {
  return (
    <Suspense fallback={<div>Loading admin workspace…</div>}>
      <PartnerAdminPage />
    </Suspense>
  )
}
