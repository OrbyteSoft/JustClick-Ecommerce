import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Eye, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface Order {
  id: string;
  order_number: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  subtotal: number;
  total: number;
  status: string | null;
  payment_status: string | null;
  payment_method: string | null;
  created_at: string | null;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shipping_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    
    try {
      const { data } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      
      setOrderItems(data || []);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
    
    setDetailsOpen(true);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      toast.success("Order status updated");
      fetchOrders();
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  return (
    <>
      <Helmet>
        <title>Orders - Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-black">Orders</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 border-black/10 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-9 border-black/10 text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-black/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-black/10 hover:bg-transparent">
                <TableHead className="text-xs font-medium text-black/50">Order</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Customer</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Total</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Status</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Payment</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Date</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-black/50 py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-black/50 py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-black/5 hover:bg-black/[0.02]">
                    <TableCell className="text-sm font-medium text-black">
                      {order.order_number}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-black">{order.shipping_name}</p>
                      <p className="text-xs text-black/50">{order.shipping_email}</p>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-black">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status || "pending"}
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="h-7 w-28 text-xs border-black/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status} className="text-xs capitalize">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.payment_status === "paid" 
                          ? "bg-black text-white" 
                          : "bg-black/10 text-black/50"
                      }`}>
                        {order.payment_status || "pending"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-black/50">
                      {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : "-"}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Order {selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider">Customer</h3>
                <div className="text-sm">
                  <p className="font-medium text-black">{selectedOrder.shipping_name}</p>
                  <p className="text-black/70">{selectedOrder.shipping_email}</p>
                  <p className="text-black/70">{selectedOrder.shipping_phone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider">Shipping Address</h3>
                <p className="text-sm text-black/70">
                  {selectedOrder.shipping_address}, {selectedOrder.shipping_city}
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider">Items</h3>
                <div className="border border-black/10 rounded-lg divide-y divide-black/5">
                  {orderItems.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-black">{item.product_name}</p>
                        <p className="text-xs text-black/50">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-black">{formatPrice(item.total)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-black/70">Subtotal</span>
                  <span className="text-black">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="font-medium text-black">Total</span>
                  <span className="font-medium text-black">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-black/50 uppercase tracking-wider">Update Status</h3>
                <Select
                  value={selectedOrder.status || "pending"}
                  onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                >
                  <SelectTrigger className="h-9 border-black/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Orders;
