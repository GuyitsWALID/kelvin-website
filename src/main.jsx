import React from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { startDotField } from './dotField'
import products from './catalogue.json'
import './styles.css'

const asset = '/assets/'

const families = [
  {
    name: 'Laundry care',
    scope: 'For professional textile care workflows',
    detail: 'Explore solutions by stage of the wash process, fabric need, and operating environment.',
    shape: 'laundry',
  },
  {
    name: 'Kitchen & warewashing',
    scope: 'For busy food-service operations',
    detail: 'Find a starting point for dish, utensil, and kitchen cleaning enquiries.',
    shape: 'kitchen',
  },
  {
    name: 'Surface care',
    scope: 'For shared and high-use spaces',
    detail: 'Browse by surface and cleaning task as Kelvin’s approved catalogue is prepared.',
    shape: 'surface',
  },
  {
    name: 'Disinfection',
    scope: 'For hygiene-focused applications',
    detail: 'Discuss your application with Kelvin to identify the appropriate approved product information.',
    shape: 'disinfection',
  },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
}

function Background() {
  const reduceMotion = useReducedMotion()
  const canvas = React.useRef(null)
  const x = useSpring(0.5, { stiffness: 95, damping: 24 })
  const y = useSpring(0.5, { stiffness: 95, damping: 24 })
  const activity = useSpring(0, { stiffness: 90, damping: 22 })

  React.useEffect(() => {
    if (reduceMotion) return
    const stop = startDotField(canvas.current, x, y, activity)
    let settle
    const move = (event) => {
      x.set(event.clientX / window.innerWidth)
      y.set(event.clientY / window.innerHeight)
      activity.set(1)
      clearTimeout(settle)
      settle = setTimeout(() => activity.set(0.35), 350)
    }
    const reset = () => { clearTimeout(settle); activity.set(0) }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', reset)
    document.addEventListener('pointerleave', reset)
    return () => {
      stop()
      clearTimeout(settle)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', reset)
      document.removeEventListener('pointerleave', reset)
    }
  }, [reduceMotion, x, y, activity])

  return <div className="site-background" aria-hidden="true">
    <div className="site-background__texture" />
    <canvas ref={canvas} className="site-background__canvas" />
    <div className="site-background__shade" />
  </div>
}

function Header() {
  const [open, setOpen] = React.useState(false)
  const links = [
    ['Products', '/products.html'],
    ['About Kelvin', '/#about'],
    ['FAQ', '/#faq'],
    ['Contact', '/#contact'],
  ]

  return <header className="header" id="top">
    <div className="header__inner wrap">
      <a className="logo" href="/" aria-label="Kelvin home" onClick={() => setOpen(false)}>
        <img src={`${asset}kelvin-full-logo.svg`} alt="Kelvin" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header__enquire" href="/#contact">Enquiry guidance <Arrow diagonal /></a>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </div>
    <AnimatePresence>
      {open && <motion.nav key="mobile-menu" id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<Arrow diagonal /></a>)}
      </motion.nav>}
    </AnimatePresence>
  </header>
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? false : { opacity: 0, y: 24 }
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero__body">
      <motion.p className="hero__eyebrow" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Dubai · Cleaning & disinfectant chemistry</motion.p>
      <motion.h1 id="hero-title" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>A cleaner future starts with the work we do today.</motion.h1>
      <motion.p className="hero__intro" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}>Kelvin brings nine years of experience to professional cleaning. Explore our current products and find the right conversation for your business.</motion.p>
      <motion.div className="hero__actions" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}>
        <a className="button button--blue" href="/products.html">Explore the range <Arrow diagonal /></a>
        <a className="text-link" href="#about">Discover Kelvin <Arrow /></a>
      </motion.div>
    </div>
    <div className="hero__aside" aria-hidden="true"><span className="hero__vertical">Made for the work behind every clean space</span><span className="hero__line" /></div>
    <div className="hero__bottom"><span>Built on nine years of experience</span><span className="hero__scroll">Scroll to explore <span aria-hidden="true">↓</span></span></div>
  </section>
}

