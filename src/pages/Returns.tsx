import { Helmet } from "react-helmet-async";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Returns = () => {
  const steps = [
    {
      step: "01",
      title: "Submit Request",
      desc: "Initiate via your dashboard within 7 days",
    },
    {
      step: "02",
      title: "Technical Review",
      desc: "Our experts verify the claim remotely",
    },
    {
      step: "03",
      title: "Secure Pickup",
      desc: "We arrange collection for large appliances",
    },
    {
      step: "04",
      title: "Final Credit",
      desc: "Refund issued to your original payment method",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Returns Policy | Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-zinc-950 py-24 border-b border-border">
            <div className="container-custom max-w-4xl px-6">
              <div className="flex items-center gap-2 mb-6 text-gray-500">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Consumer Protection
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                Returns & <br />
                <span className="text-gray-500">Technical Refunds.</span>
              </h1>
              <p className="mt-8 text-zinc-400 text-lg font-medium max-w-xl">
                Our policy is designed to protect your investment in
                high-quality technology. Simple, transparent, and fair.
              </p>
            </div>
          </section>

          {/* Process Timeline */}
          <section className="container-custom py-24 px-6 border-b border-border">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-center text-muted-foreground mb-16">
              The Return Protocol
            </h2>
            <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto">
              {steps.map((s, idx) => (
                <div key={idx} className="relative group">
                  <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors mb-4 leading-none">
                    {s.step}
                  </div>
                  <h3 className="font-bold uppercase tracking-tight text-sm mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {s.desc}
                  </p>
                  {idx < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-6 top-2 h-4 w-4 text-zinc-800" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Eligibility Matrix */}
          <section className="bg-zinc-50/50 dark:bg-transparent py-24 border-b border-border">
            <div className="container-custom px-6">
              <div className="grid md:grid-cols-2 gap-px bg-border border border-border max-w-5xl mx-auto">
                {/* Eligible Column */}
                <div className="bg-background p-10 md:p-14">
                  <div className="flex items-center gap-4 mb-8">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <h3 className="font-black uppercase tracking-widest text-sm">
                      Valid Returns
                    </h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      "Factory defects or DOA (Dead on Arrival) units",
                      "Logistical errors (Wrong SKU or model)",
                      "Unopened gadgets with intact security seals",
                      "Transit damage verified at time of delivery",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-sm font-medium text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Eligible Column */}
                <div className="bg-background p-10 md:p-14">
                  <div className="flex items-center gap-4 mb-8">
                    <XCircle className="h-6 w-6 text-zinc-400" />
                    <h3 className="font-black uppercase tracking-widest text-sm">
                      Ineligible Items
                    </h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      "Laptops or phones with activated OS/Software",
                      "Appliances showing signs of installation",
                      "Items missing original box or serial stickers",
                      "Physical damage caused by improper voltage",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-sm font-medium text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Policy Text */}
          <section className="container-custom py-24 px-6 max-w-4xl mx-auto">
            <div className="bg-zinc-950 p-8 md:p-12 mb-16">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-black text-white uppercase tracking-widest text-xs mb-2">
                    Protocol Note
                  </h4>
                  <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                    All technical returns require an inspection report from our
                    service engineers. If a hardware defect is found, 100% of
                    the cost (including shipping) is refunded. For "Change of
                    Mind" returns, a 15% restocking fee may apply to
                    electronics.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">
                  Refund Timelines
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-sm font-bold uppercase tracking-tighter">
                      Digital Wallets
                    </span>
                    <span className="text-sm font-medium text-muted-foreground underline decoration-primary underline-offset-4">
                      48 Hours
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-sm font-bold uppercase tracking-tighter">
                      Credit Cards
                    </span>
                    <span className="text-sm font-medium text-muted-foreground underline decoration-primary underline-offset-4">
                      5-7 Days
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-sm font-bold uppercase tracking-tighter">
                      Bank Transfer
                    </span>
                    <span className="text-sm font-medium text-muted-foreground underline decoration-primary underline-offset-4">
                      3-5 Days
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">
                  Inquiry Channels
                </h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  To start a claim, please have your Serial Number and Digital
                  Invoice ready.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:support@justclick.com"
                    className="text-lg font-black hover:text-primary transition-colors uppercase tracking-tighter"
                  >
                    support@justclick.com
                  </a>
                  <a
                    href="tel:+97714123456"
                    className="text-lg font-black hover:text-primary transition-colors uppercase tracking-tighter"
                  >
                    +977-1-4123456
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Returns;
