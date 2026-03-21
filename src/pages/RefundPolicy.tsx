import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => (
  <>
    <Helmet>
      <title>Refund Policy - Just Click</title>
    </Helmet>
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <div className="prose prose-gray dark:prose-invert max-w-3xl">
          <h2>Eligibility</h2>
          <p>
            Refunds are available for defective products, wrong items, or items
            not matching description within 7 days.
          </p>
          <h2>Process</h2>
          <p>
            Contact us with your order number. After approval, return the item
            and receive refund within 5-7 business days.
          </p>
          <h2>Non-Refundable Items</h2>
          <p>
            Custom-cut materials, used items, and items without original
            packaging are not eligible for refunds.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default RefundPolicy;
