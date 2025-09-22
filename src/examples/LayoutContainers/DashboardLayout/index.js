import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";

// Components
import MDBox from "../../../components/MDBox";
import Sidenav from "../../../examples/Sidenav";
import Configurator from "../../../examples/Configurator";

// Context
import {
  useMaterialUIController,
  setLayout,
  setOpenConfigurator,
  setMiniSidenav,
} from "../../../context";

// Dashboard-only routes
import dashboardRoutes from "../../../dashboardRoutes";

// Images
import brandWhite from "../../../themeAssets/images/logo-ct.png";
import brandDark from "../../../themeAssets/images/logo-ct-dark.png";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    openConfigurator,
    darkMode,
  } = controller;

  const { pathname } = useLocation();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname, dispatch]);

  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <>
      {/* Sidenav */}
      <Sidenav
        color={sidenavColor}
        brand={
          (transparentSidenav && !darkMode) || whiteSidenav
            ? brandDark
            : brandWhite
        }
        brandName="ZaoDirect Dashboard"
        routes={dashboardRoutes}
        // ✅ FIXED: use dashboardRoutes
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />

      {/* Configurator panel */}
      <Configurator />

      {/* Floating settings button */}
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
        }}
      >
        <Icon
          fontSize="small"
          onClick={handleConfiguratorOpen}
          sx={{
            cursor: "pointer",
            background: darkMode ? "#1f283e" : "#fff",
            color: darkMode ? "#fff" : "#344767",
            borderRadius: "50%",
            boxShadow: 3,
            p: 1.2,
          }}
        >
          settings
        </Icon>
      </MDBox>

      {/* Main dashboard content */}
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          flex: 1,
          mt: 3, // margin-top instead of extra padding
          position: "relative",
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
          marginLeft: miniSidenav ? pxToRem(30) : pxToRem(150), // always apply, not only xl
          [breakpoints.down("lg")]: {
            marginLeft: pxToRem(0), // make sidenav smaller for tablets/mobiles
          },
        })}
      >
        {children}
      </MDBox>

    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
