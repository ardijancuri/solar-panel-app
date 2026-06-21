"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Globe2,
  Home as HomeIcon,
  House,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  PlayCircle,
  Sun,
  X,
  Zap
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter
} from "react-icons/fa6";

type Lang = "mk" | "sq" | "en";

const languages: { code: Lang; label: string }[] = [
  { code: "mk", label: "MK" },
  { code: "sq", label: "SQ" },
  { code: "en", label: "EN" }
];

const dictionaries = {
  mk: {
    nav: {
      home: "Дома",
      about: "За нас",
      projects: "Проекти",
      contact: "Контакт"
    },
    hero: {
      eyebrow: "Нова енергија за вашиот систем",
      title: "Чиста обновлива енергија без граници",
      body:
        "Solvix нуди доверливи соларни решенија со високи перформанси за домови, бизниси и позелена иднина.",
      cta: "Бесплатна консултација",
      video: "Погледнете го решението",
      videoText: "Чистата технологија носи енергетска независност.",
      stats: [
        { value: "10k+", label: "инсталации" },
        { value: "100k", label: "заштедени kWh" },
        { value: "70%", label: "помал трошок" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ придобивки",
      title: "Придобивките од соларна енергија со Solvix",
      body:
        "Ослободете ја моќта на соларната енергија со решенија создадени за трајна вредност.",
      items: [
        {
          title: "Значителни заштеди",
          body:
            "Намалете ги месечните сметки со паметно производство на сопствена енергија."
        },
        {
          title: "Енергетска независност",
          body:
            "Создадете стабилен систем што го намалува ослонувањето на мрежата."
        },
        {
          title: "Еко решение",
          body:
            "Понизок јаглероден отпечаток и почиста средина за следната генерација."
        },
        {
          title: "Поголема вредност",
          body:
            "Зголемете ја вредноста на објектот со модерна соларна инфраструктура."
        }
      ]
    },
    solutions: {
      eyebrow: "/ решенија",
      title: "Наши соларни решенија",
      items: [
        {
          title: "Резиденцијален солар",
          body: "Ефикасни панели за домови со сигурна дневна заштеда."
        },
        {
          title: "Комерцијален солар",
          body: "Системи за компании кои сакаат предвидлива енергија."
        },
        {
          title: "Складирање енергија",
          body: "Батерии што ја чуваат енергијата кога ви е најпотребна."
        },
        {
          title: "EV полначи",
          body: "Интегрирани станици за електрични возила и соларни мрежи."
        }
      ]
    },
    projects: [
      {
        title: "Одржливо живеење за заедница",
        location: "Green Haven Residences - Лос Анџелес, CA"
      },
      {
        title: "Соларно напојуван ритејл",
        location: "RetailMart Superstore - Хјустон, TX"
      },
      {
        title: "Off-grid соларна фарма",
        location: "Harmony Eco Lodge - Лос Анџелес, CA"
      },
      {
        title: "Паметна соларна урбана инфраструктура",
        location: "City Transit Hub - Лос Анџелес, CA"
      }
    ],
    projectTags: ["Резиденцијален солар", "Соларна енергија", "Заштеда"],
    projectText:
      "Систем за обновлива енергија поставен околу зелена архитектура, со чисто производство и долгорочна вредност за заедницата.",
    success: {
      eyebrow: "/ приказни",
      title: "Успешни приказни",
      quoteTitle: "Голема промена за мојот дом!",
      quote:
        "Преминот кон Solvix беше најдобрата одлука. Сметката за струја значително се намали, а сега со гордост придонесуваме за почиста планета. Тимот беше професионален, а инсталацијата помина беспрекорно.",
      author: "John Darrell",
      location: "Лос Анџелес, CA"
    },
    steps: {
      eyebrow: "/ нашиот процес",
      title: "Премин кон солар во 3 лесни чекори",
      items: [
        {
          title: "01 Консултација",
          body: "Ги разгледуваме вашите потреби и го планираме најдобриот систем."
        },
        {
          title: "02 Инсталација",
          body: "Нашиот тим го поставува решението прецизно, чисто и без застој."
        },
        {
          title: "03 Почеток на заштеда",
          body: "Вашиот систем почнува да произведува енергија и да ги намалува трошоците."
        }
      ]
    },
    faq: {
      eyebrow: "/ чпп",
      title: "Често поставувани прашања",
      items: [
        {
          q: "Што ја прави Solvix различна од другите провајдери?",
          a:
            "Ние комбинираме внимателен проект, квалитетни компоненти и локална поддршка за систем што работи долгорочно."
        },
        {
          q: "Какви соларни решенија нуди Solvix?",
          a:
            "Нудиме системи за домови, компании, батериско складирање и EV полначи поврзани со соларна енергија."
        },
        {
          q: "Како функционира процесот на консултација?",
          a:
            "Го анализираме објектот, потрошувачката и целите, па подготвуваме јасна понуда со очекувани заштеди."
        },
        {
          q: "Колку чини соларен систем со Solvix?",
          a:
            "Цената зависи од големината и опремата. По консултација добивате точна пресметка и план за поврат."
        }
      ]
    },
    blog: {
      eyebrow: "/ блог",
      title: "Бидете информирани со експертски совети за соларна енергија",
      posts: [
        {
          meta: "Инвестиции и заштеди / 20 септември 2025",
          title: "Владини поттикнувања и субвенции за соларна енергија"
        },
        {
          meta: "Соларни заштеди / 22 јануари 2025",
          title: "Како соларната енергија може да ви заштеди илјадници"
        },
        {
          meta: "Еко решенија / 18 јануари 2025",
          title: "Топ 5 причини да инвестирате во соларни панели во 2025"
        }
      ]
    },
    cta: {
      eyebrow: "Нова енергија за вашиот систем",
      title: "Побарајте бесплатна понуда денес!",
      body:
        "Ве интересира премин кон солар? Ајде заедно да го најдеме вистинското решение за вашиот дом или бизнис.",
      button: "Побарајте понуда"
    },
    footer: {
      text:
        "Ние создаваме соларни решенија што ја намалуваат потрошувачката, ги стабилизираат трошоците и носат почиста енергија.",
      quick: "Брзи линкови",
      contact: "Контакт",
      subscribe: "Претплати се",
      subscribeText:
        "Добијте новости за соларни совети, субвенции и енергетски решенија.",
      email: "Вашата е-пошта",
      send: "Испрати",
      sent: "Испратено",
      socials: "Следете не",
      rights: "© 2026 Solvix Solar Energy. Сите права се задржани.",
      policy: "Политика за приватност",
      terms: "Услови за користење"
    }
  },
  sq: {
    nav: {
      home: "Ballina",
      about: "Rreth nesh",
      projects: "Projektet",
      contact: "Kontakt"
    },
    hero: {
      eyebrow: "Energji e re per sistemin tuaj",
      title: "Energji e paster e rinovueshme pa kufi",
      body:
        "Solvix ofron zgjidhje solare te besueshme dhe me performance te larte per shtepi, biznese dhe nje te ardhme me te gjelber.",
      cta: "Konsultim falas",
      video: "Shiko zgjidhjen",
      videoText: "Teknologjia e paster sjell pavaresi energjetike.",
      stats: [
        { value: "10k+", label: "instalime" },
        { value: "100k", label: "kWh te kursyera" },
        { value: "70%", label: "kosto me e ulet" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ perfitime",
      title: "Perfitimet e energjise solare me Solvix",
      body:
        "Shfrytezoni fuqine e energjise solare me zgjidhje te krijuara per vlere afatgjate.",
      items: [
        {
          title: "Kursime te ndjeshme",
          body: "Ulni faturat mujore me prodhim inteligjent te energjise suaj."
        },
        {
          title: "Pavaresi energjetike",
          body: "Krijoni sistem stabil qe ul varesine nga rrjeti."
        },
        {
          title: "Zgjidhje ekologjike",
          body: "Gjurmë me e ulet karboni dhe mjedis me i paster."
        },
        {
          title: "Vlere me e larte",
          body: "Rritni vleren e objektit me infrastrukture moderne solare."
        }
      ]
    },
    solutions: {
      eyebrow: "/ zgjidhje",
      title: "Zgjidhjet tona solare",
      items: [
        {
          title: "Solar rezidencial",
          body: "Panele efikase per shtepi me kursime te perditshme."
        },
        {
          title: "Solar komercial",
          body: "Sisteme per kompani qe kerkojne energji te parashikueshme."
        },
        {
          title: "Ruajtje energjie",
          body: "Bateri qe ruajne energjine kur ju duhet me shume."
        },
        {
          title: "Karikues EV",
          body: "Stacione te integruara per automjete elektrike."
        }
      ]
    },
    projects: [
      {
        title: "Jetese e qendrueshme per komunitetin",
        location: "Green Haven Residences - Los Angeles, CA"
      },
      {
        title: "Dyqan i fuqizuar nga dielli",
        location: "RetailMart Superstore - Houston, TX"
      },
      {
        title: "Ferme solare off-grid",
        location: "Harmony Eco Lodge - Los Angeles, CA"
      },
      {
        title: "Infrastrukture urbane solare",
        location: "City Transit Hub - Los Angeles, CA"
      }
    ],
    projectTags: ["Solar rezidencial", "Energji solare", "Kursime"],
    projectText:
      "Sistem energjie i vendosur rreth arkitektures se gjelber, me prodhim te paster dhe vlere afatgjate.",
    success: {
      eyebrow: "/ histori",
      title: "Histori suksesi",
      quoteTitle: "Ndryshim i madh per shtepine time!",
      quote:
        "Kalimi ne Solvix ishte vendimi me i mire. Fatura e energjise ra ndjeshem dhe tani kontribuojme per nje planet me te paster. Ekipi ishte profesional dhe instalimi shkoi pa probleme.",
      author: "John Darrell",
      location: "Los Angeles, CA"
    },
    steps: {
      eyebrow: "/ procesi",
      title: "Kalimi ne solar ne 3 hapa te lehte",
      items: [
        {
          title: "01 Konsultim",
          body: "Analizojme nevojat tuaja dhe planifikojme sistemin me te mire."
        },
        {
          title: "02 Instalimi",
          body: "Ekipi yne vendos zgjidhjen me kujdes dhe pa vonesa."
        },
        {
          title: "03 Filloni kursimin",
          body: "Sistemi prodhon energji dhe ul shpenzimet tuaja."
        }
      ]
    },
    faq: {
      eyebrow: "/ pyetje",
      title: "Pyetje te shpeshta",
      items: [
        {
          q: "Cfare e ben Solvix ndryshe nga ofruesit e tjere?",
          a:
            "Kombinojme projektim te kujdesshem, komponente cilesore dhe mbeshtetje lokale."
        },
        {
          q: "Cfare zgjidhjesh solare ofron Solvix?",
          a:
            "Ofrojme sisteme per shtepi, biznese, bateri dhe karikues EV te lidhur me energjine solare."
        },
        {
          q: "Si funksionon konsultimi?",
          a:
            "Analizojme objektin, konsumin dhe qellimet, pastaj pergatisim oferte te qarte."
        },
        {
          q: "Sa kushton nje sistem solar Solvix?",
          a:
            "Varet nga madhesia dhe pajisjet. Pas konsultimit merrni kalkulim te sakte."
        }
      ]
    },
    blog: {
      eyebrow: "/ blog",
      title: "Qendroni te informuar me keshilla ekspertesh per energjine solare",
      posts: [
        {
          meta: "Investime dhe kursime / 20 shtator 2025",
          title: "Nxitje dhe subvencione qeveritare per energji solare"
        },
        {
          meta: "Kursime solare / 22 janar 2025",
          title: "Si energjia solare mund t'ju kurseje mijera"
        },
        {
          meta: "Zgjidhje ekologjike / 18 janar 2025",
          title: "5 arsye per te investuar ne panele solare ne 2025"
        }
      ]
    },
    cta: {
      eyebrow: "Energji e re per sistemin tuaj",
      title: "Merrni oferte falas sot!",
      body:
        "Jeni te interesuar per solar? Le te gjejme zgjidhjen e duhur per shtepine ose biznesin tuaj.",
      button: "Kerko oferte"
    },
    footer: {
      text:
        "Krijojme zgjidhje solare qe ulin konsumin, stabilizojne kostot dhe sjellin energji me te paster.",
      quick: "Lidhje te shpejta",
      contact: "Kontakt",
      subscribe: "Abonohu",
      subscribeText: "Merrni lajme per keshilla solare, subvencione dhe zgjidhje energjie.",
      email: "Email-i juaj",
      send: "Dergo",
      sent: "Derguar",
      socials: "Na ndiqni",
      rights: "© 2026 Solvix Solar Energy. Te gjitha te drejtat e rezervuara.",
      policy: "Privatesia",
      terms: "Kushtet"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About us",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      eyebrow: "New energy for our system",
      title: "Clean renewable limitless energy",
      body:
        "Solvix provides reliable, high-performance clean energy solutions for homes, businesses, and a greener future.",
      cta: "Get free consultation",
      video: "Watch the solution",
      videoText: "Clean technology creates energy independence.",
      stats: [
        { value: "10k+", label: "installations" },
        { value: "100k", label: "kWh saved" },
        { value: "70%", label: "lower cost" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ benefits",
      title: "The benefits of going solar with Solvix",
      body:
        "Unlock the power of solar energy with smart solutions engineered for long-term value.",
      items: [
        {
          title: "Significant cost savings",
          body: "Reduce monthly bills with smart production of your own energy."
        },
        {
          title: "Energy independence",
          body: "Build a stable system that lowers reliance on the grid."
        },
        {
          title: "Eco-friendly solution",
          body: "A lower carbon footprint and a cleaner environment."
        },
        {
          title: "Increased property value",
          body: "Add value with modern solar infrastructure."
        }
      ]
    },
    solutions: {
      eyebrow: "/ solutions",
      title: "Our solar solutions",
      items: [
        {
          title: "Residential solar",
          body: "Efficient panels for homes with reliable daily savings."
        },
        {
          title: "Commercial solar",
          body: "Systems for businesses that need predictable energy."
        },
        {
          title: "Solar battery storage",
          body: "Batteries that keep your power ready when you need it."
        },
        {
          title: "EV charging stations",
          body: "Integrated charging for electric vehicles and solar grids."
        }
      ]
    },
    projects: [
      {
        title: "Sustainable living for a community",
        location: "Green Haven Residences - Los Angeles, CA"
      },
      {
        title: "Solar-powered retail",
        location: "RetailMart Superstore - Houston, TX"
      },
      {
        title: "Off-grid solar farm",
        location: "Harmony Eco Lodge - Los Angeles, CA"
      },
      {
        title: "Smart solar for urban infrastructure",
        location: "City Transit Hub - Los Angeles, CA"
      }
    ],
    projectTags: ["Residential solar", "Solar energy", "Energy savings"],
    projectText:
      "A clean energy system wrapped into green architecture, producing measurable savings and long-term community value.",
    success: {
      eyebrow: "/ success stories",
      title: "Success stories",
      quoteTitle: "A game-changer for my home!",
      quote:
        "Switching to Solvix was one of the best decisions for my family. Our electricity bills dropped by nearly 70%, and we feel great knowing we're contributing to a cleaner planet. The team was professional, and the installation process was seamless.",
      author: "John Darrell",
      location: "Los Angeles, CA"
    },
    steps: {
      eyebrow: "/ our work",
      title: "Switching to solar in 3 easy steps",
      items: [
        {
          title: "01 Consultation",
          body: "We review your energy needs and plan the right system."
        },
        {
          title: "02 Installation",
          body: "Our experts install the solution cleanly and precisely."
        },
        {
          title: "03 Savings begin",
          body: "Your system starts producing energy and lowering costs."
        }
      ]
    },
    faq: {
      eyebrow: "/ faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "What makes Solvix different from other solar providers?",
          a:
            "We combine careful design, quality components, and local support for systems built to last."
        },
        {
          q: "What types of solar solutions does Solvix offer?",
          a:
            "We provide residential, commercial, battery storage, and EV charging solutions."
        },
        {
          q: "How does the consultation process work?",
          a:
            "We analyze your site, usage, and goals, then prepare a clear plan and savings estimate."
        },
        {
          q: "How much does a Solvix solar system cost?",
          a:
            "Pricing depends on system size and equipment. After consultation, you receive a precise estimate."
        }
      ]
    },
    blog: {
      eyebrow: "/ blog",
      title: "Stay informed with expert insights, tips about solar energy",
      posts: [
        {
          meta: "Investments and savings / September 20, 2025",
          title: "Government incentives and rebates for solar energy"
        },
        {
          meta: "Solar savings / January 22, 2025",
          title: "How solar energy can save you thousands"
        },
        {
          meta: "Eco solutions / January 18, 2025",
          title: "Top 5 reasons to invest in solar panels in 2025"
        }
      ]
    },
    cta: {
      eyebrow: "New energy for our system",
      title: "Get a free quote today!",
      body:
        "Interested in switching to solar? Let's work together to find the perfect solution for your home or business.",
      button: "Request a free quote"
    },
    footer: {
      text:
        "We create solar solutions that reduce energy usage, stabilize costs, and bring cleaner power to everyday life.",
      quick: "Quick links",
      contact: "Contact",
      subscribe: "Subscribe for updates",
      subscribeText: "Get solar tips, rebate news, and energy ideas in your inbox.",
      email: "Enter your email",
      send: "Send",
      sent: "Sent",
      socials: "Follow us",
      rights: "© 2026 Solvix Solar Energy. All rights reserved.",
      policy: "Privacy policy",
      terms: "Terms of use"
    }
  }
};

const benefitIcons = [CircleDollarSign, Zap, Leaf, House];
const solutionIcons = [HomeIcon, Briefcase, BatteryCharging, PlugZap];
const blogImages = ["/images/blog-plant.jpg", "/images/blog-house.jpg", "/images/blog-panel.jpg"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("mk");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(1);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(
    () => new Set([0, 1, 2, 3])
  );
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const t = dictionaries[lang];

  const navItems = useMemo(
    () => [
      { label: t.nav.home, href: "#home" },
      { label: t.nav.about, href: "#about" },
      { label: t.nav.projects, href: "#projects" }
    ],
    [t.nav.about, t.nav.home, t.nav.projects]
  );

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <main id="home" className="site-shell">
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Solvix">
          <span className="brand-mark">
            <Sun size={16} strokeWidth={2.8} />
          </span>
          <span>Solvix</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switcher" aria-label="Language selector">
            <Globe2 size={14} />
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                className={language.code === lang ? "active" : ""}
                onClick={() => setLang(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>
          <a className="contact-button" href="#contact">
            {t.nav.contact}
          </a>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {mobileOpen ? (
        <div className="mobile-panel">
          {[...navItems, { label: t.nav.contact, href: "#contact" }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-languages">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                className={language.code === lang ? "active" : ""}
                onClick={() => setLang(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <section className="hero section-pad">
        <div className="hero-copy reveal-up">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-body">{t.hero.body}</p>
          <a href="#contact" className="primary-cta">
            {t.hero.cta}
            <span>
              <ArrowRight size={15} />
            </span>
          </a>

          <div className="stats-strip">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media reveal-up delay-one">
          <picture>
            <source media="(max-width: 980px)" srcSet="/images/hero-wind-mobile.jpg" />
            <img src="/images/hero-wind.jpg" alt="" />
          </picture>
          <div className="video-card">
            <div className="video-thumb">
              <img src="/images/video-thumb.jpg" alt="" />
              <PlayCircle size={36} />
            </div>
            <strong>{t.hero.video}</strong>
            <span>{t.hero.videoText}</span>
          </div>
        </div>
      </section>

      <section className="partner-strip" aria-label="Partner logos">
        {t.partners.map((partner, index) => (
          <div className="partner-logo" key={`${partner}-${index}`}>
            <Leaf size={21} />
            <span>{partner}</span>
          </div>
        ))}
      </section>

      <section id="about" className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-intro">
            <p className="section-kicker">{t.benefits.eyebrow}</p>
            <h2>{t.benefits.title}</h2>
            <p>{t.benefits.body}</p>
          </div>

          <div className="benefit-photo">
            <img src="/images/benefit-solar.jpg" alt="" />
          </div>

          <div className="benefit-list">
            {t.benefits.items.map((item, index) => {
              const Icon = benefitIcons[index];
              return (
                <article key={item.title} className="benefit-item">
                  <span>
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="solutions-section section-pad">
        <div className="section-heading centered">
          <p className="section-kicker">{t.solutions.eyebrow}</p>
          <h2>{t.solutions.title}</h2>
        </div>

        <div className="solutions-grid">
          {t.solutions.items.map((item, index) => {
            const Icon = solutionIcons[index];
            return (
              <article className="solution-card" key={item.title}>
                <Icon size={32} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="project-list">
          {t.projects.map((project, index) => {
            const isActive = index === activeProject;
            return (
              <article className={`project-row ${isActive ? "active" : ""}`} key={project.title}>
                <button
                  type="button"
                  className="project-trigger"
                  onClick={() => setActiveProject(index)}
                  aria-expanded={isActive}
                >
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.title}</strong>
                  <span className="project-location">{project.location}</span>
                  <ChevronDown size={18} />
                </button>

                {isActive ? (
                  <div className="project-detail">
                    <img src="/images/project-retail.jpg" alt="" />
                    <div className="project-overlay">
                      <div className="tag-row">
                        {t.projectTags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <p>{t.projectText}</p>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="success-section section-pad">
        <div className="section-heading centered">
          <p className="section-kicker">{t.success.eyebrow}</p>
          <h2>{t.success.title}</h2>
        </div>

        <div className="success-card">
          <img src="/images/customer.jpg" alt="John Darrell" />
          <article>
            <h3>{t.success.quoteTitle}</h3>
            <p>{t.success.quote}</p>
            <div className="success-footer">
              <strong>{t.success.author}</strong>
              <span>- {t.success.location}</span>
              <div className="success-controls">
                <button type="button" aria-label="Previous story">
                  <ArrowRight size={16} />
                </button>
                <button type="button" aria-label="Next story">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="steps-section">
        <div className="steps-copy">
          <p className="section-kicker">{t.steps.eyebrow}</p>
          <h2>{t.steps.title}</h2>
          <div className="steps-line">
            {t.steps.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="steps-collage">
          <img src="/images/steps-collage.jpg" alt="" />
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="section-heading centered">
          <p className="section-kicker">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
        </div>

        <div className="faq-grid">
          {t.faq.items.map((item, index) => {
            const open = openFaqs.has(index);
            return (
              <article className="faq-item" key={item.q}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={open}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} className={open ? "rotated" : ""} />
                </button>
                {open ? <p>{item.a}</p> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="blog-section section-pad">
        <div className="section-heading centered blog-heading">
          <p className="section-kicker">{t.blog.eyebrow}</p>
          <h2>{t.blog.title}</h2>
        </div>

        <div className="blog-grid">
          {t.blog.posts.map((post, index) => (
            <article className="blog-card" key={post.title}>
              <img src={blogImages[index]} alt="" />
              <p>{post.meta}</p>
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="quote-section">
        <p className="eyebrow">{t.cta.eyebrow}</p>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.body}</p>
        <a href="mailto:hello@solvix.example" className="primary-cta">
          {t.cta.button}
          <span>
            <ArrowRight size={15} />
          </span>
        </a>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand light" aria-label="Solvix">
              <span className="brand-mark">
                <Sun size={16} strokeWidth={2.8} />
              </span>
              <span>Solvix</span>
            </a>
            <p>{t.footer.text}</p>
            <span className="footer-social-title">{t.footer.socials}</span>
            <div className="social-row">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>{t.footer.quick}</h3>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-contact">
            <h3>{t.footer.contact}</h3>
            <p>
              <Mail size={15} />
              hello@solvix.example
            </p>
            <p>
              <Phone size={15} />
              +389 70 123 456
            </p>
            <p>
              <MapPin size={15} />
              Skopje, Macedonia
            </p>
          </div>

          <div className="footer-subscribe">
            <h3>{t.footer.subscribe}</h3>
            <p>{t.footer.subscribeText}</p>
            <form onSubmit={onSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubscribed(false);
                }}
                placeholder={t.footer.email}
                aria-label={t.footer.email}
              />
              <button type="submit">
                {subscribed ? (
                  <>
                    <CheckCircle2 size={14} />
                    {t.footer.sent}
                  </>
                ) : (
                  t.footer.send
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer.rights}</span>
          <div>
            <a href="#">{t.footer.policy}</a>
            <a href="#">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
