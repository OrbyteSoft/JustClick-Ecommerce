import { Helmet } from "react-helmet-async";
import { HelpCircle, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      id: "orders",
      faqs: [
        {
          question: "How do I place an order?",
          answer: "Browse products, add items to cart, proceed to checkout, enter shipping details, select payment method, and confirm your order."
        },
        {
          question: "How can I track my order?",
          answer: "Visit our Track Order page and enter your order number to see real-time status updates."
        },
        {
          question: "What are the delivery charges?",
          answer: "Delivery charges vary by location: Rs. 100 for Kathmandu Valley, Rs. 150 for major cities, and Rs. 200-300 for other areas. Free shipping available on orders above Rs. 5,000."
        },
        {
          question: "Can I change my delivery address?",
          answer: "Yes, you can change the address before the order is shipped. Contact our support team with your order number."
        },
      ]
    },
    {
      title: "Payment",
      id: "payment",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept eSewa, Khalti, bank transfers, and Cash on Delivery (COD)."
        },
        {
          question: "Is online payment secure?",
          answer: "Yes, all transactions are encrypted and processed through secure payment gateways. We never store your card details."
        },
        {
          question: "Can I pay in installments?",
          answer: "Currently, we don't offer installment payments. However, you can use any EMI services offered by your bank."
        },
        {
          question: "What if my payment fails?",
          answer: "If payment fails, try again or use a different payment method. If money was deducted, it will be refunded within 5-7 business days."
        },
      ]
    },
    {
      title: "Account",
      id: "account",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' on the login page, enter your email and password, and verify your account through the confirmation email."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to reset your password."
        },
        {
          question: "How do I update my profile information?",
          answer: "Log in to your account, go to Profile Settings, and update your information as needed."
        },
        {
          question: "How do I delete my account?",
          answer: "Contact our support team at support@supplysewa.com with your account deletion request."
        },
      ]
    },
    {
      title: "Products",
      id: "products",
      faqs: [
        {
          question: "Are all products genuine?",
          answer: "Yes, we only work with verified sellers who provide authentic products. All electronics come with manufacturer warranty."
        },
        {
          question: "What if a product is out of stock?",
          answer: "You can click 'Notify Me' on the product page to receive an email when it's back in stock."
        },
        {
          question: "Do products come with warranty?",
          answer: "Warranty varies by product and seller. Check the product description for warranty information."
        },
        {
          question: "Can I see products in person before buying?",
          answer: "Some sellers have physical stores. Check the seller information on the product page for details."
        },
      ]
    },
    {
      title: "Returns & Refunds",
      id: "returns",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer 7-day returns for eligible products. Items must be unused and in original packaging."
        },
        {
          question: "How do I initiate a return?",
          answer: "Contact our support team with your order number and reason for return. We'll guide you through the process."
        },
        {
          question: "How long does a refund take?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item."
        },
        {
          question: "Who pays for return shipping?",
          answer: "If the return is due to our error, we cover shipping. For other reasons, the customer bears the shipping cost."
        },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>FAQs - Supply Sewa</title>
        <meta name="description" content="Find answers to frequently asked questions about Supply Sewa" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-16">
            <div className="container-custom text-center text-primary-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-primary-foreground/80">
                Find quick answers to common questions
              </p>
            </div>
          </section>

          {/* FAQ Categories */}
          <section className="container-custom py-12">
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${category.id}-${idx}`}
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
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-muted py-12">
            <div className="container-custom text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
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
