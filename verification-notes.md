# Portfolio Verification Notes

## Pizza Connect results and interaction refresh — 17 August 2026

The local portfolio preview confirms that the Pizza Connect project card now renders the three factual results: offline-ready storefront, clear WhatsApp handoff, and flexible payment intent. The details sit within the existing project-card hierarchy without obscuring the verified external link.

Project-card hover motion is limited to hover-capable devices and reduced to near-instant behavior for visitors with motion-reduction preferences. The card layout remains single-column at the mobile breakpoint.

## Public deployment review — 17 August 2026

The public Vercel portfolio domain serves the refreshed Pizza Connect card with all three results statements and the working link to the Pizza Connect production site. The project section remains reachable from the main portfolio navigation.

## Live hover verification — 17 August 2026

The public Pizza Connect card was hovered directly in the browser. Its computed live state confirmed the intended **8-pixel lift**, accent border, and **1.018 mockup scale**. This verifies that the hover enhancement is active on the public deployment, while the stylesheet retains the separate reduced-motion override.

## Theme-toggle review — 17 August 2026

The portfolio toggle was activated in the local preview. It changed from the existing dark presentation to the light presentation, updated its accessible label to offer a return to dark mode, and preserved the light selection after a full reload. The light palette retains high-contrast text, accent actions, and the established project-card hierarchy.

## Public theme-toggle review — 17 August 2026

The live Vercel portfolio now exposes the accessible theme control. On the public page it starts in dark mode, announces its state, and switches successfully to the contrast-preserving light theme with an updated “Switch to dark mode” label.

## AI Night Security portfolio link — 26 August 2026

The live project target, `https://ai-night-security.netlify.app`, was opened successfully in the connected browser. It presents the AI Night Security first-launch screen, which asks for a public HTTPS security-server URL and explicitly states that camera passwords, viewer tokens, and RTSP credentials are never entered in the dashboard. This supports the portfolio copy that the static dashboard is live while a persistent backend and camera relay await connection to an always-on self-hosted machine.

The repository’s non-browser external-link checker received HTTP 401 for both `HEAD` and `GET` requests from the sandbox on the same URL. This does not match the authenticated browser verification and is recorded as an environment-specific automated-check limitation; it must not be presented as a public dashboard outage.

## AI Night Security portfolio publication — 26 August 2026

After publication, `https://tushar-portfolio-live.vercel.app` was opened in the connected browser. The Build Log displays the new **AI Night Security** card as the first entry, reports **“dashboard live · backend connection pending,”** and presents **“view live dashboard.”** The page also reflects the corresponding **13+ projects built** and **10 published projects** counts. The project card therefore links the published Netlify dashboard without overstating the unconnected self-hosted backend, RTSP relay, or camera-stream functionality.

## Motion and interaction preview — 26 August 2026

The local portfolio preview rendered successfully after the interaction enhancement. The sticky navigation, progress rail, revised section reveal states, and Build Log project content loaded without a desktop layout regression. The Build Log navigation routed to `#projects`, confirming that the existing anchor path remains intact while the active-section system is enabled. Full animation behavior is intentionally reduced in visual capture, so code-level reduced-motion coverage and the automated test suite remain part of the release verification.

The local Build Log controls were located successfully after direct anchor navigation. The browser capture occurred while the smooth-scroll and section-reveal state was settling, so the next verification step is to ensure a direct `#projects` visit cannot leave any content visually hidden if an intersection observation is delayed.

After reducing the reveal threshold for tall sections, a fresh direct visit to `#projects` displayed the Build Log heading, filter controls, count, and first project card. This confirms that direct anchor navigation no longer leaves the projects section hidden while the reveal observer settles.

The local **Web & SaaS** filter reduced the Build Log from 10 to 4 visible projects and updated the selected filter state. Hovering the resulting AI Night Security card applied the intended focused card treatment and pointer-led spotlight without opening any external link. The project-filter and project-card interactions are therefore operational in the desktop preview.
