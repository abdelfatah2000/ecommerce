const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(order, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, order);
  generateInvoiceTable(doc, order);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 70 })
    .fillColor("#444444")
    .fontSize(25)
    .moveDown();
}

function generateCustomerInformation(doc, order) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Order Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(order.orderId, 150, customerInformationTop)
    .font("Helvetica")
    .text("Order Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(order.totalPrice),
      150,
      customerInformationTop + 30
    )
    .text("Customer Name:", 300, customerInformationTop)
    .font("Helvetica-Bold")
    .text(order.user.name, 400, customerInformationTop)
    .font("Helvetica")
    .text("Customer Phone:", 300, customerInformationTop + 15)
    .font("Helvetica")
    .text(order.shippingInfo.phone, 400, customerInformationTop + 15)
    .font("Helvetica")
    .text("Customer Address:", 300, customerInformationTop + 30)
    .font("Helvetica")
    .text(order.shippingInfo.address, 400, customerInformationTop + 30)
    .text(
      order.shippingInfo.city +
        ", " +
        order.shippingInfo.country,
      400,
      customerInformationTop + 45
    )
    .moveDown();

  generateHr(doc, 267);
}

function generateInvoiceTable(doc, order) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Category",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < order.orderItems.length; i++) {
    const orderItems = order.orderItems[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      orderItems.name,
      orderItems.category,
      orderItems.price,
      orderItems.quantity,
      orderItems.price * orderItems.quantity,
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "Items Price",
    "",
    formatCurrency(order.totalPrice - order.taxPrice),
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "Tax",
    "",
    formatCurrency(order.taxPrice)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "Balance Due",
    "",
    formatCurrency(order.totalPrice),
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  category,
  
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(category, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return (cents).toFixed(2) + " EGP";
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
