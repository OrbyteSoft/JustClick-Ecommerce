import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders above Rs. 5,000",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment gateway",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support",
  },
];

const FeaturesBar = () => {
  return (
    <section className="py-8 bg-card border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="shrink-0 p-3 rounded-full bg-accent text-primary group-hover:gradient-hero group-hover:text-primary-foreground transition-all">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
