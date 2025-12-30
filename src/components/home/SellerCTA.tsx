import { Link } from "react-router-dom";
import { ArrowRight, Store, TrendingUp, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Users,
    title: "Millions of Customers",
    description: "Reach a vast customer base across Nepal",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Scale with our powerful seller tools",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid on time, every time",
  },
];

const SellerCTA = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Store className="h-4 w-4" />
              <span className="text-sm font-medium">Seller Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Start Selling on Supply Sewa Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of successful sellers and grow your business with Nepal's 
              fastest-growing online marketplace for hardware and construction materials.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/seller/register">
                <Button size="lg" variant="hero" className="group">
                  Start Selling
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/seller/learn-more">
                <Button size="lg" variant="outline" className="border-muted-foreground/30 text-secondary-foreground hover:bg-muted">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-floating">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                alt="Become a seller"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full gradient-hero rounded-2xl opacity-20" />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elevated border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Sellers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-muted-foreground">Products Sold</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
