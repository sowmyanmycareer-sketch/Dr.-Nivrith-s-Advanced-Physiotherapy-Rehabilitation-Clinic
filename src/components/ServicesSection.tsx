import React from 'react';
import { CLINIC_SERVICES, NEARBY_COMPARISON, CLINIC_INFO } from '../data/clinicData.ts';
import { TreatmentService } from '../types.ts';
import { Check, ShieldCheck, ArrowRight, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>Targeted Clinical Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Target-Specific Physical Rehabilitation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            At Dr. Nivrith’s clinic, every treatment session is centered around identifying your precise biomechanical restriction rather than applying blanket electro-pads.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CLINIC_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-wider">
                    {service.modalities[0]}
                  </span>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-3">
                  {service.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-5">
                  {service.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => onBookService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all duration-200"
                >
                  <span>Book for this Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Dr. Nivrith vs Generic Centers Comparison */}
        <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Clinical Standard Comparison
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Why Patients Travel Across Bengaluru to Dr. Nivrith
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-teal-950/80 border border-teal-500/40 px-4 py-2 rounded-xl text-xs font-semibold text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>100% Focused 1-on-1 Specialist Care</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dr. Nivrith */}
            <div className="bg-gradient-to-b from-teal-950/50 to-slate-950 border-2 border-teal-500/60 rounded-2xl p-6 shadow-xl relative">
              <div className="absolute -top-3 right-6 bg-teal-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                5.0 ★ Google Rated
              </div>
              <h4 className="text-lg font-bold text-teal-300 mb-1">
                {NEARBY_COMPARISON[0].name}
              </h4>
              <p className="text-xs font-semibold text-teal-400 mb-4">
                {NEARBY_COMPARISON[0].rating}
              </p>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Diagnostic Precision:</strong>
                    {NEARBY_COMPARISON[0].approach}
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Rapid Recovery:</strong>
                    {NEARBY_COMPARISON[0].averageSessions} (e.g. knee pain resolved in 2 visits)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Evening Flexibility:</strong>
                    {NEARBY_COMPARISON[0].timings}
                  </div>
                </li>
              </ul>
            </div>

            {/* Standard Generic Centers */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 text-slate-400">
              <h4 className="text-lg font-bold text-slate-300 mb-1">
                {NEARBY_COMPARISON[1].name}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                {NEARBY_COMPARISON[1].rating}
              </p>

              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-slate-300 block">Generic Protocols:</strong>
                    {NEARBY_COMPARISON[1].approach}
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-slate-300 block">Protracted Commitments:</strong>
                    {NEARBY_COMPARISON[1].averageSessions}
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-slate-300 block">Limited Hours:</strong>
                    {NEARBY_COMPARISON[1].timings}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
