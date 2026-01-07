import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AboutClient from "@/components/AboutClient";

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-16">
      <Container>
        <Card className="relative overflow-hidden p-6 sm:p-8">
          {/* Background image (subes tú la foto) */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/about/about-field.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 980px"
              className="object-cover opacity-[0.22]"
              priority={false}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 30% 20%, rgba(37,99,235,0.18), rgba(14,165,233,0.08), rgba(255,255,255,0.0))"
              }}
            />
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
          </div>

          {/* Content */}
          <div className="relative">
            <AboutClient />
          </div>
        </Card>
      </Container>
    </section>
  );
}
