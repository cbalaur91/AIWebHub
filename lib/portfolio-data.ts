export interface Project {
  id: string
  slug: string
  title: string
  category: string
  image: string
  imageAlt: string
  description: string
  tags: string[]
  url: string
  caseStudy: {
    overview: string
    challenge: string
    approach: string
    solution: string
    results: string
    technologies: string[]
  }
}

export const projects: Project[] = [
  {
    id: "project-1",
    slug: "romanian-banquet-hall",
    title: "Romanian Banquet Hall",
    category: "landing-page",
    image: "/Banquet_Hall.JPG",
    imageAlt: "Romanian Banquet Hall website screenshot showing elegant event venue with gold-accented interior design",
    description: "Located in Warren, Mi, Romanian Banquet Hall offers an elegant and sophisticated venue for your special events. With over 20 years of experience, we've hosted countless weddings, corporate events, and celebrations.",
    tags: ["UI/UX", "React", "Animation"],
    url: "https://www.romanianbanquethall.com/",
    caseStudy: {
      overview: "Romanian Banquet Hall is a premier event venue in Warren, Michigan, with over two decades of experience hosting weddings, corporate events, and celebrations. They needed a modern website that would showcase their elegant facilities, streamline the booking inquiry process, and convey the warmth and sophistication of their venue to prospective clients searching online. The previous website was outdated, lacked mobile responsiveness, and did not effectively communicate the quality of the venue experience.",
      challenge: "The primary challenge was translating the physical elegance of Romanian Banquet Hall into a digital experience. The existing website failed to capture the atmosphere of the venue, had no clear call-to-action for booking inquiries, loaded slowly on mobile devices, and ranked poorly in local search results for event venue-related keywords in the Warren and Metro Detroit area. The client also needed a way to display their event gallery and pricing information without overwhelming first-time visitors.",
      approach: "We began with a discovery session to understand the venue's brand identity, target audience, and competitive landscape. We analyzed top-performing event venue websites for design inspiration and user experience best practices. The design direction focused on large, high-quality imagery, smooth scroll animations, and a clean layout that guides visitors from initial impression to booking inquiry. We prioritized mobile-first development since most venue searches happen on smartphones.",
      solution: "We built a single-page landing site using React with smooth scroll navigation and parallax effects that create an immersive browsing experience. The design features full-width hero imagery of the venue, an animated gallery section showcasing past events, a clear services overview with pricing tiers, and a prominent contact form integrated directly into the page flow. We implemented lazy loading for images to ensure fast load times and added structured data markup for local business SEO. The site was deployed on a global CDN for optimal performance.",
      results: "After launch, Romanian Banquet Hall saw a significant increase in online booking inquiries within the first month. The new website achieved excellent Core Web Vitals scores, with a Largest Contentful Paint under 2 seconds on mobile. The venue now appears in local search results for key terms including 'banquet hall Warren MI' and 'event venue Metro Detroit.' The client reports that visitors frequently comment on how well the website reflects the actual venue experience, leading to higher-quality leads and faster booking conversions.",
      technologies: ["React", "TailwindCSS", "Framer Motion", "Responsive Design", "SEO Optimization", "Image Optimization"]
    }
  },
  {
    id: "project-2",
    slug: "quality-work-granite",
    title: "Quality Work Granite",
    category: "portfolio",
    image: "/qwgranite-logo.png",
    imageAlt: "Quality Work Granite portfolio website featuring premium stone countertop fabrication projects",
    description: "Crafting exceptional stone surfaces for discerning homeowners.",
    tags: ["Portfolio", "Gatsby", "Animation"],
    url: "https://www.qwgranite.com/",
    caseStudy: {
      overview: "Quality Work Granite is a stone fabrication company specializing in premium granite, quartz, and marble countertops for residential and commercial projects. They needed a portfolio-style website that would showcase their craftsmanship, display their material selection, and generate leads from homeowners and contractors planning kitchen and bathroom renovations. The company had relied solely on word-of-mouth referrals and needed a digital presence to reach a broader customer base.",
      challenge: "Quality Work Granite had no existing website, which meant they were invisible to the growing number of homeowners who research countertop providers online before making purchasing decisions. The challenge was creating a site that could visually demonstrate the quality of their work through project photography, provide enough information for customers to understand the fabrication process, and include clear pathways to request quotes. The site also needed to perform well in local search results for countertop-related keywords.",
      approach: "We conducted a competitive analysis of countertop fabrication websites in the Michigan area and identified opportunities to differentiate through design quality and content depth. The approach centered on building a visually rich portfolio site with project galleries organized by material type, an educational section explaining the stone selection and installation process, and strategically placed calls-to-action. We used Gatsby for static site generation to ensure fast page loads, which is critical for image-heavy portfolio sites.",
      solution: "The finished website features a clean, modern design with a masonry-style portfolio grid showcasing completed projects with high-resolution photography. Each project page includes details about the stone material, edge profile, and installation context. We built an animated material selection guide that helps visitors browse granite, quartz, and marble options. The quote request form captures project details including room type, approximate dimensions, and material preference, giving the Quality Work Granite team qualified leads with enough context to provide accurate estimates.",
      results: "Since launching the website, Quality Work Granite has established a professional online presence that supports their reputation for quality craftsmanship. The portfolio section has become a key sales tool, with the team frequently sharing project links with prospective customers during consultations. The site generates consistent organic traffic from local search queries related to granite countertops and stone fabrication, providing a steady stream of new lead inquiries beyond their traditional referral network.",
      technologies: ["Gatsby", "React", "CSS Animations", "Image Optimization", "Responsive Design", "Local SEO"]
    }
  },
  {
    id: "project-3",
    slug: "romanian-food-festival",
    title: "Romanian Food Festival",
    category: "landing-page",
    image: "/rff.png",
    imageAlt: "Romanian Food Festival website landing page with traditional cuisine photography and event details",
    description: "Experience authentic Romanian cuisine and culture in Rochester Hills, Michigan.",
    tags: ["Landing Page", "Next.js", "Dashboard"],
    url: "https://www.romanianfoodfestival.org/",
    caseStudy: {
      overview: "The Romanian Food Festival is an annual cultural event held in Rochester Hills, Michigan, celebrating authentic Romanian cuisine, traditions, and community. The organizers needed a website that would serve as the central hub for event information, attract attendees from across the Metro Detroit area, and provide practical details like menu highlights, entertainment schedules, and directions. The site needed to be updated seasonally as event details changed each year.",
      challenge: "The festival organizers faced the challenge of promoting a seasonal event that needed to build excitement and drive attendance within a limited timeframe. Previous promotion relied heavily on social media and flyers, which limited reach. The website needed to be easily updatable by non-technical team members, load quickly on mobile devices since most visitors would access it while planning or attending the event, and convey the vibrant, welcoming atmosphere of the festival through its design.",
      approach: "We designed the site with a content-first strategy, prioritizing the information visitors care about most: what food is available, when and where the event takes place, and how to get there. The visual design draws inspiration from Romanian cultural elements while maintaining a modern, appetizing aesthetic. We built the site with Next.js to enable fast static page generation and easy content updates. The architecture was designed so that the festival team could update dates, menu items, and schedules for each year's event with minimal effort.",
      solution: "The landing page features a striking hero section with food photography, a countdown timer to the next event, a scrollable menu section with traditional Romanian dishes and descriptions, an entertainment and activities schedule, location details with an embedded map, and a newsletter signup for event updates. We implemented an admin-friendly content structure that allows the festival team to update key information without developer assistance. The site includes social sharing functionality and integration with the festival's social media accounts to amplify promotion.",
      results: "The website has become the primary information source for festival attendees, significantly reducing the volume of repetitive questions the organizers receive on social media. Online promotion through the website has expanded the festival's reach beyond the local Romanian community to food enthusiasts across Michigan. The site consistently ranks for searches related to Romanian food events in Michigan, and the newsletter signup has built a growing list of engaged attendees who return year after year.",
      technologies: ["Next.js", "React", "TailwindCSS", "Responsive Design", "SEO Optimization", "Social Integration"]
    }
  },
  {
    id: "project-4",
    slug: "church-fundraising",
    title: "Church Fundraising",
    category: "landing-page",
    image: "/schooldesign.jpg",
    imageAlt: "Church fundraising website with classroom renderings and donation progress tracker",
    description: "Support our mission to create new classrooms for religious education",
    tags: ["Landing Page", "Fundraising", "Animation"],
    url: "https://fundraising-pogorarea-sfantului-duh.vercel.app/",
    caseStudy: {
      overview: "A Romanian Orthodox church community launched a fundraising campaign to build new classrooms for their religious education program. They needed a dedicated website that would clearly communicate the mission, share the vision for the new educational spaces, and provide a simple, trustworthy way for community members and supporters to contribute donations. The campaign needed to reach both local parishioners and members of the wider Romanian diaspora who wanted to support the project.",
      challenge: "Fundraising campaigns for community organizations face unique challenges in building trust and urgency. The church needed a website that would feel professional and credible while maintaining the warm, community-oriented tone appropriate for a religious institution. The donation process needed to be simple and secure, and the site needed to clearly show progress toward the fundraising goal to encourage continued contributions. Many potential donors were not highly technical, so the user experience needed to be extremely intuitive.",
      approach: "We focused on storytelling and transparency as the core design principles. The site architecture was built around a clear narrative: why the classrooms are needed, what they will look like, and how each donation contributes to the goal. We used progress indicators and specific project milestones to create a sense of momentum. The design draws on traditional architectural imagery while maintaining a clean, modern layout that conveys both tradition and forward vision. We ensured the donation flow required minimal clicks.",
      solution: "The finished landing page features an emotional hero section with renderings of the planned classrooms, a mission statement section, a visual fundraising progress tracker, detailed information about how funds will be allocated, testimonials from community leaders and educators, and a secure donation integration. The design uses warm colors and carefully chosen imagery to create an atmosphere of community and purpose. We built the site with responsive design so it works seamlessly on all devices, recognizing that many donors would access it from mobile devices after services or community events.",
      results: "The fundraising website has successfully centralized the campaign's online presence, providing a credible and professional platform that supporters can share with friends and family. The clear progress tracking has created positive momentum, with donation activity increasing notably after each milestone update. The site has extended the campaign's reach beyond the local parish to supporters in other states and countries, something that was not possible through traditional fundraising methods alone.",
      technologies: ["Next.js", "React", "TailwindCSS", "Responsive Design", "Animation", "Secure Payments"]
    }
  },
  {
    id: "project-6",
    slug: "88-transpoort-llc",
    title: "88 Transpoort LLC",
    category: "landing-page",
    image: "/88transpoort-logonew.png",
    imageAlt: "88 Transpoort LLC car hauling company website with driver recruitment landing page",
    description: "Join Chicago's premier car hauling company as an owner operator. Competitive rates, consistent loads, and unmatched support.",
    tags: ["Landing Page", "Car Hauling", "Transportation"],
    url: "https://www.88transpoortllc.com/",
    caseStudy: {
      overview: "88 Transpoort LLC is a car hauling company based in Chicago that connects with owner operators to transport vehicles across the United States. They needed a professional website to recruit qualified owner operators, showcase their competitive rates and support structure, and establish credibility in the transportation industry. The company was growing rapidly and needed a digital presence that matched their ambitions and helped them stand out in a competitive driver recruitment market.",
      challenge: "The car hauling industry is highly competitive for recruiting qualified owner operators, and many companies rely on word-of-mouth or generic job boards. 88 Transpoort LLC needed a website that would differentiate them from competitors by clearly communicating their value proposition: competitive pay rates, consistent load availability, and comprehensive driver support. The site also needed to convey professionalism and reliability to potential business partners and clients while making it easy for interested operators to apply.",
      approach: "We researched the transportation and logistics industry to understand what owner operators prioritize when evaluating potential companies to work with. The design strategy focused on clear, direct communication of benefits, easy access to application forms, and professional imagery that conveys the scale and reliability of the operation. We structured the content to address common questions operators have about pay, routes, equipment requirements, and support services, reducing barriers to application.",
      solution: "The landing page features a bold, professional design with a strong value proposition in the hero section, a benefits breakdown with specific details about rates and load frequency, a streamlined application process accessible from multiple points on the page, testimonials from current operators, and company information that establishes credibility. We optimized the site for speed and mobile performance, recognizing that many truck drivers browse on mobile devices during downtime. The application form was designed to capture essential qualification information while remaining quick to complete.",
      results: "Since launching the website, 88 Transpoort LLC has seen an increase in qualified applications from owner operators. The professional online presence has also helped the company establish credibility with new business clients and partners. The website serves as a central resource that the recruiting team shares with potential operators, streamlining the initial information and screening process. The clear presentation of benefits and straightforward application process has reduced the time from first contact to onboarding for new operators.",
      technologies: ["Next.js", "React", "TailwindCSS", "Responsive Design", "Form Integration", "SEO Optimization"]
    }
  },
  {
    id: "project-7",
    slug: "divine-retreat-salon",
    title: "Divine Retreat Salon",
    category: "business",
    image: "/DivineRetreatLogo.jpg",
    imageAlt: "Divine Retreat Salon business website showcasing premium hair and spa services in Utica, Michigan",
    description: "A sanctuary for rejuvenation in Utica, Michigan offering premium hair services and therapeutic massage in an intimate, peaceful environment.",
    tags: ["Business Site", "Next.js", "Salon & Spa"],
    url: "https://www.divineretreatsalon.com/",
    caseStudy: {
      overview: "Divine Retreat Salon is a premium salon and spa in Utica, Michigan, offering hair services, therapeutic massage, and rejuvenation treatments in an intimate, peaceful setting. They needed a multi-page business website that would reflect the tranquil, luxurious atmosphere of their physical space, present their full service menu with pricing, and make it easy for clients to book appointments. The website needed to position Divine Retreat as a destination for self-care rather than just another salon.",
      challenge: "The salon industry is saturated online, and many salon websites look generic or outdated. Divine Retreat Salon needed a site that would immediately differentiate them by conveying the unique, serene experience they offer. The challenge was translating the sensory experience of the salon—calming ambiance, attention to detail, premium products—into a visual digital experience. Additionally, the site needed to serve both existing clients looking to book appointments and new clients discovering the salon through search engines.",
      approach: "We started with an in-depth brand discovery session to understand Divine Retreat's positioning, target clientele, and the specific atmosphere they wanted to communicate. The design direction emphasized minimalist elegance with generous white space, soft color palettes, and high-quality imagery that evokes relaxation and luxury. We planned a multi-page structure with dedicated sections for each service category, allowing for detailed descriptions that help clients make informed decisions. Local SEO was integrated from the beginning to capture searches for salon services in the Utica and Macomb County area.",
      solution: "The multi-page website features an immersive homepage with lifestyle imagery and clear service category navigation, dedicated pages for hair services and massage treatments with detailed descriptions and pricing, an about page that tells the story of the salon's founding and philosophy, and a contact page with integrated booking functionality. The design uses a refined typographic system, subtle animations on scroll, and a cohesive color palette that reflects the salon's brand. We implemented local business structured data, optimized page load speeds, and ensured the mobile experience is flawless since most salon bookings happen on phones.",
      results: "The new website has elevated Divine Retreat Salon's online presence to match the quality of their in-person experience. Clients consistently mention discovering the salon through Google searches, and the detailed service pages help reduce pre-appointment questions. The site ranks well for local search terms including 'salon Utica MI' and 'massage Macomb County,' driving a steady flow of new client inquiries. The professional online presence has also helped the salon attract and retain premium clientele who value the elevated experience Divine Retreat offers.",
      technologies: ["Next.js", "React", "TailwindCSS", "Framer Motion", "Local SEO", "Responsive Design"]
    }
  },
  {
    id: "project-8",
    slug: "salinair",
    title: "Salinair Salt Room & Wellness Spa",
    category: "business",
    image: "/salinair.png",
    imageAlt: "Salinair Salt Room and Wellness Spa website with Himalayan salt therapy room photography",
    description: "Experience the transformative power of salt therapy and holistic wellness at Salinair. Natural healing for your respiratory system, skin, and overall well-being.",
    tags: ["Business Site", "Next.js", "Wellness & Spa"],
    url: "https://salinair.com",
    caseStudy: {
      overview: "Salinair is a holistic wellness center in Rochester Hills, Michigan, specializing in halotherapy (salt therapy), massage, Halo-Reiki, mindfulness meditation, and group wellness sessions. They needed a modern, immersive website that would educate visitors about the science behind salt therapy, showcase their beautifully designed salt rooms, present their full service menu with transparent pricing, and integrate with their Arketa booking system for seamless online appointment scheduling. The site needed to establish Salinair as the premier salt therapy destination in Metro Detroit.",
      challenge: "Halotherapy is still unfamiliar to many consumers, which meant the website had to serve a dual purpose: educating potential clients about what salt therapy is and why it works, while simultaneously making it easy for existing clients to book sessions. The previous online presence did not adequately convey the unique, serene atmosphere of Salinair's salt rooms or explain the health benefits in a credible, accessible way. Additionally, the booking flow needed to be frictionless since wellness clients often browse and book on mobile devices between appointments or during lunch breaks.",
      approach: "We designed the experience around a journey from curiosity to conversion. The visual direction drew inspiration from the actual ambiance of the salt rooms—warm amber tones from Himalayan salt lamps, soft purple lighting, and natural textures. We structured the content to first capture attention with stunning room photography, then educate with clear explanations of halotherapy benefits backed by scientific credibility, and finally convert with prominent booking CTAs throughout the page. We prioritized image optimization and performance since the site relies heavily on atmospheric photography to create an emotional connection.",
      solution: "The finished website features an immersive hero section with full-width salt room photography and the tagline 'Breathe Naturally, Heal Holistically.' A comprehensive services section presents all six offerings—halotherapy, massage therapy, Halo-Reiki, mindfulness meditation, breath and movement classes, and group sessions—with clear pricing starting from $25 to $85 per session. An educational section explains how pharmaceutical-grade dry salt particles work to clear mucus, reduce inflammation, and boost immunity. A gallery showcases over twelve professionally photographed images of the private salt rooms, group rooms, and meditation spaces. The Arketa booking integration allows clients to schedule sessions directly from the website. We implemented local business structured data targeting Rochester Hills and the broader Oakland County area.",
      results: "The new website has transformed Salinair's digital presence into an experience that mirrors the tranquility of visiting the salt rooms in person. The educational content has proven effective at converting curious first-time visitors into booked clients, with many reporting they felt confident trying salt therapy after reading about the science and benefits on the site. The integrated booking system has streamlined operations, reducing phone inquiries for scheduling. The site performs well in local search results for terms including 'salt therapy Rochester Hills,' 'halotherapy near me,' and 'salt room Michigan,' bringing a consistent stream of new clients to the wellness center.",
      technologies: ["Next.js", "React", "TailwindCSS", "Arketa Booking Integration", "Image Optimization", "Local SEO", "Responsive Design"]
    }
  },
  {
    id: "project-9",
    slug: "hotelscout-ai",
    title: "HotelScout AI",
    category: "web-app",
    image: "/hotelscoutai.png",
    imageAlt: "HotelScout AI hotel search platform interface showing AI-powered travel booking with map view",
    description: "Find your perfect hotel, powered by AI. Search and compare deals on over 2 million hotels worldwide. Best rates guaranteed.",
    tags: ["Web App", "AI-Powered", "Travel & Hospitality"],
    url: "https://hotelscoutai.com",
    caseStudy: {
      overview: "HotelScout AI is an AI-powered hotel search and booking platform that aggregates deals from over two million properties worldwide, enabling travelers to find and compare the best rates in one place. The project required building a full-featured travel platform with real-time search, dynamic pricing, multi-language support for over 30 languages, multi-currency transactions, interactive mapping, and integrated payment processing. The platform needed to handle high-volume concurrent searches while delivering fast, relevant results to users across the globe.",
      challenge: "Building a hotel search platform that competes in the crowded online travel space demanded performance, reliability, and scale from day one. The core challenges included aggregating and normalizing hotel inventory data from multiple suppliers into a unified search experience, delivering sub-second search results across millions of properties, supporting a truly global audience with multi-language and multi-currency capabilities, integrating mapping for location-based browsing, and processing payments securely across international transactions. The platform also needed a clean, intuitive interface that made complex search and comparison workflows feel effortless for casual travelers.",
      approach: "We architected the platform with a performance-first mindset, choosing AWS infrastructure with CloudFront CDN for global content delivery and low-latency responses regardless of user location. The front-end was built with React for a dynamic, single-page application experience that handles complex search states, filters, and real-time updates without full page reloads. We designed the search interface around progressive disclosure—starting with a simple destination and date picker, then revealing filters, map views, and comparison tools as users refined their search. The AI component powers smart ranking and personalized recommendations based on search patterns and preferences.",
      solution: "The finished platform features a clean, modern interface centered around an intuitive search experience. The homepage presents a full-width hero with destination search, date selection, and guest configuration. Search results display in a responsive grid with property photos, star ratings, pricing, and key amenities, with options to toggle between list and map views powered by Mapbox. Each property page includes detailed descriptions, photo galleries, room type options with transparent pricing, and a streamlined booking flow integrated with Stripe for secure payment processing. The multi-language system supports over 30 languages with automatic detection based on user locale, and the multi-currency engine displays prices in the traveler's preferred currency with real-time conversion. The platform is deployed on AWS with SSL via ACM, CloudFront distribution for global performance, and auto-scaling to handle traffic spikes during peak booking seasons.",
      results: "HotelScout AI has launched as a fully functional hotel search and booking platform serving a global audience. The platform delivers search results across its two-million-property inventory with fast response times thanks to the CDN-backed architecture. The multi-language and multi-currency support has enabled the platform to attract users from diverse international markets without requiring separate regional sites. The AI-powered ranking surfaces the most relevant properties based on user preferences, improving the search-to-booking conversion rate. The clean, mobile-responsive interface ensures a consistent booking experience across all devices, which is critical given that the majority of travel searches now originate on smartphones.",
      technologies: ["React", "AWS CloudFront", "Mapbox", "Stripe Payments", "AI/ML Ranking", "Multi-Language (30+)", "Responsive Design", "REST APIs"]
    }
  },
  {
    id: "project-10",
    slug: "bestpick-usa",
    title: "BestPick USA",
    category: "web-app",
    image: "/bestpickusa.png",
    imageAlt: "BestPick USA independent product review platform showing category browsing for electronics, smart home, and kitchen products",
    description: "Independent and unbiased product testing platform. Hands-on reviews, real price tracking across retailers, and honest recommendations with no sponsored placements.",
    tags: ["Web App", "Next.js", "E-Commerce & Reviews"],
    url: "https://www.bestpickusa.com/",
    caseStudy: {
      overview: "BestPick USA is an independent product review and price tracking platform that tests electronics, smart home devices, kitchen appliances, and more hands-on, providing unbiased recommendations without sponsored placements or pay-to-play rankings. The project required building a content-rich platform with category-based browsing, detailed buying guides, real-time price tracking across major retailers, and a search system that helps consumers find the right product quickly. The site needed to establish trust and authority in a space dominated by affiliate-driven review sites.",
      challenge: "The consumer product review space is crowded with sites that prioritize affiliate revenue over honest recommendations, eroding consumer trust. BestPick USA needed a platform that would differentiate itself through transparency and editorial independence while still being commercially viable. The technical challenges included building a scalable content management system for hundreds of product reviews and buying guides, integrating real-time price data from multiple retailers, organizing products across nine distinct categories with intuitive navigation, and ensuring fast load times for content-heavy pages with product imagery and comparison tables.",
      approach: "We designed the platform around the core principle of trust through transparency. The visual design uses a clean, dark-themed interface that puts product information front and center without distracting advertisements or promotional banners. The information architecture was structured around categories and buying guides, allowing users to either browse by product type or dive directly into curated recommendation lists. We prioritized search functionality and category filtering to minimize the clicks between landing on the site and finding relevant product recommendations. The content structure was built to support SEO at scale, with each guide and review optimized for search intent.",
      solution: "The finished platform features a category-driven homepage with nine product categories including Televisions, Laptops, Cameras, Smart Home, Headphones & Audio, SSDs, Gaming & Accessories, Vacuums, and Kitchen Appliances. Each category leads to detailed buying guides with hands-on test results, product comparisons, and real price tracking across retailers. The search system allows users to find specific products instantly. The site was built with Next.js for optimal performance and SEO, featuring server-side rendering for content pages, dynamic price data integration, and a responsive design that works seamlessly across desktop and mobile devices. The clean, ad-free interface reinforces the brand's commitment to unbiased recommendations.",
      results: "BestPick USA has launched as a credible alternative to ad-heavy review sites, with its independent editorial approach resonating with consumers seeking trustworthy product recommendations. The category-based navigation and comprehensive buying guides keep users engaged across multiple pages per session. The site's SEO-optimized content structure drives organic traffic for high-intent product research queries, and the transparent, no-sponsored-placements policy has helped build a loyal returning audience that trusts the platform's recommendations for their purchasing decisions.",
      technologies: ["Next.js", "React", "TailwindCSS", "Price Tracking API", "Search Integration", "SEO Optimization", "Responsive Design"]
    }
  },
]

export const categories = [
  { label: "All", value: "all" },
  { label: "Landing Pages", value: "landing-page" },
  { label: "Portfolios", value: "portfolio" },
  { label: "Business Sites", value: "business" },
  { label: "Web Apps", value: "web-app" },
]
