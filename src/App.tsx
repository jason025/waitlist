import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Rocket, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase = null;

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(false);

  useEffect(() => {
    if (supabaseUrl && supabaseKey) {
      try {
        supabase = createClient(supabaseUrl, supabaseKey);
        setIsSupabaseInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        setMessage({ text: 'Failed to initialize Supabase. Please check your configuration.', type: 'error' });
      }
    } else {
      setMessage({ text: 'Supabase is not configured. Please set up your environment variables.', type: 'error' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseInitialized) {
      setMessage({ text: 'Supabase is not initialized. Unable to submit form.', type: 'error' });
      return;
    }
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ full_name: fullName, email }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setMessage({ text: 'Thank you for joining our waitlist!', type: 'success' });
      setFullName('');
      setEmail('');
    } catch (error) {
      console.error('Caught error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Rocket className="text-indigo-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">FutureTech</h1>
        </div>
        <p className="text-gray-600 text-center mb-6">
          Join the waitlist for the next big thing in AI-powered productivity tools.
          Be among the first to experience the future of work.
        </p>
        {!isSupabaseInitialized && (
          <div className="mb-6 p-3 bg-yellow-100 text-yellow-800 rounded-md flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            <p>Supabase is not configured properly. Please check your environment variables.</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isSupabaseInitialized}
          >
            Join Waitlist
          </button>
        </form>
        {message.text && (
          <div className={`mt-4 p-3 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          } flex items-center`}>
            {message.type === 'success' ? (
              <CheckCircle className="mr-2" size={20} />
            ) : (
              <XCircle className="mr-2" size={20} />
            )}
            {message.text}
          </div>
        )}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-2">About FutureTech</h2>
        <p className="max-w-md">
          FutureTech is revolutionizing the way professionals work with our cutting-edge
          AI-powered productivity suite. Our tools learn from your workflow to provide
          personalized suggestions, automate repetitive tasks, and help you focus on what
          truly matters. Join us in shaping the future of work.
        </p>
      </div>
    </div>
  );
}

export default App;