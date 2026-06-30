import { useState } from "react";
import { getApiUrl } from "./api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(getApiUrl("/login"), {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || "Login failed");
      }

      setMessage("Login successful");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Unable to connect to the server");
    }
  };

  return (

        <div className="login-container">

            <h2>RMJ Hall Admin</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            {message && <p style={{ marginTop: "12px" }}>{message}</p>}

        </div>

    );

}

export default Login;