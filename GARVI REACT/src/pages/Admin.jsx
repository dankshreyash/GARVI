import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  Menu,
  X,
  Building2,
  FileCheck2,
  Search,
  PlusCircle
} from 'lucide-react';

const INITIAL_USERS = [
  { inst: 'IIT Gandhinagar', uid: 'iitgn_admin', pwd: 'IITGN#2026@Pass' },
  { inst: 'Gujarat University', uid: 'guj_uni_iqac', pwd: 'GujUni*9941!' },
  { inst: 'Nirma University', uid: 'nirma_admin', pwd: 'NirmaTech$2026' },
  { inst: 'DA-IICT Gandhinagar', uid: 'daiict_coord', pwd: 'DAIICT#Secured9' },
  { inst: 'Marwadi University Rajkot', uid: 'marwadi_uni', pwd: 'Marwadi#Rajkot8' }
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-1',
    inst: 'Gujarat University, Ahmedabad',
    s1_gsirfId: 'GSIRF-GUJ-101',
    submittedAt: '2026-03-12T10:30:00.000Z',
    status: 'accepted'
  },
  {
    id: 'sub-2',
    inst: 'DA-IICT Gandhinagar',
    s1_gsirfId: 'GSIRF-DAI-102',
    submittedAt: '2026-03-14T14:15:00.000Z',
    status: 'pending'
  },
  {
    id: 'sub-3',
    inst: 'Marwadi University, Rajkot',
    s1_gsirfId: 'GSIRF-MAR-103',
    submittedAt: '2026-03-15T09:45:00.000Z',
    status: 'pending'
  }
];

export default function Admin() {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('garvi_admin_users_v1');
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem('garvi_submissions_v1');
      return stored ? JSON.parse(stored) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
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

  const handleUpdateSubmissionStatus = (id, newStatus) => {
    const updated = submissions.map((sub) => {
      if (sub.id === id || sub.s1_gsirfId === id || sub.gsirfId === id) {
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

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;
  const acceptedCount = submissions.filter((s) => s.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-1">
                <img
                  src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                  alt="GARVI"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
            </Link>
            <span className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 hidden sm:inline-block">
              State Admin Portal
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs font-bold">
            <Link to="/analytics" className="text-slate-600 hover:text-garvi-orange transition">
              Analytics
            </Link>
            <Link to="/benchmarking" className="text-slate-600 hover:text-garvi-orange transition">
              Benchmarking
            </Link>
            <Link to="/simulator" className="text-slate-600 hover:text-garvi-orange transition">
              Simulator
            </Link>
            <Link to="/dashboard" className="text-slate-600 hover:text-garvi-orange transition">
              Dashboard
            </Link>
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Exit to Home
            </Link>
          </nav>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-sm font-semibold">
            <Link to="/analytics" onClick={() => setNavOpen(false)} className="block py-1 text-slate-700 hover:text-garvi-orange">
              Analytics Dashboard
            </Link>
            <Link to="/benchmarking" onClick={() => setNavOpen(false)} className="block py-1 text-slate-700 hover:text-garvi-orange">
              Benchmarking
            </Link>
            <Link to="/simulator" onClick={() => setNavOpen(false)} className="block py-1 text-slate-700 hover:text-garvi-orange">
              Simulator
            </Link>
            <Link to="/dashboard" onClick={() => setNavOpen(false)} className="block py-1 text-slate-700 hover:text-garvi-orange">
              Institutional Dashboard
            </Link>
            <Link to="/" onClick={() => setNavOpen(false)} className="block py-1 text-slate-700 hover:text-garvi-orange">
              Home
            </Link>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              State Institutional Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage participating universities, issue credentials, and review GSIRF 2026 data submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Colleges</span>
              <span className="text-lg font-black text-slate-900">{users.length}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-amber-500 block">Pending Review</span>
              <span className="text-lg font-black text-amber-600">{pendingCount}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-emerald-500 block">Accepted Ratings</span>
              <span className="text-lg font-black text-emerald-600">{acceptedCount}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Create Account & Tools */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-garvi-orange" />
              <h2 className="text-lg font-bold text-slate-900">Provision New Institutional Account</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4" autoComplete="off">
              <div>
                <label htmlFor="inst" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Institute Name
                </label>
                <input
                  id="inst"
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3.5 py-2 text-xs outline-none"
                  placeholder="e.g. Pandit Deendayal Energy University"
                  value={formData.inst}
                  onChange={(e) => setFormData({ ...formData, inst: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="uid" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  User ID
                </label>
                <input
                  id="uid"
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3.5 py-2 text-xs outline-none"
                  placeholder="e.g. pdeu_iqac"
                  value={formData.uid}
                  onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="pwd" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  id="pwd"
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-300 focus:border-garvi-orange focus:ring-1 focus:ring-garvi-orange px-3.5 py-2 text-xs outline-none"
                  placeholder="e.g. PDEU#2026@Pass"
                  value={formData.pwd}
                  onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
                />
              </div>

              <div className="sm:col-span-3 flex items-center gap-3 pt-2">
                <button type="submit" className="btn-garvi text-xs py-2 px-5">
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ inst: '', uid: '', pwd: '' })}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Management Tools</h2>
              <p className="text-xs text-slate-500 mb-4">Export or maintain state institution credentials.</p>
              <div className="space-y-3">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-garvi-orange text-garvi-orange hover:bg-amber-50 text-xs font-bold transition shadow-2xs"
                >
                  <Download className="w-4 h-4" /> Export CSV Roster
                </button>
                <button
                  onClick={handleClearAll}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition"
                >
                  <Trash2 className="w-4 h-4" /> Reset Records
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-tight">
              Data is synced securely with browser persistence.
            </p>
          </div>
        </section>

        {/* Section 2: GSIRF 2026 Submitted Data Review Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">GSIRF 2026 — Institutional Submissions</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Review, verify, and approve data submissions from universities across Gujarat.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {submissions.length} Total Applications
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Institute Name</th>
                  <th className="px-4 py-3 text-left">GSIRF Code</th>
                  <th className="px-4 py-3 text-left">Submitted Date</th>
                  <th className="px-4 py-3 text-left">Review Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((sub, i) => (
                  <tr key={sub.id || sub.s1_gsirfId || i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{sub.inst}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{sub.s1_gsirfId || sub.gsirfId}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-4 py-3">
                      {sub.status === 'accepted' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                        </span>
                      ) : sub.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5" /> Pending Review
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId || sub.gsirfId, 'accepted')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId || sub.gsirfId, 'rejected')}
                        className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Institute Credentials Registry Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-garvi-orange" />
                <h2 className="text-lg font-bold text-slate-900">Institutions Registry &amp; Logins</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage all registered colleges, view assigned passwords, or remove decommissioned accounts.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search college or User ID..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:border-garvi-orange outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Institute Name</th>
                  <th className="px-4 py-3 text-left">Assigned User ID</th>
                  <th className="px-4 py-3 text-left">Password</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u, i) => {
                  const isVisible = visiblePasswords[u.uid];
                  return (
                    <tr key={u.uid} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{u.inst}</td>
                      <td className="px-4 py-3 font-mono text-slate-700">{u.uid}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-slate-600 mr-2">{isVisible ? u.pwd : '••••••••••••'}</span>
                        <button
                          onClick={() => togglePasswordVisibility(u.uid)}
                          className="text-garvi-orange hover:text-amber-700 font-bold text-[11px] inline-flex items-center gap-1"
                        >
                          {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isVisible ? 'Hide' : 'Show'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(u.uid)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
