export type Lang = "es" | "en";
export type I18n<T> = { es: T; en: T };

export type ServiceKey =
  | "prisma-sport"
  | "prisma-connect"
  | "prisma-replay"
  | "prisma-content"
  | "prisma-studio"
  | "prisma-production"
  | "prisma-play";

export type PrismaService = {
  key: ServiceKey;
  name: string;
  focus: I18n<string>;
  description: I18n<string>;
  imageSrc: string;
  imageAlt: I18n<string>;
  iconHint: "sport" | "connect" | "replay" | "content" | "studio" | "production" | "play";
};

export const prisma = {
  brand: {
    short: "PRISMA",
    full: "PRISMA Broadcast & Media"
  },

  nav: {
    links: [
      { id: "about", label: { es: "Sobre Nosotros", en: "About" } },
      { id: "services", label: { es: "Servicios", en: "Services" } },
      { id: "contact", label: { es: "Contacto", en: "Contact" } }
    ],
    cta: { es: "Contáctenos", en: "Contact Us" }
  },

  hero: {
    title: "PRISMA Broadcast & Media",
    tagline: {
      es: "Donde el deporte, la tecnología y los medios se conectan.",
      en: "Where sports, technology and media connect"
    },
    primaryCta: { es: "Explorar Servicios", en: "Explore Services" },
    secondaryCta: { es: "Hablar con un experto", en: "Talk to an expert" }
  },

  about: {
    title: { es: "Innovación y Experiencia.", en: "Innovation and Experience." },
    body: {
      es:
        "En Prisma Broadcast & Media, combinamos lo mejor de dos mundos. Somos una empresa joven, ágil y dinámica, nacida para responder a las exigencias modernas de la industria del Broadcast & Media. Sin embargo, nuestra base es sólida: estamos formados por un equipo de profesionales con décadas de experiencia en la industria del broadcast internacional. Entendemos el pasado de la televisión, pero estamos construyendo el futuro del streaming y la gestión deportiva.",
      en:
        "At Prisma Broadcast & Media, we combine the best of both worlds. We are a young, agile, and dynamic company born to meet the modern demands of the Broadcast & Media industry. Yet, our foundation is rock-solid: we are powered by a team of professionals with decades of experience in the international broadcast industry. We understand the history of television, but we are engineering the future of streaming and sports management."
    }
  },

  services: {
    sectionTitle: { es: "Las 7 Pestañas de Servicios", en: "Services Tabs" },
    sectionBody: { es: "", en: "" },
    items: [
      {
        key: "prisma-sport",
        name: "Prisma Sport",
        focus: { es: "Gestión Visual Deportiva", en: "Visual Sports Management" },
        description: {
          es:
            "Potenciamos el rendimiento y la estrategia. Ofrecemos herramientas integrales de gestión para clubes y federaciones, optimizando desde la táctica hasta la administración de recursos deportivos.",
          en:
            "Empowering performance and strategy. We offer comprehensive management tools for clubs and federations, optimizing everything from on-field tactics to sports resource administration."
        },
        imageSrc: "/images/services/prisma-sport.jpg",
        imageAlt: {
          es:
            "Un entrenador o director técnico en un campo de juego moderno sosteniendo una tablet digital con gráficos de estrategia, con el estadio de fondo desenfocado.",
          en:
            "A coach or manager on a modern playing field holding a digital tablet with strategy graphics, with the stadium in the background out of focus."
        },
        iconHint: "sport"
      },
      {
        key: "prisma-connect",
        name: "Prisma Connect",
        focus: { es: "Transporte de Video", en: "Video Transport" },
        description: {
          es:
            "Su señal, donde la necesita, sin latencia. Soluciones robustas de transporte de video vía satélite, fibra óptica o IP. Garantizamos que su contenido viaje seguro y con la máxima calidad desde el estadio hasta el espectador.",
          en:
            "Your signal, where you need it, with zero latency. Robust video transport solutions via satellite, fiber optics, or IP. We guarantee your content travels securely and with the highest quality from the stadium to the viewer."
        },
        imageSrc: "/images/services/prisma-connect.jpg",
        imageAlt: {
          es:
            "Primer plano de un rack de servidores con luces led azules y cables de fibra óptica conectados, o una antena parabólica de transmisión móvil (DSNG) con un cielo despejado.",
          en:
            "Close-up of a server rack with blue LED lights and connected fiber optic cables, or a mobile transmission satellite dish (DSNG) with a clear sky."
        },
        iconHint: "connect"
      },
      {
        key: "prisma-replay",
        name: "Prisma Replay",
        focus: { es: "Sistemas de Repetición y Arbitraje", en: "VAR / Replay System" },
        description: {
          es:
            "Justicia y precisión en cada jugada. Proveemos tecnología de punta para sistemas VAR (Video Assistant Referee) y repeticiones en cámara lenta, asegurando que ningún detalle escape al ojo de la decisión.",
          en:
            "Fairness and precision in every play. We provide state-of-the-art technology for VAR (Video Assistant Referee) systems and slow-motion replays, ensuring no detail escapes the decision-making process."
        },
        imageSrc: "/images/services/prisma-replay.jpg",
        imageAlt: {
          es:
            "Una sala VOR (Video Operation Room) oscura donde se ven monitores mostrando múltiples ángulos de un partido de fútbol y una mano operando un controlador de replay profesional.",
          en:
            "A dark VOR (Video Operation Room) where monitors show multiple angles of a football match and a hand operating a professional replay controller."
        },
        iconHint: "replay"
      },
      {
        key: "prisma-content",
        name: "Prisma Content",
        focus: { es: "Inserción de Publicidad y Gráficos", en: "Ad Insertion / Graphics" },
        description: {
          es:
            "Monetice su emisión con impacto visual. Soluciones avanzadas para la inserción de publicidad virtual y gráficos en tiempo real (scoreboards, estadísticas), integrándose orgánicamente en la transmisión en vivo.",
          en:
            "Monetize your broadcast with visual impact. Advanced solutions for virtual ad insertion and real-time graphics (scoreboards, statistics), integrating organically into the live feed."
        },
        imageSrc: "/images/services/prisma-content.jpg",
        imageAlt: {
          es:
            "Una pantalla de televisión mostrando un partido de fútbol donde se resalta un gráfico de \"Estadísticas\" o una valla publicitaria digital al borde del campo.",
          en:
            "A television screen showing a football match where a \"Statistics\" graphic or a digital billboard at the edge of the field is highlighted."
        },
        iconHint: "content"
      },
      {
        key: "prisma-studio",
        name: "Prisma Studio",
        focus: { es: "Producción de Estudio y Medios", en: "Studio & Media Production" },
        description: {
          es:
            "El escenario perfecto para su historia. Diseño y operación de estudios de televisión, sets virtuales y entornos de producción de medios para noticieros, programas de debate y contenido pre-grabado.",
          en:
            "The perfect stage for your story. Design and operation of TV studios, virtual sets, and media production environments for news broadcasts, talk shows, and pre-recorded content."
        },
        imageSrc: "/images/services/prisma-studio.jpg",
        imageAlt: {
          es:
            "Un set de televisión moderno e iluminado con cámaras profesionales apuntando hacia un escritorio de presentadores (vacío o con personas silueteadas).",
          en:
            "A modern, well-lit television set with professional cameras pointing towards a presenter's desk (empty or with silhouetted people)."
        },
        iconHint: "studio"
      },
      {
        key: "prisma-production",
        name: "Prisma Production",
        focus: { es: "Producción Deportiva / Cobertura en vivo", en: "Sports Production" },
        description: {
          es:
            "Capturamos la emoción en vivo. Servicios completos de producción exterior (OB Vans), equipos de cámara y personal técnico especializado para la cobertura de eventos deportivos de cualquier magnitud.",
          en:
            "Capturing the emotion live. Full outside broadcast (OB) services, camera crews, and specialized technical staff for covering sports events of any magnitude."
        },
        imageSrc: "/images/services/prisma-production.jpg",
        imageAlt: {
          es:
            "Un camarógrafo profesional con auriculares operando una cámara grande sobre un trípode al borde de un campo de juego, enfocado en la acción.",
          en:
            "A professional cameraman with headphones operating a large camera on a tripod at the edge of a playing field, focused on the action."
        },
        iconHint: "production"
      },
      {
        key: "prisma-play",
        name: "Prisma Play",
        focus: { es: "Plataformas de Streaming", en: "OTT as a Service" },
        description: {
          es:
            "Su propio canal, directo al usuario. Desarrollamos e implementamos plataformas OTT (Over-The-Top) personalizadas para que distribuya su contenido deportivo directamente a móviles, Smart TVs y web.",
          en:
            "Your own channel, direct to the user. We develop and implement custom OTT (Over-The-Top) platforms so you can distribute your sports content directly to mobile devices, Smart TVs, and the web."
        },
        imageSrc: "/images/services/prisma-play.jpg",
        imageAlt: {
          es:
            "Una mano sosteniendo un smartphone o tablet que muestra una interfaz de aplicación de video (estilo Netflix/YouTube) con miniaturas de deportes.",
          en:
            "A hand holding a smartphone or tablet displaying a video application interface (Netflix/YouTube style) with sports thumbnails."
        },
        iconHint: "play"
      }
    ] satisfies PrismaService[]
  },

  contact: {
    title: { es: "Contáctenos", en: "Contact Us" },
    body: {
      es:
        "¿Listo para llevar su transmisión al siguiente nivel? Nuestro equipo de expertos está esperando para diseñar la solución perfecta para su proyecto.",
      en:
        "Ready to take your broadcast to the next level? Our team of experts is waiting to design the perfect solution for your project."
    },
    // El PDF NO trae email destino -> se deja vacío y la UI muestra TODO.
    toEmail: "",
    form: {
      name: { es: "Nombre", en: "Name" },
      email: { es: "Correo", en: "Email" },
      company: { es: "Empresa", en: "Company" },
      message: { es: "Mensaje", en: "Message" },
      submit: { es: "Enviar", en: "Send" },
      toastOk: { es: "Mensaje listo para enviar.", en: "Message ready to send." },
      mailtoCta: { es: "Abrir correo", en: "Open email" }
    }
  },

  footer: {
    phrase: {
      es: "Donde el deporte, la tecnología y los medios se conectan.",
      en: "Where sports, technology and media connect."
    }
  }
} as const;
