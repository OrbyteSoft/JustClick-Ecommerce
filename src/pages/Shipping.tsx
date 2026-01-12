import { Helmet } from "react-helmet-async";
import { Truck, MapPin, Clock, Package, CreditCard, Globe } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Shipping = () => {
  const shippingZones = [
    { zone: "Kathmandu Valley", time: "1-2 days", cost: "Rs. 100", freeAbove: "Rs. 3,000" },
    { zone: "Major Cities", time: "2-4 days", cost: "Rs. 150", freeAbove: "Rs. 5,000" },
    { zone: "Other Districts", time: "4-7 days", cost: "Rs. 200", freeAbove: "Rs. 7,000" },
    { zone: "Remote Areas", time: "7-10 days", cost: "Rs. 300", freeAbove: "Rs. 10,000" },
  ];

  return (
    <>
      <Helmet>
        <title>Shipping Information - Supply Sewa</title>
        <meta name="description" content="Learn about Supply Sewa's shipping policies, delivery times, and costs" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="gradient-hero py-16">
            <div className="container-custom text-center text-primary-foreground">
              <Truck className="h-12 w-12 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
              <p className="text-lg text-primary-foreground/80">
                Fast and reliable delivery across Nepal
              </p>
            </div>
          </section>

          {/* Shipping Zones */}
          <section className="container-custom py-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Shipping Rates & Delivery Times</h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Zone</th>
                    <th className="text-left py-4 px-4 font-semibold">Delivery Time</th>
                    <th className="text-left py-4 px-4 font-semibold">Shipping Cost</th>
                    <th className="text-left py-4 px-4 font-semibold">Free Shipping Above</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-4 px-4">{zone.zone}</td>
                      <td className="py-4 px-4">{zone.time}</td>
                      <td className="py-4 px-4">{zone.cost}</td>
                      <td className="py-4 px-4 text-green-600">{zone.freeAbove}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Features */}
          <section className="bg-muted py-12">
            <div className="container-custom">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <Package className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Secure Packaging</h3>
                  <p className="text-sm text-muted-foreground">
                    All items are carefully packed to ensure safe delivery
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Real-time Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your order status from warehouse to doorstep
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">On-time Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive to deliver within the promised timeframe
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policies */}
          <section className="container-custom py-12">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <h2>Shipping Policies</h2>
              
              <h3>Order Processing</h3>
              <p>
                Orders are processed within 1-2 business days after payment confirmation. 
                You will receive an email notification once your order has been shipped.
              </p>

              <h3>Delivery Partners</h3>
              <p>
                We partner with trusted courier services to ensure safe and timely delivery:
              </p>
              <ul>
                <li>Nepal Post</li>
                <li>Dash Courier</li>
                <li>NCM Courier</li>
                <li>Local delivery partners for specific areas</li>
              </ul>

              <h3>Large Items & Bulk Orders</h3>
              <p>
                For tiles, marbles, and other heavy materials, special shipping arrangements 
                may apply. Our team will contact you to coordinate delivery for bulk orders.
              </p>

              <h3>Missing or Damaged Items</h3>
              <p>
                If your package arrives damaged or items are missing, please contact us within 
                48 hours of delivery with photos of the damage. We will arrange a replacement 
                or refund as per our return policy.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shipping;
