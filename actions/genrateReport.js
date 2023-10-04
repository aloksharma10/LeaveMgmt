"use server";
import puppeteer from "puppeteer";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function generateReportPDF(approvedLeave, date, user) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto("https://developer.chrome.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const tableHeader = `<tr>
    <th>Title</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Casual Leave</th>
    <th>Earned Leave</th>
    <th>Vacation Leave</th>
    <th>Salary Deduction</th>
  </tr>`;

    const tableData = approvedLeave.map((leave) => {
      return `<tr>
      <td>${leave.title}</td>
      <td>${leave.startDate}</td>
      <td>${leave.endDate}</td>
      <td>${leave.casualLeaveCount}</td>
      <td>${leave.earnedLeaveCount}</td>
      <td>${leave.vacationLeaveCount}</td>
      <td>${leave.salaryDeduction}</td>
     </tr> `;
    });

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
          display: flex; 
          justify-contect: space-between;
          align-item: center
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
        <div class="heading">
          <div style="align-items: center; display: flex; justify-content: center">
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              className="mx-2"
              height="42"
              width="42"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path
                  d="M19.5 3A2.502 2.502 0 0 0 17 5.5c0 .357.078.696.214 1.005l-1.955 2.199A3.977 3.977 0 0 0 13 8c-.74 0-1.424.216-2.019.566L8.707 6.293l-.023.023C8.88 5.918 9 5.475 9 5a3 3 0 1 0-3 3c.475 0 .917-.12 1.316-.316l-.023.023L9.567 9.98A3.956 3.956 0 0 0 9 12c0 .997.38 1.899.985 2.601l-2.577 2.576A2.472 2.472 0 0 0 6.5 17C5.122 17 4 18.121 4 19.5S5.122 22 6.5 22 9 20.879 9 19.5c0-.321-.066-.626-.177-.909l2.838-2.838c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4 0-.636-.163-1.229-.428-1.764l2.117-2.383c.256.088.526.147.811.147C20.879 8 22 6.879 22 5.5S20.879 3 19.5 3zM13 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
                ></path>
              </svg>
            <span style="margin: 0 3px">BCIIT Leave Management Portal</span>
          </div>
            <span style="text-align: right; font-weight: 500;  font-size: 1rem; margin: 8px 0 0 auto">Date: ${new Date().toLocaleDateString()}</span>
        </div>
        <div style="text-align: center; font-size: 1.3rem;">
            Leave Report
        </div>
        <p>
          Dear ${user.name},
          <br />
          <br />
          Thank you for being a valuable employee. Here is your leave report for the date from ${new Date(
            date.from
          ).toLocaleDateString()} to ${new Date(date.to).toLocaleDateString()}:
        </p>
        <table class="data-table">
          <thead>
            ${tableHeader}
          </thead>
          <tbody>
           ${tableData}
          </tbody>
        </table>
        <p style="text-align: center">Note: <span style="color: red;">This report only contains approved leave reports</span></p>
        <p style="margin: 5px 0">Regards, 
        <br/>
          BCIIT Leave Management Team
        </p>
      </div>
    </body>
    </html>
    `,
      { waitUntil: "domcontentloaded" }
    );

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    const pdfBase64 = pdfBuffer.toString("base64");
    console.log("pdfBase64: ", pdfBase64);

    const res = await sendMail({
      name: user.name,
      email: user.email,
      pdfBase64,
    });

    console.log("res: ", res);

    return {
      status: 200,
      res,
      message: "PDF Report generated successfully.",
    };
  } catch (error) {
    return {
      status: 500,
      message: "something went wrong [pdf]",
      error
    };
  }
}
  // Assuming you're using Node.js 14+

export async function sendMail(user) {
  const user_email_template = `<!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .leave-details {
          width: 52%;
          margin: 0 auto;
          border: 1px solid #dddddd;
          padding: 20px;
          margin-top: 20px;
        }
        .leave-details h2 {
          text-align: center;
          margin-bottom: 10px;
        }
        .leave-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        .leave-table th,
        .leave-table td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        .leave-table th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <div className="leave-details">
          <p>Your leave report, Please find the attachment</p>
          <p>Note: <span style="color: red;">This report only contains approved leave reports</span></p>
        <div>
          <div>BCIIT Technical Team,</div>
          <div style="margin-top: 5px">Alok Sharma</div>
        </div>
      </div>
    </body>
  </html>
  `;

  try {

    const data = await resend.emails.send({
      from: "LMS - BCIIT <onboarding@resend.dev>",
      to: [user.email, "aloks.uber@gmail.com"],
      subject: `Dear, ${user.name} here is your leave report!`,
      html: user_email_template,
      
    });
    console.log("data :>> ", data);
    return {
      status: 200,
      data,
      message: "email sent successfully",
    };
  } catch (err) {
    return {
      status: 500,
      message: "something went wrong" + err,
    };
  }
}

