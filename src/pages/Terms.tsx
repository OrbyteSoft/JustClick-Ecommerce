import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <>
    <Helmet><title>Terms of Service - Supply Sewa</title></Helmet>
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-gray dark:prose-invert max-w-3xl">
          <p>Last updated: January 2026</p>
          <h2>Acceptance of Terms</h2>
          <p>By using Supply Sewa, you agree to these terms and conditions.</p>
          <h2>User Accounts</h2>
          <p>You are responsible for maintaining the security of your account and all activities under it.</p>
          <h2>Orders & Payments</h2>
          <p>All orders are subject to availability and confirmation. Prices may change without notice.</p>
          <h2>Limitation of Liability</h2>
          <p>Supply Sewa is not liable for any indirect, incidental, or consequential damages.</p>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Terms;
