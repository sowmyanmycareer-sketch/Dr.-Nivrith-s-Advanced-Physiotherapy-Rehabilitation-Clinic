import React from 'react';
import { AnatomyPoint } from '../types.ts';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { Activity, CheckCircle2, Phone, Calendar, ArrowRight, Quote, Sparkles, Target } from 'lucide-react';

interface AnatomicalTargetDetailProps {
  point: AnatomyPoint;
  onBookForArea: (areaName: string) => void;
  onCallClinic: () => void;
}

export const AnatomicalTargetDetail: React.FC<AnatomicalTargetDetailProps> = ({
  point,
  onBookForArea,
  onCallClinic
}) => {
  return (
    <div className="bg-slate-900/95 border border-teal-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between h-full">
      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full ring-4 ring-slate-800 animate-pulse"
              style={{ backgroundColor: point.color }}
            />
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
              Targeted Area Assessment
            </span>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
            {point.expectedSessions}
          </span>
        </div>

        {/* Title & Medical Classification */}
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {point.name}
        </h3>
        <p className="text-xs font-mono text-teal-300/80 mb-4">
          {point.medicalName}
        </p>

        {/* Dr. Nivrith's Approach Highlight Box */}
        <div className="bg-gradient-to-br from-teal-950/60 to-slate-900 border border-teal-500/30 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold mb-1.5">
            <Target className="w-4 h-4 text-teal-400" />
            <span>Dr. Nivrith’s Clinical Approach</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {point.drNivrithApproach}
          </p>
        </div>

        {/* Patient Review Quote if present */}
        {point.patientQuote && (
          <div className="bg-slate-800/80 border-l-4 border-teal-400 rounded-r-xl p-3.5 mb-5 shadow-sm">
            <div className="flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs italic text-slate-200 mb-1">
                  "{point.patientQuote.text}"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-teal-300">
                    — {point.patientQuote.author}
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">5.0 ★ Google Review</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms Handled */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            Typical Symptoms Treated
          </h4>
          <ul className="space-y-1.5">
            {point.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specific Techniques Applied */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Targeted Manual & Modality Techniques
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {point.recoveryTechniques.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-800 text-teal-200 px-2.5 py-1 rounded-md border border-slate-700/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={() => onBookForArea(point.name)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-teal-950 active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4" />
          <span>Book for {point.name.split(' ')[0]}</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </button>

        <button
          type="button"
          onClick={onCallClinic}
          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-4 py-2.5 rounded-xl text-sm border border-slate-700 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call 098865 92536</span>
        </button>
      </div>
    </div>
  );
};
