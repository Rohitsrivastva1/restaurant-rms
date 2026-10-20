import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Shell from '../Marketing/Shell';
import EyeIcon from './EyeIcon';

const CartOwnerSignup = () => {
  const navigate = useNavigate();
  const { registerCartOwner, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    businessType: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.businessName.trim()) {
      setError('Venue / business name is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');
    clearError();

    try {
      const result = await registerCartOwner({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        businessName: formData.businessName,
        businessType: formData.businessType,
        address: formData.address
      });
      
      if (result.success) {
        setSuccess(`Welcome, ${result.user?.name || 'there'}. Your venue account is ready.`);
        navigate('/restra-owner', { replace: true });
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const businessTypes = [
    'Restaurant',
    'Cafe',
    'Bar & lounge',
    'Hotel dining',
    'Other',
  ];

  return (
    <Shell title="Create a Servya account">
      <section className="mk-section mk-auth-section">
        <div className="mk-wrap mk-auth wide">
          <div>
            <div className="mk-kicker">Get started</div>
            <h1>Create<br />your venue account.</h1>
            <p className="mk-lead">Set up the menu, tables and kitchen board for your restaurant, cafe, bar or hotel dining room.</p>
            <p className="mk-note">Already registered? <Link to="/login">Sign in</Link></p>
          </div>
          <form className="mk-auth-card" onSubmit={handleSubmit}>
            <h2>Your details</h2>
            <div className="mk-grid-2">
              <div>
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder="you@yourvenue.com" />
              </div>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
            </div>
            <h2>Password</h2>
            <div className="mk-grid-2">
              <div>
                <label htmlFor="password">Password</label>
                <div className="mk-pass">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" value={formData.password} onChange={handleInputChange} placeholder="At least 6 characters" />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="mk-pass">
                  <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required autoComplete="new-password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Repeat your password" />
                  <button type="button" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} onClick={() => setShowConfirmPassword((value) => !value)}>
                    <EyeIcon off={showConfirmPassword} />
                  </button>
                </div>
              </div>
            </div>
            <h2>Your venue</h2>
            <div className="mk-grid-2">
              <div>
                <label htmlFor="businessName">Venue name</label>
                <input id="businessName" name="businessName" type="text" value={formData.businessName} onChange={handleInputChange} placeholder="The name guests know" />
              </div>
              <div>
                <label htmlFor="businessType">Type</label>
                <select id="businessType" name="businessType" value={formData.businessType} onChange={handleInputChange}>
                  <option value="">Select a type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <textarea id="address" name="address" rows={3} value={formData.address} onChange={handleInputChange} placeholder="Where the venue is" />
            </div>
            {error && <p className="mk-alert bad" role="alert">{error}</p>}
            {success && <p className="mk-alert ok">{success}</p>}
            <button className="mk-gold" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>
      </section>
    </Shell>
  );
};

export default CartOwnerSignup;
