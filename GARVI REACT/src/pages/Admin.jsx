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
  PlusCircle,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang, toggleLanguage, t } = useLanguage();
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
    if (!formData.inst || !formData.uid || !formData.pwd) return;
    const updated = [formData, ...users];
    setUsers(updated);
    localStorage.setItem('garvi_admin_users_v1', JSON.stringify(updated));
    setFormData({ inst: '', uid: '', pwd: '' });
  };

  const handleExportCSV = () => {
    const csvHeader = 'Institution,User_ID,Assigned_Password\n';
    const csvRows = users.map((u) => `"${u.inst}","${u.uid}","${u.pwd}"`).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `GSIRF_2026_Institutional_Registry_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleDeleteUser = (uid) => {
    if (window.confirm(lang === 'gu' ? `શું તમે ખરેખર ${uid} યુઝરને દૂર કરવા માંગો છો?` : `Are you sure you want to remove user ${uid}?`)) {
      const updated = users.filter((u) => u.uid !== uid);
      setUsers(updated);
      localStorage.setItem('garvi_admin_users_v1', JSON.stringify(updated));
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm(lang === 'gu' ? 'મૂળભૂત ડેમો યુઝર્સ પુનઃસ્થાપિત કરવા?' : 'Reset to default demo institutions?')) {
      setUsers(INITIAL_USERS);
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
              <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-0.5 overflow-hidden">
                <img
                  src="/kcg_gujarat_transparent.png"
                  alt="GARVI"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                  }}
                />
              </div>
              <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
            </Link>
            <span className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              {t('admin.title', 'State Scrutiny & Administration')}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-garvi-orange" />
              <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>

            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
            >
              {lang === 'gu' ? 'કોલેજ ડેશબોર્ડ' : 'College Dashboard'}
            </Link>
            <button
              onClick={handleExportCSV}
              className="btn-garvi text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('admin.exportCsv', 'Export Master Sheet')}</span>
              <span className="sm:hidden">CSV</span>
            </button>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="sm:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-xs font-bold">
            <Link to="/" className="block py-1 text-slate-700">{t('nav.home', 'Home')}</Link>
            <Link to="/analytics" className="block py-1 text-slate-700">{t('nav.analytics', 'Analytics')}</Link>
            <Link to="/benchmarking" className="block py-1 text-slate-700">{t('nav.benchmarking', 'Benchmarking')}</Link>
            <Link to="/simulator" className="block py-1 text-slate-700">{t('nav.simulator', 'Simulator')}</Link>
            <Link to="/dashboard" className="block py-1 text-slate-700">{t('nav.login', 'Institutional Dashboard')}</Link>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 fade-in">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Government of Gujarat • GSIRF 2026
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              {t('admin.title', 'State Scrutiny & Administration')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('admin.subtitle', 'Government of Gujarat • GSIRF 2026 State Oversight & Submissions Registry')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('admin.underReview', 'Under Scrutiny')}</span>
              <span className="text-xl font-black text-amber-600">{pendingCount}</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('admin.approved', 'Approved')}</span>
              <span className="text-xl font-black text-emerald-600">{acceptedCount}</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('admin.totalSubmitted', 'Total')}</span>
              <span className="text-xl font-black text-slate-900">{submissions.length}</span>
            </div>
          </div>
        </div>

        {/* Section 1: GSIRF 2026 Live Submissions Scrutiny Panel */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-garvi-orange">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'gu' ? 'GSIRF ૨૦૨૬ સંસ્થાકીય સબમિશન ચકાસણી' : 'GSIRF 2026 Institutional Submissions Scrutiny'}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === 'gu' ? '૪૭૦+ ઉચ્ચ શિક્ષણ સંસ્થાઓ દ્વારા સબમિટ કરાયેલ ડેટાની ચકાસણી કરો' : 'Review and verify academic data submitted by institutions across Gujarat'}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">{t('admin.tableInst', 'Institution')}</th>
                  <th className="py-3 px-4">GSIRF ID</th>
                  <th className="py-3 px-4">{t('admin.tableDate', 'Submitted Date')}</th>
                  <th className="py-3 px-4">{t('admin.tableStatus', 'Status')}</th>
                  <th className="py-3 px-4 text-right">{t('admin.tableActions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {submissions.map((sub) => {
                  const isAccepted = sub.status === 'accepted';
                  const isRejected = sub.status === 'rejected';
                  return (
                    <tr key={sub.id || sub.s1_gsirfId} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-garvi-orange shrink-0" />
                        <span>{sub.inst || 'Gujarat Institution'}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {sub.s1_gsirfId || sub.gsirfId || 'GSIRF-2026-X'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Active Cycle'}
                      </td>
                      <td className="py-3.5 px-4">
                        {isAccepted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> {lang === 'gu' ? 'મંજૂર' : 'Verified & Approved'}
                          </span>
                        ) : isRejected ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold border border-red-200">
                            <XCircle className="w-3 h-3" /> {lang === 'gu' ? 'ક્વેરી મોકલી' : 'Query Dispatched'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                            <Clock className="w-3 h-3" /> {lang === 'gu' ? 'ચકાસણી હેઠળ' : 'Under Review'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {!isAccepted && (
                          <button
                            onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId, 'accepted')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition cursor-pointer"
                          >
                            {t('admin.approveBtn', 'Approve')}
                          </button>
                        )}
                        {!isRejected && (
                          <button
                            onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId, 'rejected')}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] transition cursor-pointer"
                          >
                            {t('admin.queryBtn', 'Raise Query')}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Manage AISHE Credentials */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'gu' ? 'સંસ્થાકીય પ્રમાણપત્ર સંચાલન' : 'Manage Institutional Access & AISHE Credentials'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'gu' ? 'ગુજરાત સંસ્થાઓ માટે રજિસ્ટ્રેશન ઓળખપત્રો પ્રદાન કરો' : 'Provision secure login credentials for Gujarat colleges and university registrars'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('admin.searchPlaceholder', 'Search institution or User ID...')}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-garvi-orange/30 w-48 sm:w-64"
                />
              </div>
              <button
                onClick={handleResetDefaults}
                className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1 cursor-pointer"
              >
                {lang === 'gu' ? 'રીસેટ' : 'Reset Defaults'}
              </button>
            </div>
          </div>

          {/* Add User Form */}
          <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('admin.tableInst', 'Institution Name')}
              </label>
              <input
                type="text"
                placeholder="e.g. BVM Engineering College"
                value={formData.inst}
                onChange={(e) => setFormData({ ...formData, inst: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                User ID / AISHE
              </label>
              <input
                type="text"
                placeholder="e.g. bvm_engg_admin"
                value={formData.uid}
                onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Assigned Password
              </label>
              <input
                type="text"
                placeholder="e.g. BVM#2026@Pass"
                value={formData.pwd}
                onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none font-mono"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full btn-garvi text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{lang === 'gu' ? 'સંસ્થા ઉમેરો' : 'Add Institution'}</span>
              </button>
            </div>
          </form>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">{t('admin.tableInst', 'Institution')}</th>
                  <th className="py-3 px-4">Assigned User ID</th>
                  <th className="py-3 px-4">Password</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((user) => {
                  const isVisible = visiblePasswords[user.uid];
                  return (
                    <tr key={user.uid} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{user.inst}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{user.uid}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        <div className="flex items-center gap-2">
                          <span>{isVisible ? user.pwd : '••••••••••••'}</span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user.uid)}
                            className="text-slate-400 hover:text-garvi-orange cursor-pointer"
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(user.uid)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Remove user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
