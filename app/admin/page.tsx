'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) {
    return <div className="text-center py-12">Controle...</div>;
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">🌊 Admin</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'dashboard' ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'blogs' ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            📝 Blogs
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'staff' ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            👥 Staff Team
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'settings' ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            ⚙️ Instellingen
          </button>
        </nav>
        <hr className="my-6 border-gray-700" />
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">
          ← Terug naar website
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'blogs' && <BlogsTab />}
          {activeTab === 'staff' && <StaffTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blogs').then(res => res.json()).then(setBlogs).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-black text-cyan-400 mb-8 glow">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
          <div className="relative text-white">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-slate-300">Total Blogs</p>
            <p className="text-3xl font-bold">{blogs.length}</p>
          </div>
        </div>
        <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
          <div className="relative text-white">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-slate-300">Staff Members</p>
            <p className="text-3xl font-bold">-</p>
          </div>
        </div>
        <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
          <div className="relative text-white">
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-slate-300">Server Status</p>
            <p className="text-3xl font-bold">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blogs Tab
function BlogsTab() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('auth_token');
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, excerpt })
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        setExcerpt('');
        setShowForm(false);
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Weet je het zeker?')) return;

    try {
      const token = Cookies.get('auth_token');
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-cyan-400 mb-0 glow">Blogs</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 font-bold"
        >
          {showForm ? '✕ Annuleren' : '+ Nieuwe Blog'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateBlog} className="bg-gray-800 p-6 rounded-lg mb-8 space-y-4">
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Korte samenvatting"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
          />
          <textarea
            placeholder="Inhoud"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold disabled:opacity-50"
          >
            {loading ? 'Opslaan...' : 'Blog Plaatsen'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800 p-6 rounded-lg text-white flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(blog.createdAt).toLocaleDateString('nl-NL')}
              </p>
            </div>
            <button
              onClick={() => handleDeleteBlog(blog.id)}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm font-bold ml-4"
            >
              Verwijderen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Staff Tab
function StaffTab() {
  const [staff, setStaff] = useState<any[]>([]);
  const [serverIp, setServerIp] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSkinUrl, setNewSkinUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const res = await fetch('/api/staff');
      const data = await res.json();
      setStaff(data.team || []);
      setServerIp(data.serverIp || '');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('auth_token');
      const newStaff = [...staff, {
        id: Date.now().toString(),
        name: newName,
        role: newRole,
        skinUrl: newSkinUrl
      }];

      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ team: newStaff, serverIp })
      });

      if (res.ok) {
        setNewName('');
        setNewRole('');
        setNewSkinUrl('');
        fetchStaffData();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateServerIp = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('auth_token');
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ serverIp, team: staff })
      });

      if (!res.ok) alert('Fout bij updaten');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (id: string) => {
    const updatedStaff = staff.filter(s => s.id !== id);
    try {
      const token = Cookies.get('auth_token');
      await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ team: updatedStaff, serverIp })
      });
      fetchStaffData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-cyan-400 mb-8 glow">Staff Team Management</h1>

      {/* Server IP Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Server IP</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="bv: mc.aquaworld.nl:25565"
            value={serverIp}
            onChange={(e) => setServerIp(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
          />
          <button
            onClick={handleUpdateServerIp}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold disabled:opacity-50"
          >
            {loading ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </div>

      {/* Add Member Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">+ Nieuwe Staff Member</h2>
        <form onSubmit={handleAddMember} className="space-y-4">
          <input
            type="text"
            placeholder="Naam"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Functie (bv: Moderator)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="url"
            placeholder="MC Skin URL (optioneel)"
            value={newSkinUrl}
            onChange={(e) => setNewSkinUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold disabled:opacity-50"
          >
            {loading ? 'Toevoegen...' : 'Staff Member Toevoegen'}
          </button>
        </form>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-gray-800 p-6 rounded-lg text-white flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
            <button
              onClick={() => handleRemoveMember(member.id)}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm font-bold"
            >
              Verwijderen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Instellingen</h1>
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <p className="mb-4">
          Meer opties komen binnenkort beschikbaar!
        </p>
        <button
          onClick={() => {
            Cookies.remove('auth_token');
            window.location.href = '/admin/login';
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
        >
          Uitloggen
        </button>
      </div>
    </div>
  );
}
