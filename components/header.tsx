"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Detect scroll for transparent → solid effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm border-b backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ElevareTech Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative group">
              <span className="transition-colors text-gray-800 group-hover:text-[#022f62]">
                {link.label}
              </span>
              {/* Underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#50b6f2] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA for Desktop */}
        {/* <div className="hidden md:flex items-center space-x-3">
          <a href="/login">
            <Button className="rounded-xl bg-[#50b6f2] hover:bg-[#022f62] cursor-pointer text-white shadow-md px-5">
              Employee Portal
            </Button>
          </a>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-2 p-6 font-medium bg-white shadow-md border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="relative px-4 py-2 cursor-pointer group hover:text-[#022f62] transition-colors"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#50b6f2] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Mobile Employee Portal Button */}
          {/* <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full rounded-xl bg-[#50b6f2] hover:bg-[#022f62] text-white shadow-md cursor-pointer">
              Employee Portal
            </Button>
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
