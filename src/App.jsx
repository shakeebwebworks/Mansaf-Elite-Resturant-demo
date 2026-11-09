
import React, { useState } from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Instagram,
  Utensils,
  ChevronRight
} from "lucide-react";
import "./styles.css";

const photos = {
  hero: "https://images.pexels.com/photos/36934953/pexels-photo-36934953.jpeg?auto=compress&cs=tinysrgb&w=2200",
  lamb: "https://images.pexels.com/photos/36984950/pexels-photo-36984950.jpeg?auto=compress&cs=tinysrgb&w=1200",
  grill: "https://images.pexels.com/photos/36734922/pexels-photo-36734922.jpeg?auto=compress&cs=tinysrgb&w=1200",
  mixed: "https://images.pexels.com/photos/34110269/pexels-photo-34110269.jpeg?auto=compress&cs=tinysrgb&w=1200",
  interior: "https://images.pexels.com/photos/17294688/pexels-photo-17294688.jpeg?auto=compress&cs=tinysrgb&w=1400",
  dining: "https://images.pexels.com/photos/19456977/pexels-photo-19456977.jpeg?auto=compress&cs=tinysrgb&w=1400",
  ambience: "https://images.pexels.com/photos/29819295/pexels-photo-29819295.jpeg?auto=compress&cs=tinysrgb&w=1400"
};

const dishes = [
  { name: "Al Qasr Platter", category: "Signature Collection", image: photos.lamb },
  { name: "Deja-E-Mansaf", category: "Arabic Speciality", image: photos.hero },
  { name: "Mixed Grill Platter", category: "Chef's Selection", image: photos.grill },
  { name: "Royal Meat Feast", category: "Premium Collection", image: photos.mixed }
];

const gallery = [
  photos.hero,
  photos.grill,
  photos.lamb,
  photos.interior,
  photos.dining,
  photos.ambience
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const links = [
    ["Home", "#home"],
    ["Our Story", "#about"],
    ["Menu", "#menu"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"]
  ];

  return (
    <div className="website">

      {/* NAVIGATION */}

      <nav className="navbar">
        <a href="#home" className="brand">
          <img
            src="/images/mansaf-logo.png"
            alt="Mansaf Elite Logo"
            onError={(e) => e.currentTarget.style.display = "none"}
          />
          <span>M A N S A F <b>ELITE</b></span>
        </a>

        <div className="nav-links">
          {links.map(([name, link]) => (
            <a key={name} href={link}>{name}</a>
          ))}
        </div>

        <a href="#contact" className="nav-button">
          Reserve a Table <ArrowUpRight size={16}/>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X/> : <Menu/>}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(([name, link]) => (
              <a
                key={name}
                href={link}
                onClick={() => setMobileOpen(false)}
              >
                {name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}

      <section className="hero" id="home">
        <motion.img
          className="hero-image"
          src={photos.hero}
          alt="Arabic lamb and rice platter"
          initial={{ scale: 1.16 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />

        <div className="hero-overlay"/>

        <div className="hero-content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ✦ INDIAN & ARABIC FINE DINING ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            A Taste <br/>
            <em>Beyond</em> Ordinary.
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Discover the richness of Indian and Arabic
            flavours, crafted for unforgettable moments.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <a href="#menu" className="gold-button">
              Explore Our Menu <ArrowUpRight size={18}/>
            </a>

            <a href="#contact" className="outline-button">
              Discover More
            </a>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>01 — THE ART OF DINING</span>
          <span>BELAGAVI, INDIA</span>
        </div>
      </section>

      {/* INTRO */}

      <section className="about section" id="about">
        <Reveal>
          <p className="eyebrow">WELCOME TO MANS​​AF ELITE</p>
          <h2>
            More Than a Meal. <br/>
            <em>It's an Experience.</em>
          </h2>
          <p className="about-description">
            A destination for those who appreciate exceptional
            flavours, beautiful food presentation and memorable
            dining experiences. Discover Indian and Arabic
            culinary traditions at Mansaf Elite.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="about-image">
          <img src={photos.interior} alt="Restaurant interior inspiration"/>
          <div className="image-label">
            <span>THE MANS​​AF EXPERIENCE</span>
          </div>
        </Reveal>
      </section>

      {/* SIGNATURE DISHES */}

      <section className="menu-section section" id="menu">
        <Reveal className="section-heading">
          <p className="eyebrow">A WORLD OF FLAVOUR</p>
          <h2>Signature <em>Creations</em></h2>
          <p>Discover our premium dining collection.</p>
        </Reveal>

        <div className="dish-grid">
          {dishes.map((dish, index) => (
            <Reveal delay={index * 0.12} key={dish.name}>
              <motion.article
                className="dish-card"
                whileHover={{ y: -10 }}
              >
                <div className="dish-image">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                  />
                  <span className="dish-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="dish-info">
                  <div>
                    <span>{dish.category}</span>
                    <h3>{dish.name}</h3>
                  </div>
                  <ArrowUpRight size={23}/>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="menu-bottom">
          <a href="#contact" className="gold-button">
            Enquire About Our Menu <ArrowUpRight size={17}/>
          </a>
        </div>
      </section>

      {/* EXPERIENCE */}

      <section className="experience">
        <img src={photos.dining} alt="Elegant dining ambience"/>
        <div className="experience-overlay"/>
        <Reveal className="experience-content">
          <p className="eyebrow">THE ART OF HOSPITALITY</p>
          <h2>Every Detail.<br/><em>Every Moment.</em></h2>
          <p>
            A beautiful setting, memorable flavours
            and an experience worth returning for.
          </p>
          <a href="#gallery" className="gold-button">
            Explore the Experience <ChevronRight/>
          </a>
        </Reveal>
      </section>

      {/* GALLERY */}

      <section className="gallery-section section" id="gallery">
        <Reveal className="section-heading">
          <p className="eyebrow">VISUAL JOURNAL</p>
          <h2>A Feast for <em>the Senses.</em></h2>
          <p>Food, atmosphere and the art of dining.</p>
        </Reveal>

        <div className="gallery-grid">
          {gallery.map((photo, index) => (
            <motion.div
              className="gallery-item"
              key={index}
              whileHover={{ scale: 0.97 }}
              onClick={() => setSelectedImage(photo)}
            >
              <img src={photo} alt={`Restaurant gallery ${index + 1}`} loading="lazy"/>
              <span>0{index + 1} <ArrowUpRight size={18}/></span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              aria-label="Close image"
              onClick={() => setSelectedImage(null)}
            >
              <X size={30}/>
            </button>
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              alt="Selected gallery photograph"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT */}

      <section className="contact-section section" id="contact">
        <Reveal>
          <p className="eyebrow">YOUR TABLE AWAITS</p>
          <h2>Make It a <em>Moment.</em></h2>
          <p>
            Visit Mansaf Elite Restaurant and experience
            Indian and Arabic dining in Belagavi.
          </p>

          <a
            className="gold-button"
            href="https://www.google.com/maps/search/?api=1&query=Mansaf+Elite+Restaurant+Belagavi"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={18}/> Find Our Location
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          M A N S A F <b>ELITE</b>
        </a>

        <p>Come Hungry. Leave Obsessed.</p>

        <a
          href="https://www.instagram.com/mansafelite.ixg/"
          target="_blank"
          rel="noreferrer"
          className="instagram-link"
        >
          <Instagram size={19}/> Follow Us
        </a>

        <div className="footer-line"/>
        <small>© 2026 Mansaf Elite Restaurant. All rights reserved.</small>
      </footer>

    </div>
  );
}
