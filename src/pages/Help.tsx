import { Helmet } from "react-helmet-async";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Settings,
  Cpu,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  const categories = [
    {
      title: "Shipping & Logistics",
      icon: Truck,
      count: 12,
      href: "/faq#shipping",
    },
    {
      title: "Returns & Warranty",
      icon: RefreshCcw,
      count: 8,
      href: "/returns",
    },
    { title: "Product Support", icon: Cpu, count: 15, href: "/faq#tech" },
    {
      title: "Account Security",
      icon: ShieldCheck,
      count: 6,
      href: "/faq#account",
    },
    {
      title: "Installation Services",
      icon: Settings,
      count: 5,
      href: "/faq#install",
    },
    { title: "Payment & EMI", icon: Zap, count: 9, href: "/faq#payment" },
  ];

  const popularQuestions = [
    {
      question: "How do I claim warranty for my electronic device?",
      answer:
        "Every gadget comes with a digital invoice in your account. To claim warranty, you can present this at any authorized service center or contact our support team to initiate a pickup for appliances.",
    },
    {
      question: "Do you offer installation for large appliances?",
      answer:
        "Yes. For washing machines, refrigerators, and ACs, we schedule a certified technician to visit your location within 24-48 hours of delivery.",
    },
    {
      question: "What is the return policy for unboxed gadgets?",
      answer:
        "To maintain technical integrity, gadgets can only be returned if the manufacturer's seal is intact. Defective items are covered under our 7-day replacement policy.",
    },
    {
      question: "Do you provide EMI or Installment plans?",
      answer:
        "We offer 0% EMI on select credit cards for purchases over NPR 50,000. Look for the 'EMI Available' tag on product pages.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Support Center | Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />

        <main className="flex-1">
          {/* Minimal Hero */}
          <section className="bg-zinc-950 py-20 border-b border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="container-custom relative z-10 text-center max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
                How can we Help?
              </h1>
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search for order tracking, warranty, or tech specs..."
                  className="h-16 pl-14 pr-6 text-lg bg-zinc-900 border-zinc-800 text-white rounded-none focus-visible:ring-1 focus-visible:ring-primary transition-all"
                />
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="container-custom py-20 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.href}
                  className="group p-10 border border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all flex flex-col items-center text-center"
                >
                  <cat.icon className="h-8 w-8 mb-6 text-zinc-400 group-hover:text-primary transition-colors" />
                  <h3 className="font-black uppercase tracking-widest text-sm mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter italic">
                    {cat.count} Resources
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Questions - Clean Style */}
          <section className="border-t border-border py-20 bg-zinc-50/50 dark:bg-transparent px-6">
            <div className="container-custom max-w-4xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-12 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {popularQuestions.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border border-border bg-background px-6 rounded-none transition-all hover:border-zinc-400 dark:hover:border-zinc-700"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 text-left font-bold text-base md:text-lg uppercase tracking-tight">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed font-medium">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Minimal Contact Footer */}
          <section className="container-custom py-24 border-t border-border px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
              <div className="space-y-4">
                <MessageCircle className="h-6 w-6 mx-auto text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Live Support
                </h4>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-all">
                  Start Conversation
                </button>
              </div>
              <div className="space-y-4">
                <Phone className="h-6 w-6 mx-auto text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Technical Hotline
                </h4>
                <a href="tel:+97714123456" className="text-sm font-bold block">
                  +977-1-4123456
                </a>
              </div>
              <div className="space-y-4">
                <Mail className="h-6 w-6 mx-auto text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Email Support
                </h4>
                <a
                  href="mailto:support@justclick.com"
                  className="text-sm font-bold block"
                >
                  support@justclick.com
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Help;
