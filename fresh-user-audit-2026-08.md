# Fresh-User Public Project Audit — August 2026

## Scope and method

This audit reviews the public releases currently linked from Tushar Solanki’s portfolio as an unauthenticated first-time visitor. It checks public availability, first-visit clarity, initial navigation, visible sign-in or setup boundaries, and whether public claims are accurately limited by the interface. It does not create accounts, submit forms, place orders, provide personal data, or attempt privileged access.

| # | Project | Public URL | Audit focus |
|---:|---|---|---|
| 1 | AI Night Security | https://ai-night-security.netlify.app | First-launch setup clarity and security-boundary disclosure |
| 2 | WebClient Hunter | https://webclient-hunter-ai.vercel.app | Public discovery experience and protected-workspace boundary |
| 3 | IEC College Campus Track | https://campustrack-iec.vercel.app | Public-information access and student-data boundary |
| 4 | Campus Signal by IEC | https://campus-signal-iec.vercel.app | Entry flow and institutional-data/authentication boundary |
| 5 | Crocksy | https://crocksy.vercel.app | Storefront discovery and purchase-account boundary |
| 6 | IRONCLASP | https://ironclasp-store-live.vercel.app | Catalog and customer-order handoff clarity |
| 7 | Pizza Connect | https://pizza-connect-pwa-crocksy.vercel.app | Mobile ordering journey and WhatsApp handoff clarity |
| 8 | Tehsil Sahayak | https://tehsil-sahayak.vercel.app | Bilingual civic guidance and source-route clarity |
| 9 | NestNavi | https://nestnavi-hostel-pg-finder.vercel.app | Search/discovery availability and verified-listing boundary |
| 10 | Aeris | https://weathernow-zmvf3inw.manus.space | Weather discovery, location permission, and empty/error states |

## Rating scale

| Rating | Meaning |
|---|---|
| Pass | The public experience is available, clear, and appropriately bounded for a new visitor. |
| Advisory | The experience works, but clarity, navigation, disclosure, or accessibility can be improved. |
| Issue | A public route, first-visit path, or stated capability is broken, inaccessible, or misleading. |
| Not tested | Requires account access, personal data, payment, a real institution, or external hardware, so it is deliberately excluded from a fresh-user audit. |

## Evidence log

Findings will be appended per project after direct public review.

### 1. AI Night Security — Advisory

The public URL loads a focused first-launch screen that asks for a public HTTPS security-server URL. It clearly states that camera passwords, viewer tokens, and RTSP credentials are not entered in the dashboard, which is a strong visible security boundary for a new visitor. The single primary action is understandable once a visitor already has a server address.

The entry screen has no brief explanation of how a prospective user obtains or deploys that server, nor a secondary product overview, sign-in path, documentation link, or contact route. A first-time portfolio visitor can understand that the dashboard is intentionally waiting for infrastructure, but cannot evaluate the product’s customer workflow without an externally provided backend. The correct public classification is therefore **Advisory**, not a broken launch.

Submitting the empty connection form did not configure or contact any server. The browser retained focus on the required URL input and did not show a custom validation message in the extracted page content. This is safe default behavior, but a visible inline explanation such as “Enter a public HTTPS server address to continue” would make the blocked first-time state more accessible and less ambiguous.

### 2. WebClient Hunter — Pass

The public landing page loads and clearly distinguishes the release as a product preview. The first visit presents the core workflow, including discovery, website review, outreach drafting, and CRM organisation, with visible actions to open a preview or live demo. The pricing area explicitly says that billing and paid-plan enrolment are not active, and the footer reminds users to independently review generated information before using it.

Navigation, primary calls to action, and preview disclosures are clear to an unauthenticated visitor. The interface still presents several near-duplicate preview calls to action above the fold, so consolidating them to a single consistently named entry point would be a minor future clarity improvement, but no public-flow issue was observed.

