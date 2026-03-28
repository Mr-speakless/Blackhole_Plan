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

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLanguage(): AppLanguage {
  const applyLanguageToDocument = (language: AppLanguage) => {
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : 'en')
    document.documentElement.setAttribute('data-lang', language)
  }

  if (typeof window === 'undefined') {
    return fallbackLanguage
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
  const [language, setLanguage] = useState<AppLanguage>(readInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(storageKey, language)
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : 'en')
    document.documentElement.setAttribute('data-lang', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'zh' : 'en'))
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
