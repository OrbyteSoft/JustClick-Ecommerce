import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 font-sans">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* About Section - Spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <span className="text-2xl font-light tracking-tighter uppercase text-white">
                Just<span className="font-black text-white"> Click</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed uppercase tracking-widest font-medium max-w-sm text-zinc-500">
              Nepal's leading online store for electronic accessories, gadgets,
              and tech gear. Built for the modern digital ecosystem.
            </p>
            <div className="flex gap-5 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-zinc-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5 stroke-[1.5px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Spans 2 columns */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "All Products", path: "/products" },
                { name: "Hot Deals", path: "/hot-deals" },
                { name: "New Arrivals", path: "/products?new=true" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[10px] uppercase tracking-widest font-medium hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service - Spans 3 columns */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Track Order", path: "/track-order" },
                { name: "Shipping Info", path: "/shipping" },
                { name: "Returns & Refunds", path: "/returns" },
                { name: "FAQs", path: "/faq" },
                { name: "Help Center", path: "/help" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[10px] uppercase tracking-widest font-medium hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section - Spans 3 columns */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="h-3.5 w-3.5 mt-[-1px] text-zinc-600" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li>
                <a
                  href="tel:+977-1-4123456"
                  className="flex items-center gap-3 hover:text-white transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-zinc-600" />
                  +977-1-4123456
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@supplysewa.com"
                  className="flex items-center gap-3 hover:text-white transition-all"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-600" />
                  support@justclick.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 bg-zinc-950/50">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <p>© 2026 Just Click. All rights reserved.</p>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <p className="tracking-[0.3em]">
              Powered by{" "}
              <a
                href="https://orbytesoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-zinc-300 transition-colors"
              >
                Orbyte Software
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
