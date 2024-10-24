import React, { useState } from 'react';

function WelcomeUser() {
  const [userName, setUserName] = useState('');

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Selamat Datang, {userName || 'User'}!</h1>
      <input
        type="text"
        placeholder="Masukkan nama Anda"
        value={userName}
        onChange={handleInputChange}
        style={{ padding: '10px', fontSize: '16px' }}
      />
    </div>
  );
}

export default WelcomeUser;
