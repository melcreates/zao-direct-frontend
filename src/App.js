// src/App.js
import { useState, useEffect, useMemo } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import VendorPage from "./pages/VendorPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import BecomeBuyerPage from "./pages/BecomeBuyerPage";
import { CartProvider } from "./helper/CartContext";
import { UserProvider } from "./helper/UserContext";
import ProtectedRoute from "./helper/ProtectedRoute";
import PublicLayout from "./layouts/public";

// ---- IMPORTANT IMPORT CHANGES ----
// Dashboard page (the actual Dashboard content with charts/stats)
import DashboardPage from "./layouts/dashboard";
// Dashboard layout wrapper (sidenav, navbar, footer, content area that renders <Outlet />)
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import dashboardRoutes from "./dashboardRoutes";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
import theme from "./themeAssets/theme";
import themeRTL from "./themeAssets/theme/theme-rtl";
import themeDark from "./themeAssets/theme-dark";
import themeDarkRTL from "./themeAssets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes (public)
import routes from "./routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "./context";

function AppContent() {
  const [controller] = useMaterialUIController();
  const { direction, darkMode } = controller;

  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Set direction
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Scroll top on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) return getRoutes(route.collapse);
      if (route.route && !route.route.startsWith("/dashboard")) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }
      return null;
    });

  return (
    <>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <RouteScrollToTop />
          <PhosphorIconInit />
          <Routes>
            {/* Public routes - wrapped in PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePageOne />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product-details/:productId" element={<ProductDetailsPageOne />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/become-farmer" element={<BecomeSellerPage />} />
              <Route path="/become-buyer" element={<BecomeBuyerPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/vendor" element={<VendorPage />} />
              <Route path="/vendor-details" element={<VendorDetailsPage />} />
              {getRoutes(routes)}
            </Route>

            {/* Protected dashboard parent - use DashboardLayout (wrapper) here */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  {direction === "rtl" ? (
                    <CacheProvider value={rtlCache}>
                      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
                        <DashboardLayout>
                          <Outlet />
                        </DashboardLayout>
                      </ThemeProvider>
                    </CacheProvider>
                  ) : (
                    <ThemeProvider theme={darkMode ? themeDark : theme}>
                      <DashboardLayout>
                        <Outlet />
                      </DashboardLayout>
                    </ThemeProvider>
                  )}
                </ProtectedRoute>
              }
            >
              {/* Default dashboard landing page (when path is exactly /dashboard) */}
              <Route index element={<DashboardPage />} />

              {/* Dashboard child pages (tables, billing, profile, etc.) */}
              {dashboardRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.route.replace("/dashboard/", "")}
                  element={route.component}
                />
              ))}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<HomePageOne />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
