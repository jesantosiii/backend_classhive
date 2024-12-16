import React, { useState, useEffect } from 'react';
import api from './api.ts'

interface UserProfile {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  username: string;
  gender: string;
}

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get('/get-user-details/');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (profile) {
      await api.put('/update-user/', profile);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {profile && (
        <div>
          <h1>{profile.first_name} {profile.last_name}</h1>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
      )}
    </div>
  );
};
