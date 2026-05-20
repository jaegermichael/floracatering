import React from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform } from "framer-motion";

const e = React.createElement;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function Logo({ compact = false } = {}) {
  return e(
    "a",
    { className: compact ? "logo compact" : "logo", href: "#top", "aria-label": "Florac Catering home" },
    e(
      motion.svg,
      {
        viewBox: "0 0 220 120",
        "aria-hidden": "true",
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, ease: "easeOut" }
      },
      e("path", { className: "logo-navy", d: "M24 68c21-33 70-48 116-25 15 8 26 19 33 32-39-17-83-16-149-7Z" }),
      e("path", { className: "logo-navy", d: "M57 58c9-24 29-39 54-39 31 0 54 21 59 53-17-25-39-37-64-37-22 0-39 8-49 23Z" }),
      e("path", { className: "logo-navy", d: "M107 18c9-7 15-14 18-22 7 12 13 19 24 28-15-1-28-3-42-6Z", transform: "translate(-2 10)" }),
      e(motion.path, {
        className: "logo-green",
        d: "M24 77c54 26 106 18 160-8-38 34-96 52-160 8Z",
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 1.1, ease: "easeInOut", delay: 0.2 }
      }),
      e(motion.path, {
        className: "logo-green",
        d: "M163 70c8-29 7-51 33-70 2 33-8 55-33 70Z",
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.15, ease: "easeInOut", delay: 0.35 }
      })
    ),
    e("span", null, e("strong", null, "Florac"), "Catering", e("small", null, "and events services"))
  );
}

function Header() {
  return e(
    motion.header,
    { className: "site-header", initial: { y: -82 }, animate: { y: 0 }, transition: { duration: 0.65, ease: "easeOut" } },
    e(Logo, { compact: true }),
    e("nav", { "aria-label": "Primary navigation" },
      e("a", { href: "#story" }, "Story"),
      e("a", { href: "#menus" }, "Menus"),
      e("a", { href: "#services" }, "Events"),
      e("a", { href: "#quote" }, "Quote")
    ),
    e("a", { className: "phone", href: "tel:+441213890442" }, "0121 389 0442")
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const panelY = useTransform(scrollYProgress, [0, 0.35], [0, 48]);

  return e(
    "section",
    { className: "hero", id: "top" },
    e(
      motion.div,
      { className: "hero-copy", variants: stagger, initial: "hidden", animate: "visible" },
      e(motion.p, { className: "eyebrow", variants: fadeUp }, "Catering - foods - events"),
      e(motion.h1, { variants: fadeUp }, "Catering that feels planned, plated, and personal."),
      e(motion.p, { className: "hero-text", variants: fadeUp }, "Florac turns daily menus, weddings, corporate lunches, and private celebrations into calm, polished food experiences."),
      e(motion.div, { className: "hero-actions", variants: fadeUp },
        e("a", { className: "button primary", href: "#quote" }, "Get a quote"),
        e("a", { className: "button ghost", href: "#menus" }, "See menus")
      )
    ),
    e(
      motion.div,
      { className: "hero-visual", style: { y: imageY } },
      e("div", { className: "photo-stack" },
        e("img", { className: "hero-photo", src: "assets/photos/hero-event.jpg", alt: "Elegant catered event table with flowers and glassware" }),
        e("img", { className: "hero-photo inset", src: "assets/photos/chef-plating.jpg", alt: "Chef plating fresh food for an event" }),
        e(motion.div, { className: "menu-chip monday", initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.7, duration: 0.7 } }, "Mon"),
        e(motion.div, { className: "menu-chip tuesday", initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.85, duration: 0.7 } }, "Tue")
      ),
      e(motion.div, { className: "floating-proof", style: { y: panelY } },
        e("span", null, "25+"),
        e("p", null, "years of catering craft, custom menus, and event service.")
      )
    )
  );
}

function Story() {
  const chapters = [
    ["01", "Start with the people", "Guest count, venue, timing, dietary needs, and the kind of atmosphere you want to create."],
    ["02", "Shape the menu", "Choose a food direction, then refine mains, sides, additionals, desserts, and service details."],
    ["03", "Serve the moment", "Food arrives with the right rhythm, presentation, and confidence so hosts can stay with guests."]
  ];

  return e(
    "section",
    { className: "story", id: "story" },
    e(motion.div, { className: "story-title", variants: fadeUp, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.35 } },
      e("p", { className: "eyebrow" }, "The Florac way"),
      e("h2", null, "From menu idea to event memory.")
    ),
    e("div", { className: "story-line", "aria-hidden": "true" }),
    e("div", { className: "story-gallery", "aria-label": "Florac food and event moments" },
      e("img", { src: "assets/photos/corporate-catering.jpg", alt: "Fresh catering dishes prepared for a corporate event" }),
      e("img", { src: "assets/photos/wedding-event.jpg", alt: "Wedding reception event tables" }),
      e("img", { src: "assets/photos/private-party.jpg", alt: "Private celebration with drinks and food" })
    ),
    e(motion.div, { className: "chapters", variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 } },
      ...chapters.map(([number, title, text]) => e(motion.article, { key: number, variants: fadeUp },
        e("span", null, number),
        e("h3", null, title),
        e("p", null, text)
      ))
    )
  );
}

