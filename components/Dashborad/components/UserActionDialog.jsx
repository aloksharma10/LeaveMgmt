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

import { ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";

import { useUserProvider } from "@/provider/User/UserProvider";

export const ApprovedDialog = ({ user }) => {
  const { handleUserApproval } = useUserProvider();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ShieldCheck className="text-green-400 w-5 mx-auto cursor-pointer hover:scale-105 transition-transform duration-150 hover:text-green-700" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to approve this user? click continue to approve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleUserApproval(user.id?user.id:user._id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteUserDialog = ({ user }) => {
  const { handleUserDelete } = useUserProvider();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-red-600 w-5 mx-auto cursor-pointer hover:scale-105 transition-transform duration-150 hover:text-red-700" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to delete this user? click continue to delete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleUserDelete(user.id?user.id:user._id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DisapprovedDialog = ({ user }) => {
  const { handleUserDisapprove } = useUserProvider();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ShieldAlert className="text-yellow-500 w-5 mx-auto cursor-pointer hover:scale-105 transition-transform duration-150 hover:text-yellow-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to disapprove this user? click continue to
            disapprove.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleUserDisapprove(user.id?user.id:user._id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
