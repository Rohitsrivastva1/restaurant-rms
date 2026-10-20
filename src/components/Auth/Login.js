import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Shell from '../Marketing/Shell';
import EyeIcon from './EyeIcon';

const Login = () => {
  const navigate = useNavigate();
  const { login, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Removed useEffect redirect logic - using direct redirect instead

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
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
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
      // Try to login without role - let backend determine the role
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        setSuccess(`Welcome back, ${result.user?.name || 'there'}.`);
        const redirectMap = {
          admin: '/admin',
          manager: '/admin',
          chef: '/chef',
          super_admin: '/superadmin',
          cart_owner: '/restra-owner',
          cart_worker: '/restra-worker',
        };
        const redirectPath = redirectMap[result.user?.role] || '/admin';
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Shell title="Log in to Servya">
      <section className="mk-section mk-auth-section">
        <div className="mk-wrap mk-auth">
          <div>
            <div className="mk-kicker">Account</div>
            <h1>Welcome back.</h1>
            <p className="mk-lead">Sign in to your menu, kitchen board and reports.</p>
          </div>
          <form className="mk-auth-card" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@yourvenue.com"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="mk-pass">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>
            {error && <p className="mk-alert bad" role="alert">{error}</p>}
            {success && <p className="mk-alert ok">{success}</p>}
            <button className="mk-gold" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
            <p className="mk-note">
              New venue? <Link to="/cart-owner-signup">Create an account</Link>
            </p>
          </form>
        </div>
      </section>
    </Shell>
  );
};

export default Login; 