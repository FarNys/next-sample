"use client";
import React, { useEffect, useState } from "react";

const ApiSample = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (!users) return <div>Something is Wrong!</div>;
  if (users.length === 0) return <div>Length is Zero</div>;

  return (
    <div className="flex flex-col gap-1 border rounded-lg">
      {users.map((user) => (
        <div className="px-4 py-2" key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default ApiSample;
