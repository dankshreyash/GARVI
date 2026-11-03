import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Trash2, Eye, EyeOff, CheckCircle2, XCircle, Clock, Menu, X } from 'lucide-react';

export default function Admin() {
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('garvi_admin_users_v1') || '[]');
    } catch {
      return [];
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('garvi_submissions_v1') || '[]');
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({ inst: '', uid: '', pwd: '' });
  const [filter, setFilter] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [navOpen, setNavOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { inst, uid, pwd } = formData;
    if (!inst.trim() || !uid.trim() || !pwd.trim()) return;

    if (users.some((u) => u.uid.toLowerCase() === uid.trim().toLowerCase())) {
      alert('User ID already exists. Choose a different one.');
      return;
    }

    const updated = [...users, { inst: inst.trim(), uid: uid.trim(), pwd: pwd.trim() }];
    setUsers(updated);
    localStorage.setItem('garvi_admin_users_v1', JSON.stringify(updated));
    setFormData({ inst: '', uid: '', pwd: '' });
  };

  const handleDelete = (uid) => {
    if (window.confirm('Delete this user?')) {
      const updated = users.filter((u) => u.uid !== uid);
      setUsers(updated);
      localStorage.setItem('garvi_admin_users_v1', JSON.stringify(updated));
    }
  };

  const handleExportCSV = () => {
    if (users.length === 0) {
      alert('No user records to export.');
      return;
    }
    const header = ['Institute', 'User ID', 'Password'];
    const lines = [header.join(',')].concat(
      users.map((r) => [r.inst, r.uid, r.pwd].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garvi_institutes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear ALL institute login records?')) {
      setUsers([]);
      localStorage.removeItem('garvi_admin_users_v1');
    }
  };

  const togglePasswordVisibility = (uid) => {
    setVisiblePasswords((prev) => ({ ...prev, [uid]: !prev[uid] }));
  };

  // Submission actions
  const handleUpdateSubmissionStatus = (id, newStatus) => {
    const updated = submissions.map((sub) => {
      if (sub.id === id || sub.gsirfId === id) {
        return {
          ...sub,
          status: newStatus,
          acceptedAt: newStatus === 'accepted' ? new Date().toISOString() : sub.acceptedAt,
          rejectedAt: newStatus === 'rejected' ? new Date().toISOString() : sub.rejectedAt,
        };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('garvi_submissions_v1', JSON.stringify(updated));
  };

  const filtered = users.filter(
    (u) =>
      !filter ||
      u.inst.toLowerCase().includes(filter.toLowerCase()) ||
      u.uid.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-garvi-orange font-extrabold text-2xl tracking-wide">
              GARVI
            </Link>
            <span className="text-gray-500 font-medium">Admin Portal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-700 text-sm font-medium">
            <Link to="/analytics" className="hover:text-garvi-orange transition-colors">
              Analytics
            </Link>
            <Link to="/benchmarking" className="hover:text-garvi-orange transition-colors">
              Benchmarking
            </Link>
            <Link to="/simulator" className="hover:text-garvi-orange transition-colors">
              Simulator
            </Link>
            <span className="text-garvi-orange font-semibold">Admin</span>
          </nav>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-garvi-orange"
          >
            {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
            <Link to="/analytics" onClick={() => setNavOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-garvi-orange">
              Analytics
            </Link>
            <Link to="/benchmarking" onClick={() => setNavOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-garvi-orange">
              Benchmarking
            </Link>
            <Link to="/simulator" onClick={() => setNavOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-garvi-orange">
              Simulator
            </Link>
            <Link to="/" onClick={() => setNavOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-garvi-orange">
              Home
            </Link>
          </div>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-garvi-orange">Admin — Create Institute Logins</h1>
          <p className="mt-2 text-gray-600">Add an institute with a user ID and password. Entries and submissions are managed below.</p>
        </section>

        {/* Form + Actions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Account</h2>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4" autoComplete="off">
                <div>
                  <label htmlFor="inst" className="block text-sm text-gray-700 mb-1">
                    Institute Name
                  </label>
                  <input
                    id="inst"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3 py-2 outline-none"
                    placeholder="e.g., IIT Gandhinagar"
                    value={formData.inst}
                    onChange={(e) => setFormData({ ...formData, inst: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="uid" className="block text-sm text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    id="uid"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3 py-2 outline-none"
                    placeholder="e.g., iitgn_admin"
                    value={formData.uid}
                    onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="pwd" className="block text-sm text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="pwd"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3 py-2 outline-none"
                    placeholder="e.g., P@ssw0rd!"
                    value={formData.pwd}
                    onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-3 flex items-center gap-3 mt-2">
                  <button type="submit" className="bg-garvi-orange text-white px-5 py-2 rounded-xl font-semibold hover:bg-garvi-gold transition">
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

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tools</h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center justify-center gap-2 w-full border border-garvi-orange text-garvi-orange px-4 py-2 rounded-lg hover:bg-garvi-orange hover:text-white transition font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex items-center justify-center gap-2 w-full border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">All credentials stored locally in your browser storage.</p>
            </div>
          </div>
        </section>

        {/* GSIRF 2026 Submissions Review */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">GSIRF 2026 — Submitted Data</h2>
            <span className="text-sm text-gray-500">{submissions.length} submission(s)</span>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Institute</th>
                  <th className="px-4 py-3 text-left">GSIRF ID</th>
                  <th className="px-4 py-3 text-left">Submitted At</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub, i) => (
                  <tr key={sub.id || sub.gsirfId || i}>
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{sub.inst || sub.instituteName || 'Demo Institute'}</td>
                    <td className="px-4 py-3 text-gray-600">{sub.s1_gsirfId || sub.gsirfId || `GSIRF-${1000 + i}`}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-4 py-3">
                      {sub.status === 'accepted' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                        </span>
                      ) : sub.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5" /> Pending Review
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleUpdateSubmissionStatus(sub.id || sub.gsirfId, 'accepted')}
                        className="text-xs font-semibold text-green-700 hover:text-green-900 bg-green-50 px-2.5 py-1 rounded border border-green-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateSubmissionStatus(sub.id || sub.gsirfId, 'rejected')}
                        className="text-xs font-semibold text-red-700 hover:text-red-900 bg-red-50 px-2.5 py-1 rounded border border-red-200"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-gray-400 text-sm">
                      No submissions received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Search + Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Institutes</h2>
            <div className="flex items-center gap-3">
              <input
                id="search"
                type="search"
                className="rounded-lg border border-gray-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3 py-2 outline-none text-sm"
                placeholder="Search institute or user id…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <span className="text-sm text-gray-500 whitespace-nowrap">{filtered.length} record(s)</span>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
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
                {filtered.map((u, i) => {
                  const isVisible = visiblePasswords[u.uid];
                  return (
                    <tr key={u.uid}>
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3 font-medium">{u.inst}</td>
                      <td className="px-4 py-3 text-gray-600">{u.uid}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono">{isVisible ? u.pwd : '••••••••'}</span>
                        <button
                          onClick={() => togglePasswordVisibility(u.uid)}
                          className="ml-3 text-garvi-orange hover:text-garvi-gold text-xs font-semibold inline-flex items-center gap-1"
                        >
                          {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isVisible ? 'Hide' : 'Show'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(u.uid)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-400 text-sm">
                      No institute records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-white mt-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© GARVI — GSIRF Performance Tools</p>
          <p>
            Contact: <a href="mailto:garvi@gmail.com" className="text-garvi-orange hover:underline font-medium">garvi@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
