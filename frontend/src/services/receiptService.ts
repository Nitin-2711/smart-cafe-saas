"use client";
import jsPDF from "jspdf";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

export const generateReceiptPDF = (order: Order) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 150], // Standard thermal receipt width (80mm)
  });

  const margin = 5;
  let cursorY = 10;

  // Header: Cafe Branding
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SmartCafé", 40, cursorY, { align: "center" });
  
  cursorY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("The Premium Dining Experience", 40, cursorY, { align: "center" });
  
  cursorY += 8;
  doc.setLineWidth(0.1);
  doc.line(margin, cursorY, 80 - margin, cursorY);
  
  // Order Info
  cursorY += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`Order: #${order.id.slice(-6).toUpperCase()}`, margin, cursorY);
  doc.setFont("helvetica", "normal");
  const dateStr = order.createdAt ? format(order.createdAt.toMillis(), "dd/MM/yy HH:mm") : "N/A";
  doc.text(dateStr, 80 - margin, cursorY, { align: "right" });

  cursorY += 8;
  // Table Headers
  doc.setFont("helvetica", "bold");
  doc.text("Item", margin, cursorY);
  doc.text("Qty", 50, cursorY);
  doc.text("Price", 80 - margin, cursorY, { align: "right" });
  
  cursorY += 3;
  doc.line(margin, cursorY, 80 - margin, cursorY);
  
  // Items
  cursorY += 6;
  doc.setFont("helvetica", "normal");
  order.items.forEach((item) => {
    // Check for overflow (simplified)
    doc.text(item.name.slice(0, 20), margin, cursorY);
    doc.text(item.quantity.toString(), 52, cursorY, { align: "center" });
    doc.text(formatCurrency(item.price * item.quantity), 80 - margin, cursorY, { align: "right" });
    cursorY += 6;
  });

  cursorY += 2;
  doc.line(margin, cursorY, 80 - margin, cursorY);

  // Total
  cursorY += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount", margin, cursorY);
  doc.text(formatCurrency(order.totalAmount), 80 - margin, cursorY, { align: "right" });

  // Footer: Payment Details
  cursorY += 10;
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.text(`Payment ID: ${order.paymentId || "N/A"}`, 40, cursorY, { align: "center" });
  
  cursorY += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for dining with us!", 40, cursorY, { align: "center" });

  // Save/Download
  doc.save(`Receipt_Order_${order.id.slice(-6)}.pdf`);
};
