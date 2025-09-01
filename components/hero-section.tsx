"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Gradient + Circuit Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/bg.jpg')", // add your circuit SVG in public/images
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6"
          >
            Elevate Your Business with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Cutting-Edge Technology
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your digital landscape with our innovative solutions. We
            deliver scalable, secure, and intelligent technology that drives
            growth and efficiency.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-xl px-8 py-6 text-lg"
              aria-label="Start your journey with us"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
