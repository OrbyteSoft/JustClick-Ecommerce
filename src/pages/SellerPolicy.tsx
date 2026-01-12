import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SellerPolicy = () => (
  <>
    <Helmet><title>Seller Policy - Supply Sewa</title></Helmet>
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Seller Policy</h1>
        <div className="prose prose-gray dark:prose-invert max-w-3xl">
          <h2>Eligibility</h2>
          <p>Registered businesses with valid PAN/VAT can apply to become sellers.</p>
          <h2>Commission</h2>
          <p>Commission rates vary by category (5-15%). Payments are processed weekly.</p>
          <h2>Quality Standards</h2>
          <p>All products must be genuine, accurately described, and properly packaged.</p>
          <h2>Seller Responsibilities</h2>
          <p>Timely shipping, accurate inventory, responsive customer service, and compliance with our policies.</p>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default SellerPolicy;
