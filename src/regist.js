import React, { useState } from "react";
import "./regist.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from '../src/components/ui/alert';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    isAggree: false,
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    isAggree: "",
  });
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const validateForm = () => {
    let errorMessage = {};
    let isValid = true;

    // Validasi username
    if (data.username.trim() === "") {
      errorMessage.username = "Username is required";
      isValid = false;
    } else {
      errorMessage.username = "";
    }

    // Validasi phone number
    if (data.phonenumber.trim() === "") {
      errorMessage.phonenumber = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9]+$/.test(data.phonenumber)) {
      errorMessage.phonenumber = "Phone number must contain only numbers";
      isValid = false;
    } else {
      errorMessage.phonenumber = "";
    }

    // Validasi password
    if (data.password === "") {
      errorMessage.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 8 || data.password.length > 12) {
      errorMessage.password = "Password minimal 8 karakter dan maksimal 12 karakter";
      isValid = false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{1,}$/.test(data.password)) {
      errorMessage.password = "Password harus memiliki huruf dan angka";
      isValid = false;
    } else {
      errorMessage.password = "";
    }

    // Validasi confirmPassword
    if (data.confirmPassword !== data.password) {
      errorMessage.confirmPassword = "Password harus sama";
      isValid = false;
    } else {
      errorMessage.confirmPassword = "";
    }

    // Validasi agreement
    if (!data.isAggree) {
      errorMessage.isAggree = "Setujui Persyaratan terlebih dahulu";
      isValid = false;
    } else {
      errorMessage.isAggree = "";
    }

    setError(errorMessage);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addAlert('error', 'Mohon periksa kembali form anda');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          phone: data.phonenumber,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal membuat akun');
      }

      addAlert('success', 'Berhasil membuat akun!');

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      addAlert('error', error.message || 'Terjadi kesalahan saat membuat akun');
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <div className="image-container">
          <img src="image/regist.png" alt="Recycle" />
        </div>
        <div className="welcome-text">
          <h2>Starts for free and get</h2>
          <h2>attractive offers</h2>
        </div>
      </div>
      <div className="right-container">
        <h1>Get's started.</h1>
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
        <p className="or">or</p>
        <form>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          {error.username !== "" ? (
            <p className="error">{error.username}</p>
          ) : null}
          <div className="input-container">
            <input
              type="text"
              placeholder="No Handphone"
              onChange={(e) =>
                setData({ ...data, phonenumber: e.target.value })
              }
            />
          </div>
          {error.phonenumber !== "" ? (
            <p className="error">{error.phonenumber}</p>
          ) : null}
          <div className="input-container password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type="button"
              className="show-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error.password !== "" ? (
            <p className="error">{error.password}</p>
          ) : null}
          <div className="input-container password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="show-password-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error.confirmPassword !== "" ? (
            <p className="error">{error.confirmPassword}</p>
          ) : null}
          <div className="agree-terms">
            <input
              type="checkbox"
              id="agree"
              onChange={(e) => {
                setData({ ...data, isAggree: !data.isAggree });
              }}
            />
            <label htmlFor="agree">
              I agree to platforms <a href="#">Terms of service</a> and{" "}
              <a href="#">Privacy policy</a>
            </label>
          </div>
          {error.isAggree !== "" ? (
            <p className="error">{error.isAggree}</p>
          ) : null}
          <button onClick={handleSubmit} type="submit">
            Sign up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;