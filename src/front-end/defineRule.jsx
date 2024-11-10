import React, { useState } from "react";
import "./App.css";

function defineRule() {
  // Custom sequence: 0-9, A-Z, a-z
  const customSequence = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const sequenceLength = customSequence.length; // 62 characters
  
  // Create a map from each character to its index in the sequence
  const charToIndex = {};
  const indexToChar = {};
  for (let i = 0; i < sequenceLength; i++) {
    charToIndex[customSequence[i]] = i;
    indexToChar[i] = customSequence[i];
  }

  // State hooks to store user input and encrypted password
  const [password, setPassword] = useState("");
  const [shiftValues, setShiftValues] = useState(""); // A string of shifts (e.g., "13245")
  const [encryptedPassword, setEncryptedPassword] = useState("");

  // Function to apply a different shift to each character in the password
  const encryptPassword = (password, shifts) => {
    let encryptedPassword = "";

    // Iterate over each character in the password and apply the corresponding shift
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      let shift = parseInt(shifts[i] || "0", 10); // Convert each shift value to an integer, defaulting to 0 if not found

      // Find the index of the character in the custom sequence
      let charIndex = charToIndex[char];

      // If the character is not found in the custom sequence (e.g., special characters), leave it unchanged
      if (charIndex === undefined) {
        encryptedPassword += char;
      } else {
        // Apply the shift within the custom sequence and wrap around using modulo
        let newIndex = (charIndex + shift) % sequenceLength;
        if (newIndex < 0) newIndex += sequenceLength; // Handle negative shifts
        encryptedPassword += indexToChar[newIndex];
      }
    }

    return encryptedPassword;
  };

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Encrypt the password using the different shifts for each character
  const encrypted = encryptPassword(password, shiftValues);
  setEncryptedPassword(encrypted); // Set the encrypted password to state
};

return (
  <div className="App">
    <h1>Custom Password Encryption with Cyclic Shifts</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="passwordInput">Enter Password:</label>
        <input
          type="text"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="shiftValues">Shift Values (without commas):</label>
        <input
          type="text"
          id="shiftValues"
          value={shiftValues}
          onChange={(e) => setShiftValues(e.target.value)}
          placeholder="e.g. 13245"
          required
        />
      </div>

      <button type="submit">Encrypt Password</button>
    </form>

    <h2>Encrypted Password:</h2>
    <p>{encryptedPassword || "Your encrypted password will appear here."}</p>
  </div>
);
}

export default App;

