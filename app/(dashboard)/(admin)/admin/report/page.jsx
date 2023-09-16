"use client"; 
import { generateReportPDF} from "@/actions/genrateReport";

const page = async () => {
  return <div onClick={async ()=> await generateReportPDF()}>report</div>;
};

export default page;
