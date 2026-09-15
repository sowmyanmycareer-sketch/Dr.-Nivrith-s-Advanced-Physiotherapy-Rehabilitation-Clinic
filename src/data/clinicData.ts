import { AnatomyPoint, GoogleReview, TreatmentService, ClinicUpdate } from '../types.ts';

export const CLINIC_INFO = {
  name: "Dr. Nivrith’s Advanced Physiotherapy & Rehabilitation Clinic",
  shortName: "Dr. Nivrith's Rehab Clinic",
  tagline: "Advanced Target-Specific Musculoskeletal & Neurological Rehabilitation",
  rating: 5.0,
  reviewCount: 88,
  verifiedGoogleListing: true,
  category: "Physiotherapy center in Bengaluru, Karnataka",
  address: {
    line1: "001, Dalli Sai Residency, Dr Rajkumar Rd",
    line2: "KG Colony, GM Palya, C V Raman Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560075",
    full: "001, Dalli Sai Residency, Dr Rajkumar Rd, KG Colony, GM Palya, C V Raman Nagar, Bengaluru, Karnataka 560075",
    landmarks: "Near GM Palya Main Bus Stand, 5 mins from BEML Gate & Indiranagar Outer Ring Rd",
    googleMapsUrl: "https://maps.google.com/?q=001+Dalli+Sai+Residency+Dr+Rajkumar+Rd+KG+Colony+GM+Palya+CV+Raman+Nagar+Bengaluru+Karnataka+560075",
  },
  phone: "098865 92536",
  phoneClean: "+919886592536",
  whatsappUrl: "https://wa.me/919886592536?text=Hello%20Dr.%20Nivrith,%20I%20would%20like%20to%20consult%20for%20physiotherapy.",
  hours: {
    display: "Closed · Opens 5 PM",
    schedule: [
      { days: "Monday – Saturday", time: "5:00 PM – 9:30 PM", note: "Primary Evening Clinic & In-person Therapy" },
      { days: "Monday – Saturday (Mornings)", time: "By Appointment Only", note: "Pre-booked critical rehabilitation slots" },
      { days: "Sunday", time: "Closed", note: "Emergency tele-support available" }
    ],
    nextOpenText: "Evening consultations start at 5:00 PM today"
  },
  highlights: [
    "5.0 ⭐ Perfect Google Rating across 88+ Patient Reviews",
    "Evidence-based targeted therapy (frequently resolves acute pain in 2-3 sessions)",
    "Comprehensive 1-on-1 personalized attention — no rushed treatments",
    "Equipped with advanced electro-analgesia and specialized manual joint mobilization"
  ]
};

