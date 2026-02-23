import React, { useEffect, useState } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://cloudbook-1b70.onrender.com/api/auth/getuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (data.name) {
        setUserName(data.name);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      getUser();
    }
  }, [navigate]); // ✅ added navigate dependency

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