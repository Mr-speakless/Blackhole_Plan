import { getWorkCategoryLabel } from '../../content/projects'
import { useLanguage } from '../../i18n/language'
import type { ProjectCategory } from '../../types/content'

interface WorkCategoryTabsProps {
  categories: ReadonlyArray<ProjectCategory>
  activeCategory: ProjectCategory
  onSelectCategory: (category: ProjectCategory) => void
}

export function WorkCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: WorkCategoryTabsProps) {
  const { language } = useLanguage()

  return (
    <div className="flex w-full items-center gap-6 overflow-x-auto overflow-y-hidden md:gap-8">
      {categories.map((category) => {
        const isActive = category === activeCategory

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`group relative whitespace-nowrap pb-2 pt-2 font-sans-en text-[20px] tracking-wide transition-colors duration-300 md:text-title md:leading-title ${
              isActive
                ? 'text-white'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            {getWorkCategoryLabel(category, language)}
            {/* Minimal Underline for active state */}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-white opacity-80" />
            )}
            {!isActive && (
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white/40 transition-transform duration-300 group-hover:scale-x-100" />
            )}
          </button>
        )
      })}
    </div>
  )
}
