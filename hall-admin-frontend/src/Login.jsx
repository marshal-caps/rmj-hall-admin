import { useState } from "react";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    console.log("Username:", username);
    console.log("Password:", password);

    try {

        fetch("https://rmj-hall-admin-backend-production.up.railway.app/login", {
    method: "POST",
    body: formData,
    credentials: "include"
});


    } catch (error) {
        console.error(error);
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