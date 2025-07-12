import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {user && (
        <>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;