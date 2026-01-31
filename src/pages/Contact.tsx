import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, Loader2, Mail, Phone, MapPin, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate tech-speed submission
    setTimeout(() => {
      toast.success("Message received. We're on it.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Support | Just Click - Gadgets & Appliances</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
        <Header />

        <main className="flex-1">
          {/* Minimal Hero */}
          <section className="py-20 border-b border-border bg-zinc-950">
            <div className="container-custom max-w-4xl px-6">
              <div className="flex items-center gap-2 mb-6 text-gray-500">
                <Zap className="h-5 w-5 fill-current" />
                <span className="text-[10px] uppercase tracking-[0.3em]">
                  Instant Support
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Connect with <br />
                <span className="text-gray-500">Just Click.</span>
              </h1>
              <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                Got a technical question or an order inquiry? Our gadget experts
                are standing by.
              </p>
            </div>
          </section>

          <section className="container-custom max-w-4xl py-20 px-6">
            <div className="grid lg:grid-cols-5 gap-20">
              {/* Form Side - 3 Cols */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid gap-8">
                    <div className="space-y-2 group">
                      <Label
                        htmlFor="name"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Steve Jobs"
                        required
                        className="h-12 border-x-0 border-t-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-zinc-700"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="email"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@justclick.com"
                        required
                        className="h-12 border-x-0 border-t-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-zinc-700"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label
                        htmlFor="message"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we assist you today?"
                        rows={3}
                        required
                        className="border-x-0 border-t-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all resize-none placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] rounded-none transition-all hover:translate-x-1"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>Send Inquiry</span>
                        <Send className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>

              {/* Info Side - 2 Cols */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Direct Line
                    </p>
                    <a
                      href="tel:+97714123456"
                      className="text-2xl font-bold hover:text-primary transition-colors"
                    >
                      +977-1-4123456
                    </a>
                    <p className="text-xs text-muted-foreground italic text-zinc-500">
                      Available 10am — 6pm
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Digital Correspondence
                    </p>
                    <a
                      href="mailto:support@justclick.com"
                      className="text-2xl font-bold hover:text-primary transition-colors"
                    >
                      support@justclick.com
                    </a>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Tech Hub
                    </p>
                    <p className="text-lg font-medium text-zinc-500">
                      Kalanki, Kathmandu
                      <br />
                      Bagmati, Nepal
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                    Follow the Tech
                  </p>
                  <div className="flex gap-6 text-sm font-bold">
                    <a href="#" className="hover:text-primary">
                      Instagram
                    </a>
                    <a href="#" className="hover:text-primary">
                      Twitter
                    </a>
                    <a href="#" className="hover:text-primary">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