The public Dashboard navigation redirects to a dedicated sign-in page rather than exposing the workspace. That page visibly offers a no-login demo route and links Terms and Privacy Policy, which is an appropriate unauthenticated boundary. The connected browser auto-filled stored credentials on this route, so no fields were edited and no submission was attempted; this browser state must not be used to assess blank-form behavior.

### 3. IEC College Campus Track — Pass

The public site loads directly into a compact mobile-style student hub. It visibly labels itself as a **Prototype** using verified public IEC information, and it repeats the boundary next to the displayed schedule and attendance data: schedule content is demonstrative until an authorised ERP connection exists, while live attendance requires authorised college access. Public campus updates identify official IEC sources and direct visitors to the official site for the current information.

The navigation is visible and touch-oriented, with Home, Schedule, Attendance, Campus, and Profile destinations. The product does not present its example schedule or attendance percentage as verified student records. No public-flow issue was observed.

### 4. Campus Signal by IEC — Advisory

The public landing experience is visually complete, with a clear event directory, category filters, a schedule, gallery surface, and visible calls to reserve a place or explore events. However, the connected browser already displayed **My dashboard** and **Sign out**, so this session cannot be treated as a clean logged-out test for reservation, registration, or coordinator access. No forms were submitted and no existing session was altered.

The entry page presents specific attendance counts, capacity numbers, upcoming events, dates, and post-event feedback calls to action without a visible first-screen disclosure explaining whether these are institution-backed records or preview data. This is an **Advisory**: add a persistent, concise preview or data-source label near event metrics and clearly explain the sign-in/registration requirement before a visitor attempts to reserve a place. A clean logged-out or isolated-browser pass is required before marking protected entry flows as tested.

An isolated public fetch independently returned the expected **Student access** screen with sign-in and account-creation options. This confirms that the connected-browser event dashboard was a retained authenticated session, not the public default. It reinforces the recommendation to re-run the student registration and reservation journey in an isolated browser before assessing it as a new-user workflow.

### 5. Crocksy — Advisory

The public storefront loads with clear search, shop, collections, login, cart, and install-app entry points. Product categories, item names, prices, add-to-cart controls, and the stated COD, UPI, and WhatsApp support options are readily visible. A visitor can understand the general shopping model without being asked for personal data.

The landing page makes broad customer-facing claims such as **Fast Local Delivery** and a free-delivery threshold, while the visible first visit does not identify coverage areas, delivery timing, availability constraints, or the point at which COD/UPI is confirmed. This does not demonstrate a broken flow, but it is an **Advisory**: explain the delivery-service area and make the manual payment/confirmation boundary visible before checkout. A future isolated-session audit should also test empty-cart, cart persistence, login, and checkout validation without placing an order.

### 6. Pizza Connect — Advisory

The public site is highly navigable on a first visit, with concise Kitchen and Bakery paths, a visible menu, prices, call/WhatsApp actions, and a three-step explanation that an order is prepared as a WhatsApp message for availability and timing confirmation. This makes the human confirmation boundary substantially clearer than a conventional misleading checkout claim.

The browser showed **ORDER 4** immediately on arrival, so the audit cannot treat the visible cart count as a new-user baseline; it may be persisted browser state or pre-populated preview data. The recommended improvement is to show a zero-item empty state for a genuinely fresh session and, when a saved cart is restored, label it clearly. A clean isolated-browser pass is required for cart, pickup/delivery choice, and the WhatsApp message handoff.

### 7. IRONCLASP — Advisory

The public shop loads with a clear hardware category bar, visible inventory quantities, SKUs, prices, and a cart entry point. The first visit makes product discovery easy, and no administrative control is publicly exposed. The item detail language is specific enough for a catalogue-oriented experience.

The browser arrived with **Cart 1**, which is not a clean first-visit state and prevents a reliable assessment of the empty-cart or customer-request flow. The public landing area also does not surface the stated human confirmation, payment, fulfilment, return, or contact boundary before a user moves toward purchase. This is an **Advisory**: reset or label restored carts, and add a concise pre-checkout notice that orders are requests subject to stock and phone confirmation. A clean isolated-session cart-and-request test remains required.

