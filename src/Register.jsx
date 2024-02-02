import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = ({ typing, setTyping, end, setEnd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("login", firstName, lastName, email, dateOfBirth, password);
    setEnd("Winner");
  }

  return (
    <>
      <h2>Register Form</h2>
      <form
        onSubmit={handleSubmit}
        sx={{ marginBottom: 4 }}
        action={<Link to="/login" />}
      >
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
              setTyping(typing + 1);
            }}
            value={firstName}
            fullWidth
            required
            disabled={end != "Play"}
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
              setTyping(typing + 1);
            }}
            value={lastName}
            disabled={end != "Play"}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setTyping(typing + 1);
          }}
          value={email}
          fullWidth
          required
          disabled={end != "Play"}
          sx={{ mb: 4 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setTyping(typing + 1);
          }}
          value={password}
          required
          fullWidth
          disabled={end != "Play"}
          sx={{ mb: 4 }}
        />
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label="Date of Birth"
          onChange={(e) => {
            setDateOfBirth(e.target.value);
            setTyping(typing + 1);
          }}
          value={dateOfBirth}
          fullWidth
          required
          disabled={end != "Play"}
          sx={{ mb: 4 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          disabled={end != "Play"}
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
