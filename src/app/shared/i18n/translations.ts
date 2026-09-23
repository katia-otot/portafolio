export type Locale = 'es' | 'en';

export type TranslationDict = Record<string, string>;

export const TRANSLATIONS: Record<Locale, TranslationDict> = {
  es: {
    'nav.aria': 'Secciones del portafolio',
    'nav.homeAria': 'Inicio — Katia Gadea',
    'nav.descriptor1': 'Desarrolladora full-stack',
    'nav.descriptor2': 'Aplicaciones con propósito',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Tecnologías',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',
    'nav.themeToLight': 'Cambiar a modo claro',
    'nav.themeToDark': 'Cambiar a modo oscuro',
    'nav.langAria': 'Cambiar idioma',
    'nav.langEs': 'ES',
    'nav.langEn': 'EN',

    'hero.eyebrow': 'Desarrollo web & mobile',
    'hero.line1': 'Ideas que se',
    'hero.line2': 'convierten en',
    'hero.lineEm': 'aplicaciones.',
    'hero.sub':
      'Soy Katia, desarrolladora full-stack. Construyo aplicaciones web y móviles, desde la interfaz hasta los datos.',
    'hero.cta': 'Explorá mis proyectos',
    'hero.cv': 'Descarga mi CV',
    'hero.stripAria': 'Áreas de trabajo',
    'hero.strip1': 'Interfaces',
    'hero.strip2': 'Integraciones',
    'hero.strip3': 'Datos',
    'hero.stripRight': 'Aplicaciones que dejan huella',
    'hero.code1': 'construir',
    'hero.code2': 'aprender',
    'hero.code3': 'mejorar',

    'about.eyebrow': 'Perfil',
    'about.title': 'Sobre mí',
    'about.p1':
      'Soy Técnica Universitaria en Desarrollo de Aplicaciones Informáticas (UNICEN, sede Quequén). Trabajo entre web y mobile: interfaz, backend, autenticación, APIs, bases de datos y despliegue.',
    'about.p2':
      'Me recibí de la Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas en UNICEN Quequén.',
    'about.p3':
      'Me interesa construir productos claros, mantenibles y pensados para quien los usa.',

    'experience.eyebrow': 'Trayectoria',
    'experience.title': 'Experiencia',
    'experience.role': 'Desarrolladora de Software Full-Stack',
    'experience.period': 'Octubre 2025 — Mayo 2026',
    'experience.summary':
      'En Unit0 Studio desarrollé aplicaciones web y móviles a medida: contactos, reservas y mensajería, junto con las integraciones que las sostienen.',
    'experience.b1':
      'Web de contactos: listado de personas con emails, celulares y notas, con registro e inicio de sesión con Google.',
    'experience.b2':
      'App móvil para lavaderos de autos: registro de turnos, autenticación con Google y persistencia de reservas en Firebase.',
    'experience.b3':
      'Sistema para guardar mensajes entrantes de WhatsApp e interfaz de chat para enviar y conservar la conversación.',
    'experience.b4':
      'Backend e integraciones (APIs, auth, almacenamiento y webhooks) para sostener esas apps en web y mobile.',

    'skills.eyebrow': 'Stack',
    'skills.title': 'Tecnologías con las que construyo',
    'skills.item.restApis': 'APIs REST',
    'skills.g1.title': 'Frontend web',
    'skills.g2.title': 'Mobile',
    'skills.g3.title': 'Backend e integraciones',
    'skills.g4.title': 'Datos y persistencia',
    'skills.g5.title': 'Infraestructura y despliegue',
    'skills.g6.title': 'Cloud y autenticación',
    'skills.g8.title': 'Herramientas de desarrollo y analítica',

    'projects.eyebrow': 'Selección',
    'projects.title': 'Proyectos seleccionados',
    'projects.lead': 'Una mirada a lo que construyo.',
    'projects.sideNote': 'Herramientas / para un mundo / más humano',
    'projects.how': 'Cómo lo construí',
    'projects.demo': 'Ver proyecto',
    'projects.github': 'Código',
    'projects.close': 'Cerrar',
    'projects.viewGithub': 'Ver código',
    'projects.openDemo': 'Abrir proyecto',
    'projects.previewAria': 'Vista previa de {{title}}',
    'projects.openDemoAria': 'Abrir demo de {{title}}',
    'projects.shotAlt': 'Captura de {{title}}',
    'projects.pending': 'Captura pendiente',
    'projects.prev': 'Proyecto anterior',
    'projects.next': 'Proyecto siguiente',
    'projects.carouselRole': 'carrusel',
    'projects.tabsAria': 'Elegir proyecto',

    'projects.anthos.short': 'Anthos',
    'projects.anthos.title': 'Anthos',
    'projects.anthos.subtitle': 'Un patio, mejor organizado.',
    'projects.anthos.desc':
      'Anthos es una aplicación para organizar el cuidado de un patio. Reúne las tareas de riego, fertilización, poda y tratamientos en una agenda diaria, con ajustes de riego según la estación y la lluvia.\n\nIncluye fichas de plantas con fotos, un mapa del jardín, historial de cuidados y notificaciones para recordar las tareas pendientes.',
    'projects.anthos.descMobile':
      'Organiza el cuidado de un patio compartido con una agenda de riego, fertilización, poda y tratamientos. Incluye ajustes según estación y lluvia, fichas con fotos, mapa, historial y notificaciones.',
    'projects.anthos.how.summary':
      'Web para el cuidado diario del patio. En Hoy ves lo pendiente y registrás lluvia; en Plantas das de alta cada una con intervalos de riego verano/invierno; en la ficha marcás regué, fertilicé, podé o tratamiento y guardás fotos en el historial.',
    'projects.anthos.how.footnote':
      'Los datos viven en SQLite con Prisma; las fotos se guardan en el servidor. Pensada para usar en el celular o en la PC.',
    'projects.anthos.s1': 'Hoy',
    'projects.anthos.s1d': 'Tareas y acciones rápidas',
    'projects.anthos.s2': 'Plantas',
    'projects.anthos.s2d': 'Alta e intervalos de riego',
    'projects.anthos.s3': 'Estación',
    'projects.anthos.s3d': 'Verano u invierno',
    'projects.anthos.s4': 'Acciones',
    'projects.anthos.s4d': 'Riego, fertilizante, poda…',
    'projects.anthos.s5': 'Historial',
    'projects.anthos.s5d': 'Eventos y fotos',

    'projects.recetas.short': 'Recetas',
    'projects.recetas.title': 'Biblioteca de recetas con IA',
    'projects.recetas.subtitle': 'De una receta en internet a un plan para cocinar.',
    'projects.recetas.desc':
      'Permite guardar recetas desde un enlace. La aplicación utiliza IA para transformar el contenido en ingredientes, cantidades y pasos organizados, con búsqueda por título, ingredientes y etiquetas.\n\nAdemás de la vista clásica, ofrece una tabla de cocción que muestra qué acciones pueden hacerse en paralelo y cuáles dependen de otras.',
    'projects.recetas.descMobile':
      'Convierte recetas de enlaces o planillas en ingredientes y pasos organizados con IA. Permite buscar en la biblioteca y cocinar con una vista clásica o una tabla que muestra acciones en paralelo y dependencias.',
    'projects.recetas.how.summary':
      'Recetas es una app web personal para guardar y cocinar recetas. Permite pegar un enlace; un pipeline de IA extrae el contenido, lo normaliza en español y lo guarda estructurado. En cada ficha se pueden consultar ingredientes en su formato original o en gramos/ml, pasos, notas y una tabla CFE: las filas representan ingredientes y las columnas, acciones, para identificar qué se puede hacer al mismo tiempo. La edición puede sincronizarse mediante IA entre ambos formatos. No admite video ni Instagram.',
    'projects.recetas.how.footnote':
      'Stack: Next.js, Prisma, SQLite, Zod, OpenRouter y Docker en un VPS. Zod valida la estructura del JSON; no verifica exactitud culinaria.',
    'projects.recetas.s1': 'Entrada',
    'projects.recetas.s1d': 'URL de blog (no video/Instagram)',
    'projects.recetas.s2': 'Extracción',
    'projects.recetas.s2d': 'HTML + JSON-LD → texto fuente',
    'projects.recetas.s3': 'IA + Zod',
    'projects.recetas.s3d': 'OpenRouter y validación de estructura',
    'projects.recetas.s4': 'Tabla CFE',
    'projects.recetas.s4d': 'Dependencias y acciones en paralelo',
    'projects.recetas.s5': 'Uso',
    'projects.recetas.s5d': 'Vista clásica, búsqueda y edición',

    'projects.mapa.short': 'Mapa',
    'projects.mapa.title': 'Mapa local por la memoria',
    'projects.mapa.subtitle': 'Explorar la memoria de Necochea y Quequén.',
    'projects.mapa.desc':
      'Un mapa interactivo para explorar sitios de memoria de Necochea y Quequén. Permite elegir un punto de partida, recorrer capas temáticas y consultar fichas con información de cada lugar.',
    'projects.mapa.descMobile':
      'Explora sitios de memoria de Necochea y Quequén mediante un mapa interactivo con capas temáticas, selección del punto de partida y fichas de cada lugar.',
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

    'contact.eyebrow': 'Contacto',
    'contact.title': 'Hablemos de tu próximo proyecto.',
    'contact.intro':
      'Si buscas sumar una desarrolladora a tu equipo o tienes un proyecto en mente, me gustaría conocerlo.',
    'contact.aside': 'Software para una vida más habitable.',
    'contact.cta': 'Escríbeme',
    'contact.emailLabel': 'Email',
    'contact.copyEmail': 'Copiar correo',
    'contact.copied': 'Copiado',
    'contact.formToggle': 'Escribir un mensaje',
    'contact.formHide': 'Ocultar formulario',
    'contact.email': 'Correo',
    'contact.phone': 'Teléfono',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.availability': 'Disponibilidad',
    'contact.availabilityValue':
      'Disponible para oportunidades en remoto o híbridas',
    'contact.honeypot': 'No completar',
    'contact.name': 'Nombre',
    'contact.message': 'Mensaje',
    'contact.note': 'Te responderé lo antes posible.',
    'contact.send': 'Enviar',
    'contact.sending': 'Enviando…',
    'contact.success': '¡Listo! Tu mensaje se envió. Te respondo pronto.',
    'contact.error':
      'No se pudo enviar ahora. Probá de nuevo o escribime a katiagadea19@gmail.com.',
    'contact.subjectNamed': 'Contacto portafolio — {{name}}',
    'contact.subjectDefault': 'Contacto desde el portafolio',
    'contact.footerLine': 'Katia Gadea — Desarrolladora full-stack',

    'doc.title': 'Katia Gadea | Desarrollo Full-Stack',
    'doc.description':
      'Portfolio de Katia Gadea: aplicaciones web y móviles, integraciones y proyectos de software.',
  },

  en: {
    'nav.aria': 'Portfolio sections',
    'nav.homeAria': 'Home — Katia Gadea',
    'nav.descriptor1': 'Full-stack developer',
    'nav.descriptor2': 'Applications with purpose',
    'nav.about': 'About',
    'nav.skills': 'Technologies',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.themeToLight': 'Switch to light mode',
    'nav.themeToDark': 'Switch to dark mode',
    'nav.langAria': 'Change language',
    'nav.langEs': 'ES',
    'nav.langEn': 'EN',

    'hero.eyebrow': 'Web & mobile development',
    'hero.line1': 'Turning ideas',
    'hero.line2': 'into',
    'hero.lineEm': 'applications.',
    'hero.sub':
      'I’m Katia, a full-stack developer. I build web and mobile applications, from user interfaces to backend systems and databases.',
    'hero.cta': 'Explore my projects',
    'hero.cv': 'Download my CV',
    'hero.stripAria': 'Areas of work',
    'hero.strip1': 'Interfaces',
    'hero.strip2': 'Integrations',
    'hero.strip3': 'Data',
    'hero.stripRight': 'Apps that make a difference',
    'hero.code1': 'build',
    'hero.code2': 'learn',
    'hero.code3': 'improve',

    'about.eyebrow': 'Profile',
    'about.title': 'About me',
    'about.p1':
      'I’m a full-stack developer with a university-level technical qualification in Computer Application Development from UNICEN’s Quequén campus.',
    'about.p2':
      'I build web and mobile applications, working across user interfaces, backend services, authentication, APIs, databases, and deployment.',
    'about.p3':
      'I enjoy building software that is easy to use, maintainable, and designed around people’s needs.',

    'experience.eyebrow': 'Career',
    'experience.title': 'Experience',
    'experience.role': 'Full-Stack Software Developer',
    'experience.period': 'October 2025 – May 2026',
    'experience.summary':
      'At Unit0 Studio, I developed custom web and mobile applications for contact management, appointment scheduling, and messaging, along with their backend services and integrations.',
    'experience.b1':
      'Built a contact management web app with email addresses, phone numbers, and notes, allowing users to register and sign in with Google.',
    'experience.b2':
      'Developed a mobile app for car wash bookings, with appointment scheduling, Google sign-in, and booking data stored in Firebase.',
    'experience.b3':
      'Built a system for storing incoming WhatsApp messages and a chat interface for sending replies and keeping a conversation history.',
    'experience.b4':
      'Implemented backend services and integrations, including APIs, authentication, data storage, and webhooks, to support these web and mobile applications.',

    'skills.eyebrow': 'Stack',
    'skills.title': 'Technologies I use',
    'skills.item.restApis': 'REST APIs',
    'skills.g1.title': 'Frontend Development',
    'skills.g2.title': 'Mobile Development',
    'skills.g3.title': 'Backend & Integrations',
    'skills.g4.title': 'Data & Persistence',
    'skills.g5.title': 'Infrastructure & Deployment',
    'skills.g6.title': 'Cloud & authentication',
    'skills.g8.title': 'Development Tools & Analytics',

    'projects.eyebrow': 'Selected',
    'projects.title': 'Selected projects',
    'projects.lead': 'A selection of my work.',
    'projects.sideNote': 'Tools / for a more / human world',
    'projects.how': 'How I built it',
    'projects.demo': 'View project',
    'projects.github': 'Code',
    'projects.close': 'Close',
    'projects.viewGithub': 'View code',
    'projects.openDemo': 'Open project',
    'projects.previewAria': 'Preview of {{title}}',
    'projects.openDemoAria': 'Open demo for {{title}}',
    'projects.shotAlt': 'Screenshot of {{title}}',
    'projects.pending': 'Screenshot pending',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.carouselRole': 'carousel',
    'projects.tabsAria': 'Choose a project',

    'projects.anthos.short': 'Anthos',
    'projects.anthos.title': 'Anthos',
    'projects.anthos.subtitle': 'A better-organized garden.',
    'projects.anthos.desc':
      'A web app for managing a shared garden, with a schedule for watering, fertilizing, pruning, and plant treatments. Features include watering adjustments based on the season and rainfall, plant profiles with photos, a garden map, a care history, and reminders.',
    'projects.anthos.descMobile':
      'A web app for managing a shared garden, with a schedule for watering, fertilizing, pruning, and plant treatments. Features include watering adjustments based on the season and rainfall, plant profiles with photos, a garden map, a care history, and reminders.',
    'projects.anthos.how.summary':
      'Anthos is a web app for day-to-day garden care. The Today view shows upcoming tasks and lets you log rainfall. In the Plants view, you can add plants and set separate watering intervals for summer and winter. Each plant’s page lets you record watering, fertilizing, pruning, and treatments, and add photos to its care history.',
    'projects.anthos.how.footnote':
      'The app uses SQLite for data storage and Prisma for database access. Photos are stored on the server. The interface adapts to both mobile and desktop screens.',
    'projects.anthos.s1': 'Today',
    'projects.anthos.s1d': 'Daily tasks and quick actions',
    'projects.anthos.s2': 'Plants',
    'projects.anthos.s2d': 'Plant profiles and watering schedules',
    'projects.anthos.s3': 'Season',
    'projects.anthos.s3d': 'Summer and winter watering settings',
    'projects.anthos.s4': 'Care activities',
    'projects.anthos.s4d': 'Watering, fertilizing, pruning, and treatments',
    'projects.anthos.s5': 'Care history',
    'projects.anthos.s5d': 'Activity logs and photos',

    'projects.recetas.short': 'Recipes',
    'projects.recetas.title': 'AI-powered recipe library',
    'projects.recetas.subtitle': 'From an online recipe to a cooking plan.',
    'projects.recetas.desc':
      'Turn recipes from websites or spreadsheets into structured ingredients and instructions with AI. Search your collection and choose between a traditional recipe view and a cooking workflow that shows which steps can run in parallel and which depend on others.',
    'projects.recetas.descMobile':
      'Turn recipes from websites or spreadsheets into structured ingredients and instructions with AI. Search your collection and choose between a traditional recipe view and a cooking workflow that shows which steps can run in parallel and which depend on others.',
    'projects.recetas.how.summary':
      'Recipes is a personal web app for saving recipes and following them in the kitchen. Paste a recipe URL or import a CSV file from Google Sheets. An AI pipeline extracts the content, standardizes it in Spanish, and saves it as structured data.\n\nEach recipe includes ingredients with their original measurements or metric equivalents (g/ml), step-by-step instructions, and notes. A Cooking for Engineers (CFE) table organizes ingredients into rows and cooking actions into columns, showing which tasks can happen at the same time.\n\nAI-assisted editing helps keep the traditional recipe view and the CFE table in sync. Video and Instagram imports are not supported.',
    'projects.recetas.how.footnote':
      'Built with Next.js, Prisma, SQLite, Zod, and OpenRouter. Deployed on a VPS using Docker. Zod validates the JSON schema, but does not verify the accuracy of the recipe itself.',
    'projects.recetas.s1': 'Import',
    'projects.recetas.s1d': 'Recipe URLs or CSV files from Google Sheets',
    'projects.recetas.s2': 'Content extraction',
    'projects.recetas.s2d': 'HTML content and JSON-LD combined into source text',
    'projects.recetas.s3': 'AI processing',
    'projects.recetas.s3d': 'Recipe structuring with OpenRouter and schema validation with Zod',
    'projects.recetas.s4': 'Cooking workflow',
    'projects.recetas.s4d': 'A CFE table showing task dependencies and parallel steps',
    'projects.recetas.s5': 'Recipe library',
    'projects.recetas.s5d': 'Search, traditional recipe view, and AI-assisted editing',

    'projects.mapa.short': 'Map',
    'projects.mapa.title': 'Local historical memory map',
    'projects.mapa.subtitle':
      'Explore the places that preserve the historical memory of Necochea and Quequén.',
    'projects.mapa.desc':
      'An interactive map of sites of remembrance in Necochea and Quequén. Choose a starting point, explore thematic layers, and discover the history behind each location.',
    'projects.mapa.descMobile':
      'An interactive map of sites of remembrance in Necochea and Quequén. Choose a starting point, explore thematic layers, and discover the history behind each location.',
    'projects.mapa.how.summary':
      'This interactive web app brings together places connected to local history and remembrance in Necochea and Quequén. Users can choose a starting point, explore thematic map layers, and open information panels explaining each location’s history and significance.',
    'projects.mapa.how.footnote':
      'Developed as a collaborative project within PSE at UNICEN’s Quequén campus. The interactive map connects each location with information about its role in local history and remembrance.',
    'projects.mapa.s1': 'Starting point',
    'projects.mapa.s1d': 'Choose between Quequén, the bus terminal, and Necochea',
    'projects.mapa.s2': 'Thematic layers',
    'projects.mapa.s2d': 'Explore murals, schools, and other sites of remembrance',
    'projects.mapa.s3': 'Interactive map',
    'projects.mapa.s3d': 'Explore routes and location markers, and zoom in for a closer look',
    'projects.mapa.s4': 'Site details',
    'projects.mapa.s4d': 'Learn about each location and its historical significance',

    'contact.eyebrow': 'Contact',
    'contact.title': "Let's talk about your next project.",
    'contact.intro':
      'If you’re looking for a developer to join your team or have a project in mind, I’d love to hear from you.',
    'contact.aside': 'Software for a more livable life.',
    'contact.cta': 'Email me',
    'contact.emailLabel': 'Email',
    'contact.copyEmail': 'Copy email address',
    'contact.copied': 'Email copied',
    'contact.formToggle': 'Write a message',
    'contact.formHide': 'Hide form',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.availability': 'Availability',
    'contact.availabilityValue': 'Open to remote or hybrid opportunities',
    'contact.honeypot': 'Do not fill in',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.note': 'I’ll get back to you as soon as I can.',
    'contact.send': 'Send',
    'contact.sending': 'Sending…',
    'contact.success': 'Done! Your message was sent. I’ll reply soon.',
    'contact.error':
      'Couldn’t send right now. Try again or email me at katiagadea19@gmail.com.',
    'contact.subjectNamed': 'Portfolio contact — {{name}}',
    'contact.subjectDefault': 'Contact from the portfolio',
    'contact.footerLine': 'Katia Gadea — Full-stack developer',

    'doc.title': 'Katia Gadea | Full-Stack Development',
    'doc.description':
      'Portfolio of Katia Gadea: web and mobile applications, integrations, and software projects.',
  },
};
