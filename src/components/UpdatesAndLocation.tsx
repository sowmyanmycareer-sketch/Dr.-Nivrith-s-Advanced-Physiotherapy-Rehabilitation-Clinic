import React, { useState } from 'react';
import { CLINIC_INFO, CLINIC_UPDATES, FREQUENT_QUESTIONS } from '../data/clinicData.ts';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ChevronDown, ChevronUp, Bell, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const UpdatesAndLocation: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showBusinessEditNotice, setShowBusinessEditNotice] = useState(false);

  return (
    <section id="location-timings" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Clinic Location &amp; Evening Consultation Hours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visit Dr. Nivrith’s Clinic in GM Palya, Bengaluru
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Conveniently located for patients in C V Raman Nagar, Indiranagar, Kaggadasapura, and surrounding IT corridors.
          </p>
        </div>

        {/* 2-Column Grid: Location/Map Card + Hours/Updates Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Clinic Address, Contact & Directions */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Location Badge Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  Official Google Maps Listing
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  PIN: 560075
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {CLINIC_INFO.name}
              </h3>
              <p className="text-xs text-teal-400 mb-6 font-medium">
                {CLINIC_INFO.category}
              </p>

              {/* Exact Address from prompt */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 mt-1 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                      Clinic Address:
                    </strong>
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                      {CLINIC_INFO.address.full}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      <span className="text-teal-400 font-semibold">Landmarks:</span> {CLINIC_INFO.address.landmarks}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone & Contact details from prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Direct Consultation Phone
                    </span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneClean}`}
                      className="text-base font-bold text-white hover:text-teal-400 transition-colors"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Google Business Hours
                    </span>
                    <span className="text-base font-bold text-white">
                      {CLINIC_INFO.hours.display}
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Edit / Suggest an edit from prompt */}
              <div className="pt-2 mb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <button
                    onClick={() => setShowBusinessEditNotice(!showBusinessEditNotice)}
                    className="hover:text-teal-300 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Suggest an edit
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setShowBusinessEditNotice(!showBusinessEditNotice)}
                    className="hover:text-teal-300 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Own this business?
                  </button>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    ✓ Official website active
                  </span>
                </div>

                {showBusinessEditNotice && (
                  <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 animate-in fade-in">
                    Dr. Nivrith’s Advanced Physiotherapy is a verified Google business listing in Bengaluru. For clinic listing updates or clinical partnership inquiries, call directly at {CLINIC_INFO.phone}.
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={CLINIC_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition-colors"
              >
                <span>Reserve Evening Slot</span>
              </button>
            </div>
          </div>

          {/* Right Column: Schedule & Clinic Updates */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Timings breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Clock className="w-4 h-4" />
                <span>Consultation &amp; Therapy Schedule</span>
              </div>

              <div className="space-y-3 mb-4">
                {CLINIC_INFO.hours.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                      <span>{item.days}</span>
                      <span className="text-teal-300 font-mono">{item.time}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{item.note}</span>
                  </div>
                ))}
              </div>

              <div className="bg-teal-950/40 border border-teal-500/20 rounded-xl p-3 text-xs text-teal-200">
                💡 <strong>Tip for Patients:</strong> Evening slots from 5:00 PM to 9:30 PM fill up quickly. Booking 24 hours ahead is advised.
              </div>
            </div>

            {/* Updates from Google Listing as prompted */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                    <Bell className="w-4 h-4 text-teal-400" />
                    <span>Clinic Updates</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Google Updates Feed</span>
                </div>

                <p className="text-xs text-slate-400 mb-4 italic">
                  From Dr. Nivrith’s Advanced Physiotherapy &amp; Rehabilitation Clinic: "Physiotherapy and Rehabilitation Clinic"
                </p>

                <div className="space-y-3">
                  {CLINIC_UPDATES.map((update) => (
                    <div
                      key={update.id}
                      className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="text-teal-400 font-semibold">{update.tag}</span>
                        <span>{update.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">
                        {update.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {update.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 text-center">
                <a
                  href={CLINIC_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold"
                >
                  <span>View previous updates on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div id="faq" className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Common Patient Inquiries
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FREQUENT_QUESTIONS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-teal-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-teal-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
