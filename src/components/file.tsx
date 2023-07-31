import React, { useEffect, useState } from 'react';
import axios from 'axios';

export type UserData = {
  name: string;
  blog: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  email: string;
};

const File : React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    if (!userName) return;

    const fetchData = async () => {
      const url = `https://api.github.com/users/${userName}`;
      try {
        const response = await axios.get<UserData>(url);
        setUserData([response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <div>
      {userData.length > 0 ? (
        userData.map((data) => (
          <div key={data.name}>
            <p>Name: {data.name}</p>
            <p>Blog: {data.blog}</p>
            <p>Location: {data.location}</p>
            <p>Bio: {data.bio}</p>
            <p>Public Repos: {data.public_repos}</p>
            <p>Followers: {data.followers}</p>
            <p>Following: {data.following}</p>
            <p>Email: {data.email}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default File;
