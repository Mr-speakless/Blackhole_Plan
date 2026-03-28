import type { AppLanguage } from '../i18n/language'
import { withBase } from '../lib/basePath'

export interface AboutExperienceItem {
  id: string
  role: string
  roleSubline?: string
  organization: string
  organizationSubline?: string
  organizationUrl?: string
  dateRange: string
}

export interface AboutAwardItem {
  id: string
  title: string
  date: string
}

interface AboutPageContent {
  hero: {
    introHeadline: string
    roles: readonly string[]
  }
  portrait: {
    src: string
    alt: string
  }
  biography: {
    title: string
    paragraphs: readonly string[]
  }
  skills: {
    title: string
    categories: ReadonlyArray<{
      id: string
      name: string
      items: string
    }>
  }
  experience: {
    title: string
    items: ReadonlyArray<AboutExperienceItem>
  }
  awards: {
    title: string
    items: ReadonlyArray<AboutAwardItem>
  }
  resume: {
    label: string
    url: string
  }
  portfolio: {
    label: string
    url: string
  }
}

const aboutPageContentByLanguage: Readonly<Record<AppLanguage, AboutPageContent>> = {
  en: {
    hero: {
      introHeadline: 'HI, I am Shuoyue Wu, I am a...',
      roles: ['Artist', 'Product Designer', 'Product Manager', 'Full-stack Developer', 'AI Film maker'],
    },
    portrait: {
      src: withBase('/assets/images/portraits/self-portrait.png'),
      alt: 'Portrait of Shuoyue Wu',
    },
    biography: {
      title: 'About me',
      paragraphs: [
        'My design philosophy is inspired by the principles of Bada Shanren, embracing a "simple yet profound" approach to exploring the intricate relationship between humans and the environment. In my work, I strive for restrained expression, using subtraction to achieve addition, allowing the core ideas of my designs to naturally emerge through negative space and subtle details.',
        'Bada Shanren, a monk and painter in ancient China, lived a life shaped by profound experiences. Misjudged and wronged in his early years, he chose to take monastic vows and remained silent for the rest of his life, leading many to believe he was mute. However, I see his silence not as a limitation but as a deliberate, restrained response to the sorrow and disillusionment of the world.',
        'This philosophy is embodied in my logo design, which is inspired by a reinterpretation of the Chinese character "哑" (mute). Through this redesign, I aim to convey the aesthetic of restraint and negative space, reflecting the beauty and meaning found in quietude and subtlety.',
      ],
    },
    skills: {
      title: 'Skills',
      categories: [
        {
          id: 'design',
          name: 'Design',
          items: 'Figma · Adobe Creative Suite · Design Systems · Prototyping · User Research / Usability Testing · Diffusion / ComfyUI / LoRA',
        },
        {
          id: 'development',
          name: 'Development',
          items: 'Frontend Development · React · HTML/CSS/JS',
        },
        {
          id: '3d',
          name: '3D & CGI',
          items: 'Blender · Substance',
        },
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          id: 'itp',
          role: 'Graduate (SPS)',
          organization: 'NYU Tisch ITP',
          organizationSubline: '(Interactive Telecommunicatons Program)',
          organizationUrl: 'https://itp.nyu.edu/itp/',
          dateRange: '2025-now',
        },
        {
          id: 'cue',
          role: 'Product Manager Intern',
          organization: 'CUE',
          organizationUrl: 'https://hk.cue.group/#/',
          dateRange: '5/2025-7/2025',
        },
        {
          id: 'jingdong',
          role: 'Visual Designer Intern',
          organization: 'JingDong Group',
          organizationUrl: 'https://corporate.jd.com/',
          dateRange: '5/2024-7/2024',
        },
        {
          id: 'cuc',
          role: 'Undergraduate',
          roleSubline: 'Digital Media Art',
          organization: 'Communication University of China (CUC)',
          dateRange: '2021-2025',
        },
      ],
    },
    awards: {
      title: 'Awards',
      items: [
        {
          id: 'muse',
          title: 'MUSE Design Award, Product Design (CAPE Project)',
          date: '7/2025',
        },
        {
          id: 'ima',
          title: 'Award Winner, IMA International Art Film Festival (EUREKA)',
          date: '5/2025',
        },
        {
          id: 'espsa',
          title:
            'Excellent Science Popularization Service Award, Communication University of China',
          date: '11/2024',
        },
        {
          id: 'exhibition',
          title: 'Finalist, The 6th Art and Science International Exhibition and Symposium',
          date: '1/2024',
        },
        {
          id: 'ncda',
          title: 'Second Prize, The 11th National College Digital Art & Design Awards',
          date: '8/2023',
        },
      ],
    },
    resume: {
      label: 'Download Resume (PDF)',
      url: withBase('/assets/PDFs/Shuoyue_Wu_Resume_jan2026.pdf'),
    },
    portfolio: {
      label: 'View Portfolio',
      url: 'https://drive.google.com/file/d/1MkFhQ7hDYI8A5Hk1reh1pe3L9sLQ4sAl/view',
    },
  },
  zh: {
    hero: {
      introHeadline: '你好，我是吴烁钺，我是一名...',
      roles: ['艺术家', '产品设计师', '产品经理', '全栈开发者', 'AI 电影创作者'],
    },
    portrait: {
      src: withBase('/assets/images/portraits/self-portrait.png'),
      alt: '个人照片',
    },
    biography: {
      title: '关于我',
      paragraphs: [
        '我的设计理念受到八大山人思想的启发，以“简而深”的方式探索人与环境之间复杂而细腻的关系。在创作中，我追求克制的表达，通过“减法”实现“加法”，让设计核心在留白与细节中自然显现。',
        '八大山人是中国古代的僧人和画家，他的人生经历深刻而复杂。早年遭受误解与不公后，他选择遁入空门，并长期沉默，世人因此常将其视作“哑者”。但在我看来，这种沉默并非局限，而是一种对现实悲悯与幻灭感的克制回应。',
        '这一思想也体现在我的 Logo 设计中。它来源于对“哑”字的再诠释，我希望借此传达克制与留白的美学，呈现安静与含蓄之中所蕴含的力量与意义。',
      ],
    },
    skills: {
      title: '技能',
      categories: [
        {
          id: 'design',
          name: '产品设计',
          items: 'Figma · Adobe Creative Suite · Design Systems · Prototyping · User Research / Usability Testing · Diffusion / ComfyUI / LoRA',
        },
        {
          id: 'development',
          name: '前端开发',
          items: 'Frontend Development · React · HTML/CSS/JS',
        },
        {
          id: '3d',
          name: '三维技术',
          items: 'Blender · Substance',
        },
      ],
    },
    experience: {
      title: '经历',
      items: [
        {
          id: 'itp',
          role: '研究生（SPS）',
          organization: 'NYU Tisch ITP',
          organizationSubline: '（Interactive Telecommunications Program）',
          organizationUrl: 'https://itp.nyu.edu/itp/',
          dateRange: '2025-至今',
        },
        {
          id: 'cue',
          role: '产品经理实习生',
          organization: 'CUE',
          organizationUrl: 'https://hk.cue.group/#/',
          dateRange: '2025.5-2025.7',
        },
        {
          id: 'jingdong',
          role: '视觉设计实习生',
          organization: 'JingDong Group',
          organizationUrl: 'https://corporate.jd.com/',
          dateRange: '2024.5-2024.7',
        },
        {
          id: 'cuc',
          role: '本科',
          roleSubline: '数字媒体艺术',
          organization: '中国传媒大学（CUC）',
          dateRange: '2021-2025',
        },
      ],
    },
    awards: {
      title: '奖项',
      items: [
        {
          id: 'muse',
          title: 'MUSE 设计奖，产品设计（CAPE 项目）',
          date: '2025.7',
        },
        {
          id: 'ima',
          title: 'IMA 国际艺术电影节获奖作品（EUREKA）',
          date: '2025.5',
        },
        {
          id: 'espsa',
          title: '中国传媒大学优秀科普服务奖',
          date: '2024.11',
        },
        {
          id: 'exhibition',
          title: '第六届艺术与科学国际展览暨研讨会入围',
          date: '2024.1',
        },
        {
          id: 'ncda',
          title: '第十一届全国高校数字艺术设计大赛二等奖',
          date: '2023.8',
        },
      ],
    },
    resume: {
      label: '下载简历（PDF）',
      url: withBase('/assets/PDFs/Shuoyue_Wu_Resume_jan2026.pdf'),
    },
    portfolio: {
      label: '查看作品集',
      url: 'https://drive.google.com/file/d/1MkFhQ7hDYI8A5Hk1reh1pe3L9sLQ4sAl/view',
    },
  },
}

export function getAboutPageContent(language: AppLanguage): AboutPageContent {
  return aboutPageContentByLanguage[language]
}
