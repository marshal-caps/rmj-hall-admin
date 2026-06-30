import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://rmj-hall-admin-backend-production.up.railway.app";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await fetch(`${API_URL}/api/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("loggedIn", "true");

                alert(data.message);

                navigate("/dashboard");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

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

        </div>

    );

}

export default Login;