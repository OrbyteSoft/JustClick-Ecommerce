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
  CheckCircle2,
  Mail,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

const Auth = () => {
  const OTP_RESEND_COOLDOWN_SECONDS = 30;

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
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const resendProgressPercent =
    ((OTP_RESEND_COOLDOWN_SECONDS - resendCooldown) /
      OTP_RESEND_COOLDOWN_SECONDS) *
    100;

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

  useEffect(() => {
    // Any email edit should invalidate the previous verification state.
    setVerificationEmailSent(false);
    setVerificationCode("");
    setEmailVerified(false);
    setResendCooldown(0);
  }, [signupEmail]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const handleSendVerificationCode = async () => {
    const normalizedEmail = signupEmail.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email first.");
      return;
    }

    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown}s before resending.`);
      return;
    }

    try {
      setIsSendingOtp(true);
      const response = await api<{ message: string; previewOtp?: string }>(
        "/otp/send",
        {
        method: "POST",
        body: JSON.stringify({ email: normalizedEmail }),
        },
      );

      setVerificationEmailSent(true);
      setEmailVerified(false);
      setVerificationCode("");
      setResendCooldown(OTP_RESEND_COOLDOWN_SECONDS);
      toast.success(
        response.previewOtp
          ? `Verification code sent. Dev OTP: ${response.previewOtp}`
          : "Verification code sent to your email.",
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (verificationCode.length < 6) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      await api<{ message: string }>("/otp/verify", {
        method: "POST",
        body: JSON.stringify({
          email: signupEmail.trim(),
          otp: verificationCode,
        }),
      });

      setEmailVerified(true);
      toast.success("Email verified successfully.");
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

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

    if (!emailVerified) {
      toast.error("Please verify your email before creating an account.");
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

                    <div className="rounded-md border border-border/70 bg-muted/20 p-4 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          Email Verification
                        </div>
                        {emailVerified ? (
                          <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-600 font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Verified
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-none text-[10px] uppercase tracking-[0.18em]"
                          onClick={handleSendVerificationCode}
                          disabled={isSendingOtp || resendCooldown > 0}
                        >
                          {isSendingOtp
                            ? "Sending..."
                            : resendCooldown > 0
                              ? `Resend in ${resendCooldown}s`
                            : verificationEmailSent
                              ? "Resend Code"
                              : "Send Code"}
                        </Button>
                        {verificationEmailSent ? (
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {resendCooldown > 0
                              ? `Code sent to ${signupEmail}. Retry in ${resendCooldown}s`
                              : `Code sent to ${signupEmail}`}
                          </p>
                        ) : (
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            Send a 6-digit code to continue
                          </p>
                        )}
                      </div>

                      {verificationEmailSent && resendCooldown > 0 ? (
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/70">
                            <div
                              className="h-full bg-primary transition-all duration-1000 ease-linear"
                              style={{ width: `${Math.max(resendProgressPercent, 0)}%` }}
                            />
                          </div>
                          <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                            You can resend when the bar fills
                          </p>
                        </div>
                      ) : null}

                      {verificationEmailSent ? (
                        <div className="space-y-3">
                          <InputOTP
                            value={verificationCode}
                            onChange={setVerificationCode}
                            maxLength={6}
                            disabled={emailVerified}
                            containerClassName="justify-start"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          <Button
                            type="button"
                            variant="secondary"
                            className="rounded-none text-[10px] uppercase tracking-[0.18em]"
                            onClick={handleVerifyEmailCode}
                            disabled={
                              emailVerified ||
                              verificationCode.length < 6 ||
                              isVerifyingOtp
                            }
                          >
                            {isVerifyingOtp
                              ? "Verifying..."
                              : emailVerified
                                ? "Email Verified"
                                : "Verify Code"}
                          </Button>
                        </div>
                      ) : null}
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
