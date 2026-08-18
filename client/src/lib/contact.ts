export type ContactFormPayload = {
  name: string;
  email: string;
  topic: "freelance" | "internship" | "collaboration" | "other";
  message: string;
};

export function buildContactEmailUrl(payload: ContactFormPayload) {
  const topicLabel = {
    freelance: "Freelance project",
    internship: "Internship opportunity",
    collaboration: "Collaboration",
    other: "General enquiry",
  }[payload.topic];
  const subject = `${topicLabel} — portfolio contact`;
  const body = [
    "Hello Tushar,",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Topic: ${topicLabel}`,
    "",
    payload.message,
  ].join("\r\n");

  return `mailto:tusharsolanki9845@gmail.com?${new URLSearchParams({ subject, body }).toString()}`;
}