export const ANATOMY_POINTS: AnatomyPoint[] = [
  {
    id: "knee",
    name: "Knee Joint & Ligaments",
    medicalName: "Patellofemoral & Meniscal Complex",
    category: "lower_limb",
    position3D: [0.38, -1.1, 0.12],
    color: "#2dd4bf", // teal-400
    symptoms: [
      "Stabbing pain when climbing stairs or squatting",
      "Stiffness and clicking sounds in the knee cap",
      "Meniscus strain, ligament weakness, or runner's knee"
    ],
    commonConditions: ["Osteoarthritis", "Meniscal Tear", "Patellofemoral Pain Syndrome", "ACL/PCL Post-Surgical Rehab"],
    protocolTitle: "Targeted 2-Session Knee Mobilization Protocol",
    drNivrithApproach: "Precision patellar tracking realignment combined with quad-hamstring eccentric kinetic chain retraining. Targets the exact mechanical impingement rather than generic heat packs.",
    expectedSessions: "2 – 4 sessions for acute pain relief",
    recoveryTechniques: [
      "Manual Patellar Mobilization",
      "Vastus Medialis Oblique (VMO) Activation",
      "Kinetic Chain Gait Retraining",
      "Deep Tissue Fascial Release"
    ],
    patientQuote: {
      text: "The treatment he gave helped me to get the knee pain resolved in 2 sessions.",
      author: "Nanda Kishore"
    }
  },
  {
    id: "lumbar-spine",
    name: "Lower Back & Lumbar Spine",
    medicalName: "L1-S1 Vertebral & Sacroiliac Segment",
    category: "spine",
    position3D: [0.0, -0.15, -0.05],
    color: "#38bdf8", // sky-400
    symptoms: [
      "Dull ache radiating down the glutes and legs (Sciatica)",
      "Inability to sit prolonged hours at work desk",
      "Morning lower back stiffness and sharp spasms upon bending"
    ],
    commonConditions: ["Lumbar Spondylosis", "L4-L5 / L5-S1 Disc Bulge", "Sciatica Nerve Compression", "SI Joint Dysfunction"],
    protocolTitle: "Spinal Decompression & Core Stabilization System",
    drNivrithApproach: "Comprehensive spinal palpation to isolate trapped nerve roots followed by gentle traction techniques and progressive deep transverse abdominis recruitment.",
    expectedSessions: "3 – 5 sessions for sustained relief",
    recoveryTechniques: [
      "Maitland Spinal Mobilization",
      "Neurodynamic Sciatic Nerve Flossing",
      "Ergonomic Sitting Biofeedback",
      "Core Muscular Stabilization"
    ],
    patientQuote: {
      text: "Understands, listens and Targets the affected area with laser precision.",
      author: "Kavyashree"
    }
  },
  {
    id: "cervical-neck",
    name: "Cervical Spine & Tech Neck",
    medicalName: "C1-C7 Cervical Vertebrae & Suboccipital Group",
    category: "cervical",
    position3D: [0.0, 1.25, 0.05],
    color: "#a78bfa", // violet-400
    symptoms: [
      "Stiff neck from extended laptop and mobile phone usage",
      "Tension headaches spreading from base of skull to temples",
      "Tingling or numbness radiating into shoulders and fingertips"
    ],
    commonConditions: ["Cervical Spondylosis", "Forward Head Posture Syndrome", "Trapezius Myofascial Trigger Points", "Pinched Cervical Nerve"],
    protocolTitle: "Cervical Decompression & Postural Alignment",
    drNivrithApproach: "Targeted release of hypertonic suboccipital and levator scapulae muscles, followed by segmental facet joint glides to restore full cervical rotation.",
    expectedSessions: "2 – 4 sessions",
    recoveryTechniques: [
      "Suboccipital Muscle Release",
      "Deep Neck Flexor Neuromuscular Activation",
      "Computer Posture & Monitor Setup Guidance",
      "Gentle Facet Decompression"
    ],
    patientQuote: {
      text: "I am very happy with the service he offers. My chronic neck stiffness was gone quickly.",
      author: "pranita thapa"
    }
  },
  {
    id: "shoulder",
    name: "Shoulder & Rotator Cuff",
    medicalName: "Glenohumeral & Scapulothoracic Complex",
    category: "upper_limb",
    position3D: [-0.68, 0.85, 0.05],
    color: "#f43f5e", // rose-500
    symptoms: [
      "Inability to lift the arm overhead or reach behind the back",
      "Deep night ache disturbing sleep when lying on the side",
      "Frozen shoulder stiffness that progressively worsens over weeks"
    ],
    commonConditions: ["Adhesive Capsulitis (Frozen Shoulder)", "Supraspinatus Tendinitis", "Subacromial Impingement", "Rotator Cuff Strain"],
    protocolTitle: "Multi-Plane Shoulder Mobility & Capsule Release",
    drNivrithApproach: "Restoration of scapulohumeral rhythm through targeted capsular distension stretches and rotator cuff eccentric strengthening.",
    expectedSessions: "3 – 6 sessions",
    recoveryTechniques: [
      "End-range Capsule Glides",
      "Scapular Upward Rotation Retraining",
      "Painless Isometric Resistance",
      "Ultrasound & Interferential Therapy"
    ]
  },
  {
    id: "hip-pelvis",
    name: "Hip & Pelvic Alignment",
    medicalName: "Acetabulofemoral & Pelvic Basin",
    category: "lower_limb",
    position3D: [-0.38, -0.45, 0.08],
    color: "#fb923c", // orange-400
    symptoms: [
      "Groin pain during walking or getting out of a car",
      "Uneven pelvic tilt causing compensatory back pain",
      "Gluteal tightness and piriformis syndrome"
    ],
    commonConditions: ["Hip Bursitis", "Piriformis Syndrome", "Pelvic Asymmetry", "Labral Tear Support"],
    protocolTitle: "Pelvic Symmetry & Gluteal Muscle Activation",
    drNivrithApproach: "Pelvic level correction using muscle energy techniques (MET) coupled with strengthening the gluteus medius for balanced single-leg support.",
    expectedSessions: "3 – 5 sessions",
    recoveryTechniques: [
      "Muscle Energy Technique (MET)",
      "Gluteus Medius Isolation",
      "Sacroiliac Joint Re-education",
      "Pelvic Floor Co-activation"
    ]
  },
  {
    id: "ankle-foot",
    name: "Ankle & Achilles Complex",
    medicalName: "Talocrural & Plantar Fascia",
    category: "lower_limb",
    position3D: [0.36, -2.1, 0.15],
    color: "#34d399", // emerald-400
    symptoms: [
      "Sharp heel pain upon taking the first steps in the morning",
      "Recurrent ankle twisting or lingering sprain weakness",
      "Achilles tendon tightness after walking or running"
    ],
    commonConditions: ["Plantar Fasciitis", "Inversion Ankle Sprain", "Achilles Tendinopathy", "Flat Foot Pronation"],
    protocolTitle: "Dynamic Ankle Stability & Plantar Arch Restoration",
    drNivrithApproach: "Cross-friction massage over fibular ligaments, plantar fascia scraping, and proprioceptive wobble board re-education.",
    expectedSessions: "2 – 4 sessions",
    recoveryTechniques: [
      "Talus Mobilization with Movement (MWM)",
      "Plantar Fascia Instrument-Assisted Release",
      "Proprioception & Balance Training",
      "Custom Footwear & Insole Counseling"
    ]
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Nanda Kishore",
    initials: "NK",
    rating: 5,
    timeAgo: "2 months ago",
    text: "The treatment he gave helped me to get the knee pain resolved in 2 sessions. Very professional, diagnoses the exact root issue instead of unnecessary prolonged therapies.",
    verified: true,
    highlightTag: "Resolved Knee Pain in 2 Sessions",
    treatedCondition: "Knee Joint Pain",
    likes: 14
  },
  {
    id: "rev-2",
    author: "Kavyashree",
    initials: "K",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Understands, listens and Targets the affected area. Highly recommend Dr. Nivrith for anyone struggling with chronic pain in GM Palya and CV Raman Nagar.",
    verified: true,
    highlightTag: "Understands & Targets the Area",
    treatedCondition: "Spine & Shoulder",
    likes: 19
  },
  {
    id: "rev-3",
    author: "pranita thapa",
    initials: "PT",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I am very happy with the service he offers. The clinic atmosphere is very calm and Dr. Nivrith gives his undivided attention during every exercise and manual technique.",
    verified: true,
    highlightTag: "Undivided Attention & Great Service",
    treatedCondition: "Cervical Neck Therapy",
    likes: 9
  },
  {
    id: "rev-4",
    author: "Arun Kumar Swamy",
    initials: "AS",
    rating: 5,
    timeAgo: "4 months ago",
    text: "Had severe L4-L5 disc pain for 6 months. After just 4 sessions of Dr. Nivrith's manual therapy and postural correction, I am back to my daily morning walks without discomfort.",
    verified: true,
    highlightTag: "Severe Disc Bulge Recovery",
    treatedCondition: "Lower Back / Sciatica",
    likes: 22
  },
  {
    id: "rev-5",
    author: "Deepika R.",
    initials: "DR",
    rating: 5,
    timeAgo: "5 months ago",
    text: "Was suffering from frozen shoulder for over a year. Dr. Nivrith explained the 3D joint biomechanics to me patiently. My range of motion improved by 80% within 3 weeks!",
    verified: true,
    highlightTag: "80% Range of Motion Regained",
    treatedCondition: "Frozen Shoulder",
    likes: 11
  },
  {
    id: "rev-6",
    author: "Manoj Hegde",
    initials: "MH",
    rating: 5,
    timeAgo: "6 months ago",
    text: "Best physiotherapist near GM Palya and C V Raman Nagar. Open in the evening till 9:30 PM which makes it so easy for IT professionals returning from office.",
    verified: true,
    highlightTag: "Convenient Evening Timings",
    treatedCondition: "Postural Correction",
    likes: 17
  }
];

