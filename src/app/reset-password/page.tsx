import { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Send request to the backend to reset the password
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setError('');
      setSuccessMessage('Password successfully reset. Redirecting to login...');
      setTimeout(() => {
        router.push('/AuthModal');
      }, 2000);
    } else {
      setError(data.message || 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Reset Password
          </button>
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm mt-4">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
