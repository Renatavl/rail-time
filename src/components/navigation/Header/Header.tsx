"use client";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                RailTime
              </Typography>
            </Link>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="/schedule" passHref>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Schedule
                </Typography>
              </Link>
              {isAuthed && (
                <Link href="/admin" passHref>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    Admin
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isAuthed ? (
              <IconButton
                aria-label="Logout"
                color="inherit"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <MeetingRoomOutlinedIcon />
              </IconButton>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="text"
                  color="inherit"
                >
                  SIGN IN
                </Button>
                <Button component={Link} href="/register" variant="contained">
                  SIGN UP
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