An isolated public fetch returned **Cart 0** and a visible footer note that payment acceptance is confirmed only after verification of the selected checkout method. This confirms that the non-zero browser cart was retained local state, not the public default. The explanatory payment note should still be moved or repeated nearer the cart and checkout entry point for stronger first-time clarity.

A directly linked product-detail page also loaded successfully, showing product description, SKU, material, finish, dimensions, stock, quantity controls, and add-to-cart action without triggering a purchase. This verifies the public catalogue-to-detail route. The retained browser cart badge remained visible, so it does not change the isolated-cart recommendation.

### 8. Tehsil Sahayak — Pass

The public civic guide provides strong first-visit orientation: it clearly describes itself as guidance rather than an application channel, gives a three-step route to official services, and warns visitors to confirm current documents, fees, timelines, and eligibility with the responsible authority. Search labels, bilingual guidance, source-backed tool boundaries, official portals, and privacy warnings are visible without requiring any data entry.

The product explicitly says that it does not collect application data, submit forms, decide eligibility, process payments, or guarantee an outcome. Its treatment of third-party maps, PIN lookups, and scheme discovery also distinguishes the site’s own role from the destination service. Navigation and public claims were clear; no public-flow issue was observed.

### 9. NestNavi — Pass

The public discovery page loads with clear navigation, filters, a zero-item device-only shortlist, owner submission information, and a visible administrator boundary. Its intentional empty state reports **0 published listings** rather than inventing property cards, explains why no listings appear, and asks visitors to return after an authorised review publishes a genuine record.

The site clearly says that it does not take deposits, confirm rooms, guarantee property information, or share anything until a visitor chooses to send an enquiry. Property-owner submission and administrator access are visibly described as review-controlled. This is an appropriately bounded fresh-user state; no public-flow issue was observed.

The public **List your property** navigation resolves to the transparent owner-submission section and does not initiate Google authentication automatically. It explains that a Google sign-in is required only to submit a private review request. This is an appropriate boundary for a visitor who is merely assessing the owner workflow.

## Consolidated findings

All ten portfolio-linked public applications loaded successfully in the connected browser. A separate non-browser reachability check returned HTTP 200 for nine public URLs. The AI Night Security Netlify URL returned HTTP 401 to the sandbox fetch, but opened normally in the connected browser; this previously observed environment-specific difference is not classified as an outage.

