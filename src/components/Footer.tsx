import React from 'react';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { Star, MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Rating */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                3D
              </div>
              <span className="text-base font-bold text-white leading-snug block">
                Dr. Nivrith’s Clinic
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Advanced target-specific physiotherapy and rehabilitation center in Bengaluru, Karnataka. Specializing in resolving root joint, spine, and muscle pain.
            </p>

            <div className="flex items-center gap-2 bg-slate-900 border border-teal-500/20 px-3 py-2 rounded-xl text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">5.0</span>
              <span className="text-slate-400">({CLINIC_INFO.reviewCount} Google reviews)</span>
            </div>
          </div>

          {/* Col 2: Clinic Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Bengaluru Location</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              {CLINIC_INFO.address.full}
            </p>
            <p className="text-slate-400 text-[11px]">
              Near GM Palya Bus Stand • CV Raman Nagar
            </p>
            <a
              href={CLINIC_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4"
            >
              Open in Google Maps →
            </a>
          </div>

          {/* Col 3: Hours & Phone */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Timings &amp; Contact</span>
            </h4>
            <div className="space-y-1 text-xs">
              <p className="text-white font-semibold">{CLINIC_INFO.hours.display}</p>
              <p className="text-slate-400">Monday – Saturday: 5:00 PM – 9:30 PM</p>
              <p className="text-slate-400">Mornings: By Prior Appointment</p>
              <p className="text-slate-400">Sunday: Closed</p>
            </div>
            <div className="pt-1">
              <a
                href={`tel:${CLINIC_INFO.phoneClean}`}
                className="text-teal-400 font-bold hover:text-teal-300 text-sm block"
              >
                📞 {CLINIC_INFO.phone}
              </a>
            </div>
          </div>

          {/* Col 4: Quick Navigation & CTAs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#3d-anatomy" className="hover:text-teal-400 transition-colors">
                  Interactive 3D Anatomy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Targeted Pain Treatments
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-400 transition-colors">
                  Patient Reviews (88)
                </a>
              </li>
              <li>
                <a href="#location-timings" className="hover:text-teal-400 transition-colors">
                  Google Maps &amp; Hours
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 px-3 rounded-xl transition-all"
              >
                Book Evening Slot
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Tech & Medical Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Dr. Nivrith’s Advanced Physiotherapy &amp; Rehabilitation Clinic. Built with open-source Three.js 3D WebGL engine.
          </p>
          <div className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>Dedicated Evidence-Based Musculoskeletal Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
