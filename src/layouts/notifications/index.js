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
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  IconButton,
  InputAdornment,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { FaCircle } from "react-icons/fa";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDAlert from "../../components/MDAlert";
import MDButton from "../../components/MDButton";
import MDSnackbar from "../../components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";

import { useUser } from "../../helper/UserContext";
import axios from "axios";

function Notifications({ user: selectedUser }) {
  const { user } = useUser(); // 👈 current logged-in user

  const [contacts, setContacts] = useState([]);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedContact, setSelectedContact] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    const typingTimer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(typingTimer);
  }, [messages]);

  // ✅ Fetch conversation function (defined once, outside useEffect)
  const fetchConversation = async (otherUserId) => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const res = await axios.get(
        `http://localhost:5000/messages/${otherUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching Conversation:", err);
    }
  };

  // ✅ Fetch contacts
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(res.data.chats);
      } catch (err) {
        console.error("Error fetching Chat List:", err);
      }
    };

    fetchChatList();
  }, []);

  // ✅ Handle contact selection
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    const otherUserId = contact.sender_id; // 👈 sender is the other user
    fetchConversation(otherUserId); // 👈 now it’s in scope
  };


  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    if (inputMessage.length > 500) {
      setError("Message is too long (max 500 characters)");
      return;
    }
    setError("");
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sent: true,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  }));

  const ChatHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));

  const ChatMessages = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflowY: "auto",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  }));


  const MessageBubble = styled(Box)(({ theme, sent }) => ({
    maxWidth: "70%",
    padding: theme.spacing(1.2, 2),
    borderRadius: 20,
    marginBottom: theme.spacing(1.5),
    backgroundColor: sent ? theme.palette.primary.main : theme.palette.grey[300],
    color: sent ? "#fff" : "#000",
    alignSelf: sent ? "flex-end" : "flex-start", // 👈 will only work if parent is flex
    textAlign: sent ? "right" : "left",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  }));



  const ChatInputContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  }));

  const SearchInput = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  }));


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Conversations</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2} >
                <Box display="flex" height="100vh">
                  {!isMobile && (
                    <Box width={300} borderRight={1} borderColor="divider">
                      <StyledPaper>
                        <SearchInput
                          fullWidth
                          placeholder="Search contacts"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <List>
                          {contacts.map((contact) => (
                            <ListItem
                              key={contact.id}
                              button
                              onClick={() => handleContactSelect(contact)}
                              selected={selectedContact && selectedContact.id === contact.id}
                              sx={{
                                px: 2, // 👈 adds left & right padding
                                py: 1, // optional: vertical padding for balance
                                borderRadius: 2,
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar src={contact.sender_profile_picture} alt={contact.sender_name} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box display="flex" alignItems="center">
                                    <Typography variant="subtitle1">{contact.sender_name}</Typography>
                                    <Box ml={1} display="flex" alignItems="center">
                                      <FaCircle
                                        size={10}
                                        color={contact.sender_online ? "#4caf50" : "#bdbdbd"}
                                      />
                                    </Box>
                                  </Box>
                                }
                                secondary={contact.text}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </StyledPaper>
                    </Box>
                  )}
                  <Box flexGrow={1}>
                    <StyledPaper>
                      {selectedContact ? (
                        <>
                          <ChatHeader>
                            {isMobile && (
                              <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setDrawerOpen(true)}
                                sx={{ mr: 2 }}
                              >
                                <MenuIcon />
                              </IconButton>
                            )}
                            <Avatar src={selectedContact.sender_profile_picture} alt={selectedContact.sender_name} />
                            <Box ml={2}>
                              <Typography variant="h6">{selectedContact.sender_name}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {selectedContact.sender_online ? "Online" : "Offline"}
                              </Typography>
                            </Box>
                          </ChatHeader>
                          <ChatMessages>
                            {messages.map((message) => {
                              const loggedInUserId = user?.id || user?.user?.id; // ✅ fixed
                              const isMine = message.sender_id?.toString() === loggedInUserId?.toString();

                              return (
                                <MessageBubble key={message.id} sent={isMine}>
                                  <Typography variant="body1">{message.text}</Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      textAlign: isMine ? "right" : "left",
                                      marginTop: 0.5,
                                      opacity: 0.7,
                                    }}
                                  >
                                    {new Date(message.created_at).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </Typography>
                                </MessageBubble>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </ChatMessages>

                          <ChatInputContainer>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              placeholder="Type a message..."
                              variant="outlined"
                              error={!!error}
                              helperText={error}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      color="primary"
                                      onClick={handleSendMessage}
                                      edge="end"
                                      aria-label="send message"
                                    >
                                      <SendIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </ChatInputContainer>
                        </>
                      ) : (
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                        >
                          <Typography variant="h6" color="textSecondary">
                            Select a contact to start chatting
                          </Typography>
                        </Box>
                      )}
                    </StyledPaper>
                  </Box>
                  <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box width={250} role="presentation">
                      <List>
                        {contacts.map((contact) => (
                          <ListItem
                            key={contact.id}
                            button
                            onClick={() => handleContactSelect(contact)}
                          >
                            <ListItemAvatar>
                              <Avatar src={contact.avatar} alt={contact.name} />
                            </ListItemAvatar>
                            <ListItemText primary={contact.name} secondary={contact.lastMessage} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </Box>
              </MDBox>
            </Card>
          </Grid>


        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;

/**
  <MDAlert color="primary" dismissible>
    {alertContent("primary")}
  </MDAlert>
  <MDAlert color="secondary" dismissible>
    {alertContent("secondary")}
  </MDAlert>
  <MDAlert color="success" dismissible>
    {alertContent("success")}
  </MDAlert>
  <MDAlert color="error" dismissible>
    {alertContent("error")}
  </MDAlert>
  <MDAlert color="warning" dismissible>
    {alertContent("warning")}
  </MDAlert>
  <MDAlert color="info" dismissible>
    {alertContent("info")}
  </MDAlert>
  <MDAlert color="light" dismissible>
    {alertContent("light")}
  </MDAlert>
  <MDAlert color="dark" dismissible>
    {alertContent("dark")}
  </MDAlert>

  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );


  <Grid item xs={12} lg={8}>
  <Card>
    <MDBox p={2} lineHeight={0}>
      <MDTypography variant="h5">Notifications</MDTypography>
      <MDTypography variant="button" color="text" fontWeight="regular">
        Notifications on this page use Toasts from Bootstrap. Read more details here.
      </MDTypography>
    </MDBox>
    <MDBox p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
            success notification
          </MDButton>
          {renderSuccessSB}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
            info notification
          </MDButton>
          {renderInfoSB}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
            warning notification
          </MDButton>
          {renderWarningSB}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
            error notification
          </MDButton>
          {renderErrorSB}
        </Grid>
      </Grid>
    </MDBox>
  </Card>
</Grid>
*/