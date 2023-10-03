"use client";
import {
  ArrowUpDown,
  CircleOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import LeaveModel from "./LeaveModel";
import {
  ApprovedDialog,
  DisapprovedDialog,
  DeleteUserDialog,
} from "./UserActionDialog";
import { RejectLeaveApproval } from "./LeaveActionDialog";

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
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip">
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
            <div>{row.getValue("startDate")}</div>
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
            <div>{row.getValue("endDate")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("endDate")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "casualLeaveCount",
    header: "Casual",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("casualLeaveCount")}</div>
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
    header: "Earned",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("earnedLeaveCount")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("earnedLeaveCount")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "vacationLeaveCount",
    header: "Vacation",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("vacationLeaveCount")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("vacationLeaveCount")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "salaryDeduction",
    header: "Salary",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("salaryDeduction")}</div>
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
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
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
            <div>{row.getValue("startDate")}</div>
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
            <div>{row.getValue("endDate")}</div>
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
            <div>{row.getValue("vacationLeaveCount")}</div>
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
            <div>{row.getValue("casualLeaveCount")}</div>
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
            <div>{row.getValue("earnedLeaveCount")}</div>
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
            <div>{row.getValue("salaryDeduction")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("salaryDeduction")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "message",
    header: "Rejected Reason",
    cell: ({ row }) => {
      const rowData = row.original;
      if (rowData.status === "pending") {
        return <Label>Waiting for the response...</Label>;
      }
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-ellipsis w-20 whitespace-nowrap overflow-clip capitalize">
                {row.getValue("message")
                  ? row.getValue("message")
                  : "No Message..."}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {row.getValue("message")
                  ? row.getValue("message")
                  : "No Message..."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

export const UserApprovalColumns = [
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
    accessorKey: "approved",
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
          row.getValue("approved") === true && "text-green-500",
          row.getValue("approved") === false && "text-red-500"
        )}
      >
        {String(row.getValue("approved"))}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("role")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("role")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("name")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("email")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("email")}</p>
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
      return (
        <span className="flex">
          <ApprovedDialog user={rowData} />
          <DeleteUserDialog user={rowData} />
        </span>
      );
    },
  },
];

export const AllUsers = [
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
    accessorKey: "approved",
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
          row.getValue("approved") === true && "text-green-500",
          row.getValue("approved") === false && "text-red-500"
        )}
      >
        {String(row.getValue("approved"))}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("role")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("role")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("name")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("email")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("email")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "totalTakenLeave",
    header: "Total Leave",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("totalTakenLeave")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("totalTakenLeave")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "casualLeave",
    header: "Casual",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("casualLeave")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("casualLeave")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "earnedLeave",
    header: "Earned",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("earnedLeave")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("earnedLeave")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "vacationLeave",
    header: "Vacation",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>{row.getValue("vacationLeave")}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("vacationLeave")}</p>
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
      const Component = rowData.approved ? DisapprovedDialog : ApprovedDialog;
      return (
        <span className="flex">
          <Component user={rowData} />
          <DeleteUserDialog user={rowData} />
        </span>
      );
    },
  },
];

export const UserleaveApprovalColumns = [
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
      <div className={cn("capitalize w-5 text-left pl-4 text-yellow-500")}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-12 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("role")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("role")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-12 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("name")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-12 text-ellipsis whitespace-nowrap overflow-clip ">
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
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="capitalize w-20 text-ellipsis whitespace-nowrap overflow-clip ">
              {row.getValue("message")}
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-52">
            <p>{row.getValue("message")}</p>
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
            <div>{row.getValue("startDate")}</div>
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
            <div>{row.getValue("endDate")}</div>
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
      return <RejectLeaveApproval leave={rowData} />;
    },
  },
];
