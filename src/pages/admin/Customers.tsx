import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string | null;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const name = `${customer.first_name || ""} ${customer.last_name || ""}`.toLowerCase();
    return (
      name.includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Helmet>
        <title>Customers - Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-black">Customers</h2>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 border-black/10 text-sm"
          />
        </div>

        {/* Table */}
        <div className="border border-black/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-black/10 hover:bg-transparent">
                <TableHead className="text-xs font-medium text-black/50">Customer</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Email</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Phone</TableHead>
                <TableHead className="text-xs font-medium text-black/50">City</TableHead>
                <TableHead className="text-xs font-medium text-black/50">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-black/50 py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-black/50 py-8">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-black/5 hover:bg-black/[0.02]">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium">
                          {customer.first_name?.charAt(0) || customer.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-black">
                          {customer.first_name || customer.last_name
                            ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
                            : "No name"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-black/70">{customer.email}</TableCell>
                    <TableCell className="text-sm text-black/70">{customer.phone || "-"}</TableCell>
                    <TableCell className="text-sm text-black/70">{customer.city || "-"}</TableCell>
                    <TableCell className="text-sm text-black/50">
                      {customer.created_at
                        ? format(new Date(customer.created_at), "MMM d, yyyy")
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Customers;
