import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedPasswords, setStoredPasswords] = useState([]);

  const handleAddPassword = (event) => {
    event.preventDefault();

    // Add the new password entry to the list
    setStoredPasswords([
      ...storedPasswords,
      { website, username, password }
    ]);

    // Reset the input fields
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="dashboard">
      <div className="title">AutoVault Dashboard</div>

      <div className="password-form">
        <h2>Add Your Website Credentials</h2>
        <form onSubmit={handleAddPassword}>
          <input
            type="text"
            className="input-field"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="add-password-button">Add Credentials</button>
        </form>
      </div>

      <div className="password-table">
        <h2>Your Saved Credentials</h2>
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {storedPasswords.map((entry, index) => (
              <tr key={index}>
                <td>{entry.website}</td>
                <td>{entry.username}</td>
                <td>{entry.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
