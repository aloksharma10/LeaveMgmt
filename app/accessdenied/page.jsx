import { redirect } from "next/navigation";

const page = ({ searchParams }) => {
  const { unauthorized } = searchParams;
  if (!unauthorized) {
    return redirect("/not-found");
  }
  return (
      <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700">Sorry, you do not have access to this page.</p>
    </div>
  );
};

export default page;
