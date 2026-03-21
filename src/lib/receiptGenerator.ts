/**
 * Generates and downloads a payment receipt as a PDF/HTML file
 * @param payment - The payment object
 * @param user - The user object
 */

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  orderId?: string;
}

interface User {
  name?: string;
  email?: string;
}

export const generatePaymentReceipt = (
  payment: Payment,
  user: User | null,
): void => {
  // Create receipt content
  const receiptContent = generateReceiptHTML(payment, user);

  // Create blob and download
  const blob = new Blob([receiptContent], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Format filename with payment ID and date
  const date = new Date(payment.createdAt).toISOString().split("T")[0];
  const filename = `receipt-${payment.id.slice(0, 8)}-${date}.html`;

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const generateReceiptHTML = (payment: Payment, user: User | null): string => {
  const date = new Date(payment.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt - ${payment.id.slice(0, 8)}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        
        .receipt {
          max-width: 600px;
          width: 100%;
          background: white;
          border: 1px solid #e5e5e5;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .header {
          text-align: center;
          padding-bottom: 30px;
          border-bottom: 2px solid #000;
          margin-bottom: 30px;
        }
        
        .header h1 {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        
        .header p {
          font-size: 10px;
          letter-spacing: 1px;
          color: #666;
          text-transform: uppercase;
        }
        
        .success-icon {
          color: #10b981;
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .amount {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .amount .label {
          font-size: 10px;
          text-transform: uppercase;
          color: #666;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        
        .amount .value {
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -1px;
        }
        
        .details {
          background: #fafafa;
          padding: 20px;
          margin-bottom: 30px;
          border: 1px solid #eaeaea;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #eaeaea;
          font-size: 12px;
          text-transform: uppercase;
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          color: #666;
          font-weight: 400;
        }
        
        .detail-value {
          font-weight: 600;
          text-align: right;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          background: #10b981;
          color: white;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eaeaea;
          font-size: 9px;
          text-transform: uppercase;
          color: #999;
          letter-spacing: 1px;
        }
        
        .payment-method {
          display: inline-block;
          padding: 4px 12px;
          background: #000;
          color: white;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 10px;
        }
        
        .transaction-id {
          font-family: monospace;
          font-size: 10px;
          color: #666;
          word-break: break-all;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .receipt {
            box-shadow: none;
            border: 1px solid #ccc;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>PAYMENT RECEIPT</h1>
          <p>Transaction Confirmation</p>
        </div>
        
        <div class="amount">
          <div class="label">Total Amount</div>
          <div class="value">Rs. ${payment.amount.toLocaleString()}</div>
          <div class="payment-method">${payment.method}</div>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="detail-value">
              <span class="status-badge" style="background: ${payment.status === "SUCCESS" ? "#10b981" : "#f59e0b"}">
                ${payment.status}
              </span>
            </span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Date</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Time</span>
            <span class="detail-value">${formattedTime}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Transaction ID</span>
            <span class="detail-value transaction-id">${payment.id}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Order Reference</span>
            <span class="detail-value">#${payment.orderId?.slice(-8) || "N/A"}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Customer</span>
            <span class="detail-value">${user?.name || user?.email || "N/A"}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Payment Method</span>
            <span class="detail-value">${payment.method}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>This is a computer generated receipt. No signature required.</p>
          <p style="margin-top: 5px;">Thank you for your business!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
