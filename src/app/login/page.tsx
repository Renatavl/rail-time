import { authOptions } from "@/auth";
import LoginView from "@/views/LoginView/LoginView";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <Container sx={{ py: 6 }}>
      <LoginView />
    </Container>
  );
}

export default LoginPage;
