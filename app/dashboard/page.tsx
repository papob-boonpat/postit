import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MyPost from "./MyPost";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session.user?.name}</h1>
      <MyPost />
    </main>
  );
};

export default Dashboard;
