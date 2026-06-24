"use client";

import {
  type CSSProperties,
  type FormEvent,
  type TouchEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  ArrowRight,
  BatteryCharging,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Home as HomeIcon,
  House,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  X,
  Zap
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram
} from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Lang = "mk" | "sq" | "en";

const languages: { code: Lang; label: string }[] = [
  { code: "mk", label: "MK" },
  { code: "sq", label: "SQ" },
  { code: "en", label: "EN" }
];

const contactEmail = "volnixmacedonia@gmail.com";
const whatsappHref = "https://wa.me/38970465349";
const whatsappPhoneHref = "tel:+38970465349";
const facebookHref = "https://www.facebook.com/share/1ZG8ryttkt/?mibextid=wwXIfr";
const instagramHref = "https://www.instagram.com/volnixmk?igsh=N2xqNHYwNXg3dWNp";
const whatsappPhoneLabel = "+389 70 465 349";

const partnerLogos = [
  { name: "LONGi", src: "/images/partner-longi.png" },
  { name: "Growatt", src: "/images/partner-growatt.png" },
  { name: "Deye", src: "/images/partner-deye.png" },
  { name: "SAKO", src: "/images/partner-sako.png" }
];

const heroSlides = [
  { label: "Solar panel technician inspection", src: "/images/hero-slide-panel-work.jpg" },
  { label: "Solar panel installation team", src: "/images/hero-slide-roof-team.jpg" },
  { label: "Rooftop solar installation at sunset", src: "/images/hero-slide-sunset-install.jpg" },
  { label: "Rooftop installer with solar panels", src: "/images/hero-rooftop-installer.png" }
];

