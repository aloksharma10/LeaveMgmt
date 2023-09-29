import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserProvider } from "@/provider/User/UserProvider";
import { Trash2 } from "lucide-react";

const LeaveModel = ({ leave }) => {
  const { handleLeaveDelete } = useUserProvider();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-red-600 w-5 mx-auto cursor-pointer hover:scale-105 transition-transform duration-150 hover:text-red-700" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your leave request will be deleted, If you wish to proceed with the
            deletion, please click &quot;Confirm.&quot; If you prefer to retain
            this data, please click &quot;Cancel.&quot;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleLeaveDelete(leave.id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveModel;
