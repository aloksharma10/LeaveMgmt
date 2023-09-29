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
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Leave Id</TableHead>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="text-center">Date Range</TableHead>
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
                    <p className="text-sm w-28 font-medium text-ellipsis whitespace-nowrap overflow-clip">
                      {String(item.id)}
                    </p>
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
                  <TooltipTrigger className="text-left text-ellipsis whitespace-nowrap overflow-clip">
                    <p className="text-sm w-28 font-medium text-ellipsis whitespace-nowrap overflow-clip">
                      {String(item.title).slice(0, 25)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">{String(item.title)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="text-sm w-28 font-medium text-ellipsis whitespace-nowrap overflow-clip">
                    {item.startDate}-{item.endDate}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">
                      {item.startDate}-{item.endDate}
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
