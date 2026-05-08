import { useState } from 'react';
import { Calendar, Database, ExternalLink, Link as LinkIcon, Send, Upload, UsersRound } from 'lucide-react';
import { universities } from '../data/universities';

interface Participant {
  id: number;
  name: string;
  phone: string;
  vaccinationDate: string;
  university: string;
  status: 'Sent' | 'Ready';
}

const initialParticipants: Participant[] = [
  {
    id: 1,
    name: 'Yifan TANG',
    phone: '+13051111111',
    vaccinationDate: '2026-05-05',
    university: 'UCLA',
    status: 'Sent',
  },
  {
    id: 2,
    name: 'tang',
    phone: '+13050000000',
    vaccinationDate: '2026-05-05',
    university: 'MIT',
    status: 'Sent',
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [name, setName] = useState('Jamie Zhou');
  const [phone, setPhone] = useState('+15551234567');
  const [university, setUniversity] = useState('UCLA');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const selectedUniversity = universities.find(school => school.name === university);

  const enrollParticipant = () => {
    if (!phone.trim() || !vaccinationDate) return;

    setParticipants(prev => [
      {
        id: Date.now(),
        name: name.trim() || 'Participant',
        phone: phone.trim(),
        vaccinationDate,
        university,
        status: 'Ready',
      },
      ...prev,
    ]);
    setName('');
    setPhone('');
    setUniversity('UCLA');
    setVaccinationDate('');
  };

  const markSent = (id: number) => {
    setParticipants(prev => prev.map(item => item.id === id ? { ...item, status: 'Sent' } : item));
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef4f9_48%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-7 shadow-[0_18px_56px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-health-navy ring-1 ring-cyan-100">
                <UsersRound className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-health-blue">Participant operations</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-health-navy">Participants</h1>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
                  Enroll people, attach university context, and send check-in reminders from one clear workspace.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-200/70">
              {[
                { label: 'Total', value: participants.length },
                { label: 'Ready', value: participants.filter(item => item.status === 'Ready').length },
                { label: 'Schools', value: universities.length },
              ].map(item => (
                <div key={item.label} className="rounded-xl bg-white px-4 py-2 text-center shadow-sm">
                  <div className="text-lg font-black text-slate-950">{item.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
          <section className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/88 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70">
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
                <label className="text-base font-black text-health-navy" htmlFor="participant-university">University</label>
                <select
                  id="participant-university"
                  value={university}
                  onChange={(event) => setUniversity(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-inner outline-none transition focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
                >
                  {universities.map(school => (
                    <option key={school.name} value={school.name}>{school.name}</option>
                  ))}
                </select>
                <p className="text-xs font-semibold leading-5 text-slate-500">
                  Demo database: {universities.length} universities with saved vaccine requirement links.
                </p>
                {selectedUniversity && (
                  <a
                    href={selectedUniversity.immunizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm font-bold text-health-blue transition hover:bg-sky-50"
                  >
                    View {selectedUniversity.name} immunization page
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
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

          <section className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/88 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70">
            <div className="border-b border-slate-200 px-7 py-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-health-navy">Roster</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Reminder status stays visible so the next action is obvious.</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                  {participants.filter(item => item.status === 'Sent').length} sent
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-base font-black text-slate-500">
                    <th className="px-7 py-4">Name</th>
                    <th className="px-7 py-4">Phone</th>
                    <th className="px-7 py-4">University</th>
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
                      <td className="px-7 py-5 text-base font-semibold text-health-navy">{participant.university}</td>
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
