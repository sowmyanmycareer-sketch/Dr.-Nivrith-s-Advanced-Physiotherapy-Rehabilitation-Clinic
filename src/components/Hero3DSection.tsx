import React from 'react';
import { CLINIC_INFO, ANATOMY_POINTS } from '../data/clinicData.ts';
import { AnatomyPoint } from '../types.ts';
import { Anatomy3DCanvas } from './Anatomy3DCanvas.tsx';
import { AnatomicalTargetDetail } from './AnatomicalTargetDetail.tsx';
import {
  Star,
  MapPin,
  Phone,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Clock,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface Hero3DSectionProps {
  selectedPoint: AnatomyPoint;
  onSelectPoint: (point: AnatomyPoint) => void;
  onOpenBooking: (preferredArea?: string) => void;
  onCallClinic: () => void;
  onOpenReviews: () => void;
}

export const Hero3DSection: React.FC<Hero3DSectionProps> = ({
  selectedPoint,
  onSelectPoint,
  onOpenBooking,
  onCallClinic,
  onOpenReviews
}) => {
  return (
    <section id="3d-anatomy" className="relative pt-6 pb-16 lg:py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Google Review Banner with Real Prompt Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-slate-900/80 border border-teal-500/20 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReviews}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-bold hover:bg-amber-500/25 transition-colors cursor-pointer"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-extrabold text-sm">5.0</span>
              <span className="text-slate-300 font-normal underline">88 Google reviews</span>
            </button>
            <span className="text-xs text-slate-300 hidden md:inline">
              Physiotherapy center in Bengaluru, Karnataka
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              href={CLINIC_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-teal-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Directions</span>
            </a>
            <button
              onClick={onOpenReviews}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-teal-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Write a review</span>
            </button>
          </div>
        </div>

        {/* Hero Main Grid: Content + 3D Interactive Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinic Introduction & Quick Anatomy Filters */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Interactive 3D Biomechanical &amp; Pain Explorer</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                Targeted Physiotherapy That Resolves{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-emerald-400">
                  Pain At The Exact Root.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Dr. Nivrith combines precision clinical biomechanics with hands-on manual joint mobilization. As verified by dozens of patients in GM Palya and C V Raman Nagar, our target-specific therapy resolves stubborn knee, spine, and joint discomfort in significantly fewer visits.
              </p>

              {/* Real Quote Cards from Prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-900/80 border border-teal-500/20 rounded-xl p-3 text-xs">
                  <div className="flex items-center text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 italic mb-1.5">
                    "The treatment he gave helped me to get the knee pain resolved in 2 sessions."
                  </p>
                  <p className="text-[11px] font-semibold text-teal-400">— Nanda Kishore</p>
                </div>

                <div className="bg-slate-900/80 border border-teal-500/20 rounded-xl p-3 text-xs">
                  <div className="flex items-center text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 italic mb-1.5">
                    "Understands, listens and Targets the affected area."
                  </p>
                  <p className="text-[11px] font-semibold text-teal-400">— Kavyashree</p>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => onOpenBooking(selectedPoint.name)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Evening Slot (from 5 PM)</span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phoneClean}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>{CLINIC_INFO.phone}</span>
                </a>
              </div>

              {/* Anatomical Area Quick Selector Pills */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Select Anatomical Focus Area to View 3D Target:</span>
                  <span className="text-teal-400 font-normal lowercase">interactive hotspots</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {ANATOMY_POINTS.map((point) => {
                    const isSelected = selectedPoint.id === point.id;
                    return (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => onSelectPoint(point)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-teal-500 text-slate-950 shadow-md font-bold scale-105'
                            : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-teal-500/50 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: point.color }}
                        />
                        <span>{point.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas & Floating Targeted Detail */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* The 3D Three.js Canvas */}
            <div className="w-full">
              <Anatomy3DCanvas
                selectedPointId={selectedPoint.id}
                onSelectPoint={onSelectPoint}
              />
            </div>

            {/* Targeted Detail Box for Currently Active Joint Point */}
            <AnatomicalTargetDetail
              point={selectedPoint}
              onBookForArea={(areaName) => onOpenBooking(areaName)}
              onCallClinic={onCallClinic}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
