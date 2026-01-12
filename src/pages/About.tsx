import { Helmet } from "react-helmet-async";
import { Building, Users, Target, Award, MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "1000+", label: "Products" },
    { value: "500+", label: "Sellers" },
    { value: "7", label: "Categories" },
  ];

  const team = [
    { name: "Ram Sharma", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { name: "Sita Thapa", role: "Operations Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { name: "Hari Gurung", role: "Tech Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Supply Sewa</title>
        <meta name="description" content="Learn about Supply Sewa - Nepal's leading online marketplace for electronics, tiles, and construction materials" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-16 md:py-24">
            <div className="container-custom text-center text-primary-foreground">
              <Building className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Supply Sewa</h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Nepal's most trusted online marketplace for computer hardware, electronics, tiles, marbles, and sanitary wares.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-muted">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-16">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2020, Supply Sewa started with a simple mission: to make quality products accessible to everyone in Nepal. We noticed the gap between buyers and trusted suppliers, especially in the construction and electronics sectors.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Today, we've grown into Nepal's leading B2B and B2C marketplace, connecting thousands of buyers with verified sellers across the country. From computer hardware to premium Italian marbles, we offer everything under one roof.
                  </p>
                  <p className="text-muted-foreground">
                    Our commitment to quality, competitive pricing, and excellent customer service has made us the go-to platform for both individual consumers and businesses.
                  </p>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800"
                    alt="Supply Sewa Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 bg-muted">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To revolutionize the way Nepal shops by providing a trusted, convenient, and comprehensive online marketplace that connects buyers with quality products and reliable sellers.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become Nepal's most trusted e-commerce platform, empowering businesses and consumers with seamless access to quality products, competitive prices, and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16">
            <div className="container-custom">
              <div className="text-center mb-12">
                <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The passionate people behind Supply Sewa who work tirelessly to bring you the best shopping experience.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {team.map((member, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-muted-foreground">{member.role}</p>
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
