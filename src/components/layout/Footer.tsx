import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="gradient-hero py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-primary-foreground">Subscribe to our Newsletter</h3>
              <p className="text-primary-foreground/80">Get updates on new products and exclusive offers</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-card text-foreground border-0"
              />
              <Button variant="secondary" className="shrink-0">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="gradient-hero rounded-lg p-2">
                  <span className="text-primary-foreground font-bold text-xl">SS</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Supply Sewa</h2>
                  <p className="text-xs text-muted-foreground">Your Trusted Supplier</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Nepal's leading online marketplace for computer hardware, electronics, 
                construction materials, and sanitary wares. Quality products, trusted sellers.
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:+977-1-4123456" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  +977-1-4123456
                </a>
                <a href="mailto:info@supplysewa.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  info@supplysewa.com
                </a>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Kathmandu, Nepal
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/seller/register" className="hover:text-primary transition-colors">Become a Seller</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Customer service */}
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                <li><Link to="/seller-policy" className="hover:text-primary transition-colors">Seller Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-muted/20 py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Supply Sewa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>We accept:</span>
            <div className="flex gap-1">
              <span className="bg-muted rounded px-2 py-1 text-xs font-medium">eSewa</span>
              <span className="bg-muted rounded px-2 py-1 text-xs font-medium">Khalti</span>
              <span className="bg-muted rounded px-2 py-1 text-xs font-medium">Visa</span>
              <span className="bg-muted rounded px-2 py-1 text-xs font-medium">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
