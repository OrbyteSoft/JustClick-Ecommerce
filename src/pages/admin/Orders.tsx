import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, Download, Eye, MoreHorizontal, Truck, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ordersData = [
  {
    id: "ORD-2024-001",
    customer: "Ram Sharma",
    email: "ram@example.com",
    items: 3,
    total: 45999,
    status: "completed",
    payment: "paid",
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-002",
    customer: "Sita Devi",
    email: "sita@example.com",
    items: 1,
    total: 8999,
    status: "processing",
    payment: "paid",
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-003",
    customer: "Hari Prasad",
    email: "hari@example.com",
    items: 5,
    total: 125000,
    status: "pending",
    payment: "pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-2024-004",
    customer: "Maya KC",
    email: "maya@example.com",
    items: 2,
    total: 32500,
    status: "shipped",
    payment: "paid",
    date: "2024-01-14",
  },
  {
    id: "ORD-2024-005",
    customer: "Bijay Thapa",
    email: "bijay@example.com",
    items: 1,
    total: 12999,
    status: "cancelled",
    payment: "refunded",
    date: "2024-01-13",
  },
];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-success/10 text-success border-success/20",
      processing: "bg-primary/10 text-primary border-primary/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      shipped: "bg-info/10 text-info border-info/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return styles[status] || "bg-muted text-muted-foreground";
  };

  const getPaymentBadge = (payment: string) => {
    const styles: Record<string, string> = {
      paid: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      refunded: "bg-muted text-muted-foreground border-muted",
    };
    return styles[payment] || "bg-muted text-muted-foreground";
  };

  return (
    <>
      <Helmet>
        <title>Orders Management - Supply Sewa Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-muted-foreground">Manage and track customer orders</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPaymentBadge(order.payment)}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-{filteredOrders.length} of {filteredOrders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
