import { useTranslation } from "react-i18next";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/map",
        lazy: () => import("../MapView"),
      },
      {
        path: "/about",
        lazy: () => import("../About"),
      },
    ],
  },
]);

export function Root() {
  const { t } = useTranslation(["common"]);
  const location = useLocation();

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
            to="/about"
            value="/about"
          />
        </BottomNavigation>
      </Paper>
    </main>
  );
}
