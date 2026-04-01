import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendBookingConfirmation(
    to: string,
    bookingId: string,
    checkIn: Date,
    checkOut: Date,
    totalAmount: number,
    invoicePath?: string,
  ) {
    await this.transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Booking Confirmed ~*~',
      html: `
        <h2>Your booking is confirmed!</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Check-In:</strong> ${checkIn}</p>
        <p><strong>Check-Out:</strong> ${checkOut}</p>
        <p><strong>Total Paid:</strong> ₹${totalAmount}</p>
      `,
      attachments: invoicePath
        ? [
            {
              filename: `invoice-${bookingId}.pdf`,
              path: invoicePath,
            },
          ]
        : [],
    });
  }
}
