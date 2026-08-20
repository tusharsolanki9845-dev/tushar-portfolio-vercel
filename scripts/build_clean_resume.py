from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


OUTPUTS = [
    "/home/ubuntu/tushar-portfolio-vercel/client/public/Tushar_Solanki_Resume.pdf",
    "/home/ubuntu/tushar-portfolio-vercel/dist/public/Tushar_Solanki_Resume.pdf",
]


def text(c, value, x, y, size=10, bold=False, color=HexColor("#171717")):
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.setFillColor(color)
    c.drawString(x, y, value)


def divider(c, y):
    c.setStrokeColor(HexColor("#4A4A4A"))
    c.setLineWidth(0.6)
    c.line(24 * mm, y, 186 * mm, y)


def section_title(c, label, y):
    text(c, label, 31 * mm, y, 10.5, bold=True)
    divider(c, y - 9 * mm)


def build_resume(path):
    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4
    c.setTitle("Tushar Solanki Resume")
    c.setAuthor("Tushar Solanki")

    c.setFillColor(HexColor("#F4F4F4"))
    c.rect(12 * mm, height - 31 * mm, width - 24 * mm, 23 * mm, fill=1, stroke=0)
    text(c, "Tushar Solanki", 24 * mm, height - 17 * mm, 19, bold=True)
    text(c, "+91-6396015608", 24 * mm, height - 25 * mm, 9.5)
    text(c, "tusharsolanki9845@gmail.com", 69 * mm, height - 25 * mm, 9.5)

    y = height - 49 * mm
    section_title(c, "PERSONAL DETAILS", y)
    text(c, "Current Location", 24 * mm, y - 16 * mm, 9.5)
    text(c, "Bulandshahr", 56 * mm, y - 16 * mm, 9.5)
    text(c, "Date of birth", 24 * mm, y - 22 * mm, 9.5)
    text(c, "September 16, 2007", 56 * mm, y - 22 * mm, 9.5)
    text(c, "Gender", 24 * mm, y - 28 * mm, 9.5)
    text(c, "Male", 56 * mm, y - 28 * mm, 9.5)

    y -= 47 * mm
    section_title(c, "EDUCATION", y)
    text(c, "Graduation", 24 * mm, y - 16 * mm, 9.5)
    text(c, "B.Tech / B.E. (Artificial Intelligence and Machine Learning)", 56 * mm, y - 16 * mm, 9.5)
    text(c, "AKTU with Score 7%", 56 * mm, y - 22 * mm, 9.5)
    text(c, "Class XII", 24 * mm, y - 31 * mm, 9.5)
    text(c, "CBSE", 56 * mm, y - 31 * mm, 9.5)
    text(c, "with 73% in 2025", 56 * mm, y - 37 * mm, 9.5)
    text(c, "Class X", 24 * mm, y - 46 * mm, 9.5)
    text(c, "CBSE", 56 * mm, y - 46 * mm, 9.5)
    text(c, "with 89.7% in 2023", 56 * mm, y - 52 * mm, 9.5)

    y -= 71 * mm
    section_title(c, "SKILLS AND ACHIEVEMENTS", y)
    text(c, "Skills", 24 * mm, y - 16 * mm, 9.5)
    text(c, "Data Entry, MS Office, Excel, Communication Skills, Time", 56 * mm, y - 16 * mm, 9.5)
    text(c, "Management, Adaptability", 56 * mm, y - 22 * mm, 9.5)
    text(c, "Language", 24 * mm, y - 31 * mm, 9.5)
    text(c, "English (Both), Hindi (Both)", 56 * mm, y - 31 * mm, 9.5)

    c.save()


for destination in OUTPUTS:
    build_resume(destination)
