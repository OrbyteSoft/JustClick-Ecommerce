import { Helmet } from "react-helmet-async";
import {
  Building2,
  Users,
  Target,
  Award,
  Zap,
  ShieldCheck,
  Laptop,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  const stats = [
    { value: "120K+", label: "Units Delivered" },
    { value: "50+", label: "Premium Brands" },
    { value: "24H", label: "Express Support" },
    { value: "0%", label: "EMI Plans" },
  ];

  const team = [
    {
      name: "Aaryan Adhikari",
      role: "Chief Executive",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: "Deepika KC",
      role: "Product Strategy",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Sameer Joshi",
      role: "Technical Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission | Just Click</title>
        <meta
          name="description"
          content="Discover Just Click - Nepal's premier destination for high-performance computing and premium electronics."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />

        <main className="flex-1">
          {/* Hero Section - Minimalist & Dark */}
          <section className="bg-zinc-950 py-24 md:py-32 border-b border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary blur-[160px] rounded-full" />
            </div>

            <div className="container-custom relative z-10 text-center">
              <div className="inline-flex items-center gap-2 mb-6 text-gray-500">
                <Zap className="h-4 w-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  The New Standard
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-8">
                Just Click.
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
                Redefining the digital lifestyle through high-performance tech
                and seamless commerce.
              </p>
            </div>
          </section>

          {/* Stats - Grid Layout */}
          <section className="border-b border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="py-16 text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <p className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Philosophy */}
          <section className="py-24 px-6 border-b border-border">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="relative">
                  <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
                      alt="The Just Click Philosophy"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary flex items-center justify-center p-6 text-white font-black uppercase text-[10px] tracking-widest text-center leading-tight">
                    ESTD. 2020 NEPAL
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                    Hardware for the <br />
                    <span className="text-primary">Next Generation.</span>
                  </h2>
                  <div className="space-y-6 text-muted-foreground font-medium leading-relaxed">
                    <p>
                      Just Click emerged from a singular vision: technology
                      should be accessible, authentic, and high-performance. We
                      moved away from the cluttered "everything store" to focus
                      on what matters—the tools that empower your work and
                      leisure.
                    </p>
                    <p>
                      Based in the heart of Kathmandu, we have evolved into the
                      region's premier destination for custom computing,
                      professional-grade appliances, and lifestyle electronics.
                      We don't just sell products; we curate the hardware that
                      drives your ambition.
                    </p>
                    <div className="pt-4 flex gap-8">
                      <div>
                        <Laptop className="h-6 w-6 text-primary mb-2" />
                        <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">
                          Curated Tech
                        </h4>
                      </div>
                      <div>
                        <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                        <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">
                          Verified Auth
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision - Industrial Grid */}
          <section className="bg-zinc-50 dark:bg-zinc-900/30 py-24 px-6">
            <div className="container-custom grid md:grid-cols-2 gap-px bg-border border border-border max-w-5xl mx-auto">
              <div className="bg-background p-12 md:p-16">
                <Target className="h-12 w-12 text-primary mb-8" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">
                  The Mission
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  To eliminate the "authenticity gap" in Nepal's tech market by
                  providing a direct, reliable link between global innovators
                  and local consumers.
                </p>
              </div>
              <div className="bg-background p-12 md:p-16">
                <Award className="h-12 w-12 text-primary mb-8" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">
                  The Vision
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  To be the silent engine behind every professional setup in the
                  country—powering the creators, the gamers, and the households
                  of tomorrow.
                </p>
              </div>
            </div>
          </section>

          {/* The Founders - Team Section */}
          <section className="py-24 px-6 border-t border-border">
            <div className="container-custom">
              <div className="text-center mb-20">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">
                  Leadership
                </h2>
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  The Architecture of Just Click
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-1 w-full max-w-5xl mx-auto bg-border border border-border">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-background group p-10 text-center transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <div className="w-32 h-32 mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-lg mb-1">
                      {member.name}
                    </h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
