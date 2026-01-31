import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Just Click</title>
    </Helmet>
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />

      <main className="flex-1 container-custom max-w-3xl py-16 md:py-24 px-6">
        {/* Minimal Header */}
        <header className="mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            Privacy <span className="text-primary">Policy</span>
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
            <h2>1. Data Acquisition</h2>
            <p>
              We collect information necessary to provide high-performance tech
              retail services. This includes your name, shipping coordinates,
              network identity (IP address), and transaction history.
            </p>
          </section>

          <section>
            <h2>2. Encryption & Security</h2>
            <p>
              All data transmission is secured via 256-bit SSL encryption. We
              utilize secure vaulting protocols, meaning your sensitive payment
              credentials are never stored on our local physical servers.
            </p>
          </section>

          <section>
            <h2>3. Usage Protocols</h2>
            <ul>
              <li>
                Data is utilized strictly for order synchronization and hardware
                compatibility verification.
              </li>
              <li>
                Critical firmware updates and safety recall notifications will
                be sent to your registered contact points.
              </li>
              <li>
                We do not participate in third-party data brokerage or
                advertising exchange networks.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies & Tracking</h2>
            <p>
              We use anonymized analytics to improve platform performance. User
              behavior patterns are stripped of Personally Identifiable
              Information (PII) before analysis.
            </p>
          </section>

          <section>
            <h2>5. User Rights (Nepal)</h2>
            <p>
              In accordance with the <strong>Privacy Act 2075 (Nepal)</strong>,
              you maintain the right to request access to, correction of, or
              permanent erasure of your digital footprint from our systems.
            </p>
          </section>

          <section>
            <h2>6. Third Parties</h2>
            <p>
              Information is shared only with verified logistics partners and
              payment processors required to finalize your deployment. These
              entities are contractually bound to our security standards.
            </p>
          </section>

          {/* Minimal Footer Contact */}
          <footer className="mt-20 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Privacy concerns?{" "}
              <a
                href="mailto:privacy@justclick.com.np"
                className="text-primary font-bold hover:underline"
              >
                Email Security Officer
              </a>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  </>
);

export default Privacy;
