'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  skinUrl?: string;
}

interface Vacancy {
  id: string;
  title: string;
  description: string;
  discordUrl: string;
}

export default function Staff() {
  const [activeTab, setActiveTab] = useState('team');
  const [team, setTeam] = useState<StaffMember[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const res = await fetch('/api/staff');
      const data = await res.json();
      setTeam(data.team || []);
      setVacancies(data.vacancies || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-cyan-600 mb-8">Staff Team</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('team')}
          className={`px-6 py-2 rounded-lg font-bold transition ${
            activeTab === 'team'
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Ons Team
        </button>
        <button
          onClick={() => setActiveTab('vacancies')}
          className={`px-6 py-2 rounded-lg font-bold transition ${
            activeTab === 'vacancies'
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Vacatures
        </button>
      </div>

      {/* Team Section */}
      {activeTab === 'team' && (
        <div>
          {loading ? (
            <p className="text-center text-gray-600">Laden...</p>
          ) : team.length === 0 ? (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-600 text-center">
                Nog geen staff leden toegevoegd. Dit kan via het Admin Panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                  {member.skinUrl && (
                    <img
                      src={member.skinUrl}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-cyan-600 font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vacancies Section */}
      {activeTab === 'vacancies' && (
        <div>
          {vacancies.length === 0 ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-gray-600 text-center">
                Momenteel geen open vacatures.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">{vacancy.title}</h3>
                  <p className="text-gray-600 mb-4">{vacancy.description}</p>
                  <a
                    href={vacancy.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-bold"
                  >
                    Solliciteer op Discord →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