function Menus() {
  const days = [
    ["Mon", "Rice and grilled chicken", "Chicken curry with salad"],
    ["Tue", "Beef casserole, rice and salad", "Sausage casserole"],
    ["Wed", "Spaghetti bolognaise and salad", "Rice with chicken tenders"],
    ["Thu", "Boerewors roll with salad", "Pie and salad"]
  ];

  return e(
    "section",
    { className: "menus", id: "menus" },
    e(motion.div, { className: "menu-board", initial: { opacity: 0, rotate: -2, y: 30 }, whileInView: { opacity: 1, rotate: 0, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.7 } },
      e("img", { src: "assets/menu-reference.jpeg", alt: "Florac Catering weekly menu reference" })
    ),
    e("div", { className: "menu-copy" },
      e("p", { className: "eyebrow" }, "Daily menus with event polish"),
      e("h2", null, "Make lunch feel like a service, not a spreadsheet."),
      e("p", null, "The brand colours from your menu artwork now drive the whole site: deep navy, vivid green, clean white, and confident rounded menu cards."),
      e(motion.div, { className: "day-list", variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 } },
        ...days.map(([day, first, second]) => e(motion.article, { key: day, variants: fadeUp, whileHover: { x: 8, scale: 1.015 } },
          e("strong", null, day),
          e("span", null, first),
          e("small", null, second)
        ))
      )
    )
  );
}

function Services() {
  const services = [
    ["Corporate catering", "Staff meals, awards, team celebrations, office lunches, and business hospitality.", "assets/photos/corporate-catering.jpg"],
    ["Wedding catering", "A polished food plan for ceremonies, receptions, and family-focused celebrations.", "assets/photos/wedding-event.jpg"],
    ["Event services", "Private parties, community events, custom menus, and on-site service support.", "assets/photos/private-party.jpg"]
  ];

  return e(
    "section",
    { className: "services", id: "services" },
    e("div", { className: "section-heading" },
      e("p", { className: "eyebrow" }, "Events we cater"),
      e("h2", null, "Built for everyday meals and once-in-a-lifetime tables.")
    ),
    e(motion.div, { className: "service-grid", variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 } },
      ...services.map(([title, text, image], index) => e(motion.article, { key: title, variants: fadeUp, whileHover: { y: -8 } },
        e("img", { className: "service-photo", src: image, alt: title }),
        e("span", null, `0${index + 1}`),
        e("h3", null, title),
        e("p", null, text)
      ))
    )
  );
}

function Quote() {
  return e(
    "section",
    { className: "quote", id: "quote" },
    e(motion.div, { className: "quote-copy", initial: { opacity: 0, x: -34 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.35 }, transition: { duration: 0.7 } },
      e(Logo),
      e("h2", null, "Tell Florac what you are feeding, and we will shape the service around it."),
      e("p", null, "Call, email, or send a quote request with guest number, area, and event details."),
      e("img", { className: "quote-photo", src: "assets/photos/chef-plating.jpg", alt: "Chef preparing a plated dish" }),
      e("div", { className: "contact-links" },
        e("a", { href: "tel:+441213890442" }, "0121 389 0442"),
        e("a", { href: "mailto:hello@floracatering.co.uk" }, "hello@floracatering.co.uk"),
        e("a", { href: "mailto:sales@floracatering.co.uk" }, "sales@floracatering.co.uk")
      )
    ),
    e(motion.form, { className: "quote-form", initial: { opacity: 0, x: 34 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.35 }, transition: { duration: 0.7 } },
      e("label", null, e("span", null, "Name"), e("input", { type: "text", autoComplete: "name" })),
      e("label", null, e("span", null, "Phone"), e("input", { type: "tel", autoComplete: "tel" })),
      e("label", null, e("span", null, "Email"), e("input", { type: "email", autoComplete: "email" })),
      e("label", null, e("span", null, "Guests"), e("input", { type: "number", min: "1" })),
      e("label", { className: "wide" }, e("span", null, "Event or weekly menu details"), e("textarea", { rows: "5" })),
      e("button", { type: "button" }, "Send quote request")
    )
  );
}

function App() {
  return e(React.Fragment, null,
    e(Header),
    e("main", null, e(Hero), e(Story), e(Menus), e(Services), e(Quote)),
    e("footer", null, e(Logo, { compact: true }), e("p", null, "69 South Road, Sparkbrook, Birmingham B11 1EX"))
  );
}

createRoot(document.getElementById("root")).render(e(App));
