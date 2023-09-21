"use server";
// import { Workbook } from "exceljs";
import puppeteer from "puppeteer";
import { SMTPClient } from "emailjs";
import { readFile } from "fs/promises";
import html from "@/components/";

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
    const htmlTemplate = await readFile(
      "Leave_reports/templates/userEmail.html",
      "utf-8"
    );

    // Set the HTML content of the page
    await page.setContent(htmlTemplate, { waitUntil: "domcontentloaded" });

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
  const email_template = await readFile(
    "Leave_reports/templates/indiviusal.html",
    "utf-8"
  );

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
