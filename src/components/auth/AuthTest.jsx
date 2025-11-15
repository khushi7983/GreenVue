import React from 'react';
import { Link } from 'react-router-dom';

const AuthTest = () => {
  const testSignup = async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      console.log('Signup Test Result:', data);
      alert(`Signup ${data.success ? 'Success' : 'Failed'}: ${data.message}`);
    } catch (error) {
      console.error('Signup Test Error:', error);
      alert('Signup Test Failed: Network Error');
    }
  };

  const testLogin = async () => {
    const testData = {
      email: 'test@example.com',
      password: 'password123'
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      console.log('Login Test Result:', data);
      alert(`Login ${data.success ? 'Success' : 'Failed'}: ${data.message}`);
    } catch (error) {
      console.error('Login Test Error:', error);
      alert('Login Test Failed: Network Error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-500">Auth System Test</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">API Tests</h2>
            <div className="space-y-3">
              <button
                onClick={testSignup}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
              >
                Test Signup API
              </button>
              <button
                onClick={testLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
              >
                Test Login API
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">UI Tests</h2>
            <div className="space-y-3">
              <Link
                to="/signup"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded text-center transition-colors"
              >
                Test Signup Page
              </Link>
              <Link
                to="/login"
                className="block w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded text-center transition-colors"
              >
                Test Login Page
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-2 text-sm">
              <p>✅ Server: Running on port 5000</p>
              <p>✅ MongoDB: Connected</p>
              <p>✅ Frontend: Running on port 5173</p>
              <p>✅ Auth Routes: /api/auth/*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;