import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Gem, History, Users, Plus, Edit2, Trash2, X, Loader2, Save, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('gemstones');
  
  // Gemstone management states
  const [gemstones, setGemstones] = useState([]);
  const [loadingGems, setLoadingGems] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGem, setEditingGem] = useState(null);
  
  // History states
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // User management states
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Form states
  const [gemForm, setGemForm] = useState({
    name: '',
    zodiacSigns: '',
    birthMonths: '',
    suitableGoals: '',
    description: '',
    benefits: '',
    color: '',
    image: '',
    priceRange: 'Below ₹1000',
    careInstructions: ''
  });

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch functions
  const fetchGemstones = async () => {
    setLoadingGems(true);
    try {
      const { data } = await api.get('/api/gemstones');
      if (data.success) setGemstones(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGems(false);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const { data } = await api.get('/api/recommend/history');
      if (data.success) setHistory(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data } = await api.get('/api/recommend/admin/users');
      if (data.success) setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchGemstones();
    fetchHistory();
    fetchUsers();
  }, []);

  // Form handlers
  const handleOpenAddModal = () => {
    setEditingGem(null);
    setGemForm({
      name: '',
      zodiacSigns: '',
      birthMonths: '',
      suitableGoals: '',
      description: '',
      benefits: '',
      color: '',
      image: '',
      priceRange: 'Below ₹1000',
      careInstructions: ''
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (gem) => {
    setEditingGem(gem);
    setGemForm({
      name: gem.name,
      zodiacSigns: gem.zodiacSigns.join(', '),
      birthMonths: gem.birthMonths.join(', '),
      suitableGoals: gem.suitableGoals.join(', '),
      description: gem.description,
      benefits: gem.benefits.join('\n'),
      color: gem.color,
      image: gem.image,
      priceRange: gem.priceRange,
      careInstructions: gem.careInstructions || ''
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleDeleteGemstone = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gemstone?')) return;
    try {
      await api.delete(`/api/gemstones/${id}`);
      fetchGemstones();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete gemstone');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? Their history will also be permanently deleted.')) return;
    try {
      await api.delete(`/api/recommend/admin/users/${id}`);
      fetchUsers();
      fetchHistory(); // Recalculate logs since recommendations delete
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, zodiacSigns, birthMonths, suitableGoals, description, benefits, color, image, priceRange, careInstructions } = gemForm;

    if (!name || !zodiacSigns || !description || !benefits || !color || !image) {
      setFormError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setFormError('');

    // Process inputs into lists
    const payload = {
      name,
      zodiacSigns: zodiacSigns.split(',').map((s) => s.trim()).filter(Boolean),
      birthMonths: birthMonths.split(',').map((s) => s.trim()).filter(Boolean),
      suitableGoals: suitableGoals.split(',').map((s) => s.trim()).filter(Boolean),
      description,
      benefits: benefits.split('\n').map((s) => s.trim()).filter(Boolean),
      color,
      image,
      priceRange,
      careInstructions
    };

    try {
      if (editingGem) {
        // Edit gemstone request
        await api.put(`/api/gemstones/${editingGem._id}`, payload);
      } else {
        // Add gemstone request
        await api.post('/api/gemstones', payload);
      }
      setModalOpen(false);
      fetchGemstones();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to save gemstone details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Admin Control Center
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Perform administrative actions: manage crystals database, analyze recommendations logs, and moderate user accounts.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-gray-200 dark:border-darkborder bg-gray-50 dark:bg-darkcard/50 p-1.5 rounded-2xl gap-2 max-w-lg">
        <button
          onClick={() => setActiveTab('gemstones')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'gemstones'
              ? 'bg-white dark:bg-darkborder text-amber-500 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Gem className="h-4.5 w-4.5" />
          Manage Gemstones
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-white dark:bg-darkborder text-amber-500 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <History className="h-4.5 w-4.5" />
          Recommendation History
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'users'
              ? 'bg-white dark:bg-darkborder text-amber-500 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Users className="h-4.5 w-4.5" />
          Manage Users
        </button>
      </div>

      {/* TAB 1: MANAGE GEMSTONES */}
      {activeTab === 'gemstones' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-white">Crystal Catalog ({gemstones.length})</h2>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Gemstone
            </button>
          </div>

          {loadingGems ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gemstones.map((gem) => (
                <div
                  key={gem._id}
                  className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{gem.name}</h3>
                        <span className="text-xs font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                          {gem.priceRange}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                        {gem.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-darkborder">
                      <span className="text-xs font-medium text-gray-400">Color: <span className="text-gray-700 dark:text-gray-200 font-bold">{gem.color}</span></span>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(gem)}
                          className="rounded-lg p-2 text-blue-500 hover:bg-blue-500/10 transition-colors"
                          title="Edit Gemstone"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGemstone(gem._id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete Gemstone"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RECOMMENDATION HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-darkborder">
            <h2 className="text-xl font-bold dark:text-white">Global Recommendation History Logs</h2>
          </div>

          {loadingHistory ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No recommendation logs available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-darkbg/50 border-b border-gray-200 dark:border-darkborder text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Input Profile</th>
                    <th className="px-6 py-4">Recommended Gem</th>
                    <th className="px-6 py-4">Reason Summary</th>
                    <th className="px-6 py-4">Generated At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-darkborder/50">
                  {history.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50/50 dark:hover:bg-darkborder/25">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 dark:text-white">{log.userId?.name || log.inputs.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-0.5 mt-0.5">
                          <Mail className="h-3 w-3" /> {log.userId?.email || 'Guest User'}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <div>Zodiac: <span className="font-semibold text-gray-800 dark:text-gray-200">{log.inputs.zodiacSign}</span></div>
                        <div>Goal: <span className="font-semibold text-gray-800 dark:text-gray-200">{log.inputs.lifeGoal}</span></div>
                        <div>Budget: <span className="font-semibold text-gray-800 dark:text-gray-200">{log.inputs.budgetRange}</span></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-amber-500">{log.gemstoneId?.name || 'Deleted stone'}</div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-xs text-gray-500 italic" title={log.recommendationReason}>
                        "{log.recommendationReason}"
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MANAGE USERS */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-darkborder">
            <h2 className="text-xl font-bold dark:text-white">Moderated User Profiles</h2>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-darkbg/50 border-b border-gray-200 dark:border-darkborder text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Role System</th>
                    <th className="px-6 py-4">Created On</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-darkborder/50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/50 dark:hover:bg-darkborder/25">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                            : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* GEMSTONE MODAL (ADD / EDIT) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-darkborder mb-6">
              <h3 className="text-xl font-extrabold dark:text-white">
                {editingGem ? `Edit Gemstone: ${editingGem.name}` : 'Add New Gemstone'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-darkborder/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-6 rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-500 border border-red-500/20">
                {formError}
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Gem Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Gemstone Name *</label>
                  <input
                    type="text"
                    required
                    value={gemForm.name}
                    onChange={(e) => setGemForm({...gemForm, name: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="e.g. Ruby (Manik)"
                  />
                </div>

                {/* Gem Color */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mineral Color *</label>
                  <input
                    type="text"
                    required
                    value={gemForm.color}
                    onChange={(e) => setGemForm({...gemForm, color: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="e.g. Deep Red"
                  />
                </div>

                {/* Zodiac Signs */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Zodiac Signs (comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={gemForm.zodiacSigns}
                    onChange={(e) => setGemForm({...gemForm, zodiacSigns: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Aries, Leo"
                  />
                </div>

                {/* Birth Months */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Birth Months (comma separated)</label>
                  <input
                    type="text"
                    value={gemForm.birthMonths}
                    onChange={(e) => setGemForm({...gemForm, birthMonths: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="July"
                  />
                </div>

                {/* Suitable Goals */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Suitable Goals (comma separated)</label>
                  <input
                    type="text"
                    value={gemForm.suitableGoals}
                    onChange={(e) => setGemForm({...gemForm, suitableGoals: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Career, Confidence, Health"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Budget Bracket *</label>
                  <select
                    value={gemForm.priceRange}
                    onChange={(e) => setGemForm({...gemForm, priceRange: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-white dark:bg-darkcard rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="Below ₹1000">Below ₹1000</option>
                    <option value="₹1000–₹5000">₹1000–₹5000</option>
                    <option value="₹5000–₹10000">₹5000–₹10000</option>
                    <option value="Above ₹10000">Above ₹10000</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Gemstone Photo Image URL *</label>
                  <input
                    type="url"
                    required
                    value={gemForm.image}
                    onChange={(e) => setGemForm({...gemForm, image: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description *</label>
                  <textarea
                    required
                    value={gemForm.description}
                    onChange={(e) => setGemForm({...gemForm, description: e.target.value})}
                    rows={3}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Explain the stone qualities and astrological origins..."
                  ></textarea>
                </div>

                {/* Benefits */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Vedic Benefits (one per line) *</label>
                  <textarea
                    required
                    value={gemForm.benefits}
                    onChange={(e) => setGemForm({...gemForm, benefits: e.target.value})}
                    rows={4}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Boosts self confidence&#10;Fosters leadership skills"
                  ></textarea>
                </div>

                {/* Care instructions */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Care & Clean Instructions</label>
                  <input
                    type="text"
                    value={gemForm.careInstructions}
                    onChange={(e) => setGemForm({...gemForm, careInstructions: e.target.value})}
                    className="block w-full px-4.5 py-2.5 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Clean with mild soap and warm water."
                  />
                </div>

              </div>

              {/* Form Action Controls */}
              <div className="flex justify-end gap-2 pt-6 border-t border-gray-100 dark:border-darkborder mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-200 dark:border-darkborder px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkborder/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-amber-600 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
