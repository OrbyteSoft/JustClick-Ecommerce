import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

/**
 * Generates a professional PDF invoice for the customer.
 * @param order - The current order object containing items, total, and tax.
 * @param address - The resolved shipping address object from AddressContext.
 */
export const generateInvoice = (order: any, address: any) => {
  const doc = new jsPDF();
  const date = format(new Date(), "PPP");
  const orderDate = order.createdAt
    ? format(new Date(order.createdAt), "PPP")
    : date;

  // --- 1. Document Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", 14, 20);

  // --- 2. Company Information (Updated Name) ---
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text("JUST CLICK PVT. LTD.", 14, 28);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.setFontSize(9);
  doc.text("Kathmandu, Nepal", 14, 33);
  doc.text("support@justclick.com.np", 14, 38);
  doc.text("VAT No: 600000000", 14, 43); // Optional: Placeholder for your business registration

  // --- 3. Order Metadata ---
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ORDER DETAILS", 120, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Order Number: #${order.orderNumber}`, 120, 28);
  doc.text(`Order Date: ${orderDate}`, 120, 33);
  doc.text(`Payment: ${order.paymentMethod || "Online"}`, 120, 38);

  // --- 4. Shipping Address ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SHIP TO:", 14, 58);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);

  const addressLines = [
    address?.line1,
    address?.line2,
    `${address?.city}${address?.state ? `, ${address.state}` : ""}`,
    `${address?.country} ${address?.zipCode ? `- ${address.zipCode}` : ""}`,
  ].filter(Boolean);

  doc.text(addressLines, 14, 65);

  // --- 5. Line Items Table ---
  const tableRows = order.items.map((item: any) => [
    item.productName || "Product",
    item.quantity.toString(),
    `Rs. ${item.price.toLocaleString()}`,
    `Rs. ${(item.price * item.quantity).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: 85,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [24, 24, 27], // zinc-900 equivalent
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "left",
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      font: "helvetica",
    },
    columnStyles: {
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
  });

  // --- 6. Totals Section ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Subtotal:", 140, finalY);
  doc.text("Tax (VAT 13%):", 140, finalY + 7); // Updated labeling
  doc.text("Shipping Fee:", 140, finalY + 14);

  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(`Rs. ${order.subtotal?.toLocaleString()}`, 196, finalY, {
    align: "right",
  });
  doc.text(`Rs. ${order.tax?.toLocaleString()}`, 196, finalY + 7, {
    align: "right",
  });
  doc.text(`Rs. ${order.shippingFee?.toLocaleString()}`, 196, finalY + 14, {
    align: "right",
  });

  // --- 7. Grand Total (Bold Borderless Style) ---
  doc.setDrawColor(200);
  doc.line(135, finalY + 18, 196, finalY + 18);

  doc.setFontSize(12);
  doc.text("Grand Total:", 140, finalY + 25);
  doc.text(`Rs. ${order.total?.toLocaleString()}`, 196, finalY + 25, {
    align: "right",
  });

  // --- 8. Footer ---
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150);
  doc.text(
    "Thank you for choosing Just Click Pvt. Ltd.",
    doc.internal.pageSize.width / 2,
    pageHeight - 20,
    { align: "center" },
  );
  doc.text(
    "This is a computer-generated invoice and requires no physical signature.",
    doc.internal.pageSize.width / 2,
    pageHeight - 15,
    { align: "center" },
  );

  // --- 9. Save the PDF ---
  doc.save(`Invoice_${order.orderNumber}.pdf`);
};
