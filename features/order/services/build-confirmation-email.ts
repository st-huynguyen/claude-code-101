interface ConfirmationEmailParams {
  customerName: string;
  orderNumber: string;
  productName: string;
  totalFormatted: string;
  activationCode: string;
  smdpAddress: string;
  manageUrl: string;
}

export function buildConfirmationEmail(params: ConfirmationEmailParams) {
  const {
    customerName,
    orderNumber,
    productName,
    totalFormatted,
    activationCode,
    smdpAddress,
    manageUrl,
  } = params;

  const subject = `Order Confirmed - ${orderNumber}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f5;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fff;border-radius:8px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;width:48px;height:48px;line-height:48px;border-radius:50%;background:#dcfce7;color:#16a34a;font-size:24px;">&#10003;</div>
        <h1 style="margin:16px 0 4px;font-size:24px;color:#18181b;">Order Confirmed!</h1>
        <p style="margin:0;color:#71717a;">Thank you for your purchase, ${customerName}.</p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;color:#71717a;font-size:14px;">Order Number</td>
          <td style="padding:8px 0;text-align:right;font-family:monospace;font-size:14px;">${orderNumber}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#71717a;font-size:14px;">Plan</td>
          <td style="padding:8px 0;text-align:right;font-size:14px;">${productName}</td>
        </tr>
        <tr style="border-top:1px solid #e4e4e7;">
          <td style="padding:12px 0;font-weight:600;font-size:14px;">Total</td>
          <td style="padding:12px 0;text-align:right;font-weight:700;font-size:18px;">${totalFormatted}</td>
        </tr>
      </table>

      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="margin:0 0 4px;font-size:12px;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Activation Code</p>
        <p style="margin:0;font-size:20px;font-weight:700;font-family:monospace;color:#0c4a6e;letter-spacing:2px;">${activationCode}</p>
        <p style="margin:8px 0 0;font-size:12px;color:#71717a;">SMDP Address: ${smdpAddress}</p>
      </div>

      <div style="text-align:center;margin-bottom:24px;">
        <a href="${manageUrl}" style="display:inline-block;padding:12px 32px;background:#18181b;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Manage Your eSIM</a>
      </div>

      <p style="text-align:center;font-size:12px;color:#a1a1aa;margin:0;">This link expires in 30 days.</p>
    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}
