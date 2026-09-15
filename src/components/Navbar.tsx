import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { Calendar, Menu, X, Star, Sparkles, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (preferredArea?: string) => void;
  onOpenReviews: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenReviews }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all shadow-xl">
      {/* Top micro announcement bar with Google reviews status (No phone, direction, time, or address) */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-teal-950/70 border-b border-teal-500/20 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onOpenReviews}
            className="flex items-center gap-2 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">5.0</span>
            <span className="text-teal-300 underline underline-offset-2">
              ({CLINIC_INFO.reviewCount} Google reviews)
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              Verified Medical Practice
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 text-teal-300 font-medium bg-teal-950/80 border border-teal-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Target-Specific Pain Resolution</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Clinic Brand (without address) */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 p-0.5 shadow-md shadow-teal-500/20 flex items-center justify-center text-slate-950 font-black text-lg">
              3D
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight block group-hover:text-teal-300 transition-colors">
                Dr. Nivrith’s Advanced Physiotherapy
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 block font-normal">
                Rehabilitation &amp; Targeted Musculoskeletal Care
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (No directions, hours, or address) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#3d-anatomy"
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <span>3D Anatomy</span>
              <span className="text-[10px] bg-teal-950 text-teal-300 px-1.5 py-0.5 rounded border border-teal-800">
                Interactive
              </span>
            </a>
            <a
              href="#biomechanics"
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Biomechanics</span>
            </a>
            <a href="#services" className="hover:text-teal-400 transition-colors">
              Treatments
            </a>
            <a
              href="#reviews"
              onClick={onOpenReviews}
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <span>Reviews</span>
              <span className="text-[10px] bg-slate-800 text-amber-300 font-semibold px-1.5 py-0.5 rounded">
                ★ 5.0
              </span>
            </a>
            <a href="#faq" className="hover:text-teal-400 transition-colors">
              FAQ
            </a>
          </div>

          {/* Action CTAs (No phone or direction buttons) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-md shadow-teal-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-teal-400"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (No phone, direction, time, or address) */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-3 pb-2 sm:hidden animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReviews();
                }}
                className="flex items-center gap-1.5 text-amber-400"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">5.0</span>
                <span className="text-slate-400">({CLINIC_INFO.reviewCount} Google reviews)</span>
              </button>
              <span className="text-teal-400 font-semibold text-[11px]">Verified Clinic</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-300">
              <a
                href="#3d-anatomy"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center hover:text-teal-300"
              >
                3D Anatomy
              </a>
              <a
                href="#biomechanics"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center hover:text-teal-300"
              >
                Biomechanics
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center hover:text-teal-300"
              >
                Treatments
              </a>
              <a
                href="#reviews"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReviews();
                }}
                className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center hover:text-teal-300"
              >
                Patient Reviews
              </a>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