const projectImages = [
  "/images/solution-rooftop-example.jpg",
  "/images/project-roof-compact.jpg",
  "/images/project-roof-large-array.jpg",
  "/images/project-roof-home-array.jpg"
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
        "Volnix нуди доверливи соларни решенија со високи перформанси за домови, бизниси и позелена иднина.",
      cta: "Бесплатна консултација",
      stats: [
        { value: "10k+", label: "инсталации" },
        { value: "100k", label: "заштедени kWh" },
        { value: "70%", label: "помал трошок" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ придобивки",
      title: "Придобивките од соларна енергија со Volnix",
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
        title: "Кровна соларна инсталација",
        location: "Тетово"
      },
      {
        title: "Компактна кровна соларна инсталација",
        location: "Гостивар"
      },
      {
        title: "Домашен кровен соларен систем",
        location: "Кичево"
      },
      {
        title: "Соларна инсталација за семеен дом",
        location: "Штип"
      }
    ],
    projectTags: ["Резиденцијален солар", "Соларна енергија", "Заштеда"],
    projectText:
      "Кровен соларен систем дизајниран за секојдневна домашна потрошувачка, чисто производство и долгорочна заштеда.",
    success: {
      eyebrow: "/ приказни",
      title: "Успешни приказни",
      quoteTitle: "Голема промена за мојот дом!",
      quote:
        "Преминот кон Volnix беше најдобрата одлука. Сметката за струја значително се намали, а сега со гордост придонесуваме за почиста планета. Тимот беше професионален, а инсталацијата помина беспрекорно.",
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
          q: "Што ја прави Volnix различна од другите провајдери?",
          a:
            "Ние комбинираме внимателен проект, квалитетни компоненти и локална поддршка за систем што работи долгорочно."
        },
        {
          q: "Какви соларни решенија нуди Volnix?",
          a:
            "Нудиме системи за домови, компании, батериско складирање и EV полначи поврзани со соларна енергија."
        },
        {
          q: "Како функционира процесот на консултација?",
          a:
            "Го анализираме објектот, потрошувачката и целите, па подготвуваме јасна понуда со очекувани заштеди."
        },
        {
          q: "Колку чини соларен систем со Volnix?",
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
      rights: "© 2026 Volnix Solar Energy. Сите права се задржани.",
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
      eyebrow: "Energji e re për sistemin tuaj",
      title: "Energji e pastër e rinovueshme pa kufij",
      body:
        "Volnix ofron zgjidhje solare të besueshme dhe me performancë të lartë për shtëpi, biznese dhe një të ardhme më të gjelbër.",
      cta: "Konsultim falas",
      stats: [
        { value: "10k+", label: "instalime" },
        { value: "100k", label: "kWh të kursyera" },
        { value: "70%", label: "kosto më e ulët" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ përfitime",
      title: "Përfitimet e energjisë solare me Volnix",
      body:
        "Shfrytëzoni fuqinë e energjisë solare me zgjidhje të krijuara për vlerë afatgjatë.",
      items: [
        {
          title: "Kursime të ndjeshme",
          body: "Ulni faturat mujore me prodhim inteligjent të energjisë suaj."
        },
        {
          title: "Pavarësi energjetike",
          body: "Krijoni sistem stabil që ul varësinë nga rrjeti."
        },
        {
          title: "Zgjidhje ekologjike",
          body: "Gjurmë më e ulët karboni dhe mjedis më i pastër."
        },
        {
          title: "Vlerë më e lartë",
          body: "Rritni vlerën e objektit me infrastrukturë moderne solare."
        }
      ]
    },
    solutions: {
      eyebrow: "/ zgjidhje",
      title: "Zgjidhjet tona solare",
      items: [
        {
          title: "Solar rezidencial",
          body: "Panele efikase për shtëpi me kursime të përditshme."
        },
        {
          title: "Solar komercial",
          body: "Sisteme për kompani që kërkojnë energji të parashikueshme."
        },
        {
          title: "Ruajtje energjie",
          body: "Bateri që ruajnë energjinë kur ju duhet më shumë."
        },
        {
          title: "Karikues EV",
          body: "Stacione të integruara për automjete elektrike."
        }
      ]
    },
    projects: [
      {
        title: "Instalim solar në çati",
        location: "Tetovë"
      },
      {
        title: "Instalim kompakt solar në çati",
        location: "Gostivar"
      },
      {
        title: "Sistem solar shtëpiak në çati",
        location: "Kërçovë"
      },
      {
        title: "Instalim solar për shtëpi familjare",
        location: "Shtip"
      }
    ],
    projectTags: ["Solar rezidencial", "Energji solare", "Kursime"],
    projectText:
      "Sistem solar në çati, i përshtatur për konsumin ditor të shtëpisë, prodhim të pastër dhe kursim afatgjatë.",
    success: {
      eyebrow: "/ histori",
      title: "Histori suksesi",
      quoteTitle: "Ndryshim i madh për shtëpinë time!",
      quote:
        "Kalimi në Volnix ishte vendimi më i mirë. Fatura e energjisë ra ndjeshëm dhe tani kontribuojmë për një planet më të pastër. Ekipi ishte profesional dhe instalimi shkoi pa probleme.",
      author: "John Darrell",
      location: "Los Angeles, CA"
    },
    steps: {
      eyebrow: "/ procesi",
      title: "Kalimi në solar në 3 hapa të lehtë",
      items: [
        {
          title: "01 Konsultim",
          body: "Analizojmë nevojat tuaja dhe planifikojmë sistemin më të mirë."
        },
        {
          title: "02 Instalimi",
          body: "Ekipi ynë vendos zgjidhjen me kujdes dhe pa vonesa."
        },
        {
          title: "03 Filloni kursimin",
          body: "Sistemi prodhon energji dhe ul shpenzimet tuaja."
        }
      ]
    },
    faq: {
      eyebrow: "/ pyetje",
      title: "Pyetje të shpeshta",
      items: [
        {
          q: "Çfarë e bën Volnix ndryshe nga ofruesit e tjerë?",
          a:
            "Kombinojmë projektim të kujdesshëm, komponentë cilësorë dhe mbështetje lokale."
        },
        {
          q: "Çfarë zgjidhjesh solare ofron Volnix?",
          a:
            "Ofrojmë sisteme për shtëpi, biznese, bateri dhe karikues EV të lidhur me energjinë solare."
        },
        {
          q: "Si funksionon konsultimi?",
          a:
            "Analizojmë objektin, konsumin dhe qëllimet, pastaj përgatisim ofertë të qartë."
        },
        {
          q: "Sa kushton një sistem solar Volnix?",
          a:
            "Varet nga madhësia dhe pajisjet. Pas konsultimit merrni kalkulim të saktë."
        }
      ]
    },
    blog: {
      eyebrow: "/ blog",
      title: "Qëndroni të informuar me këshilla ekspertësh për energjinë solare",
      posts: [
        {
          meta: "Investime dhe kursime / 20 shtator 2025",
          title: "Nxitje dhe subvencione qeveritare për energji solare"
        },
        {
          meta: "Kursime solare / 22 janar 2025",
          title: "Si energjia solare mund t'ju kursejë mijëra"
        },
        {
          meta: "Zgjidhje ekologjike / 18 janar 2025",
          title: "5 arsye për të investuar në panele solare në 2025"
        }
      ]
    },
    cta: {
      eyebrow: "Energji e re për sistemin tuaj",
      title: "Merrni ofertë falas sot!",
      body:
        "Jeni të interesuar për solar? Le të gjejmë zgjidhjen e duhur për shtëpinë ose biznesin tuaj.",
      button: "Kërko ofertë"
    },
    footer: {
      text:
        "Krijojmë zgjidhje solare që ulin konsumin, stabilizojnë kostot dhe sjellin energji më të pastër.",
      quick: "Lidhje të shpejta",
      contact: "Kontakt",
      subscribe: "Abonohu",
      subscribeText: "Merrni lajme për këshilla solare, subvencione dhe zgjidhje energjie.",
      email: "Email-i juaj",
      send: "Dërgo",
      sent: "Dërguar",
      socials: "Na ndiqni",
      rights: "© 2026 Volnix Solar Energy. Të gjitha të drejtat e rezervuara.",
      policy: "Privatësia",
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
        "Volnix provides reliable, high-performance clean energy solutions for homes, businesses, and a greener future.",
      cta: "Get free consultation",
      stats: [
        { value: "10k+", label: "installations" },
        { value: "100k", label: "kWh saved" },
        { value: "70%", label: "lower cost" }
      ]
    },
    partners: ["Lago ipsum", "Logipsum", "logo ipsum", "Logipsum", "Logoipsum"],
    benefits: {
      eyebrow: "/ benefits",
      title: "The benefits of going solar with Volnix",
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
        title: "Rooftop solar installation",
        location: "Tetovo"
      },
      {
        title: "Compact rooftop solar installation",
        location: "Gostivar"
      },
      {
        title: "Home rooftop solar system",
        location: "Kerqove"
      },
      {
        title: "Family home solar installation",
        location: "Shtip"
      }
    ],
    projectTags: ["Residential solar", "Solar energy", "Energy savings"],
    projectText:
      "A rooftop solar system designed for everyday home consumption, clean production, and long-term energy savings.",
    success: {
      eyebrow: "/ success stories",
      title: "Success stories",
      quoteTitle: "A game-changer for my home!",
      quote:
        "Switching to Volnix was one of the best decisions for my family. Our electricity bills dropped by nearly 70%, and we feel great knowing we're contributing to a cleaner planet. The team was professional, and the installation process was seamless.",
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
          q: "What makes Volnix different from other solar providers?",
          a:
            "We combine careful design, quality components, and local support for systems built to last."
        },
        {
          q: "What types of solar solutions does Volnix offer?",
          a:
            "We provide residential, commercial, battery storage, and EV charging solutions."
        },
        {
          q: "How does the consultation process work?",
          a:
            "We analyze your site, usage, and goals, then prepare a clear plan and savings estimate."
        },
        {
          q: "How much does a Volnix solar system cost?",
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
      rights: "© 2026 Volnix Solar Energy. All rights reserved.",
      policy: "Privacy policy",
      terms: "Terms of use"
    }
  }
};

