import React, { useState } from 'react';
import './profile.css';

function Profile() {
  // State untuk menyimpan data user
  const [username, setUsername] = useState("EUIS");
  const [phoneNumber, setPhoneNumber] = useState("0897654321");
  const [address, setAddress] = useState("Jl. Jalan, Banten, Indonesia");

  // Fungsi untuk handle perubahan input
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  return (
    <div className="profile-container">
      {/* Header dan Navbar */}
      <div className="header">
        <h2 className="logo">BANK SAMPAH</h2>
        <nav className="navbar">
          {/* List berada di tengah */}
          <ul className="nav-list">
            <li>Home</li>
            <li>My Warehouse</li>
            <li>Orders</li>
            <li>Shop</li>
          </ul>
          {/* Foto Profil di pojok kanan */}
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-picture"
          />
        </nav>
      </div>

      {/* Konten Profil */}
      <div className="content">
        <div className="form-container">
          <h2>Profile Picture</h2>
          <div className="profile-picture-container">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="profile-picture-large"
            />
            <div className="button-group">
              <button className="btn btn-blue">Change Profile</button>
              <button className="btn btn-red">Delete Picture</button>
            </div>
          </div>

          {/* Form untuk mengubah data profil */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>No Handphone</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="form-input"
            />
          </div>

          <button className="btn btn-save">Simpan</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
