import { SMTPClient } from "emailjs";


export function getMonthName(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber];
}

export function getDaysExcludingSatSun(startDate, endDate) {
  let count = 0;
  while (startDate <= endDate) {
    let day = startDate.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }
  return count;
}


export async function generateUserTable(approvedLeave) {
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

  return {
    tableHeader,
    tableData
  };
}

export async function generateAdminTable(approvedLeave) {
  const tableHeader = `<tr>
    <th>Role</th>
    <th>Name</th>
    <th>Email</th>
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
      <td>${leave.role}</td>
      <td>${leave.userName}</td>
      <td>${leave.userEmail}</td>
      <td>${leave.title}</td>
      <td>${leave.startDate}</td>
      <td>${leave.endDate}</td>
      <td>${leave.casualLeaveCount}</td>
      <td>${leave.earnedLeaveCount}</td>
      <td>${leave.vacationLeaveCount}</td>
      <td>${leave.salaryDeduction}</td>
     </tr> `;
  });

  return {
    tableHeader,
    tableData
  };
}

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
  const client = new SMTPClient({
    user: process.env.SMTP_ID,
    password: process.env.SMTP_PASS,
    host: "smtp.gmail.com",
    ssl: true,
  });

  try {
    const message = await client.sendAsync({
      text: "I hope this works",
      from: `Leave Portal - BCIIT <${process.env.SMTP_ID}>`,
      to: user.email,
      subject: `Dear, ${user.name} here is your leave report!`,
      attachment: [
        { data: user_email_template, alternative: true },
        {
          data: Buffer.from(user.pdfBase64, "base64"),
          type: "application/pdf",
          name: `${user.name}'s Leave Report.pdf`,
        },
      ],
    });

    console.log("data: ", message);
    return {
      status: 200,
      message: "email sent successfully",
    };
  } catch (err) {
    return {
      status: 500,
      message: "something went wrong" + err,
    };
  }
}