| Project | Result | Fresh-user conclusion | Evidence |
|---|---|---|---|
| AI Night Security | Advisory | Secure first-launch requirement is clear, but a prospective visitor lacks a public product overview, server-setup guidance, or an inline empty-input message. | [Live dashboard](https://ai-night-security.netlify.app) |
| WebClient Hunter | Pass | Clear preview disclosure, protected dashboard redirect, and no-login demo route. | [Live site](https://webclient-hunter-ai.vercel.app) |
| IEC College Campus Track | Pass | Prototype and public-information boundaries are consistently visible. | [Live site](https://campustrack-iec.vercel.app) |
| Campus Signal by IEC | Advisory | Clean public access is sign-in gated, while preview-looking event metrics should carry a clearer persistent data-state label. | [Live site](https://campus-signal-iec.vercel.app) |
| Crocksy | Advisory | Product browsing is clear; delivery coverage, manual payment confirmation, and checkout boundaries need earlier explanation. | [Live site](https://crocksy.vercel.app) |
| IRONCLASP | Advisory | Catalogue and product details work; the order-confirmation boundary should be made clear at the cart/checkout transition. | [Live site](https://ironclasp-store-live.vercel.app) |
| Pizza Connect | Advisory | Menu and WhatsApp confirmation are clear; restore-cart behavior needs a clean empty-state or saved-cart explanation. | [Live site](https://pizza-connect-pwa-crocksy.vercel.app) |
| Tehsil Sahayak | Pass | Guidance-only role, official-route handoffs, privacy cautions, and source boundaries are unusually clear. | [Live site](https://tehsil-sahayak.vercel.app) |
| NestNavi | Pass | Honest empty state, device-only shortlist, and verified-listing controls avoid misleading inventory claims. | [Live site](https://nestnavi-hostel-pg-finder.vercel.app) |
| Aeris | Pass | Location is optional, city fallback is visible, and the weather source is clearly attributed. | [Live site](https://weathernow-zmvf3inw.manus.space) |

> **Overall assessment:** 5 passes, 5 advisories, and **no confirmed public-flow failure**. The portfolio’s public work is generally strongest where it makes capability boundaries explicit rather than simulating live data or commerce completion.

## Prioritized remediation plan

| Priority | Recommendation | Rationale | Affected projects |
|---|---|---|---|
| P1 | Add a public “How it works” or setup guide, a contact route, and visible inline form validation to the AI Night Security first-launch page. | A visitor cannot evaluate the product or discover the required self-hosted server path from the current one-screen setup form. | AI Night Security |
| P1 | Add a persistent “preview / verified-data status” disclosure beside Campus Signal event capacity, attendance, and feedback surfaces, with explicit sign-in guidance before a reservation attempt. | This reduces the risk that prospective students mistake illustrative content for current institution-backed records. | Campus Signal by IEC |
| P2 | Make delivery area, timing, stock verification, and the COD/UPI confirmation boundary visible before checkout begins. | Clear terms improve new-customer expectations before contact details or payment intent are requested. | Crocksy |
| P2 | Repeat the human order-confirmation and payment-verification notice in the cart/checkout UI rather than relying on footer-level copy. | The main public catalogue is strong, but the consequential purchase boundary should appear at the decision point. | IRONCLASP |
| P2 | Confirm that genuinely new sessions begin with an empty cart; label any restored device cart and provide a visible clear-cart control. | The connected browser retained cart contents on Pizza Connect and IRONCLASP, while isolated fetches showed the expected public default for IRONCLASP. | Pizza Connect, IRONCLASP |
| P3 | Consolidate duplicate preview actions into one consistent label and retain the no-login demo path. | This reduces choice friction without changing the safe public-preview boundary. | WebClient Hunter |

## Deliberate audit limits

This was an unauthenticated public-product audit. It deliberately did **not** create accounts, enter personal data, submit owner or student forms, start OAuth, grant geolocation permission, add products to carts, initiate payment, send WhatsApp messages, access administrator tools, or configure a security server. The connected browser held retained session or local-cart state on several sites; where possible, isolated public fetches were used to distinguish that state from public defaults. Consequently, protected workflows, real commerce confirmation, account recovery, administrator permissions, external hardware integration, and live camera streaming are correctly marked **not tested**, rather than assumed to work or fail.

## References

[1]: https://ai-night-security.netlify.app "AI Night Security live dashboard"
[2]: https://webclient-hunter-ai.vercel.app "WebClient Hunter"
[3]: https://campustrack-iec.vercel.app "IEC College Campus Track"
[4]: https://campus-signal-iec.vercel.app "Campus Signal by IEC"
[5]: https://crocksy.vercel.app "Crocksy"
[6]: https://ironclasp-store-live.vercel.app "IRONCLASP"
[7]: https://pizza-connect-pwa-crocksy.vercel.app "Pizza Connect"
[8]: https://tehsil-sahayak.vercel.app "Tehsil Sahayak"
[9]: https://nestnavi-hostel-pg-finder.vercel.app "NestNavi"
[10]: https://weathernow-zmvf3inw.manus.space "Aeris"

### 10. Aeris — Pass

The public weather desk loads with a concise location-first prompt, an explicit **Use my location** action, a city alternative, unit controls, a theme control, and visible attribution to Open-Meteo. A visitor can understand that geolocation is optional and can choose a city instead, without being forced into a permission prompt.

No location permission was requested or granted during the audit, so live forecast rendering and denied-permission recovery remain untested. The available landing state is clear, accessible in intent, and accurately identifies its data source; no first-visit issue was observed.
