import { useBlackHolePortalStore } from './store/useBlackHolePortalStore.ts'

export function PortalOverlayUI() {
  const portalState = useBlackHolePortalStore((s) => s.portalState)

  // Hide hint during portal animation
  if (portalState === 'portalPause' || portalState === 'entering' || portalState === 'navigating') {
    return null
  }

  return (
    <p className="pointer-events-none absolute bottom-[19%] left-0 right-0 text-center text-body leading-body text-neutral-60">
      Click the blackhole or orbit planet to enter the project.
    </p>
  )
}
