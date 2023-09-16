"use server";
import { Workbook } from "exceljs";

export async function genreteReport() {
  try {
    const data = [
        { name: "John", total: 1000 },
        { name: "Alice", total: 2000 },
        { name: "Bob", total: 1500 }
      ];
    // ... Generate Excel file using exceljs
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet("Report");
    sheet.columns = [
      { header: "Name", key: "name", width: 15 },
      { header: "Total", key: "total", width: 15 },
    ];

    data.forEach((item) => {
      sheet.addRow({ name: item.name, total: item.total });
    });

    const filePath = "report.xlsx";
    await workbook.xlsx.writeFile(filePath);

    return {
      status: 200,
      message: "Success!",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}
