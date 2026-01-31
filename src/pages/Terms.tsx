import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service | Just Click</title>
    </Helmet>
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />

      <main className="flex-1 container-custom max-w-3xl py-16 md:py-24 px-6">
        {/* Minimal Header */}
        <header className="mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
            Last updated: January 2026
          </p>
        </header>

        {/* Content Section */}
        <div
          className="prose prose-zinc dark:prose-invert max-w-none 
          prose-h2:text-xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-widest prose-h2:mt-12
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground"
        >
          <section>
            <h2>1. Agreement</h2>
            <p>
              By accessing <strong>Just Click</strong>, you agree to these
              terms. We provide a platform for purchasing electronic gadgets and
              home appliances.
            </p>
          </section>

          <section>
            <h2>2. Accounts</h2>
            <p>
              You are responsible for your account security. We reserve the
              right to suspend accounts suspected of fraudulent activity or
              bot-driven purchases during high-demand tech launches.
            </p>
          </section>

          <section>
            <h2>3. Pricing & Specs</h2>
            <ul>
              <li>
                Technical specifications are provided for guidance based on
                manufacturer data.
              </li>
              <li>
                We reserve the right to cancel orders resulting from clear
                pricing errors or system glitches.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Shipping & Risk</h2>
            <p>
              Title to products passes to you upon delivery to the carrier.
              Large appliances may involve specific delivery protocols and
              additional handling fees where applicable.
            </p>
          </section>

          <section>
            <h2>5. Returns</h2>
            <p>
              Electronics must be returned in original, unopened packaging with
              all seals intact. Appliances cannot be returned once installed
              unless a manufacturing defect is verified by our technicians.
            </p>
          </section>

          <section>
            <h2>6. Liability</h2>
            <p>
              Just Click is not liable for data loss on devices or incidental
              damages resulting from appliance installation. Our total liability
              is limited to the purchase price of the product.
            </p>
          </section>

          {/* Minimal Footer Contact */}
          <footer className="mt-20 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Questions?{" "}
              <a
                href="/contact"
                className="text-primary font-bold hover:underline"
              >
                Contact Support
              </a>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  </>
);

export default Terms;
