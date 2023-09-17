"use server";
// import { Workbook } from "exceljs";
import puppeteer from "puppeteer";
import { SMTPClient } from "emailjs";
import { readFile } from 'fs/promises';
import html from '@/components/'

// export async function generateReportCSV() {
//   try {
//     const data = [
//       { name: "John", total: 1000 },
//       { name: "Alice", total: 2000 },
//       { name: "Bob", total: 1500 },
//     ];
//     const workbook = new Workbook();
//     const sheet = workbook.addWorksheet("Report");

//     // Define the columns and their widths
//     sheet.columns = [
//       { header: "Name", key: "name", width: 15 },
//       { header: "Total", key: "total", width: 15 },
//     ];

//     // Add data to the worksheet and apply styles to each cell
//     data.forEach((item) => {
//       const row = sheet.addRow({ name: item.name, total: item.total });
//       row.eachCell((cell) => {
//         cell.alignment = { vertical: 'middle', horizontal: 'center' };
//         cell.font = { size: 12 };
//         cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
//       });
//     });

//     const filePath = "report.xlsx";
//     await workbook.xlsx.writeFile(filePath);
//     console.log("Report generated successfully.");
//   } catch (error) {
//     console.error("Something went wrong:", error);
//   }
// }

const mail = "aloks.uber@gmail.com";
const pwd = "zxccqaehbsbsunkf";
export async function generateReportPDF() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto("https://developer.chrome.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Read the HTML template file
    // const htmlTemplate = fs.readFileSync("email_template.html", "utf8");

    // Set the HTML content of the page
    await page.setContent(
      `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
    
        .container {
          background-color: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
        }
    
        .heading {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
    
        .account-info {
          margin-top: 1rem;
        }
    
        .account-info p {
          margin-bottom: 0.5rem;
        }
    
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
    
        .data-table th, .data-table td {
          border: 1px solid #ccc;
          padding: 0.5rem;
        }
    
        .data-table th {
          background-color: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="heading">Bank Report</div>
        <p>
          Dear customer,
          <br />
          Thank you for being a valued customer of our bank. Here is your bank report for the month of September:
        </p>
        <div class="account-info">
          <p>Account Name: John Doe</p>
          <p>Account Number: XXXX-XXXX-XXXX-1234</p>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <!-- Sample data for demonstration -->
            <tr>
              <td>2023-09-01</td>
              <td>Payment received</td>
              <td>$1000</td>
            </tr>
            <tr>
              <td>2023-09-05</td>
              <td>Utilities payment</td>
              <td>$300</td>
            </tr>
            <!-- Add more rows for your data -->
          </tbody>
        </table>
        <p>Thank you for using our services.</p>
      </div>
    </body>
    </html>
    `,
      { waitUntil: "domcontentloaded" }
    );

    // Generate the PDF
    await page.pdf({
      path: "Leave_reports/leave-report.pdf",
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    console.log("PDF Report generated successfully.");
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function sendMail() {
  // const email_template = "";
  const email_template = await readFile('Leave_reports/templates/indiviusal.html', 'utf-8');

  const client = new SMTPClient({
    user: mail,
    password: pwd,
    host: "smtp.gmail.com",
    ssl: true,
  });

  try {
    const message = await client.sendAsync({
      text: "i hope this works",
      from: mail,
      to: "aloks.uber@gmail.com, aloksharma10969@gmail.com",
      subject: "testing emailjs",
      attachment: [
        { data: email_template, alternative: true },
        {
          path: "Leave_reports/leave-report.pdf",
          type: "application/pdf",
          name: "renamed.pdf",
        },
      ],
    });
    console.log(message);
  } catch (err) {
    console.error(err);
  }
}
