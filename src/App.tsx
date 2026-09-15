import React, { useState } from 'react';
import { ANATOMY_POINTS, CLINIC_INFO } from './data/clinicData.ts';
import { AnatomyPoint } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero3DSection } from './components/Hero3DSection.tsx';
import { BiomechanicsSimulator } from './components/BiomechanicsSimulator.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { UpdatesAndLocation } from './components/UpdatesAndLocation.tsx';
import { Footer } from './components/Footer.tsx';
import { AppointmentModal } from './components/AppointmentModal.tsx';
import { Phone, Calendar, MessageCircle } from 'lucide-react';

export default function App() {
  // Default selected 3D hotspot is Knee Joint (highlighted by Nanda Kishore in reviews)
  const [selectedPoint, setSelectedPoint] = useState<AnatomyPoint>(ANATOMY_POINTS[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingArea, setBookingArea] = useState<string | undefined>(undefined);

  const handleOpenBooking = (area?: string) => {
    setBookingArea(area || selectedPoint.name);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleCallClinic = () => {
    window.location.href = `tel:${CLINIC_INFO.phoneClean}`;
  };

  const handleOpenReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950">
      {/* Streamlined Header (without directions, phone, time, or address) */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenReviews={handleOpenReviews}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3D Anatomy Centerpiece Hero */}
        <Hero3DSection
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
          onOpenBooking={handleOpenBooking}
          onCallClinic={handleCallClinic}
          onOpenReviews={handleOpenReviews}
        />

        {/* Interactive Biomechanics & Range of Motion Simulator */}
        <BiomechanicsSimulator
          onBookSession={(issue) => handleOpenBooking(issue)}
        />

        {/* Targeted Treatments & Clinic Comparison */}
        <ServicesSection
          onBookService={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* Verified Google Reviews & Interactive Review Form */}
        <ReviewsSection />

        {/* Location, Google Maps, Timings, Updates & FAQ */}
        <UpdatesAndLocation
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialArea={bookingArea}
      />

      {/* Floating Action Buttons (Mobile & Desktop Quick Access) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href={CLINIC_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Dr. Nivrith"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 border-2 border-slate-900"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <button
          type="button"
          onClick={() => handleOpenBooking()}
          aria-label="Book appointment"
          className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 border-2 border-slate-900 text-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