function Range() {
  const [active, setActive] = React.useState(0)
  return <section className="range section-space" id="products" aria-labelledby="products-title">
    <div className="wrap">
      <div className="section-heading">
        <p className="kicker">The range</p>
        <h2 id="products-title">Cleaning starts with the right application.</h2>
        <p>Explore Kelvin’s cleaning categories and the products behind its refreshed catalogue.</p>
      </div>
      <div className="range__grid">
        <div className="range__list" aria-label="Product family previews">
          {families.map((family, index) => <button key={family.name} type="button" aria-pressed={active === index} className={`range__row ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)}>
            <span className="range__row-name">{family.name}</span><span className="range__row-scope">{family.scope}</span><Arrow diagonal />
          </button>)}
        </div>
        <div className="range__visual" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={active} className={`range__visual-inner shape--${families[active].shape}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.32 }}>
              <div className="range__form" aria-hidden="true"><span /><span /><span /></div>
              <div className="range__visual-copy"><span>Application preview</span><h3>{families[active].name}</h3><p>{families[active].detail}</p></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="range__note">Product-specific directions and safety information should be checked against Kelvin’s technical documents.</p>
      <a className="text-link range__catalogue-link" href="/products.html">Browse the full catalogue <Arrow /></a>
    </div>
  </section>
}

function About() {
  return <section className="about" id="about" aria-labelledby="about-title">
    <div className="wrap about__grid">
      <div className="about__number"><strong>9</strong><span>years since founding</span></div>
      <div className="about__copy"><p className="kicker">A new chapter</p><h2 id="about-title">Nine years in. A clearer way forward.</h2><p>Kelvin's office is in Dubai, with manufacturing in Khalifa Economic Zones Abu Dhabi (KEZAD). The new identity brings its product range and company story into clearer focus.</p><a className="text-link text-link--light" href="#contact">See enquiry guidance <Arrow /></a></div>
    </div>
  </section>
}

function Principles() {
  return <section className="principles section-space" aria-labelledby="principles-title"><div className="wrap principles__grid"><div><p className="kicker">How to explore</p><h2 id="principles-title">From application to conversation.</h2></div><div className="principles__items"><div><span>01</span><h3>Start with your setting</h3><p>Tell us where and how the product will be used.</p></div><div><span>02</span><h3>Find the right range</h3><p>Explore categories that match the work at hand.</p></div><div><span>03</span><h3>Request the details</h3><p>Ask Kelvin for current product and technical information.</p></div></div></div></section>
}

function Faq() {
  const questions = [
    ['Where is Kelvin based?', 'Kelvin has an office in Dubai. Manufacturing is in Khalifa Economic Zones Abu Dhabi (KEZAD). Exact contact details will be added after confirmation.'],
    ['Can I browse the full catalogue here?', 'Yes. The catalogue shows Kelvin’s current priority range alongside concepts still being developed. Request the matching technical documents for product use.'],
    ['How can I ask about a specific application?', 'The contact section includes a demo form showing the details Kelvin will need. It does not send an enquiry yet.'],
  ]
  return <section className="faq section-space" id="faq" aria-labelledby="faq-title"><div className="wrap faq__grid"><div><p className="kicker">Good to know</p><h2 id="faq-title">Questions about Kelvin</h2><p>More answers will follow when the product and company information is finalized.</p></div><div className="faq__items">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
}

function Contact() {
  const [submitted, setSubmitted] = React.useState(false)
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="wrap contact__grid"><div><p className="kicker">The next conversation</p><h2 id="contact-title">Tell us what you need to clean.</h2><p>Show us the application, environment, and information you need. This form is a demo while Kelvin's enquiry channel is being prepared.</p></div><form className="contact__panel contact__form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} onChange={() => setSubmitted(false)}><span className="contact__panel-title">Enquiry preview</span><p className="contact__form-note">Demo only. Details entered here are not sent or saved.</p><label>Your name<input name="name" autoComplete="name" required /></label><label>Business email<input name="email" type="email" autoComplete="email" inputMode="email" required /></label><label>Company<input name="company" autoComplete="organization" required /></label><label>What do you need?<textarea name="message" rows="4" required placeholder="Tell us about the cleaning task, product range, or technical details you need." /></label><button className="button button--blue contact__submit" type="submit">Preview enquiry <Arrow diagonal /></button><p className="contact__form-status" role="status">{submitted ? 'Demo complete. No enquiry was sent; Kelvin contact delivery will be connected before launch.' : 'Submission is disabled for delivery in this website preview.'}</p></form></div></section>
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer__top"><a href="/" aria-label="Kelvin home"><img src={`${asset}kelvin-full-logo.svg`} alt="Kelvin" /></a><p>Cleaning chemistry for a changing world.</p></div><div className="footer__bottom"><span>© {new Date().getFullYear()} Kelvin. Website preview.</span><nav aria-label="Footer navigation"><a href="/products.html">Products</a><a href="/#about">About</a><a href="/#faq">FAQ</a><a href="/#contact">Contact</a></nav></div></div></footer>
}

function ProductCard({ product }) {
  const reduceMotion = useReducedMotion()
  return <motion.article className="product-card" initial="rest" whileHover={reduceMotion ? undefined : 'hover'}>
    <div className="product-card__image">
      <motion.img src={`/products/${product.id.toLowerCase()}.png`} alt={`Kelvin ${product.name} container`} loading="lazy" variants={{ rest: { y: 0, scale: 1, rotate: 0 }, hover: { y: -11, scale: 1.045, rotate: -1 } }} transition={{ type: 'spring', stiffness: 190, damping: 20 }} />
      <span className="product-card__status">{product.current ? 'Current range' : 'Concept'}</span>
    </div>
    <div className="product-card__copy"><span>{product.family} · {product.id}</span><h3>{product.name}</h3><p>{product.description}</p></div>
  </motion.article>
}

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches)
  React.useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])
  return matches
}

