import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUserProvider } from "@/provider/User/UserProvider";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

export function RejectLeaveApproval({ leave }) {
  const { handleLeaveApproval } = useUserProvider();
  const [message, setMessage] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ShieldCheck className="text-yellow-600 w-5 mx-auto cursor-pointer hover:scale-105 transition-transform duration-150 hover:text-yellow-700" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rejected Message</DialogTitle>
          <DialogDescription>
            Reason for rejecting leave request, this message will be visible to
            the user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            id="message"
            name="message"
            placeholder=""
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleLeaveApproval(leave.id, "rejected", message)}
          >
            Reject
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleLeaveApproval(leave.id, "approved", message)}
          >
            Approved
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
