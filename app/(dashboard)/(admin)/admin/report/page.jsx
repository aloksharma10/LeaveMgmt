"use client"; 
import { generateReportPDF, sendMail} from "@/actions/genrateReport";

const page = async () => {
  return <div onClick={async ()=> await sendMail()}>report</div>;
};

export default page;
