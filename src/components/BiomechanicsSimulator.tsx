import React, { useState } from 'react';
import { Activity, CheckCircle, HelpCircle, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export const BiomechanicsSimulator: React.FC<{ onBookSession: (issue: string) => void }> = ({ onBookSession }) => {
  const [activeTab, setActiveTab] = useState<'knee' | 'neck' | 'lumbar'>('knee');
  const [sliderVal, setSliderVal] = useState(50); // 0 = Before Treatment, 100 = After Dr. Nivrith's Protocol

  return (
    <section className="py-16 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Biomechanics &amp; Range of Motion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            See the Mechanical Difference: Before vs After Dr. Nivrith’s Care
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Targeted physiotherapy is not guesswork. Slide the interactive tracker below to observe how joint pressure and degrees of mobility normalize through targeted manual therapy.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => { setActiveTab('knee'); setSliderVal(60); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'knee'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            Knee Flexion (2-Session Protocol)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('neck'); setSliderVal(50); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'neck'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            Tech-Neck &amp; Cervical Load
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('lumbar'); setSliderVal(70); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'lumbar'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            Lumbar Disc Decompression
          </button>
        </div>

        {/* Interactive Visualizer Card */}
        <div className="bg-slate-950 border border-teal-500/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          {activeTab === 'knee' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Graphic representation */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800 relative">
                <svg className="w-56 h-56" viewBox="0 0 200 200">
                  {/* Outer circle track */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="12" />
                  {/* Dynamic angle arc */}
                  {(() => {
                    const angleDeg = 65 + (sliderVal / 100) * 65; // 65 deg to 130 deg
                    const rad = (angleDeg * Math.PI) / 180;
                    const endX = 100 + 80 * Math.sin(rad);
                    const endY = 100 - 80 * Math.cos(rad);
                    const largeArc = angleDeg > 180 ? 1 : 0;
                    return (
                      <path
                        d={`M 100 20 A 80 80 0 ${largeArc} 1 ${endX} ${endY}`}
                        fill="none"
                        stroke={sliderVal > 70 ? '#2dd4bf' : sliderVal > 40 ? '#38bdf8' : '#f43f5e'}
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                    );
                  })()}
                  {/* Center Hub */}
                  <circle cx="100" cy="100" r="16" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />
                  <text x="100" y="96" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                    RANGE
                  </text>
                  <text x="100" y="118" textAnchor="middle" fill="#f8fafc" fontWeight="bold" fontSize="18" fontFamily="sans-serif">
                    {Math.round(65 + (sliderVal / 100) * 65)}°
                  </text>
                </svg>

                <div className="flex items-center justify-between w-full mt-4 text-xs">
                  <span className="text-rose-400 font-medium">Acute Restriction (65°)</span>
                  <span className="text-teal-400 font-bold">Optimal Pain-Free (130°)</span>
                </div>
              </div>

              {/* Controls and Clinical Details */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Knee Patellofemoral Tracking
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    {sliderVal < 40
                      ? 'Severe Patellar Impingement & Pain'
                      : sliderVal < 80
                      ? 'Realigned Patellar Glide & Reduced Friction'
                      : 'Complete 2-Session Restored Flexion'}
                  </h3>
                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                    {sliderVal < 40
                      ? 'Restricted synovial fluid flow, constant patellar friction upon stair climbing, and quadriceps inhibition.'
                      : sliderVal < 80
                      ? 'Dr. Nivrith’s manual glide mobilization releases tightened lateral retinaculum and relieves direct joint pressure.'
                      : 'Full functional mobility restored. The patient can squat, climb stairs, and walk without clicking or catching pain.'}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Treatment Progression:</span>
                      <span className="text-teal-300 font-semibold">{sliderVal}% Normalized</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookSession('Knee Pain Protocol')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Book 2-Session Knee Assessment</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'neck' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800">
                {/* Cervical Head Load Graphic */}
                <div className="text-center mb-3">
                  <div className="text-3xl font-black text-white">
                    {Math.round(12 + (100 - sliderVal) * 0.45)} <span className="text-sm font-normal text-slate-400">lbs</span>
                  </div>
                  <div className="text-xs text-teal-400 font-semibold mt-0.5">
                    Effective Spinal Load on Neck
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-200 ${
                      sliderVal < 40 ? 'bg-rose-500' : sliderVal < 70 ? 'bg-amber-400' : 'bg-teal-400'
                    }`}
                    style={{ width: `${Math.max(15, 100 - sliderVal)}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400 text-center">
                  {sliderVal > 70
                    ? '✓ Neutral 0° posture = normal 10-12 lbs load'
                    : '⚠ Forward slouch posture places ~45-55 lbs load on neck discs'}
                </div>
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Tech Neck &amp; Headache Prevention
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    Suboccipital Decompression
                  </h3>
                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                    Extended computer monitor staring leads to pinched C1-C7 facet joints and tension headaches. Dr. Nivrith releases trigger points and teaches ergonomic biofeedback.
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Posture Realignment Tracker:</span>
                      <span className="text-teal-300 font-semibold">{sliderVal}% Corrected</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookSession('Tech Neck & Cervical Therapy')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Consult for Neck Stiffness &amp; Headaches</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'lumbar' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-center mb-3">
                  <div className="text-3xl font-black text-teal-300">
                    {Math.round(25 + sliderVal * 0.75)}%
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-0.5">
                    Intervertebral Space Decompression
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-200"
                    style={{ width: `${Math.round(25 + sliderVal * 0.75)}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Maitland Grade mobilization reduces pinched nerve root inflammation along the sciatic tract.
                </p>
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    L4-L5 / L5-S1 Decompression
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    Sciatic Nerve Flossing
                  </h3>
                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                    Safe, manual lumbar opening techniques relieve the burning gluteal pain and tingling that prevents comfortable desk work and standing.
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Decompression Factor:</span>
                      <span className="text-teal-300 font-semibold">{sliderVal}% Released</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookSession('Lumbar & Sciatica Decompression')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Book Lower Back &amp; Sciatica Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
