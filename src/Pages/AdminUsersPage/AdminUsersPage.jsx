// pages/AdminUsersPage.jsx

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./AdminUsersPage.module.css";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck";

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { getUser, updateUser } = useUser();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
          {
            method: "GET",
            headers: {
              "x-auth-token": adminToken,
            },
          }
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    }

    fetchUsers();
  }, []);
  return (
    <div className={styles.adminUsersContainer}>
      <h2>App Users</h2>
      <table className={styles.adminUsersTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Admin</th>
            <th>Business</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user._id}
              onClick={() => {
                getUser(user._id);
                navigate(`/updateUser/${user._id}`);
              }}
            >
              <td>{idx + 1}</td>
              <td>
                {user.name?.first} {user.name?.last}
              </td>
              <td>{user.email}</td>
              <td>{user.phone || "-"}</td>
              <td>
                {user.isAdmin ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
              <td>
                {user.isBusiness ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
