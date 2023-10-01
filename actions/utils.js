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
