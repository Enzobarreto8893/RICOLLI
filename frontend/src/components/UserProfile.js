import React, { useEffect, useState } from 'react';
import { getUserProfile } from './api';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUserProfile(userId).then(setProfile).catch(console.error);
  }, [userId]);

  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div>
      <h1>Perfil de {profile.name}</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