const benefitIcons = [CircleDollarSign, Zap, Leaf, House];
const solutionIcons = [HomeIcon, Briefcase, BatteryCharging, PlugZap];

export default function Home() {
  const rootRef = useRef<HTMLElement | null>(null);
  const motionPrepRef = useRef(true);
  const didMountProjectRef = useRef(false);
  const heroTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const heroAutoplayIntervalRef = useRef<number | null>(null);
  const [lang, setLang] = useState<Lang>("mk");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1, 2, 3]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const t = dictionaries[lang];
  const activeLanguage =
    languages.find((language) => language.code === lang) ?? languages[0];
  const initialHeroMediaStyle: CSSProperties | undefined = motionPrepRef.current
    ? { clipPath: "inset(0 0 0 100%)" }
    : undefined;

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
      if (current.includes(index)) {
        return current.filter((item) => item !== index);
      }

      return [...current, index];
    });
  };

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex((language) => language.code === lang);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    setLang(nextLanguage.code);
  };

  const stopHeroAutoplay = () => {
    if (heroAutoplayIntervalRef.current === null) return;
    window.clearInterval(heroAutoplayIntervalRef.current);
    heroAutoplayIntervalRef.current = null;
  };

  const showHeroSlide = (direction: number) => {
    setActiveHeroSlide(
      (current) => (current + direction + heroSlides.length) % heroSlides.length
    );
  };

  const onHeroTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    heroTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onHeroTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = heroTouchStartRef.current;
    const touch = event.changedTouches[0];
    heroTouchStartRef.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontalMove = Math.abs(deltaX);

    if (horizontalMove < 40 || horizontalMove < Math.abs(deltaY) * 1.2) return;

    stopHeroAutoplay();
    showHeroSlide(deltaX < 0 ? 1 : -1);
  };

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    if (!isMobile) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || heroSlides.length < 2) return;

    heroAutoplayIntervalRef.current = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => {
      if (heroAutoplayIntervalRef.current === null) return;
      window.clearInterval(heroAutoplayIntervalRef.current);
      heroAutoplayIntervalRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobileViewport = window.matchMedia("(max-width: 980px)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const revealables = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-gsap-reveal]")
      );

      const finishMotionPrep = () => {
        motionPrepRef.current = false;
        root.classList.remove("is-motion-prep");
      };

      if (prefersReducedMotion) {
        finishMotionPrep();
        root.classList.remove("is-gsap-loading");
        gsap.set(
          [
            ".site-header",
            ".gsap-load",
            ".hero-media",
            ".hero-slide img",
            ...revealables
          ],
          {
            clearProps: "all"
          }
        );
        return;
      }

      root.classList.add("is-gsap-loading");
      if (!isMobileViewport) {
        gsap.set(".site-header", { y: -8 });
      }
      gsap.set(".gsap-load", { y: 16 });
      gsap.set(".hero-media", { clipPath: "inset(0 0 0 100%)" });
      gsap.set(revealables, { autoAlpha: 0, y: 26 });
      finishMotionPrep();

      const loadTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          root.classList.remove("is-gsap-loading");
        }
      });

      if (!isMobileViewport) {
        loadTimeline.to(".site-header", {
          y: 0,
          duration: 0.42,
          clearProps: "transform"
        });
      }

      loadTimeline
        .to(
          ".gsap-load",
          {
            y: 0,
            duration: 0.52,
            stagger: 0.06,
            clearProps: "transform"
          },
          isMobileViewport ? 0 : "-=0.14"
        )
        .to(
          ".hero-media",
          {
            clipPath: "inset(0 0 0 0%)",
            duration: 0.9,
            ease: "power2.out",
            clearProps: "clipPath"
          },
          0.08
        )
        .add(() => ScrollTrigger.refresh(), "-=0.2");

      ScrollTrigger.batch(revealables, {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.06,
            ease: "power3.out",
            overwrite: true,
            clearProps: "opacity,visibility,transform"
          });
        }
      });

      gsap.delayedCall(0.25, () => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileOpen || !rootRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-panel",
        { autoAlpha: 0, y: -10, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-panel a",
        { autoAlpha: 0, x: -8 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.26,
          stagger: 0.035,
          ease: "power2.out"
        }
      );
    }, rootRef.current);

    return () => ctx.revert();
  }, [mobileOpen]);

  useEffect(() => {
    if (!didMountProjectRef.current) {
      didMountProjectRef.current = true;
      return;
    }

    if (!rootRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row.active .project-detail",
        { autoAlpha: 0, y: -10, clipPath: "inset(0 0 8% 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.42,
          ease: "power3.out"
        }
      );
    }, rootRef.current);

    return () => ctx.revert();
  }, [activeProject]);

  return (
    <main
      id="home"
      className={`site-shell${motionPrepRef.current ? " is-motion-prep" : ""}`}
      ref={rootRef}
    >
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Volnix">
          <img className="brand-logo" src="/images/volnix-logo.png" alt="" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="language-circle desktop-language-switcher"
            aria-label={`Language: ${activeLanguage.label}`}
            onClick={cycleLanguage}
          >
            {activeLanguage.label}
          </button>
          <a className="contact-button" href="#contact">
            {t.nav.contact}
          </a>
        </div>

        <div className="mobile-header-actions">
          <div
            className="mobile-language-switcher"
            aria-label="Language selector"
          >
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

          <button
            className="menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
        </div>
      ) : null}

      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow gsap-load">{t.hero.eyebrow}</p>
          <h1 className="gsap-load">{t.hero.title}</h1>
          <p className="hero-body gsap-load">{t.hero.body}</p>
          <a href={whatsappPhoneHref} className="primary-cta gsap-load">
            {t.hero.cta}
            <span>
              <ArrowRight size={15} />
            </span>
          </a>

          <div className="stats-strip gsap-load">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media" style={initialHeroMediaStyle}>
          <div
            className="hero-slider"
            aria-label="Solar installation image slider"
            onTouchStart={onHeroTouchStart}
            onTouchEnd={onHeroTouchEnd}
            onTouchCancel={() => {
              heroTouchStartRef.current = null;
            }}
          >
            {heroSlides.map((slide, index) => (
              <div
                className={`hero-slide${index === activeHeroSlide ? " active" : ""}`}
                key={slide.src}
                aria-hidden={index !== activeHeroSlide}
              >
                <img
                  src={slide.src}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            ))}
            <div className="hero-slider-dots" aria-label="Hero image selector">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={index === activeHeroSlide ? "active" : ""}
                  aria-label={`Show ${slide.label}`}
                  aria-current={index === activeHeroSlide ? "true" : undefined}
                  onClick={() => {
                    stopHeroAutoplay();
                    setActiveHeroSlide(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="partner-strip" aria-label="Partner logos" data-gsap-reveal>
        {partnerLogos.map((partner) => (
          <div className="partner-logo" key={partner.name}>
            <img
              src={partner.src}
              alt={`${partner.name} logo`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </section>

      <section id="about" className="benefits-section" data-gsap-reveal>
        <div className="benefits-grid">
          <div className="benefit-intro">
            <p className="section-kicker">{t.benefits.eyebrow}</p>
            <h2>{t.benefits.title}</h2>
            <p>{t.benefits.body}</p>
          </div>

          <div className="benefit-photo">
            <img src="/images/benefit-renewable-field.jpg" alt="" />
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

      <section className="solutions-section section-pad" data-gsap-reveal>
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

      <section id="projects" className="projects-section" data-gsap-reveal>
        <div className="project-list">
          {t.projects.map((project, index) => {
            const isActive = index === activeProject;
            return (
              <article
                className={`project-row ${isActive ? "active" : ""}`}
                key={project.title}
              >
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
                    <img src={projectImages[index]} alt="" />
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

      <section className="steps-section" data-gsap-reveal>
        <div className="steps-copy">
          <p className="section-kicker">{t.steps.eyebrow}</p>
          <h2>{t.steps.title}</h2>
        </div>
        <div className="steps-line">
          {t.steps.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="steps-collage">
          <img src="/images/process-solar-field.jpg" alt="" />
        </div>
      </section>

      <section className="faq-section section-pad" data-gsap-reveal>
        <div className="section-heading centered">
          <p className="section-kicker">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
        </div>

        <div className="faq-grid">
          {t.faq.items.map((item, index) => {
            const open = openFaqs.includes(index);
            const answerId = `faq-answer-${index}`;
            return (
              <article className="faq-item" key={item.q}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={open}
                  aria-controls={answerId}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} className={open ? "rotated" : ""} />
                </button>
                <div
                  id={answerId}
                  className={`faq-answer ${open ? "open" : ""}`}
                  aria-hidden={!open}
                >
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="contact" className="quote-section" data-gsap-reveal>
        <p className="eyebrow">{t.cta.eyebrow}</p>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.body}</p>
        <a href={whatsappPhoneHref} className="primary-cta">
          {t.cta.button}
          <span>
            <ArrowRight size={15} />
          </span>
        </a>
      </section>

      <footer className="footer" data-gsap-reveal>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand light" aria-label="Volnix">
              <img className="brand-logo" src="/images/volnix-logo.png" alt="" />
            </a>
            <p>{t.footer.text}</p>
            <span className="footer-social-title">{t.footer.socials}</span>
            <div className="social-row">
              <a href={facebookHref} aria-label="Facebook" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href={instagramHref} aria-label="Instagram" target="_blank" rel="noreferrer">
                <FaInstagram />
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
            <a href={`mailto:${contactEmail}`}>
              <Mail size={15} />
              {contactEmail}
            </a>
            <a href={whatsappPhoneHref}>
              <Phone size={15} />
              {whatsappPhoneLabel}
            </a>
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
          <span className="footer-credit">
            Developed by{" "}
            <a href="https://oninova.net" target="_blank" rel="noreferrer">
              Oninova
            </a>
          </span>
        </div>
      </footer>

      <a
        className="whatsapp-float gsap-load"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp chat with Volnix"
      >
        <span className="whatsapp-bubble" aria-hidden="true" />
      </a>
    </main>
  );
}
