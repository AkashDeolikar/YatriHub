import PDFDocument from "pdfkit";
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class InvoiceService {
  async generateInvoice(booking: any): Promise<string> {
    const invoicePath = path.join(
      __dirname,
      `../../invoices/invoice-${booking.id}.pdf`
    );

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(invoicePath));

    doc.fontSize(20).text("Booking Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Booking ID: ${booking.id}`);
    doc.text(`Customer: ${booking.user.email}`);
    doc.text(`Room: ${booking.room.title}`);
    doc.text(`Check-in: ${booking.checkIn}`);
    doc.text(`Check-out: ${booking.checkOut}`);
    doc.text(`Total Amount: ₹${booking.totalAmount}`);

    doc.end();

    return invoicePath;
  }
}