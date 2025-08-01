import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm rounded-4">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">About cloudBOOK</h2>
          <p className="card-text fs-5">
            cloudBOOK is a simple and secure note-taking app built with the MERN stack. 
            It allows you to create, edit, and delete your personal notes anytime, anywhere.
          </p>
          <p className="card-text fs-5">
            Your data is safely stored in the cloud and only accessible by you. Whether you're a student, developer, or a working professional, 
            iNotebook helps you stay organized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

