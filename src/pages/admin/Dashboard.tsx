import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Package, ShoppingCart, Users, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  shipping_name: string;
  total: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products count
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // Fetch orders count and revenue
        const { data: ordersData } = await supabase
          .from("orders")
          .select("total");

        const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

        // Fetch customers count
        const { count: customersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch recent orders
        const { data: recent } = await supabase
          .from("orders")
          .select("id, order_number, shipping_name, total, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalProducts: productsCount || 0,
          totalOrders: ordersData?.length || 0,
          totalCustomers: customersCount || 0,
          totalRevenue,
        });
        setRecentOrders(recent || []);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const statCards = [
    { label: "Products", value: stats.totalProducts, icon: Package },
    { label: "Orders", value: stats.totalOrders, icon: ShoppingCart },
    { label: "Customers", value: stats.totalCustomers, icon: Users },
    { label: "Revenue", value: formatPrice(stats.totalRevenue), icon: DollarSign },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin</title>
      </Helmet>

      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white border border-black/10 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-black/40" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold text-black">
                  {loading ? "..." : stat.value}
                </p>
                <p className="text-sm text-black/50 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-black/10 rounded-lg">
          <div className="px-6 py-4 border-b border-black/10">
            <h2 className="text-sm font-medium text-black">Recent Orders</h2>
          </div>
          <div className="divide-y divide-black/5">
            {loading ? (
              <div className="p-6 text-center text-black/50 text-sm">Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-6 text-center text-black/50 text-sm">No orders yet</div>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{order.order_number}</p>
                    <p className="text-xs text-black/50 mt-0.5">{order.shipping_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">{formatPrice(order.total)}</p>
                    <p className="text-xs text-black/50 mt-0.5 capitalize">{order.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
