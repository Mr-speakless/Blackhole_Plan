import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

export type AppLanguage = 'en' | 'zh'

interface LanguageContextValue {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
  toggleLanguage: () => void
}

const storageKey = 'portfolio-language'
const fallbackLanguage: AppLanguage = 'zh'
const languageQueryByCode: Record<AppLanguage, 'EN' | 'CN'> = {
  en: 'EN',
  zh: 'CN',
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readLanguageFromUrl(): AppLanguage | null {
  if (typeof window === 'undefined') {
    return null
  }

  const normalizedQueryLanguage = new URLSearchParams(window.location.search)
    .get('lang')
    ?.trim()
    .toUpperCase()

  if (normalizedQueryLanguage === 'EN') {
    return 'en'
  }

  if (normalizedQueryLanguage === 'CN') {
    return 'zh'
  }

  const normalizedHash = window.location.hash.trim().toUpperCase()

  if (normalizedHash === '#EN') {
    return 'en'
  }

  if (normalizedHash === '#CN') {
    return 'zh'
  }

  return null
}

function writeLanguageQueryToUrl(language: AppLanguage) {
  if (typeof window === 'undefined') {
    return
  }

  const targetLanguage = languageQueryByCode[language]
  const currentLanguage = new URLSearchParams(window.location.search).get('lang')?.toUpperCase()

  if (currentLanguage === targetLanguage) {
    return
  }

  const nextUrl = new URL(window.location.href)
  nextUrl.searchParams.set('lang', targetLanguage)
  window.history.replaceState(window.history.state, '', nextUrl.toString())
}

function readInitialLanguage(): AppLanguage {
  const applyLanguageToDocument = (language: AppLanguage) => {
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : 'en')
    document.documentElement.setAttribute('data-lang', language)
  }

  if (typeof window === 'undefined') {
    return fallbackLanguage
  }

  const queryLanguage = readLanguageFromUrl()

  if (queryLanguage) {
    applyLanguageToDocument(queryLanguage)
    return queryLanguage
  }

  const storedLanguage = window.localStorage.getItem(storageKey)

  if (storedLanguage === 'en' || storedLanguage === 'zh') {
    applyLanguageToDocument(storedLanguage)
    return storedLanguage
  }

  applyLanguageToDocument(fallbackLanguage)
  return fallbackLanguage
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<AppLanguage>(readInitialLanguage)

  const setLanguage = (nextLanguage: AppLanguage) => {
    setLanguageState(nextLanguage)
    writeLanguageQueryToUrl(nextLanguage)
  }

  useEffect(() => {
    window.localStorage.setItem(storageKey, language)
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : 'en')
    document.documentElement.setAttribute('data-lang', language)
  }, [language])

  useEffect(() => {
    const syncLanguageWithUrl = () => {
      const urlLanguage = readLanguageFromUrl()

      if (!urlLanguage) {
        return
      }

      setLanguageState((currentLanguage) =>
        currentLanguage === urlLanguage ? currentLanguage : urlLanguage,
      )
    }

    window.addEventListener('hashchange', syncLanguageWithUrl)
    window.addEventListener('popstate', syncLanguageWithUrl)

    return () => {
      window.removeEventListener('hashchange', syncLanguageWithUrl)
      window.removeEventListener('popstate', syncLanguageWithUrl)
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
