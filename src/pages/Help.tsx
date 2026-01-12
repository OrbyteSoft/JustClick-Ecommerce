import { Helmet } from "react-helmet-async";
import { HelpCircle, Search, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  const categories = [
    { title: "Orders & Shipping", icon: "📦", count: 12, href: "/faq#orders" },
    { title: "Returns & Refunds", icon: "🔄", count: 8, href: "/returns" },
    { title: "Payment Issues", icon: "💳", count: 6, href: "/faq#payment" },
    { title: "Account & Security", icon: "🔐", count: 10, href: "/faq#account" },
    { title: "Products & Stock", icon: "🏷️", count: 7, href: "/faq#products" },
    { title: "Seller Support", icon: "🏪", count: 9, href: "/seller-policy" },
  ];

  const popularQuestions = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the Track Order page and entering your order number. You'll receive the order number in your confirmation email.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept eSewa, Khalti, bank transfers, and Cash on Delivery (COD). All online payments are secure and encrypted.",
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 3-5 business days within Kathmandu Valley and 5-7 business days for other locations in Nepal.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order before it's shipped. Go to your order history, select the order, and click 'Cancel Order'. Refunds are processed within 5-7 business days.",
    },
    {
      question: "How do I become a seller?",
      answer: "Visit our 'Become a Seller' page and fill out the registration form with your business details. Our team will review your application within 2-3 business days.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Help Center - Supply Sewa</title>
        <meta name="description" content="Get help with your orders, returns, payments, and more at Supply Sewa Help Center" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-16">
            <div className="container-custom text-center text-primary-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Search our help center or browse categories below
              </p>
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="h-14 pl-12 pr-4 text-lg bg-card text-foreground border-0"
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="container-custom py-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.href}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-soft transition-all"
                >
                  <span className="text-3xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-semibold mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Questions */}
          <section className="bg-muted py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-bold mb-8 text-center">Popular Questions</h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {popularQuestions.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="bg-card border border-border rounded-xl px-6"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <span className="text-left font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="text-center mt-8">
                  <Link to="/faq" className="text-primary hover:underline inline-flex items-center gap-1">
                    View all FAQs <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Options */}
          <section className="container-custom py-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Still need help?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                <button className="text-primary hover:underline text-sm font-medium">Start Chat</button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">Sun-Fri, 9AM-6PM</p>
                <a href="tel:+977-1-4123456" className="text-primary hover:underline text-sm font-medium">
                  +977-1-4123456
                </a>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">We'll respond within 24hrs</p>
                <a href="mailto:support@supplysewa.com" className="text-primary hover:underline text-sm font-medium">
                  support@supplysewa.com
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
