import React from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useSpring } from 'motion/react'
import { startDotField } from './dotField'
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
    ['Products', '#products'],
    ['About Kelvin', '#about'],
    ['FAQ', '#faq'],
    ['Contact', '#contact'],
  ]

  return <header className="header" id="top">
    <div className="header__inner wrap">
      <a className="logo" href="#top" aria-label="Kelvin home" onClick={() => setOpen(false)}>
        <img src={`${asset}kelvin-full-logo.svg`} alt="Kelvin" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header__enquire" href="#contact">Enquiry guidance <Arrow diagonal /></a>
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
      <motion.p className="hero__intro" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}>Kelvin brings a decade of experience to professional cleaning. Discover our direction, explore the developing range, and find the right conversation for your business.</motion.p>
      <motion.div className="hero__actions" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}>
        <a className="button button--blue" href="#products">Explore the range <Arrow diagonal /></a>
        <a className="text-link" href="#about">Discover Kelvin <Arrow /></a>
      </motion.div>
    </div>
    <div className="hero__aside" aria-hidden="true"><span className="hero__vertical">Made for the work behind every clean space</span><span className="hero__line" /></div>
    <div className="hero__bottom"><span>Built on 10 years of experience</span><span className="hero__scroll">Scroll to explore <span aria-hidden="true">↓</span></span></div>
  </section>
}

function Range() {
  const [active, setActive] = React.useState(0)
  return <section className="range section-space" id="products" aria-labelledby="products-title">
    <div className="wrap">
      <div className="section-heading">
        <p className="kicker">The range</p>
        <h2 id="products-title">Cleaning starts with the right application.</h2>
        <p>Explore the areas Kelvin is shaping into its new digital catalogue. Individual product information will be added as it is confirmed.</p>
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
      <p className="range__note">Range preview only. Final Kelvin products, specifications, and technical documents are being confirmed.</p>
    </div>
  </section>
}

function About() {
  return <section className="about" id="about" aria-labelledby="about-title">
    <div className="wrap about__grid">
      <div className="about__number"><strong>10</strong><span>years in the business</span></div>
      <div className="about__copy"><p className="kicker">A new chapter</p><h2 id="about-title">A decade of experience. A clearer way forward.</h2><p>Kelvin is a Dubai-based company in cleaning and disinfectant chemistry. This new identity is a chance to show the work, products, and people behind the name with greater clarity.</p><a className="text-link text-link--light" href="#contact">See enquiry guidance <Arrow /></a></div>
    </div>
  </section>
}

function Principles() {
  return <section className="principles section-space" aria-labelledby="principles-title"><div className="wrap principles__grid"><div><p className="kicker">How to explore</p><h2 id="principles-title">From application to conversation.</h2></div><div className="principles__items"><div><span>01</span><h3>Start with your setting</h3><p>Tell us where and how the product will be used.</p></div><div><span>02</span><h3>Find the right range</h3><p>Explore categories that match the work at hand.</p></div><div><span>03</span><h3>Request the details</h3><p>Ask Kelvin for current product and technical information.</p></div></div></div></section>
}

function Faq() {
  const questions = [
    ['Where is Kelvin based?', 'Kelvin is based in Dubai. More detailed location and service-area information will be added after confirmation.'],
    ['Can I browse the full catalogue here?', 'This first version introduces product families. The confirmed Kelvin product list and technical documents will be added next.'],
    ['How can I ask about a specific application?', 'Use the enquiry section below to see the information Kelvin will need. Direct contact details and form delivery will be connected once confirmed.'],
  ]
  return <section className="faq section-space" id="faq" aria-labelledby="faq-title"><div className="wrap faq__grid"><div><p className="kicker">Good to know</p><h2 id="faq-title">Questions about Kelvin</h2><p>More answers will follow when the product and company information is finalized.</p></div><div className="faq__items">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
}

function Contact() {
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="wrap contact__grid"><div><p className="kicker">The next conversation</p><h2 id="contact-title">Tell us what you need to clean.</h2><p>Share your application, environment, and the information you need. Kelvin’s direct contact details and enquiry form are being finalized for launch.</p></div><div className="contact__panel"><span className="contact__panel-title">For a useful enquiry, prepare:</span><ul><li>Your company and location</li><li>The cleaning task or application</li><li>Any product or technical requirements</li><li>Approximate quantity or frequency</li></ul><span className="contact__pending">Enquiry channel coming soon</span></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer__top"><a href="#top" aria-label="Kelvin home"><img src={`${asset}kelvin-full-logo.svg`} alt="Kelvin" /></a><p>Cleaning chemistry for a changing world.</p></div><div className="footer__bottom"><span>© {new Date().getFullYear()} Kelvin. Website preview.</span><nav aria-label="Footer navigation"><a href="#products">Products</a><a href="#about">About</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></nav></div></div></footer>
}

function App() {
  return <><Background /><div className="site"><Header /><main><Hero /><Range /><About /><Principles /><Faq /><Contact /></main><Footer /></div></>
}

createRoot(document.getElementById('root')).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>)
