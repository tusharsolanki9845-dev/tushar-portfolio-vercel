
import re
from pathlib import Path

src = Path("client/src/pages/Home.tsx").read_text()

old_engagement = """const engagementNotes = [
  { label: "Stack default", value: "Lean React or vanilla JS + Supabase/Firebase + Vercel so monthly costs stay near zero." },
  { label: "Payment", value: "Usually 40% start / 60% on delivery, or milestones for larger work." },
  { label: "Brochure site", value: "About ₹8,000–20,000 · 5–10 days for a clear business or service site." },
  { label: "Ordering / WhatsApp", value: "About ₹20,000–45,000 · 2–4 weeks for menu, cart, and WhatsApp handoff." },
  { label: "Admin + payments", value: "About ₹40,000–80,000 · 3–6 weeks when you need admin and custom flows." },
];"""

new_engagement = """const engagementNotes = [
  { label: "Stack default", value: "Lean React or vanilla JS + Supabase/Firebase + Vercel so monthly costs stay near zero." },
  { label: "Payment", value: "Usually 40% start / 60% on delivery, or milestones for larger work." },
  { label: "Support window", value: "14–30 days of free fixes and small adjustments after launch." },
];

const pricingBands = [
  { name: "Brochure / business site", range: "₹8,000 – 20,000", timeline: "5–10 days", detail: "Clear service or shop presence — pages, contact, mobile-first layout." },
  { name: "Ordering / WhatsApp flow", range: "₹20,000 – 45,000", timeline: "2–4 weeks", detail: "Menu, cart, COD/UPI, and WhatsApp handoff without monthly platform fees." },
  { name: "Admin + payments", range: "₹40,000 – 80,000", timeline: "3–6 weeks", detail: "Custom admin, order tracking, and payment flows when you outgrow a simple storefront." },
];"""

if old_engagement not in src:
    raise SystemExit("engagementNotes block not found")
src = src.replace(old_engagement, new_engagement, 1)

new_pricing = """<div className=\"pricing-panel\">
              <h3 className=\"engagement-title\">Pricing bands (India)</h3>
              <p className=\"pricing-lead\">Indicative ranges so you can budget before the call. Final quote is fixed or milestone-based after a short discovery — no surprise fees.</p>
              <div className=\"pricing-grid\">
                {pricingBands.map((band) => (
                  <article className=\"pricing-band\" key={band.name}>
                    <span className=\"pricing-band-name\">{band.name}</span>
                    <span className=\"pricing-band-range\">{band.range}</span>
                    <span className=\"pricing-band-timeline\">{band.timeline}</span>
                    <p className=\"pricing-band-desc\">{band.detail}</p>
                  </article>
                ))}
              </div>
              <div className=\"pricing-cta-row\">
                <a className=\"btn btn-primary\" href=\"https://wa.me/916396015608?text=Hi%20Tushar%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.\" target=\"_blank\" rel=\"noreferrer\" onClick={() => track(\"contact_whatsapp\", { location: \"pricing\" })}>
                  Get a fixed quote on WhatsApp <MessageCircle className=\"btn-icon\" size={15} />
                </a>
                <p className=\"hero-cta-note\">Usually replies within a day</p>
              </div>
            </div>

            <div className=\"fit-panel\">"""

src2, n = re.subn(
    r'<div className="pricing-panel">.*?</div>\s*\n\s*<div className="fit-panel">',
    new_pricing,
    src,
    count=1,
    flags=re.S,
)
if n != 1:
    raise SystemExit(f"pricing panel replace failed: {n}")
src = src2

old_nav = """              [\"Let's Talk\", \"#contact\"],
            ].map(([label, href]) => {
              const sectionId = href.slice(1);
              return (
                <a key={href} className={activeSection === sectionId ? \"active\" : \"\"} href={href} onClick={closeMenu} aria-current={activeSection === sectionId ? \"location\" : undefined}>{label}</a>
              );
            })"""

new_nav = """              [\"WhatsApp\", \"https://wa.me/916396015608?text=Hi%20Tushar%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.\"],
            ].map(([label, href]) => {
              const isExternal = href.startsWith(\"http\");
              const sectionId = isExternal ? \"\" : href.slice(1);
              return (
                <a
                  key={href}
                  className={!isExternal && activeSection === sectionId ? \"active\" : \"\"}
                  href={href}
                  onClick={() => {
                    closeMenu();
                    if (isExternal) track(\"contact_whatsapp\", { location: \"nav\" });
                  }}
                  target={isExternal ? \"_blank\" : undefined}
                  rel={isExternal ? \"noreferrer\" : undefined}
                  aria-current={!isExternal && activeSection === sectionId ? \"location\" : undefined}
                >{label}</a>
              );
            })"""

if old_nav not in src:
    raise SystemExit("nav block not found")
src = src.replace(old_nav, new_nav, 1)

Path("client/src/pages/Home.tsx").write_text(src)
print("Home.tsx patched", len(src))