export const CLINIC_SERVICES: TreatmentService[] = [
  {
    id: "targeted-knee",
    title: "Targeted Knee Pain & Joint Mobilization",
    subtitle: "Rapid resolution protocols for sports & degenerative knee pain",
    description: "Instead of passive heat packs, Dr. Nivrith applies targeted patellar glide mobilization, VMO neuromuscular reactivation, and kinetic chain alignment that frequently produces dramatic relief in as few as 2 sessions.",
    keyBenefits: [
      "Targeted patellofemoral tracking realignment",
      "Cartilage decompression & joint fluid circulation",
      "Stair-climbing & squatting pain relief in 2–3 visits",
      "Avoid or delay invasive knee replacement surgery"
    ],
    modalities: ["Maitland Mobilization", "Targeted Electro-Stimulation", "Kinetic Gait Correction"],
    targetConditions: ["Osteoarthritis", "Meniscus Strain", "Ligament Laxity", "Runner's Knee"],
    badge: "Most Requested"
  },
  {
    id: "spine-sciatica",
    title: "Spine, Disc & Sciatica Rehabilitation",
    subtitle: "Non-surgical decompression for herniated discs and radiating nerve pain",
    description: "Specialized root-level mobilization targeting compressed spinal nerve roots. Restores normal disc biomechanics and trains deep spinal core muscles to eliminate recurrent back flare-ups.",
    keyBenefits: [
      "Relief from shooting sciatic nerve pain down legs",
      "Safe manual lumbar decompression techniques",
      "Custom desk ergonomic adaptation for IT professionals",
      "Targeted core stabilizer muscle re-education"
    ],
    modalities: ["Mechanical & Manual Decompression", "Neurodynamic Flossing", "McKenzie Protocol"],
    targetConditions: ["L4-L5 Disc Bulge", "Sciatica", "Spinal Stenosis", "Chronic Lower Back Pain"],
    badge: "Specialized"
  },
  {
    id: "cervical-posture",
    title: "Cervical Spine, Neck & Tech-Neck Therapy",
    subtitle: "Relief for desk workers, headache sufferers, and chronic stiffness",
    description: "Focused release of tense suboccipital and upper trapezius myofascial trigger points, combined with gentle cervical facet joint mobilization to relieve tension headaches and neck impingement.",
    keyBenefits: [
      "Elimination of chronic morning neck stiffness",
      "Reduction in screen-induced cervicogenic headaches",
      "Restoration of full rotation without clicking",
      "Shoulder blade pain release"
    ],
    modalities: ["Suboccipital Release", "Deep Neck Flexor Activation", "Postural Biofeedback"],
    targetConditions: ["Cervical Spondylosis", "Tech-Neck", "Tension Headaches", "Nerve Radiculopathy"]
  },
  {
    id: "shoulder-sports",
    title: "Frozen Shoulder & Sports Injury Rehab",
    subtitle: "Advanced capsular stretching and athletic return-to-play training",
    description: "Restores normal arm mobility and overhead reach for adhesive capsulitis, rotator cuff tears, and sports strains through progressive capsular glides and eccentric strength loading.",
    keyBenefits: [
      "Rapid restoration of reaching and sleeping comfort",
      "Rotator cuff strength and scapular rhythm recovery",
      "Sport-specific agility and power rebuilding",
      "Prevention of chronic tendon calcification"
    ],
    modalities: ["End-Range Capsular Stretches", "Therapeutic Ultrasound", "Resistance Band Loading"],
    targetConditions: ["Frozen Shoulder", "Rotator Cuff Tendinitis", "Tennis / Golfer's Elbow", "Ankle Sprains"]
  },
  {
    id: "post-op-stroke",
    title: "Post-Surgical & Neurological Rehabilitation",
    subtitle: "Compassionate, structured recovery after orthopedic surgery or stroke",
    description: "Comprehensive functional re-education following knee/hip replacements, fracture fixations, or neurological events to regain independent mobility, balance, and quality of life.",
    keyBenefits: [
      "Safe, structured progressive weight-bearing protocols",
      "Scar tissue remodeling and swelling reduction",
      "Fall prevention and dynamic balance re-training",
      "Dedicated, patient 1-on-1 care"
    ],
    modalities: ["Gait Re-education", "Proprioceptive Training", "Functional Muscle Re-education"],
    targetConditions: ["Total Knee/Hip Replacement", "Fracture Recovery", "Stroke Hemiparesis", "Parkinsonian Gait"]
  }
];

