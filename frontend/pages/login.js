import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { login } from "@/pages/api/authentication";
import { getChat } from "@/pages/api/chats";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(form)
      .then((result) => {
        console.log(result);
        if (result.error) {
          setError(result.error);
          return;
        }
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            isInvalid={!!error}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
        <br />
        <Button variant="primary" onClick={() => router.push("/signup")}>
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Login;
