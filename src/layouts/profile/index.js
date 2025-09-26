/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "../../examples/Lists/ProfilesList";
import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";



// Images
import defaultproductpic from "../../themeAssets/images/defaultproductpic.png";
import team1 from "../../themeAssets/images/team-1.jpg";
import team2 from "../../themeAssets/images/team-2.jpg";
import team3 from "../../themeAssets/images/team-3.jpg";
import team4 from "../../themeAssets/images/team-4.jpg";

//user Context

import { useUser } from "../../helper/UserContext";



function Overview() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${user.user.id}`);
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={user?.user?.description}
                info={{
                  fullName: user?.user?.name || "N/A",
                  mobile: user?.user?.phone || "N/A",
                  email: user?.user?.email || "N/A",
                  location: user?.user?.location || "N/A"
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} pb={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Products
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {products.length > 0 ? (
              products.slice(0, 4).map((product, index) => (
                <Grid item xs={12} md={6} xl={3} key={product.id || index}>
                  <DefaultProjectCard
                    image={product.image_url || defaultproductpic}
                    label={`product ${index + 1}`}
                    title={product.name}
                    description={product.description}
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "info",
                      label: "view product",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={6} xl={3} >
                <p>No Products Added.</p>
              </Grid>
            )}

          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
