import fs from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const resumePath = "/home/ubuntu/tushar-portfolio-vercel/client/public/Tushar_Solanki_Resume.pdf";
const outputPath = "/home/ubuntu/tushar-portfolio-vercel/client/public/Tushar_Solanki_Resume.updated.pdf";

const source = fs.readFileSync(resumePath);
const pdf = await PDFDocument.load(source);
const page = pdf.getPage(0);
const font = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 150, y: 579, width: 72, height: 12, color: rgb(1, 1, 1) });
page.drawText("with 73% in 2025", { x: 152, y: 582, size: 9.5, font, color: rgb(0, 0, 0) });

fs.writeFileSync(outputPath, await pdf.save());