function CarouselCard({ product, index, count, progress, spacing, active }) {
  const offset = useTransform(() => {
    const wrapped = ((index - progress.get() * count) % count + count) % count
    return wrapped > count / 2 ? wrapped - count : wrapped
  })
  const x = useTransform(offset, [-2, -1, 0, 1, 2], [-2 * spacing, -spacing, 0, spacing, 2 * spacing])
  const y = useTransform(offset, [-2, -1, 0, 1, 2], [28, 14, 0, 14, 28])
  const scale = useTransform(offset, [-2, -1, 0, 1, 2], [0.55, 0.8, 1, 0.8, 0.55])
  const opacity = useTransform(offset, [-2, -1, 0, 1, 2], [0, 0.6, 1, 0.6, 0])
  const zIndex = useTransform(() => Math.max(1, 3 - Math.round(Math.abs(offset.get()))))

  return <motion.article className={`carousel-card${active === index ? ' is-active' : ''}`} style={{ x, y, scale, opacity, zIndex }}>
    <div className="carousel-card__image"><img src={`/products/${product.id.toLowerCase()}.png`} alt={`Kelvin ${product.name} container`} loading="lazy" /></div>
    <div className="carousel-card__copy"><span>{product.family} · {product.id}</span><h3>{product.name}</h3></div>
  </motion.article>
}

function FeaturedCarousel({ items, heading }) {
  const trackRef = React.useRef(null)
  const stageRef = React.useRef(null)
  const reduceMotion = useReducedMotion()
  const [spacing, setSpacing] = React.useState(0)
  const count = items.length

  React.useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () => {
      const card = stage.querySelector('.carousel-card')
      if (card) setSpacing(card.offsetWidth * 0.78)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [items.length])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 })
  const progress = reduceMotion ? scrollYProgress : smoothProgress
  const [active, setActive] = React.useState(0)

  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.round(value * count) % count
    setActive((current) => current === next ? current : next)
  })

  return <div className="featured-carousel" ref={trackRef} style={{ height: `calc(100svh + ${count * 26}svh)` }}>
    <div className="featured-carousel__sticky">
      <div className="featured-carousel__heading">{heading}</div>
      <div className="featured-carousel__stage" ref={stageRef}>
        {items.map((product, index) => <CarouselCard key={product.id} product={product} index={index} count={count} progress={progress} spacing={spacing} active={active} />)}
      </div>
      <div className="featured-carousel__meta"><span>{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span><span className="featured-carousel__bar" aria-hidden="true"><motion.span style={{ scaleX: progress }} /></span><span>Keep scrolling</span></div>
    </div>
  </div>
}

