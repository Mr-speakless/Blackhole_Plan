import { useEffect, useRef, useState } from 'react'

import { HoverRollText } from '../shared/HoverRollText'
import { getUICopy } from '../../content/ui'
import { useLanguage, type AppLanguage } from '../../i18n/language'
import { withBase } from '../../lib/basePath'
import { sectionIds } from '../../lib/routes'

interface TopNavProps {
  onOpenContact?: () => void
  onScrollToSection?: (sectionId: string) => void
  onNavigateAbout?: () => void
  onNavigateBlackhole?: () => void
}

export function TopNav({
  onOpenContact,
  onScrollToSection,
  onNavigateAbout,
  onNavigateBlackhole,
}: TopNavProps) {
  const { language, setLanguage } = useLanguage()
  const uiCopy = getUICopy(language)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const handleWorkClick = () => onScrollToSection?.(sectionIds.work)
  const handleContactClick = () => onOpenContact?.()
  const handleLanguageSelect = (nextLanguage: AppLanguage) => {
    setLanguage(nextLanguage)
    setIsLanguageMenuOpen(false)
  }
  const navItemClassName =
    'text-[24px] leading-none [font-family:var(--font-sans-en)] md:text-[24px] md:leading-[24px]'
  const homeHref = withBase('/')
  const aboutHref = withBase('/about')
  const blackholeHref = withBase('/blackhole')
  const workHref = withBase(`/#${sectionIds.work}`)
  const contactHref = withBase(`/#${sectionIds.contact}`)

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isLanguageMenuOpen])

  return (
    <header className="w-full px-[30px] pt-[30px] md:px-10 md:pt-6">
      <nav className="mx-auto flex w-full max-w-[1200px] justify-between items-center">
        <a href={homeHref} className="flex items-end gap-3">
          <img
            src={withBase('/assets/icons/navigation/square-logo.svg')}
            alt={uiCopy.nav.logoAlt}
            className="h-6 w-6"
          />
          <span className="hidden text-[24px] leading-[24px] [font-family:var(--font-sans-en)] md:inline">
            Shuoyue Wu
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            {onNavigateAbout ? (
              <button
                type="button"
                onClick={onNavigateAbout}
                className={`border-0 bg-transparent p-0 ${navItemClassName}`}
              >
                <HoverRollText text={uiCopy.nav.about} />
              </button>
            ) : (
              <a href={aboutHref} className={navItemClassName}>
                <HoverRollText text={uiCopy.nav.about} />
              </a>
            )}

            {onScrollToSection ? (
              <button
                type="button"
                onClick={handleWorkClick}
                className={`border-0 bg-transparent p-0 ${navItemClassName}`}
              >
                <HoverRollText text={uiCopy.nav.work} />
              </button>
            ) : (
              <a href={workHref} className={navItemClassName}>
                <HoverRollText text={uiCopy.nav.work} />
              </a>
            )}

            {onNavigateBlackhole ? (
              <button
                type="button"
                onClick={onNavigateBlackhole}
                className={`border-0 bg-transparent p-0 ${navItemClassName}`}
              >
                <HoverRollText text={uiCopy.nav.blackhole} />
              </button>
            ) : (
              <a href={blackholeHref} className={navItemClassName}>
                <HoverRollText text={uiCopy.nav.blackhole} />
              </a>
            )}

            {onOpenContact ? (
              <button
                type="button"
                onClick={handleContactClick}
                className={`border-0 bg-transparent p-0 ${navItemClassName}`}
              >
                <HoverRollText text={uiCopy.nav.contact} />
              </button>
            ) : (
              <a href={contactHref} className={navItemClassName}>
                <HoverRollText text={uiCopy.nav.contact} />
              </a>
            )}
          </div>

          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              className="border-0 bg-transparent p-0"
              aria-label={uiCopy.nav.languageSwitchAriaLabel}
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
            >
              <img
                src={withBase('/assets/icons/navigation/language.svg')}
                alt={uiCopy.nav.languageIconAlt}
                className="h-5 w-10"
              />
            </button>

            {isLanguageMenuOpen && (
              <div
                role="menu"
                aria-label={uiCopy.nav.languageMenuAriaLabel}
                className="absolute right-0 top-full z-20 mt-2 min-w-[132px] rounded-[12px] border border-white/20 bg-black/85 p-1.5 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => handleLanguageSelect('zh')}
                  role="menuitemradio"
                  aria-checked={language === 'zh'}
                  className={`w-full rounded-[8px] px-3 py-2 text-left text-[14px] leading-none transition-colors [font-family:var(--font-sans-en)] ${
                    language === 'zh' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {uiCopy.nav.languageOptionChinese}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageSelect('en')}
                  role="menuitemradio"
                  aria-checked={language === 'en'}
                  className={`mt-1 w-full rounded-[8px] px-3 py-2 text-left text-[14px] leading-none transition-colors [font-family:var(--font-sans-en)] ${
                    language === 'en' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {uiCopy.nav.languageOptionEnglish}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
