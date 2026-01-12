import { Helmet } from "react-helmet-async";
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Returns = () => {
  const steps = [
    { step: 1, title: "Initiate Return", desc: "Contact us within 7 days of delivery" },
    { step: 2, title: "Get Approval", desc: "Our team reviews and approves your request" },
    { step: 3, title: "Ship Item Back", desc: "Pack the item securely and ship it to us" },
    { step: 4, title: "Get Refund", desc: "Refund processed within 5-7 business days" },
  ];

  return (
    <>
      <Helmet>
        <title>Returns & Refunds - Supply Sewa</title>
        <meta name="description" content="Learn about Supply Sewa's return and refund policies" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-16">
            <div className="container-custom text-center text-primary-foreground">
              <RotateCcw className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
              <p className="text-lg text-primary-foreground/80">
                Easy returns within 7 days of delivery
              </p>
            </div>
          </section>

          {/* Process Steps */}
          <section className="container-custom py-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Return Process</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {steps.map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    {s.step}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <section className="bg-muted py-12">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Eligible */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="font-semibold text-lg">Eligible for Return</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      Defective or damaged products
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      Wrong item delivered
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      Item not matching description
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      Unused item in original packaging
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      Electronics with manufacturing defects
                    </li>
                  </ul>
                </div>

                {/* Not Eligible */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <h3 className="font-semibold text-lg">Not Eligible for Return</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      Used or installed products
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      Custom-cut tiles and marbles
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      Items damaged by misuse
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      Returns after 7 days
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      Items without original packaging
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="container-custom py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Refund Policy</h2>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Important</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Refunds are only processed after we receive and inspect the returned item. 
                      Please ensure the item is in its original condition.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-gray dark:prose-invert">
                <h3>Refund Timeline</h3>
                <ul>
                  <li><strong>eSewa/Khalti:</strong> 3-5 business days</li>
                  <li><strong>Bank Transfer:</strong> 5-7 business days</li>
                  <li><strong>Cash on Delivery:</strong> 7-10 business days (via bank transfer)</li>
                </ul>

                <h3>Partial Refunds</h3>
                <p>
                  Partial refunds may be issued in cases where:
                </p>
                <ul>
                  <li>Item shows signs of use or damage</li>
                  <li>Missing original accessories or parts</li>
                  <li>Missing original packaging</li>
                </ul>

                <h3>Shipping Costs</h3>
                <p>
                  Return shipping costs are borne by the customer unless the return is due to 
                  our error (defective product, wrong item shipped, etc.).
                </p>

                <h3>Contact Us</h3>
                <p>
                  For return requests, please email us at <a href="mailto:returns@supplysewa.com">returns@supplysewa.com</a> 
                  or call <a href="tel:+977-1-4123456">+977-1-4123456</a>.
                </p>
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
