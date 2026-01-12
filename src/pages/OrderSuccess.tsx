import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Supply Sewa</title>
        <meta name="description" content="Your order has been successfully placed" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Order Confirmed!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-2">
              Thank you for your order. We've received your order and will begin processing it soon.
            </p>
            
            {orderNumber && (
              <div className="bg-muted rounded-xl p-6 my-8">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              </div>
            )}
            
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h2 className="font-semibold mb-4">What happens next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We'll verify your payment and prepare your order for shipping.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      Your order will be handed over to our delivery partner.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your package will be delivered to your doorstep within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/track-order?order=${orderNumber}`}>
                <Button variant="outline" size="lg">
                  <Package className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OrderSuccess;
