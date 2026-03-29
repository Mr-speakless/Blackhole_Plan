import { useEffect, useState } from 'react'

import AboutPage from '../pages/AboutPage'
import BlackHolePage from '../pages/BlackHolePage'
import { stripBase, withBase } from '../lib/basePath'
import LandingPage from '../pages/LandingPage'

function getPathname() {
  const normalizedPath = stripBase(window.location.pathname).toLowerCase()

  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    return normalizedPath.slice(0, -1)
  }

  return normalizedPath
}

function getLanguageQuery() {
  const normalizedLanguage = new URLSearchParams(window.location.search).get('lang')?.toUpperCase()

  if (normalizedLanguage === 'CN' || normalizedLanguage === 'EN') {
    return `?lang=${normalizedLanguage}`
  }

  return ''
}

export function navigate(path: string) {
  if (getPathname() === path.toLowerCase()) {
    return
  }

  window.history.pushState({}, '', `${withBase(path)}${getLanguageQuery()}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function AppRouter() {
  const [pathname, setPathname] = useState(getPathname())

  useEffect(() => {
    const onRouteChange = () => setPathname(getPathname())
    window.addEventListener('popstate', onRouteChange)
    return () => window.removeEventListener('popstate', onRouteChange)
  }, [])

  if (pathname === '/about') {
    return <AboutPage />
  }

  if (pathname === '/blackhole') {
    return <BlackHolePage />
  }

  return <LandingPage />
}
