import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  Truck,
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
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (error) {
      toast.error(error.message || "Invalid credentials.");
    } else {
      toast.success("Welcome back.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Backend matching Regex: Uppercase, Lowercase, Number or Special Char
    const passwordRegex =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegex.test(signupPassword)) {
      toast.error(
        "Password too weak. Must include Uppercase, Lowercase, and a Number/Special Character.",
      );
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please accept the terms.");
      return;
    }

    setIsLoading(true);
    // Matching the context parameter signature
    const { error } = await signUp(
      signupEmail,
      signupPassword,
      confirmPassword,
      firstName,
      lastName,
    );
    setIsLoading(false);

    if (error) {
      // Backend error response handling
      const backendError = error.response?.data?.message || error.message;
      const errorMessage = Array.isArray(backendError)
        ? backendError[0]
        : backendError;
      toast.error(errorMessage || "Registration failed.");
    } else {
      toast.success("Account created successfully.");
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
        <title>Account / Just Click</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col lg:flex-row">
          <div className="hidden lg:flex lg:w-1/2 bg-secondary/20 p-20 items-center justify-center relative overflow-hidden border-r border-border">
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
                <div className="flex gap-5 group">
                  <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">
                      Curated Catalog
                    </h4>
                    <p className="text-xs text-muted-foreground font-light">
                      Access to verified premium suppliers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">
                      Priority Dispatch
                    </h4>
                    <p className="text-xs text-muted-foreground font-light">
                      Expedited shipping on all wholesale orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white dark:bg-zinc-950">
            <div className="w-full max-w-sm">
              <div className="mb-14 text-center lg:text-left">
                <h1 className="text-4xl font-light tracking-tighter uppercase">
                  {activeTab === "login" ? "Sign In" : "Register"}
                </h1>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-12 bg-transparent h-auto p-0 border-b border-border rounded-none">
                  <TabsTrigger
                    value="login"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent text-[10px] uppercase tracking-widest py-4 font-bold shadow-none"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent text-[10px] uppercase tracking-widest py-4 font-bold shadow-none"
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
                      <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        className="input-minimal pb-3 text-base"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="input-minimal pb-3 text-base"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                      className="w-full bg-primary text-primary-foreground rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-2 group"
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="input-minimal pb-2"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="input-minimal pb-2"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) =>
                          setAgreedToTerms(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-[9px] uppercase tracking-widest text-muted-foreground cursor-pointer"
                      >
                        I agree to the membership terms
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground rounded-none py-8 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Create Account"
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
