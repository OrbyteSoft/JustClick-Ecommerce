import { Helmet } from "react-helmet-async";
import { Truck, Zap, ShieldCheck, BoxSelect } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Shipping = () => {
  const shippingZones = [
    {
      zone: "Kathmandu Hub",
      time: "24-48 Hours",
      cost: "Rs. 100",
      freeAbove: "Rs. 5,000",
    },
    {
      zone: "Major Tech Corridors",
      time: "2-3 Days",
      cost: "Rs. 250",
      freeAbove: "Rs. 15,000",
    },
    {
      zone: "Regional Districts",
      time: "4-6 Days",
      cost: "Rs. 400",
      freeAbove: "Rs. 25,000",
    },
    {
      zone: "Priority Remote",
      time: "7-9 Days",
      cost: "Rs. 600",
      freeAbove: "Rs. 50,000",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Logistics Protocols | Just Click</title>
        <meta
          name="description"
          content="Just Click shipping infrastructure, delivery timelines, and hardware safety protocols across Nepal."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-zinc-950 py-20 md:py-28 border-b border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary blur-[120px] rounded-full" />
            </div>

            <div className="container-custom relative z-10 text-center px-6">
              <div className="inline-flex items-center gap-2 mb-6 text-gray-500">
                <Truck className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Hardware Deployment
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                Logistics Infrastructure.
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm font-bold max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                Precision handling and express delivery protocols for
                high-performance hardware.
              </p>
            </div>
          </section>

          {/* Shipping Matrix */}
          <section className="container-custom py-20 px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-900 pb-8">
              <div className="max-w-md">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  Shipping Matrix
                </h2>
                <p className="text-muted-foreground text-xs font-medium uppercase">
                  Standard delivery timelines based on regional infrastructure
                  capability.
                </p>
              </div>
              <div className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-4 py-2 border border-primary/20">
                Updated Jan 2026
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-border">
                    <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Regional Zone
                    </th>
                    <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Est. Deployment
                    </th>
                    <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Standard Fee
                    </th>
                    <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Protocol Zero (Free)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shippingZones.map((zone, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="py-6 px-6 text-sm font-black uppercase tracking-tight">
                        {zone.zone}
                      </td>
                      <td className="py-6 px-6 text-xs font-bold text-muted-foreground">
                        {zone.time}
                      </td>
                      <td className="py-6 px-6 text-xs font-bold">
                        {zone.cost}
                      </td>
                      <td className="py-6 px-6 text-xs font-black text-primary uppercase italic">
                        {zone.freeAbove}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Operational Standards */}
          <section className="bg-zinc-50 dark:bg-zinc-900/30 py-20 border-y border-border px-6">
            <div className="container-custom">
              <div className="grid md:grid-cols-3 gap-1 bg-border border border-border">
                <div className="bg-background p-10 group">
                  <BoxSelect className="h-8 w-8 mb-6 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4">
                    ESD Protection
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase">
                    All delicate electronics are packed with anti-static
                    shielding and reinforced structural cushioning.
                  </p>
                </div>
                <div className="bg-background p-10 group">
                  <Zap className="h-8 w-8 mb-6 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4">
                    Express Sync
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase">
                    Real-time synchronization between our warehouse and
                    logistics partners ensures 24H processing.
                  </p>
                </div>
                <div className="bg-background p-10 group">
                  <ShieldCheck className="h-8 w-8 mb-6 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4">
                    Insured Transit
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase">
                    High-value hardware is fully insured during transit,
                    covering all manufacturing and shipping defects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policies Documentation */}
          <section className="container-custom py-24 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-primary flex-1"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap">
                  Operational Policies
                </h2>
                <div className="h-px bg-zinc-800 flex-1"></div>
              </div>

              <div className="space-y-16">
                <article>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="text-primary font-mono">01.</span>{" "}
                    Processing Logic
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-loose uppercase tracking-tight">
                    Hardware verification and security checks occur within 12-24
                    hours of order authorization. Technical builds (Custom PCs)
                    require an additional 48 hours for stress testing and BIOS
                    configuration prior to deployment.
                  </p>
                </article>

                <article>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="text-primary font-mono">02.</span> Verified
                    Logistics Partners
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-loose uppercase tracking-tight mb-6">
                    We exclusively utilize tier-1 logistics networks for
                    hardware security:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "TechExpress Nepal",
                      "Swift Logistics",
                      "Global Priority",
                      "Just Click Internal Fleet",
                    ].map((partner) => (
                      <div
                        key={partner}
                        className="border border-border p-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-none"></div>{" "}
                        {partner}
                      </div>
                    ))}
                  </div>
                </article>

                <article>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="text-primary font-mono">03.</span> Arrival
                    Verification
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-loose uppercase tracking-tight">
                    Recipients are required to inspect packaging integrity upon
                    arrival. In the rare event of transit-related structural
                    damage, report the incident to our hardware support team via
                    the <strong>Track Protocol</strong> interface within 24
                    hours.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shipping;
