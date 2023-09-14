import { Button } from "@/components/ui/button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Logo from "../Logo/Logo";

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus();
  return (
    <div className="w-full rounded-md relative flex items-center bg-black">
      <Button className="w-full" disabled={pending} type="submit">
        {title}
      </Button>
      {pending ? (
        <Logo className="text-white w-20 h-5 absolute right-0 animate-spin items-end" />
      ) : (
        ""
      )}
    </div>
  );
};

export default SubmitButton;
