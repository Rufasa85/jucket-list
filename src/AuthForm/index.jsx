import React, { useState } from "react";
import "./style.css";

export default function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.subHandle({
      email,
      password,
    });
  };
  return (
    <div className="AuthForm">
      <h2>{props.type}</h2>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>{props.type}</button>
      </form>
    </div>
  );
}
