"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-primary/20 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about#mission"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/about#our-journey"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  How We Started
                </Link>
              </li>
              <li>
                <Link
                  href="about#our-services"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  What We Offer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#security-services"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  Camera Monitoring
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedule"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  Visit Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/services#pricing-section"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  Service Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact#contactus"
                  className="text-primary/75 text-sm hover:text-primary"
                >
                  Reach Our Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Stay Informed</h3>
            <form onSubmit={handleSubmit} className="flex relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card text-white px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-primary text-primary-foreground hover:bg-primary/85"
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </Button>
            </form>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://www.tiktok.com/@royalhousecheck?is_from_webapp=1&sender_device=pc"
                target="_blank"
                className="text-primary/75 hover:text-primary"
              >
                <FaTiktok className="h-5 w-5 text-primary" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/royalhousecheck"
                target="_blank"
                className="text-primary/75 hover:text-primary"
              >
                <FaLinkedin className="h-5 w-5 text-primary" />
              </Link>
              <Link
                href="https://www.instagram.com/royalhousecheck/"
                target="_blank"
                className="text-primary/75 hover:text-primary"
              >
                <FaInstagram className="h-5 w-5 text-primary" />
              </Link>
              <Link
                href="https://x.com/royalhousecheck"
                target="_blank"
                className="text-primary/75 hover:text-primary"
              >
                <FaTwitter className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-6 text-center">
          <p className="text-primary/60 text-xs">
            (c) 2023 Royal House Check. All rights reserved.
          </p>
          <p className="text-primary/60 text-xs mt-2">
            24/7 emergency support | (214) 531 6256
          </p>
        </div>
      </div>
    </footer>
  );
}
