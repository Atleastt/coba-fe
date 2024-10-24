import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useAlert } from '../src/components/ui/alert';
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setUsernameError("");
    setPasswordError("");
    setRoleError("");
    
    let hasError = false;
    
    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    }
    
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }
    
    if (!role) {
      setRoleError("Choose the role");
      hasError = true;
    }
    
    if (hasError) return;

    try {
      setIsLoading(true);
      
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrPhone: username,
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      addAlert('success', 'Login successful!', 3000);
      login(username, role);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      addAlert('error', error.message || 'An error occurred during login', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="containers">
      {/* Left Container */}
      <div className="left-containers">
        <h1 className="profile-titles">BANK SAMPAH</h1>
        <div className="welcome-texts">
          <h2>SELAMAT DATANG DI BANK SAMPAH!</h2>
          <p>Ubah barang tidak terpakai menjadi sesuatu yang lebih berharga</p>
        </div>
        <div className="image-containers">
          <img src="image/login.png" alt="Login" />
        </div>
      </div>

      {/* Right Container */}
      <div className="right-containers">
        <h2>Login.</h2>
        <p>
          Don't have an account? <a href="/regist">Sign up</a>
        </p>
        <form onSubmit={handleLogin}>
          {/* Dropdown Role di Atas Username */}
          <div className="input-containers">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-selection"
              disabled={isLoading}
            >
              <option value="">Pilih Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {roleError !== "" ? <p className="errorLogin">{roleError}</p> : null}

          {/* Username Input */}
          <div className="input-containers">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {usernameError !== "" ? (
            <p className="errorLogin">{usernameError}</p>
          ) : null}

          {/* Password Input */}
          <div className="input-containers password-containers">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              className="show-password-icons"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordError !== "" ? (
            <p className="errorLogin">{passwordError}</p>
          ) : null}

          {/* Checkbox Remember Me */}
          <div className="remembers-me">
            <input type="checkbox" id="remember" disabled={isLoading} />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Button Login */}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;