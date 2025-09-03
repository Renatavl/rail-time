import { authOptions } from "@/auth";
import RegistrationView from "@/views/RegistrationView/RegistrationView";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function RegistrationPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <Container sx={{ py: 6 }}>
      <RegistrationView />
    </Container>
  );
}

export default RegistrationPage;
