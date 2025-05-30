import { useState, useEffect } from 'react';
import api from './config/api';

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '' });

  useEffect(() => {
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = () => {
    api.post('/auth/register', form).then((res) => setUser(res.data.user));
  };

  const login = () => {
    api.post('/auth/login', form).then((res) => setUser(res.data.user));
  };

  const logout = () => {
    api.post('/auth/logout').then(() => setUser(null));
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">MERN Auth (No JWT)</h1>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <button className="bg-red-500 text-white px-4 py-2" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="border p-2"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="border p-2"
          />
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={register}
            >
              Register
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2"
              onClick={login}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
