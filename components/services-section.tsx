import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  Code,
  Database,
  Smartphone,
  MonitorSmartphone,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description:
      "Modern, scalable websites and web applications tailored to your business needs.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Intuitive and visually appealing designs focused on delivering seamless user experiences.",
  },
  {
    icon: Zap,
    title: "AI & Automation",
    description:
      "Intelligent automation and AI-powered solutions to streamline your workflows.",
  },
  {
    icon: Code,
    title: "Custom Development",
    description:
      "Tailored software solutions built to meet your specific business requirements.",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights with advanced analytics platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-10 bg-muted/30 ">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Our Technology Services
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive technology solutions designed to accelerate your
            digital transformation
          </p>
        </div>

        {/* Service Cards */}
        <div className="ml-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border hover:border-accent/60 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-12 flex justify-center">
          <Link href="/services">
            <Button variant="outline" size="lg" className="group">
              See More
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
