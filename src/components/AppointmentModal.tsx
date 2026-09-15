import React, { useState } from 'react';
import { CLINIC_INFO, ANATOMY_POINTS } from '../data/clinicData.ts';
import { AppointmentBooking } from '../types.ts';
import { X, Calendar, Clock, Phone, CheckCircle, Send, AlertCircle, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArea?: string;
}

const EVENING_SLOTS = [
  "5:00 PM - 5:45 PM",
  "5:45 PM - 6:30 PM",
  "6:30 PM - 7:15 PM",
  "7:15 PM - 8:00 PM",
  "8:00 PM - 8:45 PM",
  "8:45 PM - 9:30 PM"
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialArea
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedArea, setSelectedArea] = useState(initialArea || 'Knee Joint & Ligaments');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(EVENING_SLOTS[0]);
  const [painLevel, setPainLevel] = useState(6);
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSuccess(true);
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Dr. Nivrith, I would like to book a physiotherapy appointment.\n\nName: ${name}\nPhone: ${phone}\nAffected Area: ${selectedArea}\nPreferred Date: ${date}\nTime Slot: ${timeSlot}\nPain Level: ${painLevel}/10\nDetails: ${description || 'None'}`
    );
    window.open(`https://wa.me/919886592536?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-4 ring-8 ring-teal-500/10">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Appointment Request Reserved!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-white">{name}</strong>. Dr. Nivrith’s clinic team has registered your request for <span className="text-teal-300 font-semibold">{selectedArea}</span> on <span className="text-teal-300 font-semibold">{date} ({timeSlot})</span>.
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Clinic Address:</span>
                <span className="text-slate-200 font-medium text-right">001, Dalli Sai Residency, GM Palya</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Direct Clinic Line:</span>
                <span className="text-teal-400 font-bold">{CLINIC_INFO.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send WhatsApp Details to Clinic</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Evening Clinic Consultation</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Book with Dr. Nivrith
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Personalized 1-on-1 diagnostic evaluation &amp; targeted manual therapy in GM Palya, Bengaluru.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nanda Kishore"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 098865 92536"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Musculoskeletal Area *
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                >
                  {ANATOMY_POINTS.map((pt) => (
                    <option key={pt.id} value={pt.name}>
                      {pt.name} ({pt.protocolTitle})
                    </option>
                  ))}
                  <option value="Post-Surgical / Fracture Rehab">Post-Surgical / Fracture Rehab</option>
                  <option value="Neurological / Stroke Support">Neurological / Stroke Support</option>
                  <option value="General Physical Assessment">General Physical Assessment</option>
                </select>
              </div>

              {/* Date & Evening Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Evening Slot (5:00 - 9:30 PM) *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400 font-mono text-xs"
                  >
                    {EVENING_SLOTS.map((slot, i) => (
                      <option key={i} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pain Scale Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Current Discomfort Level:</span>
                  <span className="text-teal-400 font-bold">{painLevel} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Mild ache (1)</span>
                  <span>Moderate (5)</span>
                  <span>Severe / Inhibiting (10)</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Symptoms or Duration of Pain (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Pain when climbing stairs for 3 weeks; previous doctor suggested surgery..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Evening Slot</span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phoneClean}`}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-3 rounded-xl text-xs border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call Directly</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
