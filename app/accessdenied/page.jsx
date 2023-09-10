import { redirect } from "next/navigation";

const page = ({ searchParams, status }) => {
  const { unauthorized } = searchParams;
  console.log("searchParams", searchParams, status);
  if (!unauthorized) {
    return redirect("/not-found");
  }
  return (
    <>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
    </>
  );
};

export default page;
