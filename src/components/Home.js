import React, { useEffect, useState } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUserName(data.name); // Assuming the API returns a "name" field
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    } else {
      getUser();
    }
  }, []);

  return (
    <>
      <div className="container my-3">
        <h2>Welcome, {userName}!</h2>
      </div>
      <Notes />
    </>
  );
};

export default Home;
