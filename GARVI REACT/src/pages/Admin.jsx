import { useState } from 'react';
import { Users, LogOut, Mail, BarChart3, PieChart, Activity } from 'lucide-react';

export default function Admin() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('garvi_admin_users_v1') || '[]'));
  const [formData, setFormData] = useState({ inst: '', uid: '', pwd: '' });
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { inst, uid, pwd } = formData;
    if (!inst || !uid || !pwd) return;
    if (users.some((u) => u.uid.toLowerCase() === uid.toLowerCase())) {
      alert('User ID already exists. Choose a different one.');
      return;
    }
    setUsers([...users, { inst, uid, pwd }]);
    localStorage.setItem('garvi_admin_users_v1', JSON.stringify([...users, { inst, uid, pwd }]));
    setFormData({ inst: '', uid: '', pwd: '' });
  };

  const handleDelete = (uid) => {
    if (window.confirm('Delete this user?')) {
      const newUsers = users.filter((u) => u.uid !== uid);
      setUsers(newUsers);
      localStorage.setItem('garvi_admin_users_v1', JSON.stringify(newUsers));
    }
  };

  const filtered = users.filter((u) =>
    !filter || u.inst.toLowerCase().includes(filter.toLowerCase()) || u.uid.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="text-garvi-orange font-extrabold text-2xl tracking-wide">GARVI</a>
            <span className="text-gray-500">Admin Portal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-700">
            <Link to="/" className="hover:text-garvi-orange">Analytics</Link>
            <Link to="/benchmarking" className="hover:text-garvi-orange">Benchmarking</Link>
            <Link to="/simulator" className="hover:text-garvi-orange">Simulator</Link>
            <a className="text-garvi-orange font-semibold">Admin</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-garvi-orange">Admin — Create Institute Logins</h1>
          <p className="mt-2 text-gray-600">Add an institute with a user ID and password. Entries are shown below.</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-card hover-lift">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Account</h2>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4" autoComplete="off">
                <div>
                  <label htmlFor="inst" className="block text-sm text-gray-700 mb-1">Institute Name</label>
                  <input
                    id="inst"
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-garvi-orange focus:ring-garvi-orange px-3 py-2"
                    placeholder="e.g., IIT Gandhinagar"
                    value={formData.inst}
                    onChange={(e) => setFormData({ ...formData, inst: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="uid" className="block text-sm text-gray-700 mb-1">User ID</label>
                  <input
                    id="uid"
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-garvi-orange focus:ring-garvi-orange px-3 py-2"
                    placeholder="e.g., iitgn_admin"
                    value={formData.uid}
                    onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="pwd" className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    id="pwd"
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-garvi-orange focus:ring-garvi-orange px-3 py-2"
                    placeholder="e.g., P@ssw0rd!"
                    value={formData.pwd}
                    onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-3 flex items-center gap-3 mt-2">
                  <button type="submit" className="bg-garvi-orange text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90">
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ inst: '', uid: '', pwd: '' })}
                    className="border border-garvi-orange text-garvi-orange px-5 py-2 rounded-xl font-semibold hover:bg-garvi-orange hover:text-white transition"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tools</h2>
              <div className="flex flex-col gap-3">
                <button className="w-full border border-garvi-orange text-garvi-orange px-4 py-2 rounded-lg hover:bg-garvi-orange hover:text-white transition">
                  Export CSV
                </button>
                <button
                  className="w-full border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                  onClick={() => {
                    if (window.confirm('Clear ALL records?')) {
                      setUsers([]);
                      localStorage.removeItem('garvi_admin_users_v1');
                    }
                  }}
                >
                  Clear All
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">All data is stored locally in your browser (demo only).</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Institutes</h2>
            <div className="flex items-center gap-3">
              <input
                id="search"
                type="search"
                className="rounded-lg border-gray-300 focus:border-garvi-orange focus:ring-garvi-orange px-3 py-2"
                placeholder="Search institute or user id…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <span className="text-sm text-gray-500">{filtered.length} records</span>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto bg-white rounded-2xl shadow-card">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Institute</th>
                  <th className="px-4 py-3 text-left">User ID</th>
                  <th className="px-4 py-3 text-left">Password</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((u, i) => (
                  <tr key={u.uid}>
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{u.inst}</td>
                    <td className="px-4 py-3">{u.uid}</td>
                    <td className="px-4 py-3">••••••••</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(u.uid)} className="text-red-600 hover:underline text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-400 text-sm">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">© GARVI — GSIRF Performance Tools</p>
          <p className="text-gray-500">
            Contact: <a href="mailto:garvi@gmail.com" className="text-garvi-orange hover:underline">garvi@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
