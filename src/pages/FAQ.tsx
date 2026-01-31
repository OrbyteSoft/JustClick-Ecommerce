import { Helmet } from "react-helmet-async";
import {
  Zap,
  ShieldCheck,
  Truck,
  CreditCard,
  User,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Logistic & Delivery",
      id: "orders",
      icon: Truck,
      faqs: [
        {
          question: "How long does delivery take for major appliances?",
          answer:
            "Within Kathmandu Valley, large appliances are delivered via our dedicated logistics team within 24-48 hours. Gadgets and smaller electronics are dispatched via express courier and usually arrive within 24 hours.",
        },
        {
          question: "Can I track my technician's arrival?",
          answer:
            "Yes. Once your appliance is out for delivery, you will receive a tracking link via SMS that includes the contact details of both the driver and the installation technician.",
        },
        {
          question: "What are the shipping tiers?",
          answer:
            "Standard shipping is NPR 150. We offer 'Premium White Glove' delivery for appliances (NPR 500) which includes unboxing and basic setup.",
        },
      ],
    },
    {
      title: "Payments & EMI",
      id: "payment",
      icon: CreditCard,
      faqs: [
        {
          question: "Do you offer 0% EMI?",
          answer:
            "Yes, we partner with leading banks to provide 0% EMI for 6 and 12-month tenures on all purchases exceeding NPR 40,000.",
        },
        {
          question: "What digital wallets are supported?",
          answer:
            "We support direct integration with eSewa, Khalti, and FonePay. For high-value transactions, we recommend bank transfers or FonePay for instant verification.",
        },
      ],
    },
    {
      title: "Technical Returns",
      id: "returns",
      icon: ShieldCheck,
      faqs: [
        {
          question: "What is the policy for 'Dead on Arrival' (DOA) units?",
          answer:
            "If your gadget doesn't power on out of the box, we provide an immediate 1-to-1 replacement within 7 days of purchase, provided the original packaging is kept.",
        },
        {
          question: "Can I return a laptop if I've opened the software seal?",
          answer:
            "To ensure the security and authenticity of our tech, laptops with broken software seals or activated OS licenses are not eligible for return unless a hardware defect is verified by the service center.",
        },
      ],
    },
    {
      title: "Account & Warranty",
      id: "account",
      icon: User,
      faqs: [
        {
          question: "Where can I find my digital warranty card?",
          answer:
            "Just Click is paperless. Your digital invoice and warranty details are stored under 'My Orders' in your profile. Most brands we carry also support 'Serial Number' based global warranty.",
        },
        {
          question: "How do I update my GST/VAT details for business orders?",
          answer:
            "You can add your business credentials under Profile Settings. These will be automatically applied to all your future tax invoices.",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Tech Support & FAQ | Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />

        <main className="flex-1">
          {/* Hero Header */}
          <section className="bg-zinc-950 py-20 border-b border-border">
            <div className="container-custom max-w-4xl px-6">
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <Zap className="h-5 w-5 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Knowledge Base
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                Frequently Asked <br />
                <span className="text-gray-600 text-outline-sm">
                  Questions.
                </span>
              </h1>
            </div>
          </section>

          {/* FAQ Sections */}
          <section className="container-custom max-w-4xl py-20 px-6">
            <div className="space-y-24">
              {faqCategories.map((category) => (
                <div
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-widest">
                      {category.title}
                    </h2>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-px bg-border border-y border-border"
                  >
                    {category.faqs.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${category.id}-${idx}`}
                        className="bg-background border-none px-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                      >
                        <AccordionTrigger className="hover:no-underline py-6 text-left font-bold text-base uppercase tracking-tight group">
                          <span className="group-hover:text-primary transition-colors">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-muted-foreground leading-relaxed font-medium text-sm md:text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          {/* Support CTA */}
          <section className="border-t border-border py-24 bg-zinc-50/50 dark:bg-transparent">
            <div className="container-custom text-center px-6">
              <HelpCircle className="h-10 w-10 mx-auto text-primary mb-6" />
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Unresolved Inquiry?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto font-medium">
                Our technical support engineers are available for live
                consultation if your question isn't covered here.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center h-14 px-10 bg-primary text-white font-black uppercase tracking-widest transition-all hover:translate-x-1 active:scale-95"
              >
                Connect with an Expert
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;
