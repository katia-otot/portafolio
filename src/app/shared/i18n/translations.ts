export type Locale = 'es' | 'en';

export type TranslationDict = Record<string, string>;

export const TRANSLATIONS: Record<Locale, TranslationDict> = {
  es: {
    'nav.aria': 'Secciones del portafolio',
    'nav.homeAria': 'Inicio — Katia',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',
    'nav.themeToLight': 'Cambiar a modo claro',
    'nav.themeToDark': 'Cambiar a modo oscuro',
    'nav.langAria': 'Cambiar idioma',
    'nav.langEs': 'ES',
    'nav.langEn': 'EN',

    'hero.eyebrow': 'Portafolio',
    'hero.headline': 'Hola, soy Katia Gadea',
    'hero.tagline': 'Desarrolladora Full-Stack · Web & Mobile',
    'hero.sub':
      'Productos claros, código mantenible y foco en la experiencia de usuario.',
    'hero.cta': 'Contactame',
    'hero.cv': 'Descargar CV',

    'about.eyebrow': 'Perfil',
    'about.title': 'Acerca de mí',
    'about.p1':
      'Soy Técnica Universitaria en Desarrollo de Aplicaciones Informáticas (UNICEN) y trabajo como desarrolladora full-stack. Me muevo entre web y mobile: frontend, backend, autenticación, APIs, bases de datos y servicios cloud.',
    'about.p2':
      'Me recibí en UNICEN Quequén de la Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas (2022 — 2026).',
    'about.p3':
      'Me gusta armar productos claros, fáciles de mantener y pensados para quien los usa. Quiero seguir creciendo en proyectos donde pueda aportar en web, mobile, integración de APIs y despliegues en la nube.',

    'experience.eyebrow': 'Trayectoria',
    'experience.title': 'Experiencia laboral',
    'experience.role': 'Desarrolladora de Software Full-Stack',
    'experience.period': 'Octubre 2025 — Mayo 2026',
    'experience.summary':
      'Desarrollo de aplicaciones web y mobile a medida: contactos, turnos y mensajería.',
    'experience.b1':
      'Web de contactos: listado de personas con emails, celulares y notas por contacto, con registro e inicio de sesión con Google.',
    'experience.b2':
      'App móvil para lavaderos de autos: registro de turnos, autenticación con Google y persistencia de las reservas en Firebase.',
    'experience.b3':
      'Sistema para guardar mensajes entrantes de WhatsApp e interfaz de chat estilo WhatsApp para enviar y conservar la conversación.',
    'experience.b4':
      'Backend e integraciones (APIs, auth, almacenamiento y webhooks) para sostener esas apps en web y mobile.',

    'skills.eyebrow': 'Stack',
    'skills.title': 'Habilidades técnicas',
    'skills.lead':
      'Herramientas y tecnologías que uso en productos web, mobile y backend.',
    'skills.languagesTitle': 'Idiomas',
    'skills.g1.title': 'Lenguajes',
    'skills.g1.blurb': 'Bases con las que escribo producto y APIs.',
    'skills.g2.title': 'Frontend web',
    'skills.g2.blurb': 'Interfaces web modernas y mantenibles.',
    'skills.g3.title': 'Mobile',
    'skills.g3.blurb': 'Apps nativas con React Native y Expo.',
    'skills.g4.title': 'Backend',
    'skills.g4.blurb': 'APIs, runtimes y servicios de integración.',
    'skills.g5.title': 'Datos y ORM',
    'skills.g5.blurb': 'Persistencia, consultas y modelado de datos.',
    'skills.g6.title': 'Cloud y DevOps',
    'skills.g6.blurb': 'Auth, cloud, contenedores y calidad de código.',
    'skills.g7.title': 'Otros',
    'skills.g7.blurb': 'Frameworks, mapas, analytics y tooling.',
    'skills.lang.es.name': 'Español',
    'skills.lang.es.level': 'NATIVO',
    'skills.lang.en.name': 'Inglés',
    'skills.lang.en.level': 'A1 · LECTURA TÉCNICA',

    'projects.eyebrow': 'Selección',
    'projects.title': 'Galería de proyectos',
    'projects.lead': 'Estos son algunos de los proyectos en los que he trabajado.',
    'projects.how': 'Cómo funciona',
    'projects.demo': 'Demo →',
    'projects.github': 'GitHub ↗',
    'projects.close': 'Cerrar ×',
    'projects.viewGithub': 'Ver en GitHub ↗',
    'projects.openDemo': 'Abrir demo →',
    'projects.previewAria': 'Vista previa de {{title}}',
    'projects.openDemoAria': 'Abrir demo de {{title}}',
    'projects.shotAlt': 'Captura de {{title}}',

    'projects.plantas.title': 'Plantas del patio',
    'projects.plantas.desc':
      'App web para llevar el control de las plantas del patio: riego por estación, postergar por lluvia, fertilizante, poda, anti-bichos e historial con fotos.',
    'projects.plantas.how.summary':
      'Web para el cuidado diario del patio. En Hoy ves lo pendiente y registrás lluvia; en Plantas das de alta cada una con intervalos de riego verano/invierno; en la ficha marcás regué, fertilicé, podé o tratamiento y guardás fotos en el historial.',
    'projects.plantas.how.footnote':
      'Los datos viven en SQLite con Prisma; las fotos se guardan en el servidor. Pensada para usar en el celular o en la PC.',
    'projects.plantas.s1': 'Hoy',
    'projects.plantas.s1d': 'Tareas y acciones rápidas',
    'projects.plantas.s2': 'Plantas',
    'projects.plantas.s2d': 'Alta e intervalos de riego',
    'projects.plantas.s3': 'Estación',
    'projects.plantas.s3d': 'Verano u invierno',
    'projects.plantas.s4': 'Acciones',
    'projects.plantas.s4d': 'Riego, fertilizante, poda…',
    'projects.plantas.s5': 'Historial',
    'projects.plantas.s5d': 'Eventos y fotos',

    'projects.recetas.title': 'Recetas',
    'projects.recetas.desc':
      'Biblioteca de recetas: importás un link, un modelo de IA extrae ingredientes y pasos, los estructura en formato clásico y en tabla CFE, y después podés buscar por ingredientes o estilos de comida.',
    'projects.recetas.how.summary':
      'Biblioteca de recetas: se importa un link, se buscan ingredientes y pasos, y un modelo de IA los transforma a dos estructuras — formato clásico (lista de ingredientes y pasos enumerados) y tabla CFE. Después se pueden hacer búsquedas por ingredientes o estilos de comida.',
    'projects.recetas.how.footnote':
      'La transformación a formato clásico y a tabla CFE la hace un modelo de IA a partir del contenido del link.',
    'projects.recetas.s1': 'Importar link',
    'projects.recetas.s1d': 'URL de una receta',
    'projects.recetas.s2': 'Modelo de IA',
    'projects.recetas.s2d': 'Extrae ingredientes y pasos',
    'projects.recetas.s3': 'Formato clásico',
    'projects.recetas.s3d': 'Lista + pasos numerados',
    'projects.recetas.s4': 'Tabla CFE',
    'projects.recetas.s4d': 'Estructura alternativa',
    'projects.recetas.s5': 'Búsqueda',
    'projects.recetas.s5d': 'Ingredientes o estilos',

    'projects.mapa.title': 'Mapa local por la memoria',
    'projects.mapa.desc':
      'Mapa interactivo de sitios de memoria local: elegís un punto de partida, explorás capas (murales, escuelas, abuelas, CCD, lugares de secuestro) y abrís la información de cada lugar en el recorrido.',
    'projects.mapa.how.summary':
      'Aplicación interactiva para recorrer sitios de memoria en Quequén y Necochea. Elegís de dónde partís, abrís capas temáticas sobre el mapa y consultás la información de cada lugar (qué es, por qué importa en la memoria local).',
    'projects.mapa.how.footnote':
      'Proyecto colaborativo PSE UNICEN Quequén: el mapa se navega, no es una imagen fija; cada punto suma contexto del sitio de memoria.',
    'projects.mapa.s1': 'Elegir origen',
    'projects.mapa.s1d': 'Quequén · Terminal · Necochea',
    'projects.mapa.s2': 'Capas de memoria',
    'projects.mapa.s2d': 'Murales, escuelas, abuelas, CCD…',
    'projects.mapa.s3': 'Mapa interactivo',
    'projects.mapa.s3d': 'Zoom, recorrido y puntos',
    'projects.mapa.s4': 'Ficha del lugar',
    'projects.mapa.s4d': 'Info de cada sitio de memoria',

    'projects.portfolio.title': 'Portafolio',
    'projects.portfolio.desc':
      'Mi portafolio personal en Angular: presentación, experiencia, skills, proyectos con demos y contacto.',
    'projects.portfolio.how.summary':
      'Sitio one-page en Angular pensado para presentar mi perfil. No hay backend: el contenido vive en el front, el tema claro/oscuro se guarda en el navegador y las demos se muestran con preview en vivo o captura.',
    'projects.portfolio.s1': 'Secciones',
    'projects.portfolio.s1d':
      'Home, sobre mí, experiencia, skills, proyectos y contacto en una sola página con anclas.',
    'projects.portfolio.s2': 'Tema',
    'projects.portfolio.s2d':
      'Claro / oscuro con ThemeService; cursors y gatos se adaptan al modo.',
    'projects.portfolio.s3': 'Proyectos',
    'projects.portfolio.s3d':
      'Preview por iframe o captura gratis (mShots), más este panel de “cómo funciona”.',
    'projects.portfolio.s4': 'Contacto',
    'projects.portfolio.s4d':
      'Formulario que envía el mensaje por FormSubmit a mi correo, sin abrir el cliente de mail.',

    'contact.eyebrow': 'Contacto',
    'contact.title': 'Ponte en contacto',
    'contact.headline1': 'Hablemos.',
    'contact.headline2': 'Estaré encantada de leerte.',
    'contact.email': 'Correo',
    'contact.phone': 'Teléfono',
    'contact.linkedin': 'LinkedIn',
    'contact.availability': 'Disponibilidad',
    'contact.availabilityValue':
      'Disponible para oportunidades en remoto o híbridas',
    'contact.honeypot': 'No completar',
    'contact.name': 'Nombre',
    'contact.message': 'Mensaje',
    'contact.note': 'Te responderé lo antes posible.',
    'contact.send': 'Enviar →',
    'contact.sending': 'Enviando…',
    'contact.success': '¡Listo! Tu mensaje se envió. Te respondo pronto.',
    'contact.activation':
      'Revisá tu Gmail (katiagadea19@gmail.com) y abrí el link “Activate Form” de FormSubmit. Es solo la primera vez; después el envío queda activo.',
    'contact.error':
      'No se pudo enviar ahora. Probá de nuevo o escribime a katiagadea19@gmail.com.',
    'contact.subjectNamed': 'Contacto portafolio — {{name}}',
    'contact.subjectDefault': 'Contacto desde el portafolio',

    'doc.title': 'Portafolio',
  },

  en: {
    'nav.aria': 'Portfolio sections',
    'nav.homeAria': 'Home — Katia',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.themeToLight': 'Switch to light mode',
    'nav.themeToDark': 'Switch to dark mode',
    'nav.langAria': 'Change language',
    'nav.langEs': 'ES',
    'nav.langEn': 'EN',

    'hero.eyebrow': 'Portfolio',
    'hero.headline': 'Hi, I’m Katia Gadea',
    'hero.tagline': 'Full-Stack Developer · Web & Mobile',
    'hero.sub':
      'Clear products, maintainable code, and a focus on user experience.',
    'hero.cta': 'Contact me',
    'hero.cv': 'Download CV',

    'about.eyebrow': 'Profile',
    'about.title': 'About me',
    'about.p1':
      'I’m a University Technician in Computer Application Development (UNICEN) and I work as a full-stack developer. I move between web and mobile: frontend, backend, authentication, APIs, databases, and cloud services.',
    'about.p2':
      'I graduated from UNICEN Quequén with a University Technician degree in Computer Application Development (2022 — 2026).',
    'about.p3':
      'I like building clear, maintainable products designed for the people who use them. I want to keep growing in projects where I can contribute across web, mobile, API integration, and cloud deployments.',

    'experience.eyebrow': 'Career',
    'experience.title': 'Work experience',
    'experience.role': 'Full-Stack Software Developer',
    'experience.period': 'October 2025 — May 2026',
    'experience.summary':
      'Custom web and mobile apps: contacts, appointments, and messaging.',
    'experience.b1':
      'Contacts web app: people list with emails, phone numbers, and notes per contact, with Google sign-up and sign-in.',
    'experience.b2':
      'Mobile app for car washes: booking appointments, Google authentication, and storing bookings in Firebase.',
    'experience.b3':
      'System to store incoming WhatsApp messages plus a WhatsApp-like chat UI to send and keep the conversation.',
    'experience.b4':
      'Backend and integrations (APIs, auth, storage, and webhooks) to power those web and mobile apps.',

    'skills.eyebrow': 'Stack',
    'skills.title': 'Technical skills',
    'skills.lead':
      'Tools and technologies I use for web, mobile, and backend products.',
    'skills.languagesTitle': 'Languages',
    'skills.g1.title': 'Languages',
    'skills.g1.blurb': 'Foundations I use to build products and APIs.',
    'skills.g2.title': 'Web frontend',
    'skills.g2.blurb': 'Modern, maintainable web interfaces.',
    'skills.g3.title': 'Mobile',
    'skills.g3.blurb': 'Native apps with React Native and Expo.',
    'skills.g4.title': 'Backend',
    'skills.g4.blurb': 'APIs, runtimes, and integration services.',
    'skills.g5.title': 'Data & ORM',
    'skills.g5.blurb': 'Persistence, queries, and data modeling.',
    'skills.g6.title': 'Cloud & DevOps',
    'skills.g6.blurb': 'Auth, cloud, containers, and code quality.',
    'skills.g7.title': 'Other',
    'skills.g7.blurb': 'Frameworks, maps, analytics, and tooling.',
    'skills.lang.es.name': 'Spanish',
    'skills.lang.es.level': 'NATIVE',
    'skills.lang.en.name': 'English',
    'skills.lang.en.level': 'A1 · TECHNICAL READING',

    'projects.eyebrow': 'Selected',
    'projects.title': 'Project gallery',
    'projects.lead': 'Here are some of the projects I’ve worked on.',
    'projects.how': 'How it works',
    'projects.demo': 'Demo →',
    'projects.github': 'GitHub ↗',
    'projects.close': 'Close ×',
    'projects.viewGithub': 'View on GitHub ↗',
    'projects.openDemo': 'Open demo →',
    'projects.previewAria': 'Preview of {{title}}',
    'projects.openDemoAria': 'Open demo for {{title}}',
    'projects.shotAlt': 'Screenshot of {{title}}',

    'projects.plantas.title': 'Patio plants',
    'projects.plantas.desc':
      'Web app to track patio plants: seasonal watering, postpone for rain, fertilizer, pruning, pest treatment, and a photo history.',
    'projects.plantas.how.summary':
      'A daily care web app for the patio. Today shows pending tasks and rain logging; Plants lets you add each plant with summer/winter watering intervals; on the plant page you mark watered, fertilized, pruned, or treated and attach photos to the history.',
    'projects.plantas.how.footnote':
      'Data lives in SQLite with Prisma; photos are stored on the server. Built to use on phone or desktop.',
    'projects.plantas.s1': 'Today',
    'projects.plantas.s1d': 'Tasks and quick actions',
    'projects.plantas.s2': 'Plants',
    'projects.plantas.s2d': 'Add plants and watering intervals',
    'projects.plantas.s3': 'Season',
    'projects.plantas.s3d': 'Summer or winter',
    'projects.plantas.s4': 'Actions',
    'projects.plantas.s4d': 'Water, fertilizer, pruning…',
    'projects.plantas.s5': 'History',
    'projects.plantas.s5d': 'Events and photos',

    'projects.recetas.title': 'Recipes',
    'projects.recetas.desc':
      'Recipe library: you import a link, an AI model extracts ingredients and steps, structures them into a classic format and a CFE table, then you can search by ingredients or food styles.',
    'projects.recetas.how.summary':
      'Recipe library: import a link, extract ingredients and steps, and an AI model transforms them into two structures — classic format (ingredient list and numbered steps) and CFE table. Then you can search by ingredients or food styles.',
    'projects.recetas.how.footnote':
      'The transformation into classic format and CFE table is done by an AI model from the link content.',
    'projects.recetas.s1': 'Import link',
    'projects.recetas.s1d': 'URL of a recipe',
    'projects.recetas.s2': 'AI model',
    'projects.recetas.s2d': 'Extracts ingredients and steps',
    'projects.recetas.s3': 'Classic format',
    'projects.recetas.s3d': 'List + numbered steps',
    'projects.recetas.s4': 'CFE table',
    'projects.recetas.s4d': 'Alternative structure',
    'projects.recetas.s5': 'Search',
    'projects.recetas.s5d': 'Ingredients or styles',

    'projects.mapa.title': 'Local memory map',
    'projects.mapa.desc':
      'Interactive map of local memory sites: choose a starting point, explore layers (murals, schools, grandmothers, clandestine centers, kidnapping sites), and open information for each place on the route.',
    'projects.mapa.how.summary':
      'Interactive app to explore memory sites in Quequén and Necochea. Choose where you start from, open thematic layers on the map, and read about each place (what it is and why it matters for local memory).',
    'projects.mapa.how.footnote':
      'Collaborative PSE UNICEN Quequén project: the map is navigable, not a static image; each point adds context about the memory site.',
    'projects.mapa.s1': 'Choose origin',
    'projects.mapa.s1d': 'Quequén · Terminal · Necochea',
    'projects.mapa.s2': 'Memory layers',
    'projects.mapa.s2d': 'Murals, schools, grandmothers, CCD…',
    'projects.mapa.s3': 'Interactive map',
    'projects.mapa.s3d': 'Zoom, routes, and points',
    'projects.mapa.s4': 'Place details',
    'projects.mapa.s4d': 'Info for each memory site',

    'projects.portfolio.title': 'Portfolio',
    'projects.portfolio.desc':
      'My personal Angular portfolio: intro, experience, skills, projects with demos, and contact.',
    'projects.portfolio.how.summary':
      'One-page Angular site to present my profile. No backend: content lives in the front end, light/dark theme is stored in the browser, and demos use a live preview or screenshot.',
    'projects.portfolio.s1': 'Sections',
    'projects.portfolio.s1d':
      'Home, about, experience, skills, projects, and contact on one page with anchors.',
    'projects.portfolio.s2': 'Theme',
    'projects.portfolio.s2d':
      'Light / dark with ThemeService; cursors and cats adapt to the mode.',
    'projects.portfolio.s3': 'Projects',
    'projects.portfolio.s3d':
      'Preview via iframe or free screenshot (mShots), plus this “how it works” panel.',
    'projects.portfolio.s4': 'Contact',
    'projects.portfolio.s4d':
      'Form that sends the message through FormSubmit to my email, without opening a mail client.',

    'contact.eyebrow': 'Contact',
    'contact.title': 'Get in touch',
    'contact.headline1': 'Let’s talk.',
    'contact.headline2': 'I’d love to hear from you.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
    'contact.availability': 'Availability',
    'contact.availabilityValue': 'Open to remote or hybrid opportunities',
    'contact.honeypot': 'Do not fill in',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.note': 'I’ll get back to you as soon as I can.',
    'contact.send': 'Send →',
    'contact.sending': 'Sending…',
    'contact.success': 'Done! Your message was sent. I’ll reply soon.',
    'contact.activation':
      'Check your Gmail (katiagadea19@gmail.com) and open the FormSubmit “Activate Form” link. It’s only needed once; then sending stays active.',
    'contact.error':
      'Couldn’t send right now. Try again or email me at katiagadea19@gmail.com.',
    'contact.subjectNamed': 'Portfolio contact — {{name}}',
    'contact.subjectDefault': 'Contact from the portfolio',

    'doc.title': 'Portfolio',
  },
};
