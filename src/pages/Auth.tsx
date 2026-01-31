import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  Truck,
  CreditCard,
  ArrowRight,
  Loader2,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsLoading(false);
    if (error) toast.error(error.message || "Login failed.");
    else {
      toast.success("Welcome back.");
      navigate(from, { replace: true });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("Please accept the terms.");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(
      signupEmail,
      signupPassword,
      firstName,
      lastName,
    );
    setIsLoading(false);
    if (error) toast.error(error.message || "Account creation failed.");
    else {
      toast.success("Membership activated.");
      navigate(from, { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Account / Supply Sewa</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Left Side: Brand Experience */}
          <div className="hidden lg:flex lg:w-1/2 bg-secondary/20 p-20 items-center justify-center relative overflow-hidden border-r border-border">
            {/* Subtle grid for that 'Supply' aesthetic */}
            <div className="absolute inset-0 bg-grid pointer-events-none opacity-30"></div>

            <div className="max-w-md relative z-10">
              <div className="inline-flex items-center gap-2 mb-10">
                <div className="h-[1px] w-8 bg-primary"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
                  Member Benefits
                </span>
              </div>

              <h2 className="text-6xl font-light tracking-tighter text-foreground leading-[0.85] mb-12">
                Elevate <br />
                <span className="font-black">Your Store.</span>
              </h2>

              <div className="space-y-10">
                {[
                  {
                    icon: <ShoppingBag className="h-5 w-5" />,
                    title: "Curated Catalog",
                    desc: "Access to verified premium suppliers.",
                  },
                  {
                    icon: <Truck className="h-5 w-5" />,
                    title: "Priority Dispatch",
                    desc: "Expedited shipping on all wholesale orders.",
                  },
                  {
                    icon: <CreditCard className="h-5 w-5" />,
                    title: "Flexible Payments",
                    desc: "Net-30 terms for eligible business accounts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Clean E-commerce Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white dark:bg-zinc-950">
            <div className="w-full max-w-sm">
              <div className="mb-14 text-center lg:text-left">
                <h1 className="text-4xl font-light tracking-tighter text-foreground uppercase">
                  {activeTab === "login" ? "Sign In" : "Register"}
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-3 font-medium">
                  {activeTab === "login"
                    ? "Manage your orders and preferences"
                    : "Join our supply network today"}
                </p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-12 bg-transparent h-auto p-0 border-b border-border rounded-none">
                  <TabsTrigger
                    value="login"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent text-[10px] uppercase tracking-widest py-4 font-bold transition-all shadow-none"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent text-[10px] uppercase tracking-widest py-4 font-bold transition-all shadow-none"
                  >
                    Join
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="login"
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-3">
                      <Label
                        htmlFor="login-email"
                        className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="input-minimal pb-3 text-base"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="login-password"
                          className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground"
                        >
                          Password
                        </Label>
                        <Link
                          to="/forgot-password"
                          className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="input-minimal pb-3 text-base"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.4em] hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Enter Store{" "}
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent
                  value="signup"
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                          First Name
                        </Label>
                        <Input
                          placeholder="First"
                          className="input-minimal pb-2"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                          Last Name
                        </Label>
                        <Input
                          placeholder="Last"
                          className="input-minimal pb-2"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        Work Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="abc@gmail.com"
                        className="input-minimal pb-2"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        Create Password
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="input-minimal pb-2 pr-10"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 stroke-[1.5px]" />
                          ) : (
                            <Eye className="h-4 w-4 stroke-[1.5px]" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <Checkbox
                        id="terms"
                        className="rounded-none border-border data-[state=checked]:bg-primary"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) =>
                          setAgreedToTerms(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-[9px] uppercase tracking-widest text-muted-foreground leading-tight cursor-pointer"
                      >
                        I agree to the membership terms & privacy policy
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.4em] hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Create Account{" "}
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Auth;
