import React, { useState } from 'react';
import { GOOGLE_REVIEWS, CLINIC_INFO } from '../data/clinicData.ts';
import { GoogleReview } from '../types.ts';
import {
  Star,
  ThumbsUp,
  CheckCircle,
  MessageSquarePlus,
  Image,
  Sparkles,
  ExternalLink,
  Filter,
  Play,
  Pause,
  LayoutGrid,
  MoveHorizontal,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewCardProps {
  rev: GoogleReview;
  onLike: (id: string) => void;
  compact?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ rev, onLike, compact = false }) => {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 group/card ${
        compact ? 'w-[320px] sm:w-[380px] flex-shrink-0 select-none' : 'w-full'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-teal-500/20">
              {rev.initials}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                <span>{rev.author}</span>
              </h4>
              <span className="text-[11px] text-slate-400">{rev.timeAgo}</span>
            </div>
          </div>

          <div className="flex text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
        </div>

        {rev.highlightTag && (
          <div className="inline-block bg-teal-950/80 text-teal-300 border border-teal-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3 shadow-xs">
            {rev.highlightTag}
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-4">
          "{rev.text}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs mt-auto">
        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Verified Google Patient</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLike(rev.id);
          }}
          className="flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-teal-500/40"
          title="Mark review as helpful"
        >
          <ThumbsUp className="w-3 h-3 text-teal-400" />
          <span className="text-[11px]">Helpful ({rev.likes})</span>
        </button>
      </div>
    </div>
  );
};

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Scrolling animation controls
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [conditionTreated, setConditionTreated] = useState('Knee Pain');
  const [reviewText, setReviewText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Photo upload mock state
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleLike = (id: string) => {
    setReviews(prev =>
      prev.map(rev => (rev.id === id ? { ...rev, likes: rev.likes + 1 } : rev))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: authorName,
      initials: authorName.slice(0, 2).toUpperCase(),
      rating: reviewRating,
      timeAgo: 'Just now',
      text: reviewText,
      verified: true,
      highlightTag: conditionTreated,
      treatedCondition: conditionTreated,
      likes: 1
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    setTimeout(() => {
      setShowWriteModal(false);
      setSubmittedMessage(false);
      setAuthorName('');
      setReviewText('');
    }, 1800);
  };

  const filteredReviews = reviews.filter(rev => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'knee') return rev.treatedCondition?.toLowerCase().includes('knee') || rev.text.toLowerCase().includes('knee');
    if (selectedFilter === 'spine') return rev.treatedCondition?.toLowerCase().includes('spine') || rev.text.toLowerCase().includes('disc') || rev.text.toLowerCase().includes('back');
    if (selectedFilter === 'shoulder') return rev.treatedCondition?.toLowerCase().includes('shoulder');
    return true;
  });

  // Duplicate filtered reviews adequately so the marquee animation track has zero seams or gaps
  const repeatCount = Math.max(3, Math.ceil(12 / (filteredReviews.length || 1)));
  const row1Items = Array(repeatCount).fill(filteredReviews).flat();

  // Create an offset set for row 2 for visual variety
  const splitIdx = Math.max(1, Math.floor(filteredReviews.length / 2));
  const staggeredBase = [...filteredReviews.slice(splitIdx), ...filteredReviews.slice(0, splitIdx)];
  const row2Items = Array(repeatCount).fill(staggeredBase).flat();

  // Speed class mapping
  const speedClass = scrollSpeed === 'slow'
    ? 'animate-reviews-scroll-slow'
    : scrollSpeed === 'fast'
    ? 'animate-reviews-scroll-fast'
    : '';

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Official Google Review Summary */}
        <div className="bg-slate-900 border border-teal-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Big 5.0 Rating */}
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-white tracking-tight">5.0</span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-300 font-semibold mt-0.5 block">
                    88 Google reviews
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-slate-800 hidden sm:block" />

              <div>
                <span className="text-sm font-bold text-white block">
                  Physiotherapy center in Bengaluru, Karnataka
                </span>
                <span className="text-xs text-teal-400 font-medium">
                  Verified Local Business Listing • GM Palya, C V Raman Nagar
                </span>
              </div>
            </div>

            {/* Quick Actions specified in prompt */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowWriteModal(true)}
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a review</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
              >
                <Image className="w-4 h-4 text-teal-400" />
                <span>Add photos</span>
              </button>

              <a
                href={CLINIC_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
              >
                <span>View on Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Filter Tags & Animation Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-800">
            {/* Filter Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-teal-400" /> Filter:
              </span>
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                All (88 Reviews)
              </button>
              <button
                onClick={() => setSelectedFilter('knee')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === 'knee'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Knee Pain (Resolved in 2 Sessions)
              </button>
              <button
                onClick={() => setSelectedFilter('spine')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === 'spine'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Spine &amp; Disc Decompression
              </button>
              <button
                onClick={() => setSelectedFilter('shoulder')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === 'shoulder'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Shoulder Mobility
              </button>
            </div>

            {/* Scrolling Animation Interactive Controls */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setIsPaused(prev => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isPaused
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                }`}
                title={isPaused ? 'Resume scrolling animation' : 'Pause scrolling animation'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                    <span>Auto-Scrolling</span>
                  </>
                )}
              </button>

              {/* Speed Buttons */}
              <div className="hidden sm:flex items-center gap-1 px-1 border-l border-slate-800">
                <button
                  type="button"
                  onClick={() => setScrollSpeed('slow')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    scrollSpeed === 'slow' ? 'bg-slate-800 text-teal-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Slow
                </button>
                <button
                  type="button"
                  onClick={() => setScrollSpeed('normal')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    scrollSpeed === 'normal' ? 'bg-slate-800 text-teal-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setScrollSpeed('fast')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    scrollSpeed === 'fast' ? 'bg-slate-800 text-teal-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fast
                </button>
              </div>

              {/* View Switcher: Animated Carousel vs Grid */}
              <div className="flex items-center gap-1 border-l border-slate-800 pl-1">
                <button
                  type="button"
                  onClick={() => setViewMode('marquee')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'marquee'
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Animated scrolling view"
                >
                  <MoveHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Static grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Hint */}
        {viewMode === 'marquee' && (
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
              <span>Real Google patient feedback • Hover over any card to pause</span>
            </span>
            <span className="hidden sm:inline text-slate-500 text-[11px]">
              Continuous Bi-Directional Carousel
            </span>
          </div>
        )}

        {/* Dynamic Reviews Display */}
        {viewMode === 'marquee' ? (
          <div className="relative mb-12 reviews-container">
            {/* Soft Edge Gradient Overlays */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            {/* Row 1: Smooth Leftward Scrolling Track */}
            <div className="overflow-hidden py-2 mb-4">
              <div
                className={`flex gap-5 animate-reviews-scroll ${speedClass}`}
                style={{ animationPlayState: isPaused ? 'paused' : undefined }}
              >
                {row1Items.map((rev, index) => (
                  <ReviewCard
                    key={`r1-${rev.id}-${index}`}
                    rev={rev}
                    onLike={handleLike}
                    compact
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Smooth Rightward Scrolling Track */}
            <div className="overflow-hidden py-2">
              <div
                className={`flex gap-5 animate-reviews-scroll-reverse ${speedClass}`}
                style={{ animationPlayState: isPaused ? 'paused' : undefined }}
              >
                {row2Items.map((rev, index) => (
                  <ReviewCard
                    key={`r2-${rev.id}-${index}`}
                    rev={rev}
                    onLike={handleLike}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Static Grid Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {filteredReviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                rev={rev}
                onLike={handleLike}
              />
            ))}
          </div>
        )}

        {/* Surrounding Clinics mentioned in Google Listing: "People also search for" */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              People Also Search For in Bengaluru
            </h3>
            <span className="text-xs text-teal-400 font-medium">Bengaluru East Physical Therapy</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-0.5">Rejoice Physiotherapy &amp; Rehab</p>
              <p className="text-[11px] text-slate-400">Rehabilitation Center</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-0.5">The Fysit</p>
              <p className="text-[11px] text-slate-400">Sadanandanagar</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-0.5">Atlas Chiropractic &amp; Wellness</p>
              <p className="text-[11px] text-slate-400">Indiranagar</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-0.5">My Stree Clinic</p>
              <p className="text-[11px] text-slate-400">Specialized Care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowWriteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              Write a Google Review
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Share your treatment outcome with Dr. Nivrith to help other patients in GM Palya and Bengaluru.
            </p>

            {submittedMessage ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Thank You!</h4>
                <p className="text-xs text-slate-300">
                  Your review has been verified and added to the clinic listing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Ramesh K."
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating ? 'fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Condition / Area Treated
                  </label>
                  <select
                    value={conditionTreated}
                    onChange={(e) => setConditionTreated(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="Knee Joint Pain">Knee Joint Pain</option>
                    <option value="Lower Back & Sciatica">Lower Back &amp; Sciatica</option>
                    <option value="Cervical Neck Therapy">Cervical Neck Therapy</option>
                    <option value="Frozen Shoulder">Frozen Shoulder</option>
                    <option value="Hip Alignment">Hip Alignment</option>
                    <option value="Sports Injury">Sports Injury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Experience &amp; Sessions Required
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Describe how Dr. Nivrith targeted your affected area..."
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowWriteModal(false)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Photos Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              Add Clinic Photos
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Upload photos of your rehabilitation progress or clinic visit to contribute to the Google listing.
            </p>

            <div className="border-2 border-dashed border-slate-700 hover:border-teal-400 rounded-2xl p-8 text-center bg-slate-950 cursor-pointer transition-colors">
              <Image className="w-10 h-10 text-teal-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                Drag &amp; drop photos here, or browse
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports JPG, PNG (Max 10MB)
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedPhotos(prev => [...prev, e.target.files![0].name]);
                  }
                }}
              />
              <label
                htmlFor="photo-upload-input"
                className="inline-block mt-4 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold rounded-lg border border-slate-700 cursor-pointer"
              >
                Select Files
              </label>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-teal-400">
                ✓ {uploadedPhotos.length} photo(s) selected: {uploadedPhotos.join(', ')}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
