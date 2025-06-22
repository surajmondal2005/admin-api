import React, { useState } from 'react';
import { userApi } from '../api/userApi';

const UserManagement = ({ token, onLogout }) => {
  // State for form inputs
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [updatePhoneInput, setUpdatePhoneInput] = useState('');
  const [newRoleInput, setNewRoleInput] = useState('');
  const [deletePhoneInput, setDeletePhoneInput] = useState('');

  // State for API responses and loading
  const [response, setResponse] = useState('Waiting for action...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper function to show response
  const showResponse = (data) => {
    setResponse(JSON.stringify(data, null, 2));
    setError('');
    setSuccess('');
  };

  // Helper function to show error
  const showError = (message) => {
    setError(message);
    setSuccess('');
    setResponse('Error occurred');
  };

  // Helper function to show success
  const showSuccess = (message) => {
    setSuccess(message);
    setError('');
  };

  // API Functions
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const data = await userApi.getAllUsers(token);
      showResponse(data);
      showSuccess('Successfully fetched all users');
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUsersByCity = async () => {
    if (!cityInput.trim()) {
      showError('Please enter a city.');
      return;
    }
    
    setLoading(true);
    try {
      const data = await userApi.getUsersByCity(cityInput, token);
      showResponse(data);
      showSuccess(`Successfully fetched users from ${cityInput}`);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserByPhone = async () => {
    if (!/^\d{10}$/.test(phoneInput)) {
      showError('Enter valid 10-digit phone number.');
      return;
    }
    
    setLoading(true);
    try {
      const data = await userApi.getUserByPhone(phoneInput, token);
      showResponse(data);
      showSuccess(`Successfully fetched user with phone ${phoneInput}`);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async () => {
    if (!/^\d{10}$/.test(updatePhoneInput) || !newRoleInput.trim()) {
      showError('Fill both phone and role correctly.');
      return;
    }
    
    setLoading(true);
    try {
      const data = await userApi.updateUserRole(updatePhoneInput, newRoleInput, token);
      showResponse(data);
      showSuccess(`Successfully updated role for phone ${updatePhoneInput}`);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!/^\d{10}$/.test(deletePhoneInput)) {
      showError('Enter valid 10-digit phone number.');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete user with phone ${deletePhoneInput}?`)) {
      return;
    }
    
    setLoading(true);
    try {
      const data = await userApi.deleteUserByPhone(deletePhoneInput, token);
      showResponse(data);
      showSuccess(`Successfully deleted user with phone ${deletePhoneInput}`);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="/logo copy.jpg" className="logo" alt="Logo" />
      <h2>User Management</h2>
      <button onClick={onLogout} className="action-btn" style={{ backgroundColor: '#e53935', marginBottom: '20px' }}>Logout</button>

      {/* Section 1: Get All Users */}
      <div className="section">
        <button 
          className="action-btn" 
          onClick={getAllUsers}
          disabled={loading}
        >
          {loading ? 'Loading...' : '1. Get All Users'}
        </button>
      </div>

      {/* Section 2: Get Users by City */}
      <div className="section">
        <label htmlFor="cityInput">City</label>
        <input
          type="text"
          id="cityInput"
          placeholder="Enter city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          required
        />
        <button 
          className="action-btn" 
          onClick={getUsersByCity}
          disabled={loading}
        >
          {loading ? 'Loading...' : '2. Get Users by City'}
        </button>
      </div>

      {/* Section 3: Get User by Phone */}
      <div className="section">
        <label htmlFor="phoneInput">Phone Number</label>
        <input
          type="text"
          id="phoneInput"
          placeholder="Enter phone number"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          required
          pattern="[0-9]{10}"
        />
        <button 
          className="action-btn" 
          onClick={getUserByPhone}
          disabled={loading}
        >
          {loading ? 'Loading...' : '3. Get User by Phone'}
        </button>
      </div>

      {/* Section 4: Update User Role */}
      <div className="section">
        <label htmlFor="updatePhoneInput">Phone Number</label>
        <input
          type="text"
          id="updatePhoneInput"
          placeholder="Enter phone number"
          value={updatePhoneInput}
          onChange={(e) => setUpdatePhoneInput(e.target.value)}
          required
          pattern="[0-9]{10}"
        />
        <label htmlFor="newRoleInput">New Role</label>
        <input
          type="text"
          id="newRoleInput"
          placeholder="Enter role (e.g., provider)"
          value={newRoleInput}
          onChange={(e) => setNewRoleInput(e.target.value)}
          required
        />
        <button 
          className="action-btn" 
          onClick={updateUserRole}
          disabled={loading}
        >
          {loading ? 'Loading...' : '4. Update User Role'}
        </button>
      </div>

      {/* Section 5: Delete User */}
      <div className="section">
        <label htmlFor="deletePhoneInput">Phone Number</label>
        <input
          type="text"
          id="deletePhoneInput"
          placeholder="Enter phone number to delete"
          value={deletePhoneInput}
          onChange={(e) => setDeletePhoneInput(e.target.value)}
          required
          pattern="[0-9]{10}"
        />
        <button 
          className="action-btn" 
          onClick={deleteUser}
          disabled={loading}
        >
          {loading ? 'Loading...' : '5. Delete User'}
        </button>
      </div>

      {/* Output */}
      <div>
        <h3>Response:</h3>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <pre className="output">{response}</pre>
      </div>
    </div>
  );
};

export default UserManagement; 