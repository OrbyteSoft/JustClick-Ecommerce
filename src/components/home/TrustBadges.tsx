import {
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  CreditCard,
  Award,
} from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Above ₹2,000",
  },
  {
    icon: Shield,
    title: "Authentic",
    description: "100% Genuine",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-Day Policy",
  },
  {
    icon: CreditCard,
    title: "Secure Pay",
    description: "Encrypted",
  },
  {
    icon: Award,
    title: "Top Brands",
    description: "Official Stores",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Live Chat",
  },
];

const TrustBadges = () => {
  return (
    <section className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-custom px-0 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-zinc-200 dark:border-zinc-800 lg:border-l-0">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center lg:items-start text-center lg:text-left p-8 border-r border-b border-zinc-200 dark:border-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 group"
            >
              <div className="mb-4">
                <badge.icon className="h-5 w-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors stroke-[1.5px]" />
              </div>

              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 mb-1">
                {badge.title}
              </h3>

              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
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
