import type { AppLanguage } from '../i18n/language'

interface LandingPageContent {
  hero: {
    headline: string
    summary: string
  }
}

const landingPageContentByLanguage: Readonly<Record<AppLanguage, LandingPageContent>> = {
  en: {
    hero: {
      headline: 'HI, I am Shuoyue Wu',
      summary: 'My work focuses on imagination and storytelling.',
    },
  },
  zh: {
    hero: {
      headline: '我是吴烁钺',
      summary: '一位专注于\n想象力与叙事的创作者',
    },
  },
}

export function getLandingPageContent(language: AppLanguage): LandingPageContent {
  return landingPageContentByLanguage[language]
}
