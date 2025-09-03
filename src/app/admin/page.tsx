import { authOptions } from "@/auth";
import AdminView from "@/views/AdminView/AdminView";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <Container sx={{ py: 6 }}>
      <AdminView />
    </Container>
  );
}

export default AdminPage;
