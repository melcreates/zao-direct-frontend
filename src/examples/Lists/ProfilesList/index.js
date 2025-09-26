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
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../helper/UserContext";
// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDAvatar from "../../../components/MDAvatar";
import MDButton from "../../../components/MDButton";

import defaultproductpic from "../../../themeAssets/images/profilepic.png";

function ProfilesList({ title, shadow }) {
  const { user } = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return; // wait until user is loaded
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const chats = res.data?.chats || [];

        const mappedProfiles = chats.map((chat) => ({
          image: defaultproductpic,
          name: chat.sender_name,
          description: chat.text,
          action: {
            type: "internal",
            route: `/dashboard/messages/${chat.sender_id === user.user.id ? chat.receiver_id : chat.sender_id}`,
            color: "info",
            label: "reply",
          },
        }));

        setChats(mappedProfiles);
      } catch (err) {
        console.error("Error fetching chats", err);
        setChats([]);
      }
    };

    fetchChats();
  }, [user]);


  const renderProfiles = chats.map(({ image, name, description, action }) => (
    <MDBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={1}>
        <MDAvatar src={image} alt="something here" shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {description}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        {action.type === "internal" ? (
          <MDButton component={Link} to={action.route} variant="text" color="info" sx={{ whiteSpace: "nowrap", minWidth: "auto" }}>
            {action.label}
          </MDButton>
        ) : (
          <MDButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </MDButton>
        )}
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {chats.length === 0 ? (
          <MDTypography
            variant="button"
            color="text"
            fontWeight="regular"
            sx={{ textAlign: "center", width: "100%", py: 2 }}
          >
            No conversations yet
          </MDTypography>
        ) : (
          renderProfiles
        )}
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
