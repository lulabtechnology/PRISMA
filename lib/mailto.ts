type MailtoFields = {
  to: string;
  subject: string;
  body: string;
};

export function buildMailto({ to, subject, body }: MailtoFields) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}