function Featured() {
  const isMobile = useMediaQuery('(max-width: 820px)')
  const featured = products.filter((product) => product.featured)
  const showCarousel = isMobile
  const heading = <div className="featured__heading"><div><p className="kicker">Current Kelvin range</p><h2 id="featured-title">A closer look at the range.</h2></div><p>The priority products shared for Kelvin’s refreshed catalogue. Technical details are available on request.</p></div>
  return <section className="featured section-space" aria-labelledby="featured-title"><div className="wrap">{showCarousel ? <FeaturedCarousel items={featured} heading={heading} /> : <>{heading}<div className="featured__grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div></>}<a className="text-link featured__link" href="/products.html">View the full catalogue <Arrow /></a></div></section>
}

function CataloguePage() {
  const [query, setQuery] = React.useState('')
  const [family, setFamily] = React.useState('All')
  const [page, setPage] = React.useState(1)
  const gridRef = React.useRef(null)
  const families = ['All', ...new Set(products.map((product) => product.family))]
  const filtered = products.filter((product) => (family === 'All' || product.family === family) && `${product.name} ${product.application} ${product.id}`.toLowerCase().includes(query.toLowerCase().trim()))
  const pageSize = 9
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pageCount)
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize)

  const goToPage = (next) => {
    if (next < 1 || next > pageCount) return
    setPage(next)
    gridRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  return <><section className="catalogue-hero"><div className="wrap"><p className="kicker">Kelvin product catalogue</p><h1>Products for the work behind every clean space.</h1><p>Explore the current Kelvin products alongside developing floor care, laundry, warewashing, and surface-care concepts. Request product-specific technical documents before use.</p></div></section><section className="catalogue section-space" aria-labelledby="catalogue-title"><div className="wrap"><div className="catalogue__head"><div><p className="kicker">Browse by application</p><h2 id="catalogue-title">The Kelvin range</h2></div><label className="catalogue__search"><span>Search products</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Name, task, or code" /></label></div><div className="catalogue__filters" aria-label="Product family filter">{families.map((option) => <button type="button" key={option} aria-pressed={family === option} onClick={() => { setFamily(option); setPage(1) }}>{option}</button>)}</div><p className="catalogue__count" role="status">{filtered.length} {filtered.length === 1 ? 'product' : 'products'} · Page {current} of {pageCount}</p>{visible.length ? <div className="catalogue__grid" ref={gridRef}>{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="catalogue__empty">No products match that search. Try another name or category.</p>}{pageCount > 1 && filtered.length > 0 && <nav className="catalogue__pagination" aria-label="Catalogue pagination"><button type="button" onClick={() => goToPage(current - 1)} disabled={current === 1} aria-label="Previous page">←</button>{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-current={current === index + 1 ? 'page' : undefined} onClick={() => goToPage(index + 1)}>{index + 1}</button>)}<button type="button" onClick={() => goToPage(current + 1)} disabled={current === pageCount} aria-label="Next page">→</button></nav>}<p className="catalogue__disclaimer">Product visuals are for catalogue presentation. Request the matching Kelvin label and technical documents for directions, hazards, and specifications.</p></div></section><Contact /></>
}

function App() {
  const isCatalogue = window.location.pathname.endsWith('/products.html')
  return <><Background /><div className="site"><Header /><main>{isCatalogue ? <CataloguePage /> : <><Hero /><Range /><Featured /><About /><Principles /><Faq /><Contact /></>}</main><Footer /></div></>
}

createRoot(document.getElementById('root')).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>)
