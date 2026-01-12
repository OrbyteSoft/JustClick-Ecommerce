import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <>
    <Helmet><title>Privacy Policy - Supply Sewa</title></Helmet>
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-gray dark:prose-invert max-w-3xl">
          <p>Last updated: January 2026</p>
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, phone, address, and payment details when placing orders.</p>
          <h2>How We Use Your Information</h2>
          <p>We use your data to process orders, send updates, improve our services, and for marketing purposes (with your consent).</p>
          <h2>Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal information.</p>
          <h2>Contact Us</h2>
          <p>For privacy concerns, email us at privacy@supplysewa.com</p>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Privacy;
