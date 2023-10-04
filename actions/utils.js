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