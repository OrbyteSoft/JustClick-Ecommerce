import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Subscribe to our Newsletter</h3>
              <p className="text-sm text-secondary-foreground/70">Get updates on deals and new arrivals</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 max-w-xs"
              />
              <Button className="gradient-primary text-primary-foreground shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">Supply<span className="text-primary">Sewa</span></span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 mb-4">
              Nepal's leading online store for electronic accessories, gadgets, and tech gear.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/hot-deals" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Hot Deals
                </Link>
              </li>
              <li>
                <Link to="/products?new=true" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/track-order" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li>
                <a href="tel:+977-1-4123456" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  +977-1-4123456
                </a>
              </li>
              <li>
                <a href="mailto:support@supplysewa.com" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  support@supplysewa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/50">
            <p>© 2024 Supply Sewa. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-secondary-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
