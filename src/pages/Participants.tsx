import { useState } from 'react';
import { Calendar, Database, Link as LinkIcon, Send, Upload, UsersRound } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  phone: string;
  vaccinationDate: string;
  status: 'Sent' | 'Ready';
}

const initialParticipants: Participant[] = [
  {
    id: 1,
    name: 'Yifan TANG',
    phone: '+13051111111',
    vaccinationDate: '2026-05-05',
    status: 'Sent',
  },
  {
    id: 2,
    name: 'tang',
    phone: '+13050000000',
    vaccinationDate: '2026-05-05',
    status: 'Sent',
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [name, setName] = useState('Jamie Zhou');
  const [phone, setPhone] = useState('+15551234567');
  const [vaccinationDate, setVaccinationDate] = useState('');

  const enrollParticipant = () => {
    if (!phone.trim() || !vaccinationDate) return;

    setParticipants(prev => [
      {
        id: Date.now(),
        name: name.trim() || 'Participant',
        phone: phone.trim(),
        vaccinationDate,
        status: 'Ready',
      },
      ...prev,
    ]);
    setName('');
    setPhone('');
    setVaccinationDate('');
  };

  const markSent = (id: number) => {
    setParticipants(prev => prev.map(item => item.id === id ? { ...item, status: 'Sent' } : item));
  };

  return (
    <div className="bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-health-navy">
            <UsersRound className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-health-navy">Participants</h1>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-8">
              <h2 className="text-2xl font-black text-health-navy">Enroll participant</h2>
            </div>

            <div className="space-y-7 px-7 py-8">
              <div className="space-y-2">
                <label className="text-base font-black text-health-navy" htmlFor="participant-name">Name (optional)</label>
                <input
                  id="participant-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-blue-50/70 px-4 py-3 text-base font-semibold text-slate-900 shadow-inner outline-none transition focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
                  placeholder="Jamie Zhou"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-black text-health-navy" htmlFor="participant-phone">Phone (E.164)</label>
                <input
                  id="participant-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-inner outline-none transition focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
                  placeholder="+15551234567"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-black text-health-navy" htmlFor="vaccination-date">Vaccination date</label>
                <div className="relative">
                  <input
                    id="vaccination-date"
                    type="date"
                    value={vaccinationDate}
                    onChange={(event) => setVaccinationDate(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-inner outline-none transition focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
                  />
                  <Calendar className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <button
                onClick={enrollParticipant}
                disabled={!phone.trim() || !vaccinationDate}
                className="w-full rounded-lg bg-health-blue px-5 py-3 text-base font-black text-white shadow-md transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Enroll participant
              </button>

              <div className="border-t border-slate-200 pt-6">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.08em] text-slate-500">Other intake methods</p>
                <div className="space-y-3">
                  {[
                    { label: 'Import from CSV', icon: Upload },
                    { label: 'Sync from external database', icon: Database },
                    { label: 'Connect registration platform', icon: LinkIcon },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button key={item.label} className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left font-black text-health-navy shadow-sm transition hover:border-health-blue/30 hover:bg-white">
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-8">
              <h2 className="text-2xl font-black text-health-navy">Roster</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-base font-black text-slate-500">
                    <th className="px-7 py-4">Name</th>
                    <th className="px-7 py-4">Phone</th>
                    <th className="px-7 py-4">Vaccination date</th>
                    <th className="px-7 py-4">Last status</th>
                    <th className="px-7 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => (
                    <tr key={participant.id} className="border-b border-slate-200 last:border-b-0">
                      <td className="px-7 py-5 text-base font-black text-health-navy">{participant.name}</td>
                      <td className="px-7 py-5 text-base font-semibold text-health-navy">{participant.phone}</td>
                      <td className="px-7 py-5 text-base font-semibold text-health-navy">{participant.vaccinationDate}</td>
                      <td className="px-7 py-5">
                        <span className={`inline-flex rounded-lg border px-3 py-1 text-sm font-black ${
                          participant.status === 'Sent'
                            ? 'border-cyan-200 bg-cyan-50 text-health-navy'
                            : 'border-amber-200 bg-amber-50 text-amber-700'
                        }`}>
                          {participant.status}
                        </span>
                      </td>
                      <td className="px-7 py-5 text-right">
                        <button
                          onClick={() => markSent(participant.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-health-navy shadow-sm transition hover:border-health-blue/30 hover:bg-white"
                        >
                          <Send className="h-4 w-4" />
                          Send now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
