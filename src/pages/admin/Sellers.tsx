import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Store } from "lucide-react";
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

const sellersData = [
  {
    id: "1",
    name: "TechZone Nepal",
    email: "info@techzone.np",
    products: 45,
    orders: 234,
    revenue: 2345000,
    rating: 4.8,
    status: "approved",
    joined: "2023-03-15",
  },
  {
    id: "2",
    name: "Graphics Hub",
    email: "sales@graphicshub.np",
    products: 28,
    orders: 156,
    revenue: 4560000,
    rating: 4.7,
    status: "approved",
    joined: "2023-05-22",
  },
  {
    id: "3",
    name: "Marble World",
    email: "contact@marbleworld.np",
    products: 67,
    orders: 89,
    revenue: 890000,
    rating: 4.6,
    status: "approved",
    joined: "2023-07-10",
  },
  {
    id: "4",
    name: "New Tech Store",
    email: "hello@newtech.np",
    products: 0,
    orders: 0,
    revenue: 0,
    rating: 0,
    status: "pending",
    joined: "2024-01-12",
  },
  {
    id: "5",
    name: "Tiles & More",
    email: "info@tilesmore.np",
    products: 34,
    orders: 0,
    revenue: 0,
    rating: 0,
    status: "suspended",
    joined: "2023-09-05",
  },
];

const Sellers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredSellers = sellersData.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || seller.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      suspended: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return styles[status] || "bg-muted text-muted-foreground";
  };

  return (
    <>
      <Helmet>
        <title>Sellers Management - Supply Sewa Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Sellers</h2>
            <p className="text-muted-foreground">Manage seller accounts and approvals</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Sellers</p>
            <p className="text-2xl font-bold">89</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">72</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold text-warning">12</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Suspended</p>
            <p className="text-2xl font-bold text-destructive">5</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Sellers</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sellers..."
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
                <TableHead>Seller</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{seller.name}</p>
                        <p className="text-sm text-muted-foreground">{seller.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{seller.products}</TableCell>
                  <TableCell>{seller.orders}</TableCell>
                  <TableCell className="font-medium">{formatPrice(seller.revenue)}</TableCell>
                  <TableCell>
                    {seller.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span>{seller.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(seller.status)}>
                      {seller.status}
                    </Badge>
                  </TableCell>
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
                          View Store
                        </DropdownMenuItem>
                        {seller.status === "pending" && (
                          <DropdownMenuItem className="text-success">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          {seller.status === "suspended" ? "Reactivate" : "Suspend"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Sellers;
