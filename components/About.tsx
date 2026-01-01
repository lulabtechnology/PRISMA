import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AboutClient from "@/components/AboutClient";

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-16">
      <Container>
        <Card className="p-6 sm:p-8">
          <AboutClient />
        </Card>
      </Container>
    </section>
  );
}
