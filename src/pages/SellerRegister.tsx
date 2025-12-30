import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const benefits = [
  {
    icon: Users,
    title: "Reach Millions",
    description: "Access our vast customer base across Nepal",
  },
  {
    icon: TrendingUp,
    title: "Grow Revenue",
    description: "Increase sales with our powerful platform",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid on time with secure transactions",
  },
  {
    icon: Zap,
    title: "Easy Management",
    description: "Simple tools to manage your inventory",
  },
];

const steps = [
  { id: 1, title: "Business Info", icon: Building },
  { id: 2, title: "Contact Details", icon: User },
  { id: 3, title: "Documents", icon: FileText },
];

const SellerRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Application submitted successfully! We'll review and get back to you.");
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Become a Seller - Supply Sewa</title>
        <meta
          name="description"
          content="Join Supply Sewa as a seller and grow your business. Reach millions of customers across Nepal."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero section */}
          <section className="gradient-hero py-16 md:py-24">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center text-primary-foreground">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 mb-6">
                  <Store className="h-4 w-4" />
                  <span className="text-sm font-medium">Seller Program</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Start Selling on Supply Sewa
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80">
                  Join thousands of successful sellers and grow your business with Nepal's
                  fastest-growing online marketplace.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 bg-muted">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 text-center border border-border"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration form */}
          <section className="py-12">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                {/* Progress steps */}
                <div className="flex items-center justify-center mb-12">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center gap-2 ${
                          currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            currentStep >= step.id
                              ? "gradient-hero border-primary text-primary-foreground"
                              : "border-muted-foreground"
                          }`}
                        >
                          {currentStep > step.id ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <step.icon className="h-5 w-5" />
                          )}
                        </div>
                        <span className="hidden sm:block font-medium">{step.title}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-12 sm:w-24 h-0.5 mx-4 ${
                            currentStep > step.id ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {currentStep === 1 && (
                      <>
                        <h2 className="text-xl font-bold text-foreground mb-6">
                          Business Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="business-name">Business Name *</Label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="business-name"
                                placeholder="Your business name"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="business-type">Business Type *</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sole">Sole Proprietorship</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="pvt-ltd">Private Limited</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Primary Product Category *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hardware">Computer Hardware</SelectItem>
                              <SelectItem value="accessories">Accessories</SelectItem>
                              <SelectItem value="electronics">Electronic Materials</SelectItem>
                              <SelectItem value="tiles">Tiles</SelectItem>
                              <SelectItem value="marbles">Marbles</SelectItem>
                              <SelectItem value="ceramics">Ceramics</SelectItem>
                              <SelectItem value="sanitary">Sanitary Wares</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Business Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Tell us about your business..."
                            rows={4}
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 2 && (
                      <>
                        <h2 className="text-xl font-bold text-foreground mb-6">
                          Contact Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="owner-name">Owner/Manager Name *</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="owner-name"
                                placeholder="Full name"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="business@email.com"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+977 98XXXXXXXX"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="alt-phone">Alternate Phone</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="alt-phone"
                                type="tel"
                                placeholder="+977 98XXXXXXXX"
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Business Address *</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              id="address"
                              placeholder="Full address including city and district"
                              className="pl-10"
                              rows={3}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {currentStep === 3 && (
                      <>
                        <h2 className="text-xl font-bold text-foreground mb-6">
                          Required Documents
                        </h2>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Business Registration Certificate *</Label>
                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                              <p className="text-sm text-foreground font-medium mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPG, PNG up to 5MB
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>PAN/VAT Certificate *</Label>
                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                              <p className="text-sm text-foreground font-medium mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPG, PNG up to 5MB
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Owner's Citizenship/ID *</Label>
                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                              <p className="text-sm text-foreground font-medium mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPG, PNG up to 5MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 mt-6">
                          <Checkbox id="terms" required />
                          <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                            I agree to the{" "}
                            <Link to="/seller-policy" className="text-primary hover:underline">
                              Seller Terms & Conditions
                            </Link>{" "}
                            and confirm that all information provided is accurate.
                          </Label>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      {currentStep > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(currentStep - 1)}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>
                      ) : (
                        <div />
                      )}
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Submitting..."
                          : currentStep === 3
                          ? "Submit Application"
                          : "Continue"}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </form>
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

export default SellerRegister;
