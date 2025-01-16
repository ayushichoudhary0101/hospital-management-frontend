import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(''); // Role filter: 'doctor' or 'patient'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch users based on role filter
      const response = await fetch(
        `http://localhost:8080/api/auth/users${role ? `?role=${role}` : ''}`
      );
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount or role change
  }, [role]);

  return (
    <div className="user-list">
      <h2>Users</h2>
      <div>
        <label>Filter by Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> - {user.email} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
