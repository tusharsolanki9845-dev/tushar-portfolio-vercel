from pathlib import Path
css = Path("client/src/index.css")
text = css.read_text()
if ".pricing-lead {" in text:
    print("css already patched")
else:
    text = text.rstrip() + """

.pricing-lead {
  margin: 0 0 18px;
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--text-muted);
}
.pricing-band-timeline {
  display: block;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-faint);
  margin-bottom: 8px;
}
.pricing-cta-row {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 18px;
}
.fit-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 28px;
}
.fit-col { min-width: 0; }
.process-cta {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 18px;
}
.hero-cta-note {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}
@media (max-width: 720px) {
  .fit-panel { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
}
"""
    css.write_text(text)
    print("css patched", len(text))