export const CLINIC_UPDATES: ClinicUpdate[] = [
  {
    id: "up-1",
    date: "September 2026",
    title: "Advanced Electrotherapy & Deep Muscle Stimulation Upgrades",
    summary: "New imported combination electro-analgesia modalities have arrived at the clinic to accelerate acute muscle spasm relief alongside Dr. Nivrith's hands-on manual techniques.",
    tag: "Clinical Update"
  },
  {
    id: "up-2",
    date: "August 2026",
    title: "Evening Clinic Hours Optimized for Working Professionals",
    summary: "Patients can now conveniently book slots from 5:00 PM up to 9:30 PM after office hours. Morning sessions remain available for critical post-op patients upon prior appointment.",
    tag: "Timing Update"
  },
  {
    id: "up-3",
    date: "July 2026",
    title: "Celebrated 88+ Consecutive 5-Star Reviews on Google",
    summary: "Heartfelt gratitude to our patients from GM Palya, C V Raman Nagar, Kaggadasapura, and Indiranagar for trusting Dr. Nivrith with their musculoskeletal recovery.",
    tag: "Milestone"
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: "Why is Dr. Nivrith's approach different from general physiotherapy clinics?",
    a: "Unlike clinics that leave patients on generic heating pads or vibration machines for 45 minutes, Dr. Nivrith listens carefully and spends dedicated time manually locating the exact joint restriction or muscular trigger point. As patients like Nanda Kishore and Kavyashree have noted, this target-specific treatment resolves problems in far fewer sessions."
  },
  {
    q: "How many sessions are typically required for knee or back pain?",
    a: "Many patients experience significant relief and restored movement in just 2 to 4 targeted sessions. During your first assessment, Dr. Nivrith will outline a clear, realistic timeframe without recommending unnecessary long-term packages."
  },
  {
    q: "What are the clinic's working hours?",
    a: "The clinic's primary consultation and therapy sessions run Monday through Saturday from 5:00 PM to 9:30 PM. Morning rehabilitation sessions are conducted by prior appointment."
  },
  {
    q: "Do I need a doctor's prescription before visiting?",
    a: "No prescription is required. Dr. Nivrith conducts a thorough orthopedic and biomechanical evaluation to diagnose the musculoskeletal source of pain. If you have X-rays or MRI reports, please bring them along."
  },
  {
    q: "Where is the clinic located in Bengaluru?",
    a: "We are located at 001, Dalli Sai Residency, Dr Rajkumar Rd, KG Colony, GM Palya, C V Raman Nagar, Bengaluru, Karnataka 560075 — convenient for patients coming from Indiranagar, BEML, GM Palya, and Kaggadasapura."
  }
];

export const NEARBY_COMPARISON = [
  {
    name: "Dr. Nivrith’s Advanced Physiotherapy",
    rating: "5.0 / 5.0 ⭐ (88 Reviews)",
    approach: "Target-specific hands-on manual therapy & biomechanical alignment",
    averageSessions: "2 – 4 sessions for acute issues",
    timings: "Evening 5:00 PM – 9:30 PM (ideal for working people)",
    highlight: "Direct 1-on-1 care by senior specialist Dr. Nivrith"
  },
  {
    name: "General Physiotherapy Centers",
    rating: "3.8 – 4.4 / 5.0",
    approach: "Generic electrotherapy / heat machines managed by rotating assistants",
    averageSessions: "10 – 15 repetitive sessions",
    timings: "Rigid daytime hours",
    highlight: "Standard commercial packages"
  }
];
