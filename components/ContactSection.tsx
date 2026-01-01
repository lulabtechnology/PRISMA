"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Toast from "@/components/ui/Toast";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";
import { buildMailto } from "@/lib/mailto";

function isEmail(x: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim());
}

export default function ContactSection() {
  const { lang } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const labels = prisma.contact.form;

  const subject = useMemo(() => {
    return lang === "es" ? `Contacto — ${prisma.brand.full}` : `Contact — ${prisma.brand.full}`;
  }, [lang]);

  const body = useMemo(() => {
    return [
      `${labels.name[lang]}: ${name}`,
      `${labels.email[lang]}: ${email}`,
      `${labels.company[lang]}: ${company}`,
      "",
      `${labels.message[lang]}:`,
      message
    ].join("\n");
  }, [lang, name, email, company, message, labels]);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!email.trim() || !isEmail(email)) e.email = "Invalid email";
    if (!company.trim()) e.company = "Required";
    if (!message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const to = prisma.contact.toEmail.trim();
    if (to && isEmail(to)) {
      setMailtoHref(buildMailto({ to, subject, body }));
    } else {
      setMailtoHref(null);
    }

    setToastOpen(true);
  }

  const missingToEmail = !prisma.contact.toEmail.trim() || !isEmail(prisma.contact.toEmail.trim());

  return (
    <section id="contact" className="py-14 sm:py-16">
      <Container>
        <Card className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {prisma.contact.title[lang]}
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                {prisma.contact.body[lang]}
              </p>

              {missingToEmail ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-black text-slate-600">
                  <span className="text-slate-900">TODO:</span> Agregar el correo destino en{" "}
                  <span className="font-black">/content/prisma.ts → contact.toEmail</span>.
                </div>
              ) : null}
            </div>

            <div className="relative">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{labels.name[lang]}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "es" ? "Tu nombre" : "Your name"}
                    aria-invalid={Boolean(errors.name)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{labels.email[lang]}</Label>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(errors.email)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">{labels.company[lang]}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={lang === "es" ? "Empresa" : "Company"}
                    aria-invalid={Boolean(errors.company)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">{labels.message[lang]}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === "es" ? "¿En qué podemos ayudarte?" : "How can we help?"}
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" variant="primary" className="sm:w-auto">
                    {labels.submit[lang]}
                  </Button>

                  {mailtoHref ? (
                    <ButtonLink href={mailtoHref} variant="secondary" className="justify-center">
                      {labels.mailtoCta[lang]}
                    </ButtonLink>
                  ) : (
                    <div className="text-xs font-black text-slate-500">
                      {lang === "es"
                        ? "El PDF no incluye correo destino. Agrega contact.toEmail para habilitar mailto."
                        : "The PDF does not include a destination email. Add contact.toEmail to enable mailto."}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Card>
      </Container>

      <Toast open={toastOpen} message={labels.toastOk[lang]} onClose={() => setToastOpen(false)} />
    </section>
  );
}
