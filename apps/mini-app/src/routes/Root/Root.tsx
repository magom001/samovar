import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { BottomNavigation } from "ui/BottomNavigation";
import { BottomNavigationAction } from "ui/BottomNavigationAction";
import { Icon } from "ui/Icon";
import { Paper } from "ui/Paper";
import { authenticatedHttpClient } from "../../services/http-client";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        lazy: () => import("../Main"),
      },
      {
        path: "/map",
        lazy: () => import("../MapView"),
      },
      {
        path: "/profile",
        lazy: () => import("../Profile"),
      },
    ],
  },
]);

export function Root() {
  const { t } = useTranslation(["common"]);
  const location = useLocation();

  const { status, data } = useQuery("whoami", () =>
    authenticatedHttpClient.get("api/v1/auth/whoami")
  );
  console.log("whoami result", status, data);

  return (
    <main>
      <Outlet />
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation showLabels value={location.pathname}>
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>home</Icon>}
            label={t("common:home")}
            to="/"
            value="/"
          />
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>map</Icon>}
            label={t("common:home")}
            to="/map"
            value="/map"
          />
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>person</Icon>}
            label={t("common:profile")}
            to="/profile"
            value="/profile"
          />
        </BottomNavigation>
      </Paper>
    </main>
  );
}
