import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default async function DataTable({ tableData }) {
  return (
    <Table>
      <TableCaption>A list of your recent leave </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Leave Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Date Range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item.status} className="overflow-hidden">
            <TableCell className="font-medium capitalize">
              {item.status}
            </TableCell>
            <TableCell className="w-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {String(item.id).slice(0, 9)}...
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">{String(item.id)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>            
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {String(item.title).slice(0, 25)}...
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">{String(item.title)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            
            </TableCell>
            <TableCell className="text-right overflow-hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {String(new Date(item.startDate).toLocaleDateString())}...
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">
                      {String(new Date(item.startDate).toLocaleDateString())}-
                      {String(new Date(item.endDate).toLocaleDateString())}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
