"use client";
import {
  ArrowUpDown,
  CircleOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import LeaveModel from "./LeaveModel";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize text-center",
          row.getValue("status") === "approved" && "text-green-500",
          row.getValue("status") === "pending" && "text-yellow-500",
          row.getValue("status") === "rejected" && "text-red-500"
        )}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-32 text-left text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("title")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("title")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-ellipsis w-20 whitespace-nowrap overflow-clip text-left">
              {row.getValue("startDate")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("startDate")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-ellipsis w-20 whitespace-nowrap overflow-clip text-left">
              {row.getValue("endDate")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("endDate")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      if (rowData.status === "pending") {
        return <LeaveModel leave={rowData} />;
      } else {
        return <CircleOff className="w-5 mx-auto" disabled={true} />;
      }
    },
  },
];

export const leaveReportColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize text-left pl-4",
          row.getValue("status") === "approved" && "text-green-500",
          row.getValue("status") === "pending" && "text-yellow-500",
          row.getValue("status") === "rejected" && "text-red-500"
        )}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-36 text-left text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("title")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("title")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-ellipsis w-20 whitespace-nowrap overflow-clip text-left">
              {row.getValue("startDate")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("startDate")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-ellipsis w-20 whitespace-nowrap overflow-clip text-left">
              {row.getValue("endDate")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("endDate")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "vacationLeaveCount",
    header: "Vacation Leave",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-24 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("vacationLeaveCount")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("vacationLeaveCount")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "casualLeaveCount",
    header: "Casual Leave",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-24 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("casualLeaveCount")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("casualLeaveCount")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "earnedLeaveCount",
    header: "Earned Leave",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-24 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("earnedLeaveCount")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("earnedLeaveCount")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "salaryDeduction",
    header: "Salary Deduction",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-24 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("salaryDeduction")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("salaryDeduction")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      if (rowData.status === "pending") {
        return <LeaveModel leave={rowData} />;
      } else {
        return <CircleOff className="w-5 mx-auto " disabled={true} />;
      }
    },
  },
];
