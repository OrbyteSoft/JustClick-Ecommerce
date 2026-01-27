import { Truck, Shield, RotateCcw, Headphones, CreditCard, Award } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹2,000",
  },
  {
    icon: Shield,
    title: "Genuine Products",
    description: "100% authentic items",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options",
  },
  {
    icon: Award,
    title: "Top Brands",
    description: "Official brand stores",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-3">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-secondary-foreground text-sm mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-secondary-foreground/70">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
