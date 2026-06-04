import { useEffect, useState } from "react";
import api from "../services/api";

function Directory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Directory</h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{user.name}</h3>

          <p>Branch: {user.branch}</p>
          <p>Year: {user.year}</p>
          <p>Skills: {user.skills}</p>
          <p>Bio: {user.bio}</p>
        </div>
      ))}
    </div>
  );
}

export default Directory;