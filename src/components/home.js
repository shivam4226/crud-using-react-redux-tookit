import React from "react";
import AddUserForm from "./AddUserForm";
// import UserList from "./UserList";

const Home = () => {
  return (
    <div>
      <h1 className="text-center bg-primary bg-gradient">User Management System</h1>
      <AddUserForm />
      {/* <UserList /> */}
    </div>
  );
  };
  export default Home