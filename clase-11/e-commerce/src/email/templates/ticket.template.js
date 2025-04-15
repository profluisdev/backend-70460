
export const ticketTemplate = (code, amount, purchase_datetime, purchaser) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Confirmación de Compra - Ticket</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h2 {
      color: #333333;
    }
    .ticket-info {
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎟️ Confirmación de Compra</h2>
    </div>
    <div class="ticket-info">
      <p><strong>Código del ticket:</strong> ${code}</p>
      <p><strong>Fecha de compra:</strong> ${purchase_datetime}</p>
      <p><strong>Total pagado:</strong> ${amount}</p>
      <p><strong>Comprador:</strong> ${purchaser}</p>
    </div>
    <div class="footer">
      <p>Gracias por tu compra. Este ticket ha sido generado automáticamente.</p>
    </div>
  </div>
</body>
</html>
`
}