import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, Download, MoreHorizontal, Mail, Ban, Eye } from "lucide-react";
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

const customersData = [
  {
    id: "1",
    name: "Ram Sharma",
    email: "ram@example.com",
    phone: "+977 9841234567",
    orders: 12,
    spent: 145999,
    status: "active",
    joined: "2023-06-15",
  },
  {
    id: "2",
    name: "Sita Devi",
    email: "sita@example.com",
    phone: "+977 9851234567",
    orders: 8,
    spent: 89999,
    status: "active",
    joined: "2023-08-22",
  },
  {
    id: "3",
    name: "Hari Prasad",
    email: "hari@example.com",
    phone: "+977 9861234567",
    orders: 3,
    spent: 32500,
    status: "active",
    joined: "2023-11-10",
  },
  {
    id: "4",
    name: "Maya KC",
    email: "maya@example.com",
    phone: "+977 9871234567",
    orders: 0,
    spent: 0,
    status: "inactive",
    joined: "2024-01-05",
  },
  {
    id: "5",
    name: "Bijay Thapa",
    email: "bijay@example.com",
    phone: "+977 9801234567",
    orders: 5,
    spent: 67500,
    status: "blocked",
    joined: "2023-09-18",
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-success/10 text-success border-success/20",
      inactive: "bg-muted text-muted-foreground border-muted",
      blocked: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return styles[status] || "bg-muted text-muted-foreground";
  };

  return (
    <>
      <Helmet>
        <title>Customers - Supply Sewa Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Customers</h2>
            <p className="text-muted-foreground">Manage your customer base</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Customers
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">1,180</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">New This Month</p>
            <p className="text-2xl font-bold text-primary">89</p>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Blocked</p>
            <p className="text-2xl font-bold text-destructive">12</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-medium">{formatPrice(customer.spent)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.joined}</TableCell>
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Block Customer
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

export default Customers;
