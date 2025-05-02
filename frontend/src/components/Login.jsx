import React from 'react';

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Login to Student Swap</h1>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-800 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;