"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
import Navbar from "../../../components/Navbar";

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f4f9;
`;

const Sidebar = styled.aside`
  width: 240px;
  background: #2c3e50;
  padding: 20px;
  position: fixed;
  top: 64px;
  bottom: 0;
`;

interface SidebarItemProps {
  active: boolean;
}

const SidebarItem = styled.button<SidebarItemProps>`
  display: block;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#34495e" : "transparent")};
  color: #ecf0f1;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #34495e;
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: 240px;
  padding: 40px;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-image: url("/1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
`;

const ProfileCard = styled.div`
  display: inline-block;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #2c3e50;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: #7f8c8d;
`;

const SectionTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 8px;
`;

const TableHeader = styled.th`
  background: #ecf0f1;
  padding: 15px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 16px;
  color: #2c3e50;
`;

// Main Admin Page Component
export default function AdminPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string>("profile");

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Navbar />
      <Sidebar>
        <SidebarItem
          active={activeTab === "profile"}
          onClick={() => handleNavClick("profile")}
        >
          Profile
        </SidebarItem>
        <SidebarItem
          active={activeTab === "users"}
          onClick={() => handleNavClick("users")}
        >
          Users
        </SidebarItem>
        <SidebarItem
          active={activeTab === "bookings"}
          onClick={() => handleNavClick("bookings")}
        >
          Bookings
        </SidebarItem>
        <SidebarItem
          active={activeTab === "messages"}
          onClick={() => handleNavClick("messages")}
        >
          Messages
        </SidebarItem>
        <SidebarItem onClick={() => handleNavClick("signout")}>
          Sign Out
        </SidebarItem>
      </Sidebar>
      <MainContent>
        {activeTab === "profile" && <AdminProfile session={session} />}
        {activeTab === "users" && <Users />}
        {activeTab === "bookings" && <Bookings />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "signout" && <SignOut />}
      </MainContent>
    </Container>
  );
}

// Profile Component
const AdminProfile = ({ session }) => (
  <ProfileContainer>
    {session ? (
      <ProfileCard>
        <Avatar src={session.user.image || "profile-image-url"} alt="Profile" />
        <UserName>{session.user.name || "Admin Name"}</UserName>
        <UserEmail>{session.user.email || "admin@example.com"}</UserEmail>
        <SectionTitle>Admin Profile</SectionTitle>
      </ProfileCard>
    ) : (
      <p>Loading...</p>
    )}
  </ProfileContainer>
);

// Users Component
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <br></br>
      <br></br>
      <SectionTitle>Users</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Bookings Component
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div>
      <br></br>
      <br></br>
      <SectionTitle>Bookings</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Booking ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Contact Number</TableHeader>
            <TableHeader>Pickup Location</TableHeader>
            <TableHeader>Dropoff Location</TableHeader>
            <TableHeader>Date & Time</TableHeader>
            <TableHeader>Vehicle</TableHeader>
            <TableHeader>Payment Method</TableHeader>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <TableCell>{booking.bookingId}</TableCell>
              <TableCell>{`${booking.firstName} ${booking.lastName}`}</TableCell>
              <TableCell>{booking.mobileNumber || "Unknown"}</TableCell>
              <TableCell>{booking.pickupLocation}</TableCell>
              <TableCell>{booking.dropLocation}</TableCell>
              <TableCell>{new Date(booking.dateTime).toLocaleString()}</TableCell>
              <TableCell>{booking.selectedVehicle?.name || "Unknown Vehicle"}</TableCell>
              <TableCell>{booking.paymentMethod || "Unknown"}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Messages Component
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <br></br>
      <br></br>
      <SectionTitle>Messages</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Message</TableHeader>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell>{message.message}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// SignOut Component
const SignOut = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <ProfileContainer>
      <SectionTitle>Signing Out...</SectionTitle>
    </ProfileContainer>
  );
};
