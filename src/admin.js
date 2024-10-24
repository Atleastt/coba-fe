
import React, { useState } from 'react';
import './admin.css';

function Admin() {
  const [accounts, setAccounts] = useState([
    { id: 1, username: 'asep_admin', phoneNumber: '08123456789', password: 'adminasep' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newAccount, setNewAccount] = useState({ id: '', username: '', phoneNumber: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewAccount({ id: '', username: '', phoneNumber: '', password: '' });
    setShowModal(true);
  };

  const openEditModal = (id) => {
    const accountToEdit = accounts.find((account) => account.id === id);
    setNewAccount(accountToEdit);
    setIsEditMode(true);
    setShowModal(true);
  };

  const addAccount = () => {
    setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
    setShowModal(false);
  };

  const saveEdit = () => {
    setAccounts(accounts.map((account) => (account.id === newAccount.id ? newAccount : account)));
    setShowModal(false);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Kelola Akun Pengguna</h1>
      <button className="btn btn-add" onClick={openAddModal}>
        Tambah Akun
      </button>
      <table className="account-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Nomor HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.username}</td>
              <td>{account.phoneNumber}</td>
              <td>
                <button className="btn btn-edit" onClick={() => openEditModal(account.id)}>Edit</button>
                <button className="btn btn-delete" onClick={() => deleteAccount(account.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditMode ? 'Edit Akun' : 'Tambah Akun Baru'}</h2>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={newAccount.username} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Nomor HP</label>
              <input type="text" name="phoneNumber" value={newAccount.phoneNumber} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={newAccount.password} onChange={handleInputChange} className="form-input" />
            </div>
            <button className="btn btn-save" onClick={isEditMode ? saveEdit : addAccount}>
              {isEditMode ? 'Simpan Perubahan' : 'Tambah Akun'}
            </button>
            <button className="btn btn-close" onClick={() => setShowModal(false)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;