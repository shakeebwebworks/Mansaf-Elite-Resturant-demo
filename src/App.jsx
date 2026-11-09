import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  ArrowUpRight, ArrowRight, Menu as MenuIcon, X, Instagram, MapPin,
  Phone, Clock3, Utensils, ChevronDown, Sparkles
} from 'lucide-react';

const IG_URL = 'https://www.instagram.com/mansafelite.ixg/';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Mansaf+Elite+Restaurant+Belagavi';

const dishes = [
  { name: 'Al Qasr Platter', tag: 'Signature selection', image: '/images/al-qasr-platter.jpg', number: '01' },
  { name: 'Deja-E-Mansaf', tag: 'A house favourite', image: '/images/mansaf-rice.jpg', number: '02' },
  { name: 'Arabic Meat Platter', tag: 'Made for sharing', image: '/images/meat-pot.jpg', number: '03' },
];

const menuGroups = {
  'Arabic Specialities': ['Mansaf & rice specialities', 'Signature Arabic platters', 'Slow-cooked meat selections'],
  'Indian Non-Veg': ['Indian non-vegetarian favourites', 'Traditional rice preparations', 'Chef-selected specialities'],
  'Signature Platters': ['Al Qasr Platter', 'Deja-E-Mansaf', 'Sharing platters'],
  'Grills & Kebabs': ['Grilled meat selections', 'Kebab specialities', 'Tandoor-inspired favourites'],
  'Beverages': ['Refreshing coolers', 'Classic beverages', 'Restaurant favourites'],
};

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div
    className={className}
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.16 }}
    transition={{ delay }}
  >{children}</motion.div>;
}

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#home" aria-label="Mansaf Elite home">
    <img src="/images/mansaf-logo.png" alt="Mansaf Elite original logo" />
    <span><strong>Mansaf <i>Elite</i></strong><small>INDIAN & ARABIC CUISINE</small></span>
  </a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Arabic Specialities');
  const [lightbox, setLightbox] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85 });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const navItems = [['Story', '#story'], ['Signature', '#signature'], ['Menu', '#menu'], ['Gallery', '#gallery'], ['Visit', '#visit']];
  const gallery = [
    { src: '/images/al-qasr-platter.jpg', alt: 'Mansaf Elite signature platter' },
    { src: '/images/mansaf-rice.jpg', alt: 'Rice and meat speciality' },
    { src: '/images/meat-pot.jpg', alt: 'Traditional meat preparation' },
    { src: '/images/feast-platter.jpg', alt: 'A table spread of restaurant dishes' },
    { src: '/images/dining-interior.jpg', alt: 'Mansaf Elite dining ambience' },
    { src: '/images/food-drinks.jpg', alt: 'Food and refreshing drinks' },
  ];

  function handleReservation(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return <>
    <div className="announcement"><span className="announcement-dot" /> BELAGAVI · INDIAN & ARABIC FINE DINING <span className="announcement-line" /></div>
    <header className="header">
      <Brand />
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
        {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#reservation" onClick={() => setMenuOpen(false)}>Reserve a table <ArrowUpRight size={15} /></a>
      </nav>
      <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <MenuIcon />}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.div className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}>
            <span /> A SIGNATURE DINING EXPERIENCE <span />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42, duration: .9 }}>
            A taste<br /><em>beyond</em> ordinary.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .8 }}>
            Come hungry. Leave obsessed. Discover the richness of Indian and Arabic flavours, served with an unforgettable touch.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: .7 }}>
            <a className="button button-gold" href="#menu">Explore the menu <ArrowUpRight size={17} /></a>
            <a className="button button-ghost" href="#reservation">Reserve your table</a>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <span>01 / A WORLD OF FLAVOUR</span>
          <span className="scroll-cue"><span /> SCROLL TO DISCOVER</span>
          <span>BELAGAVI, INDIA</span>
        </div>
        <div className="hero-stamp"><span>THE ART OF</span><strong>GOOD<br />TASTE</strong><span>EST. IN BELAGAVI</span></div>
      </section>

      <section className="intro section-pad" id="story">
        <Reveal className="intro-copy">
          <div className="eyebrow"><span /> OUR STORY</div>
          <h2>More than a meal.<br /><em>It's an experience.</em></h2>
          <p className="lead">A table where rich Indian flavours meet the warmth of Arabic-inspired dining.</p>
          <p className="body-copy">At Mansaf Elite, every visit is an invitation to slow down, gather around the table and enjoy food made to be remembered. From signature platters to generous flavours, discover a dining experience in the heart of Belagavi.</p>
          <a className="text-link" href="#signature">Discover our signatures <ArrowUpRight size={16} /></a>
        </Reveal>
        <Reveal className="intro-visual" delay={.12}>
          <div className="intro-photo"><img src="/images/feast-platter.jpg" alt="A spread of Mansaf Elite restaurant dishes" /></div>
          <div className="photo-note"><span>THE MANS​​AF ELITE EXPERIENCE</span><strong>Flavour brings<br />us together.</strong></div>
          <div className="intro-ornament">M<span>E</span></div>
        </Reveal>
      </section>

      <section className="signature section-pad" id="signature">
        <div className="section-heading">
          <Reveal><div className="eyebrow"><span /> THE HOUSE FAVOURITES</div><h2>Made to be <em>remembered.</em></h2></Reveal>
          <Reveal delay={.12}><p>Explore a few of the dishes that make every visit worth looking forward to.</p></Reveal>
        </div>
        <div className="dish-grid">
          {dishes.map((dish, i) => <Reveal key={dish.name} delay={i * .1} className="dish-card">
            <div className="dish-image"><img src={dish.image} alt={dish.name} /><span className="dish-number">{dish.number}</span><span className="dish-arrow"><ArrowUpRight /></span></div>
            <div className="dish-meta"><span>{dish.tag}</span><h3>{dish.name}</h3></div>
          </Reveal>)}
        </div>
      </section>

      <section className="quote-band">
        <div className="quote-image" />
        <div className="quote-overlay" />
        <Reveal className="quote-content">
          <div className="eyebrow"><span /> THE JOY OF GATHERING <span /></div>
          <h2>Good food.<br /><em>Great company.</em><br />Golden moments.</h2>
          <a className="button button-gold" href="#reservation">Make it a moment <ArrowUpRight size={17} /></a>
        </Reveal>
      </section>

      <section className="menu-section section-pad" id="menu">
        <Reveal className="menu-intro">
          <div className="eyebrow"><span /> A MENU TO EXPLORE</div>
          <h2>Find your <em>favourite.</em></h2>
          <p>From Arabic specialities to Indian non-vegetarian favourites, there is something to bring everyone to the table.</p>
          <div className="menu-disclaimer">Menu categories shown for this website concept. Please confirm current dishes and prices with the restaurant.</div>
        </Reveal>
        <div className="menu-panel">
          <div className="menu-tabs">
            {Object.keys(menuGroups).map(group => <button key={group} className={activeMenu === group ? 'active' : ''} onClick={() => setActiveMenu(group)}>{group}<ArrowUpRight size={14} /></button>)}
          </div>
          <div className="menu-list">
            <div className="menu-list-top"><span>EXPLORE THE COLLECTION</span><Utensils size={19} /></div>
            {menuGroups[activeMenu].map((item, i) => <div className="menu-row" key={item}><span className="menu-index">0{i + 1}</span><h3>{item}</h3><span className="menu-plus">+</span></div>)}
            <a className="text-link" href={IG_URL} target="_blank" rel="noreferrer">Ask for the full menu <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-heading gallery-heading">
          <Reveal><div className="eyebrow"><span /> A GLIMPSE INSIDE</div><h2>Served with <em>style.</em></h2></Reveal>
          <Reveal delay={.1}><p>A look at the food, flavours and atmosphere shared on Mansaf Elite's Instagram.</p></Reveal>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, i) => <button className={`gallery-item gallery-item-${i + 1}`} key={item.src} onClick={() => setLightbox(item)} aria-label={`Open image: ${item.alt}`}>
            <img src={item.src} alt={item.alt} loading="lazy" /><span className="gallery-view"><Sparkles size={17} /> VIEW</span>
          </button>)}
        </div>
        <div className="gallery-foot"><span>REAL MOMENTS FROM OUR SOCIAL FEED</span><a href={IG_URL} target="_blank" rel="noreferrer">Follow on Instagram <Instagram size={16} /></a></div>
      </section>

      <section className="reservation-section section-pad" id="reservation">
        <div className="reservation-copy">
          <Reveal><div className="eyebrow"><span /> YOUR TABLE AWAITS</div><h2>Make room for<br /><em>something special.</em></h2><p>Planning a meal with friends or family? Get in touch with the restaurant to enquire about your visit.</p>
          <div className="reservation-detail"><span><Clock3 size={17} /></span><div><small>OPENING HOURS</small><strong>Contact the restaurant for today's timings</strong></div></div>
          <div className="reservation-detail"><span><MapPin size={17} /></span><div><small>FIND US</small><strong>Belagavi, Karnataka, India</strong></div></div>
          </Reveal>
        </div>
        <Reveal className="reservation-form-wrap" delay={.12}>
          <div className="form-top"><span>TABLE ENQUIRY</span><span>01 — 03</span></div>
          {submitted ? <div className="form-success"><div className="success-mark">✓</div><h3>Thank you.</h3><p>This is a website demo. Please contact Mansaf Elite directly to confirm a reservation.</p><a className="button button-gold" href={IG_URL} target="_blank" rel="noreferrer">Contact on Instagram <ArrowUpRight size={16} /></a></div> :
          <form onSubmit={handleReservation}>
            <label>Your name<input required name="name" placeholder="Enter your name" /></label>
            <label>Phone number<input required name="phone" type="tel" placeholder="Your contact number" /></label>
            <div className="form-row">
              <label>Guests<select defaultValue="" required><option value="" disabled>Select guests</option>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}</select></label>
              <label>Preferred date<input type="date" required /></label>
            </div>
            <label>Preferred time<select defaultValue="" required><option value="" disabled>Select a time</option><option>Lunch</option><option>Dinner</option><option>I'll confirm later</option></select></label>
            <button className="button button-gold form-submit" type="submit">Send an enquiry <ArrowUpRight size={17} /></button>
            <p className="form-note">Demo enquiry form · Reservation confirmation must come directly from the restaurant.</p>
          </form>}
        </Reveal>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-left">
          <div className="eyebrow"><span /> COME FIND US</div>
          <h2>Meet us in<br /><em>Belagavi.</em></h2>
          <p>Good food is even better when shared. We look forward to welcoming you.</p>
          <a className="button button-gold" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a>
        </div>
        <div className="visit-right">
          <div className="map-card">
            <div className="map-grid" />
            <div className="map-pin"><MapPin size={25} /></div>
            <div className="map-label"><strong>Mansaf Elite</strong><span>Belagavi · Karnataka</span></div>
            <a href={MAP_URL} target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-main"><Brand footer /><p>Come hungry. Leave obsessed.<br />Indian & Arabic flavours, elevated.</p><a className="footer-social" href={IG_URL} target="_blank" rel="noreferrer"><Instagram size={17} /> @mansafelite.ixg <ArrowUpRight size={15} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} MANS​​AF ELITE. WEBSITE CONCEPT.</span><a href="#home">BACK TO TOP ↑</a><span>MADE WITH CARE · BELAGAVI</span></div>
    </footer>

    <AnimatePresence>{lightbox && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
      <motion.div className="lightbox-inner" initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96 }} onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button>
        <img src={lightbox.src} alt={lightbox.alt} /><p>{lightbox.alt}</p>
      </motion.div>
    </motion.div>}</AnimatePresence>
    <a className="floating-instagram" href={IG_URL} target="_blank" rel="noreferrer" aria-label="Visit Mansaf Elite Instagram"><Instagram size={19} /></a>
  </>;
}
