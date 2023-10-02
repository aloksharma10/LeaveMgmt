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
  import { cn } from "@/lib/utils";
  export default async function RecentUpdatesTable({ tableData }) {
    return (
      <Table>
        <TableCaption>A list of your recent leave </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Date Range</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.id} className="overflow-hidden">
              <TableCell
                className={cn(
                  "font-medium capitalize",
                  item.status === "pending" && "text-yellow-500",
                  item.status === "approved" && "text-green-500",
                  item.status === "rejected" && "text-red-500"
                )}
              >
                {item.status}
              </TableCell>
              <TableCell className={cn("font-medium capitalize")}>
              {item.role}
            </TableCell>
              <TableCell className="w-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-sm w-28 font-medium text-ellipsis whitespace-nowrap overflow-clip">
                        {String(item.userName)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm font-medium">{String(item.userName)}</p>
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
  