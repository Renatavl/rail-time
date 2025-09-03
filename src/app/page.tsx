"use client";

import * as React from "react";
import NextLink from "next/link";
import {
  Box,
  Chip,
  Container,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

export default function ProjectSummary() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700}>
            RailTime — опис проєкту
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Міні-застосунок для перегляду та адміністрування розкладу потягів.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <PublicRoundedIcon />
            <Typography variant="h6" fontWeight={700}>
              Опис сайту, посилання
            </Typography>
          </Stack>

          <Typography mb={2}>
            Публічна сторінка показує розклад із пошуком і сортуванням.
            Адмін-панель дозволяє додавати/редагувати/видаляти поїзди та їх
            тижневий розклад.
          </Typography>

          <List dense disablePadding>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ScheduleRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    Публічний розклад:{" "}
                    <MuiLink
                      component={NextLink}
                      href="/schedule"
                      underline="hover"
                    >
                      /schedule
                    </MuiLink>
                  </>
                }
              />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AdminPanelSettingsRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    Адмін-панель (після входу):{" "}
                    <MuiLink
                      component={NextLink}
                      href="/admin"
                      underline="hover"
                    >
                      /admin
                    </MuiLink>
                  </>
                }
              />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LoginRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    Вхід/реєстрація:{" "}
                    <MuiLink
                      component={NextLink}
                      href="/login"
                      underline="hover"
                    >
                      /login
                    </MuiLink>
                    ,{" "}
                    <MuiLink
                      component={NextLink}
                      href="/register"
                      underline="hover"
                    >
                      /register
                    </MuiLink>
                  </>
                }
              />
            </ListItem>
          </List>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <BuildRoundedIcon />
            <Typography variant="h6" fontWeight={700}>
              Фронтенд + Технології
            </Typography>
          </Stack>

          <Typography mb={2}>
            Інтерфейс побудовано на сучасних компонентах і формах з валідацією.
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {[
              "Next.js (App Router)",
              "React",
              "Material UI",
              "Formik",
              "Yup",
              "React-Toastify",
            ].map((t) => (
              <Chip key={t} label={t} variant="outlined" />
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <ApiRoundedIcon />
            <Typography variant="h6" fontWeight={700}>
              Бекенд + технології
            </Typography>
          </Stack>

          <Typography mb={2}>
            Дані зберігаються в базі, доступ відбувається через REST-ендпоїнти з
            авторизацією.
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {[
              "Next.js API Routes",
              "PostgreSQL",
              "Prisma",
              "NextAuth (Credentials, JWT)",
              "argon2",
            ].map((t) => (
              <Chip key={t} label={t} variant="outlined" />
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Як користуватись
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <List
            dense
            component="ol"
            sx={{
              pl: 2,
              listStyleType: "decimal",
              "& .MuiListItem-root": { display: "list-item" },
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <>
                    Зареєструйтесь на{" "}
                    <MuiLink
                      component={NextLink}
                      href="/register"
                      underline="hover"
                    >
                      /register
                    </MuiLink>{" "}
                    та увійдіть на{" "}
                    <MuiLink
                      component={NextLink}
                      href="/login"
                      underline="hover"
                    >
                      /login
                    </MuiLink>
                    .
                  </>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <>
                    У{" "}
                    <MuiLink
                      component={NextLink}
                      href="/admin"
                      underline="hover"
                    >
                      /admin
                    </MuiLink>{" "}
                    створіть поїзди та їх тижневий розклад
                    (створення/редагування/видалення).
                  </>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <>
                    На{" "}
                    <MuiLink
                      component={NextLink}
                      href="/schedule"
                      underline="hover"
                    >
                      /schedule
                    </MuiLink>{" "}
                    оберіть день, скористайтесь пошуком і сортуванням,
                    перегляньте часи відправлення/прибуття.
                  </>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Container>
  );
}
