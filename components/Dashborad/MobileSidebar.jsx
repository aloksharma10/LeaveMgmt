import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";
const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className='p-0'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
