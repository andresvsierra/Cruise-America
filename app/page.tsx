"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { database, ref, set, push } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FaCheckCircle, 
  FaMobileAlt, 
  FaUnlock, 
  FaBolt, 
  FaDollarSign, 
  FaSyncAlt, 
  FaSmile, 
  FaBullseye, 
  FaShieldAlt, 
  FaRocket,
  FaMapMarkerAlt,
  FaBell,
  FaMapMarked,
  FaCar,
  FaExclamationTriangle,
  FaBatteryFull,
  FaLock,
  FaDesktop,
  FaRobot,
  FaCloud,
  FaChartBar
} from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

const carouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H3oregon-MXOExb3dMEb2B8ronWGWUl3scdp8WW.jpg",
    alt: "H3 Oregon hexagonal grid map showing spatial data analysis"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hexagons-s-NPnyMjkdqqoZveJbqdMsBIQT2Kgew6.png",
    alt: "3D hexagonal visualization of fleet activity density"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comute-fwGXXd7BWgoCekigODbeTiqCxFkvdl.jpg",
    alt: "Movement patterns and trip analysis network visualization"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/points-s-NDyIL5ZmLbxh7zISt41k9bWCHXlMHT.png",
    alt: "Geographic point data showing vehicle distribution"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H3Global-FXUTi0oXzmFSu3f3388Gmx0T6yL1gi.jpg",
    alt: "Global H3 hexagonal grid showing North America coverage"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heatmap-s-wnFJkgRs0tdSoUvQiMJSfPxWggnFCC.png",
    alt: "Heatmap showing utilization density and high-traffic zones"
  }
]

const technicalFoundationImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.31.49%E2%80%AFPM-cl8QtmN5RA7XCRWRj6M35azAu3mL9V.png",
    alt: "Rental Buddy integrations configuration page with booking system settings"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.29.39%E2%80%AFPM-DftjNSzYbdETF5OPYeDLcaAf5hphXN.png",
    alt: "Fleet tracking map view showing active vehicles across North America"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.30.17%E2%80%AFPM-Pt75wjlxhVtL08DaRD89THPfg7SJTC.png",
    alt: "Vehicle information dashboard showing fuel level, odometer, and battery status"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.33.36%E2%80%AFPM-irAzi8RsdwHIJUzLmAOQk5JmoZUSTQ.png",
    alt: "Vehicles management page with lock control functionality"
  }
]

const pickupCarouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.31.49%E2%80%AFPM-cl8QtmN5RA7XCRWRj6M35azAu3mL9V.png",
    alt: "Rental Buddy integrations configuration page with booking system settings"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.29.39%E2%80%AFPM-DftjNSzYbdETF5OPYeDLcaAf5hphXN.png",
    alt: "Fleet tracking map view showing active vehicles across North America"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.30.17%E2%80%AFPM-Pt75wjlxhVtL08DaRD89THPfg7SJTC.png",
    alt: "Vehicle information dashboard showing fuel level, odometer, and battery status"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%204.33.36%E2%80%AFPM-irAzi8RsdwHIJUzLmAOQk5JmoZUSTQ.png",
    alt: "Vehicles management page with lock control functionality"
  }
]

const pickupJourneyImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.03.32%E2%80%AFPM-N8wgrCFBOkL2GST91myPxDEgIb1vJD.png",
    alt: "Welcome screen - Reservation confirmation"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.04.03%E2%80%AFPM-ScoOgAyOqDxM8VyChz4EZBhDLOFKQd.png",
    alt: "ID Verification - Driver license photo capture"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.06.44%E2%80%AFPM-34ZsGoPFBB6dZtoPEPPxlTo8mH2Tik.png",
    alt: "Insurance - Coverage options selection"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.09.00%E2%80%AFPM-ywoeh6nM54QsTApBrp84unQAgIqZoB.png",
    alt: "Vehicle Access - Key box code display"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.07.29%E2%80%AFPM-mDqaGeiytTuUw2amgIahaDGJsy3Mbv.png",
    alt: "Contract Signature - Digital signature capture"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.11.01%E2%80%AFPM-TBGaxBfhCCTQAEBNuDGFUYpwL5TxVv.png",
    alt: "Success - Vehicle unlocked confirmation"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-26%20at%205.07.47%E2%80%AFPM-usr6DOroXSHc6hop3o28eusxIK9AL2.png",
    alt: "Onboarding Video - Instructional content"
  }
]

const slides = [
  {
    id: "agenda",
    title: "Agenda",
    tabLine1: "Agenda",
    tabLine2: "",
  },
  {
    id: "overview",
    title: "360 Sierra",
    tabLine1: "360 Sierra",
    tabLine2: "",
  },
  {
    id: "product-overview",
    title: "Rental Buddy",
    tabLine1: "Rental Buddy",
    tabLine2: "",
    hasSubTabs: true,
  },
  {
    id: "why-together",
    title: "Demo",
    tabLine1: "Demo",
    tabLine2: "",
  },
  {
    id: "implementation",
    title: "Implementation",
    tabLine1: "Implementation",
    tabLine2: "",
  },
  {
    id: "next-steps",
    title: "Next Steps",
    tabLine1: "Next Steps",
    tabLine2: "",
  },
]

const productSubTabs = [
  {
    id: "rental-buddy-overview",
    title: "Overview",
    tabLine1: "Overview",
  },
  {
    id: "track-kit",
    title: "Trackit",
    tabLine1: "Trackit",
  },
  {
    id: "flexible-pickup",
    title: "Pick-Up & Drop-Off",
    tabLine1: "Pick-Up & Drop-Off",
  },
  {
    id: "master-operator",
    title: "Shakkii",
    tabLine1: "Shakkii",
  },
]

const heroHeading =
  "text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-balance leading-tight tracking-tight"
const sectionHeading =
  "text-2xl sm:text-3xl font-semibold text-primary text-balance leading-tight tracking-tight"
const sectionSubtitle =
  "text-base sm:text-lg text-muted-foreground leading-relaxed"
const bodyText = "text-base sm:text-lg text-muted-foreground leading-relaxed"

// Placeholder for WorkshopChecklist component
const WorkshopChecklist = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    companyOverview: { label: "Company Overview", checked: false },
    productDemo: { label: "Product Demo", checked: false },
    useCases: { label: "Use Cases", checked: false },
    qAndA: { label: "Q&A Session", checked: false },
    nextSteps: { label: "Next Steps Discussion", checked: false },
    feedback: { label: "Collect Feedback", checked: false },
  });

  const toggleSection = (section: keyof typeof checklist) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleCheck = (section: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [section]: { ...prev[section], checked: !prev[section].checked },
    }));
  };

  const handleEmail = () => {
    const subject = "Workshop Checklist Summary";
    let body = "Here is a summary of the workshop checklist:\n\n";
    Object.entries(checklist).forEach(([key, value]) => {
      body += `- ${value.label}: ${value.checked ? '✅' : '⬜'}\n`;
    });
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    null
  );
};

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentSubTab, setCurrentSubTab] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [companyName, setCompanyName] = useState('')
  const [presentationDate, setPresentationDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [techFoundationIndex, setTechFoundationIndex] = useState(0)
  const [pickupCarouselIndex, setPickupCarouselIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSource, setLightboxSource] = useState<'spatial' | 'technical' | 'pickup' | 'pickupJourney' | 'seeItInAction'>('spatial')
  
  // Auto-play carousel every 4 seconds
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(autoPlayInterval)
  }, [])
  
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setTechFoundationIndex((prev) => (prev + 1) % technicalFoundationImages.length)
    }, 4000)

    return () => clearInterval(autoPlayInterval)
  }, [])
  
  const [trackingOptionsOpen, setTrackingOptionsOpen] = useState(false)
  const [pickupDropoffOpen, setPickupDropoffOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [trackingEssentials, setTrackingEssentials] = useState({
    gpsLocation: true,
    alerts: true,
    geofencing: true,
    crashEvents: true,
    dtcCodes: true,
    batteryAlerts: true,
    twelveMonthHistory: true, // Set to true by default
  })
  const [aiDataIntelligence, setAiDataIntelligence] = useState({
    lateMissedReturnPrediction: false, // New field
    geofenceEntryIntentPrediction: false, // New field
    routeDestinationInsights: false, // New field
    drivingBehaviorTripQuality: false, // New field
    // spatialDataVisualization: false, // Removed
    // heatmapsUtilization: false, // Removed
    // movementPatterns: false, // Removed
    // fleetActivityTrends: false, // Removed
    // operationalPerformance: false, // Removed
    // predictiveAlerts: false, // Removed
  })
  const [pickupDropoffOptions, setPickupDropoffOptions] = useState({
    login: false,
    welcomeScreen: false,
    idVerification: false,
    agreementSignature: false,
    insuranceOptions: false,
    addOns: false,
    videoDisplay: false,
    vehicleLocation: false,
    preTripPhotos: false,
    codeDisplay: false,
    openScreen: false,
    goodTripScreen: false,
    checklistReminder: false,
    postTripPhotos: false,
    keyPhoto: false,
    lockScreen: false,
    dropOffForm: false,
    feedbackForm: false,
    googleReview: false,
  })
  const [estimatedValue, setEstimatedValue] = useState(2500)

  const nextCarouselImage = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevCarouselImage = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }
  
  const nextTechFoundationImage = () => {
    setTechFoundationIndex((prev) => (prev + 1) % technicalFoundationImages.length)
  }

  const prevTechFoundationImage = () => {
    setTechFoundationIndex((prev) => (prev - 1 + technicalFoundationImages.length) % technicalFoundationImages.length)
  }
  
  const nextPickupImage = () => {
    setPickupCarouselIndex((prev) => (prev + 1) % pickupCarouselImages.length)
  }

  const prevPickupImage = () => {
    setPickupCarouselIndex((prev) => (prev - 1 + pickupCarouselImages.length) % pickupCarouselImages.length)
  }

  const [pickupJourneyIndex, setPickupJourneyIndex] = useState(0)

  // CHANGE: Added new carousel index state and navigation functions for see it in action section
  const [seeItInActionIndex, setSeeItInActionIndex] = useState(0)

  const nextSeeItInActionImage = () => {
    setSeeItInActionIndex((prev) => (prev + 1) % pickupJourneyImages.length)
  }

  const prevSeeItInActionImage = () => {
    setSeeItInActionIndex((prev) => (prev - 1 + pickupJourneyImages.length) % pickupJourneyImages.length)
  }

  const nextPickupJourneyImage = () => {
    setPickupJourneyIndex((prev) => (prev + 1) % pickupJourneyImages.length)
  }

  const prevPickupJourneyImage = () => {
    setPickupJourneyIndex((prev) => (prev - 1 + pickupJourneyImages.length) % pickupJourneyImages.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    const handleLightboxKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        if (lightboxSource === 'spatial') {
        nextCarouselImage()
        } else if (lightboxSource === 'technical') {
          nextTechFoundationImage()
        } else if (lightboxSource === 'pickup') {
          nextPickupImage()
        } else if (lightboxSource === 'seeItInAction') {
          nextSeeItInActionImage()
        } else { // lightboxSource === 'pickupJourney'
          nextPickupJourneyImage()
        }
      } else if (e.key === 'ArrowLeft') {
        if (lightboxSource === 'spatial') {
        prevCarouselImage()
        } else if (lightboxSource === 'technical') {
          prevTechFoundationImage()
        } else if (lightboxSource === 'pickup') {
          prevPickupImage()
        } else if (lightboxSource === 'seeItInAction') {
          prevSeeItInActionImage()
        } else { // lightboxSource === 'pickupJourney'
          prevPickupJourneyImage()
        }
      }
    }

    window.addEventListener('keydown', handleLightboxKeyDown)
    return () => window.removeEventListener('keydown', handleLightboxKeyDown)
  }, [lightboxOpen, carouselIndex, techFoundationIndex, pickupCarouselIndex, pickupJourneyIndex, seeItInActionIndex, lightboxSource])
  

  const handleStartPresentation = async () => {
    if (!companyName.trim()) {
      alert('Please enter a company name')
      return
    }

    try {
      // Create new session in Firebase
      const sessionsRef = ref(database, 'sessions')
      const newSessionRef = push(sessionsRef)
      const newSessionId = newSessionRef.key

      await set(newSessionRef, {
        companyName: companyName.trim(),
        presentationDate,
        createdAt: new Date().toISOString(),
        trackingEssentials,
        aiDataIntelligence,
        pickupDropoffOptions,
      })

      console.log('[v0] Session created:', newSessionId)
      setSessionId(newSessionId)
      setShowWelcome(false)
    } catch (error) {
      console.error('[v0] Error creating session:', error)
      alert('Error starting presentation. Please try again.')
    }
  }

  const saveSelectionsToFirebase = async (selectionType: string, data: any) => {
    if (!sessionId) {
      console.error('[v0] No session ID available')
      return
    }

    try {
      const sessionRef = ref(database, `sessions/${sessionId}`)
      await set(sessionRef, {
        companyName,
        presentationDate,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        [selectionType]: data,
      })
      console.log(`[v0] Saved ${selectionType} to Firebase`)
    } catch (error) {
      console.error(`[v0] Error saving ${selectionType}:`, error)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (slides[index].id !== "product-overview") {
      setCurrentSubTab(0)
    }
  }

  const nextSlide = () => {
    if (currentSlide === 2 && currentSubTab < productSubTabs.length - 1) {
      setCurrentSubTab(currentSubTab + 1)
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setCurrentSubTab(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide === 2 && currentSubTab > 0) {
      setCurrentSubTab(currentSubTab - 1)
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setCurrentSubTab(0)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showWelcome) return
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, currentSubTab, showWelcome])

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-2xl w-full mx-auto p-8">
          <div className="bg-card rounded-2xl shadow-2xl p-12 border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold mb-4 text-primary">
                Welcome to Rental Buddy
              </h1>
              <p className="text-lg text-muted-foreground">
                Let's start your presentation
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="companyName" className="text-base font-medium text-foreground mb-2 block">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="text-base p-4 border-2 focus:border-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleStartPresentation()
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="presentationDate" className="text-base font-medium text-foreground mb-2 block">
                  Presentation Date
                </Label>
                <Input
                  id="presentationDate"
                  type="date"
                  value={presentationDate}
                  onChange={(e) => setPresentationDate(e.target.value)}
                  className="text-base p-4 border-2 focus:border-primary"
                />
              </div>

              <Button
                onClick={handleStartPresentation}
                className="w-full py-4 text-lg font-medium bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Presentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="w-full">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-3 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <div className="flex items-center gap-2">
              <img src="/icon-light-32x32.png" alt="Rental Buddy" className="h-8 w-8 rounded-full object-cover hidden sm:block" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Rental Buddy</p>
                <p className="text-sm font-semibold text-foreground">Operator Workspace</p>
              </div>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              onClick={() => setShowWelcome(true)}
            >
              Restart
            </button>
          </div>
          <div className="w-full overflow-hidden">
            <nav className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto px-4 sm:px-6 py-3 scrollbar-hide min-h-[54px]">
              {slides.map((slide, index) => {
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`
                      relative text-xs sm:text-sm md:text-base font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap
                      px-3 py-1.5 rounded-full border
                      ${
                        currentSlide === index
                          ? "text-primary border-primary bg-primary/10"
                          : "text-muted-foreground border-transparent hover:text-primary hover:bg-primary/5"
                      }
                    `}
                  >
                    {slide.tabLine1}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-4 sm:px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto h-full">
          
          {currentSlide === 2 && (
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                {productSubTabs.map((subTab, index) => {
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setCurrentSubTab(index)}
                      className={`
                        relative px-4 md:px-6 py-2 text-sm md:text-base font-medium transition-all duration-200 rounded-full
                        ${
                          currentSubTab === index
                            ? "text-white bg-primary font-semibold shadow-md"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10 bg-card border border-border"
                        }
                      `}
                    >
                      {subTab.tabLine1}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="relative">
            <div className="bg-card rounded-xl md:rounded-2xl border border-gray-200 p-6 sm:p-10 md:p-16 min-h-[400px] md:min-h-[550px] flex flex-col justify-center shadow-lg animate-in fade-in duration-500">
              {currentSlide === 0 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${sectionHeading} mb-6 md:mb-10 text-left`}>
                    Agenda
                  </h2>
                  <div className="space-y-4 md:space-y-5 text-foreground leading-relaxed">
                    {[
                      'Introductions',
                      'Our Company & Vision',
                      'Product Overview',
                      'Why It Works Better Together — Full Demo',
                      'Implementation Plan',
                      'Next Steps'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 md:gap-4">
                        <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs md:text-sm font-medium">
                          {idx + 1}
                        </span>
                        <p className="pt-0.5 md:pt-1 text-sm md:text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${heroHeading} mb-6 md:mb-10`}>
                    360 Sierra — Our Vision
                  </h2>
                  <div className="space-y-5 sm:space-y-8 text-foreground leading-relaxed max-w-5xl mx-auto">
                    <p className="text-base sm:text-xl font-bold text-primary border-l-4 border-primary pl-3 md:pl-4 py-2">
                      Built by operators, for operators.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-sm sm:text-base md:text-lg">
                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">Who We Are</h3>
                        <p className="text-foreground leading-relaxed">
                          <span className="font-semibold">360 Sierra</span> is a{" "}
                          <span className="font-bold text-primary">U.S.-based startup</span> created by a team with{" "}
                          <span className="font-bold text-primary">over 20 years of experience</span> in software and hardware development.
                        </p>
                      </div>

                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">The Problem We Saw</h3>
                        <p className="text-foreground leading-relaxed">
                          After running our own <span className="font-bold text-primary">RV rental business</span>, we saw how hard it is to manage operations across{" "}
                          <span className="font-bold">fragmented tools and disconnected systems</span>.
                        </p>
                      </div>

                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">Our Solution</h3>
                        <p className="text-foreground leading-relaxed">
                          That experience led us to build <span className="font-bold text-primary">Rental Buddy</span>, a platform that combines{" "}
                          <span className="font-bold">AI</span> and{" "}
                          <span className="font-bold">IoT</span> to connect data, simplify operations, and automate workflows.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-secondary border-l-4 border-primary p-4 sm:p-6 rounded-lg shadow-sm">
                      <p className="text-base sm:text-xl font-semibold text-foreground italic">
                        {"Your company will benefit from using its data with AI to make faster decisions and manage operations with greater clarity and control."}
                      </p>
                    </div>

                    <div className="bg-secondary p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-md mt-6 md:mt-8">
                      <p className="font-bold text-foreground mb-4 md:mb-6 text-lg sm:text-2xl text-center">Our AI-Ready Platform | Beyond SaaS</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Trackit
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Turn tracking data into clear fleet decisions
                          </p>
                          <div className="mt-3 pt-3 border-t border-border flex items-center justify-center">
                            <img 
                              src="/images/design-mode/uber-logo.png" 
                              alt="Uber" 
                              className="h-6 sm:h-8 object-contain opacity-80"
                            />
                          </div>
                        </div>

                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Flexible Pick-Up & Drop-Off
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Make renting a vehicle as easy as renting a Zipcar.
                          </p>
                          <div className="mt-3 pt-3 border-t border-border flex items-center justify-center">
                            <img 
                              src="/images/design-mode/zip-cardownload.jpeg" 
                              alt="Lime" 
                              className="h-8 sm:h-10 object-contain"
                            />
                          </div>
                        </div>

                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Master Operator
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Simplify daily operations with structure and clarity.
                          </p>
                          <div className="mt-3 pt-3 border-t border-border flex items-center justify-center">
                            <img 
                              src="/images/design-mode/toyota-2-logo.png" 
                              alt="Toyota" 
                              className="h-7 sm:h-9 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CHANGE: Added What You Unlock section to 360 Sierra page */}
                    <div className="mt-10 md:mt-16">
                      <h3 className={`${sectionHeading} text-center mb-5 md:mb-8`}>
                        What You Unlock
                      </h3>
                      
                      <div className="space-y-3 sm:space-y-4 mb-8 md:mb-12">
                        {[
                          { value: '+40%', label: 'Efficiency' },
                          { value: '+60%', label: 'Consistency' },
                          { value: '2x', label: 'Scalability' },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between gap-4 bg-card rounded-full px-4 py-3 border border-border shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                      </div>
                              <span className="text-xl sm:text-3xl font-bold text-foreground">{item.value}</span>
                      </div>
                            <span className="text-base sm:text-2xl font-semibold text-foreground">{item.label}</span>
                      </div>
                        ))}
                    </div>
                    
                      <div className="bg-secondary p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl border border-border shadow-lg">
                        <h3 className={`${sectionHeading} text-center mb-4 md:mb-6`}>
                          A Single Source of Truth
                        </h3>
                        <p className="text-base sm:text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-foreground">
                          for Your Vehicle Rental Operations
                        </p>
                        <p className="text-base sm:text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8 text-muted-foreground">
                          Our AI-Ready Platform | Beyond SaaS
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 items-center justify-items-center">
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                            <img 
                              src="/images/design-mode/rcm-logo.png" 
                              alt="RCM" 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                            <img 
                              src="/images/design-mode/wheelbase-logo.webp" 
                            alt="Wheelbase" 
                              className="max-w-full max-h-full object-contain"
                          />
                          </div>
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                          <img 
                              src="/images/design-mode/slack-logo.png" 
                            alt="Slack" 
                              className="max-w-full max-h-full object-contain"
                          />
                          </div>
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                          <img 
                              src="/images/design-mode/whatsapp-logo.jpeg" 
                            alt="WhatsApp" 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                            <img 
                              src="/images/design-mode/google-drive-logo.png" 
                              alt="Google Drive" 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center w-full h-16 sm:h-20 md:h-24">
                            <img 
                              src="/images/design-mode/n8n-badge.png" 
                              alt="N8n" 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 2 && (
                <>
                  {currentSubTab === 0 && (
                    <div className="animate-in fade-in slide-in-from-right duration-500">
                      <div className="text-center mb-8 md:mb-14">
                        <img 
                          src="/images/design-mode/rentalbuddy-transparent.png" 
                          alt="Rental Buddy" 
                          className="h-14 sm:h-24 md:h-28 mx-auto object-contain mb-4 md:mb-8 drop-shadow-2xl"
                        />
                        <h2 className={`${heroHeading} mb-5 md:mb-10`}>
                          How Rental Buddy Fits into Your Workflow
                        </h2>
                      </div>
                      
                      <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto">
                        <div className="bg-secondary p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl border border-border shadow-md">
                          <h3 className="text-xl sm:text-3xl font-bold mb-4 md:mb-6 text-center text-primary leading-tight">
                            The Complete Rental Journey
                          </h3>
                          <div className="relative">
                            <div className="absolute top-4 sm:top-8 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-teal-300 via-green-300 to-green-400"></div>
                            
                            <div className="relative flex items-start justify-between gap-3 sm:gap-2 overflow-x-auto pb-4">
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-card border-2 sm:border-4 border-border flex items-center justify-center text-muted-foreground text-lg sm:text-2xl font-bold shadow-lg">
                                  1
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">Booking</div>
                                <div className="text-xs sm:text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-lg border border-border inline-block">RCM</div>
                              </div>
                              
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold shadow-lg shadow-primary">
                                  2
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">Check-In</div>
                                <div className="text-xs sm:text-sm text-primary-foreground bg-primary px-2 py-1 rounded-lg border border-primary inline-block font-semibold">Rental Buddy</div>
                              </div>
                              
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold shadow-lg shadow-primary">
                                  3
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">Pick-Up</div>
                                <div className="text-xs sm:text-sm text-primary-foreground bg-primary px-2 py-1 rounded-lg border border-primary inline-block font-semibold">Rental Buddy</div>
                              </div>
                              
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold shadow-lg shadow-primary">
                                  4
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">On Trip</div>
                                <div className="text-xs sm:text-sm text-primary-foreground bg-primary px-2 py-1 rounded-lg border border-primary inline-block font-semibold">Trackit</div>
                              </div>
                              
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold shadow-lg shadow-primary">
                                  5
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">Drop-Off</div>
                                <div className="text-xs sm:text-sm text-primary-foreground bg-primary px-2 py-1 rounded-lg border border-primary inline-block font-semibold">Rental Buddy</div>
                              </div>
                              
                              <div className="flex-1 min-w-[80px] text-center px-1">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold shadow-lg shadow-primary">
                                  6
                                </div>
                                <div className="font-bold text-foreground text-sm sm:text-lg mb-1 md:mb-2">Post-Trip</div>
                                <div className="text-xs sm:text-sm text-primary-foreground bg-primary px-2 py-1 rounded-lg border border-primary inline-block font-semibold">Shakkii</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-base md:text-lg leading-relaxed">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm flex flex-col">
                            <div className="flex items-start gap-3 md:gap-4 flex-1">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></span>
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg sm:text-xl mb-2 md:mb-3 min-h-[3rem] flex items-center">We don't replace RCM</h4>
                                <p className="text-muted-foreground min-h-[5rem]">
                                  We add an <span className="font-bold text-primary">AI layer</span> that <span className="font-bold">connects to RCM</span> — <span className="font-bold">automating</span> and <span className="font-bold">linking every step</span> from booking to return.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm flex flex-col">
                            <div className="flex items-start gap-3 md:gap-4 flex-1">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></span>
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg sm:text-xl mb-2 md:mb-3 min-h-[3rem] flex items-center">Not a traditional SaaS</h4>
                                <p className="text-muted-foreground min-h-[5rem]">
                                  Built around <span className="font-bold text-primary">AI agents</span> that <span className="font-bold">collaborate</span> across the <span className="font-bold">entire rental process</span> and <span className="font-bold">daily operations</span>.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm flex flex-col">
                            <div className="flex items-start gap-3 md:gap-4 flex-1">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></span>
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg sm:text-xl mb-2 md:mb-3 min-h-[3rem] flex items-center">Powered by data</h4>
                                <p className="text-muted-foreground min-h-[5rem]">
                                  Our system <span className="font-bold">connects</span> <span className="font-bold text-primary">RCM, tracking devices, operations, and user data</span> to <span className="font-bold">reveal patterns</span> and <span className="font-bold">improve decisions</span>.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm flex flex-col">
                            <div className="flex items-start gap-3 md:gap-4 flex-1">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></span>
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg sm:text-xl mb-2 md:mb-3 min-h-[3rem] flex items-center">One connected flow</h4>
                                <p className="text-muted-foreground min-h-[5rem]">
                                  <span className="font-bold">RCM stays your core</span> — Rental Buddy <span className="font-bold text-primary">unifies all operations</span> into a <span className="font-bold text-primary">single source of truth</span>.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CHANGE: Added the "What You Unlock" section */}
                        
                      </div>
                    </div>
                  )}

                  {currentSubTab === 1 && (
                    <div className="animate-in fade-in slide-in-from-right duration-500">
                      <div className="space-y-6 md:space-y-10">
                        <div className="text-center">
                          <h2 className={`${heroHeading} mb-4 md:mb-6`}>
                            Rental Buddy Trackit
                          </h2>
                          <p className={`${sectionSubtitle} italic text-center`}>Beyond Location Tracking</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-lg">
                            <h3 className="text-lg sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">The Problem</h3>
                            <p className="text-base sm:text-lg leading-relaxed text-foreground">
                              Most tracking systems <span className="font-bold text-muted-foreground">stop at location</span>. 
                              They show <span className="font-bold">where vehicles are</span>, 
                              not <span className="font-bold text-primary">what that data means</span>.
                            </p>
                          </div>
                          
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-lg">
                            <h3 className="text-lg sm:text-2xl font-bold mb-3 md:mb-4 text-primary">The Trackit Solution</h3>
                            <p className="text-base sm:text-lg leading-relaxed text-foreground">
                              We turn <span className="font-bold text-primary">every trip and signal</span> into 
                              <span className="font-bold"> insights</span> that reveal{" "}
                              <span className="font-bold text-primary">behavior, demand, and utilization</span> — 
                              helping you plan with <span className="font-bold">precision</span>.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md flex flex-col h-full">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">Trackit Intro Video (1 min)</h3>
                            
                            <div className="flex-1 bg-black rounded-lg md:rounded-xl overflow-hidden border border-border min-h-[200px] sm:min-h-[300px]">
                              <iframe
                                className="w-full h-full min-h-[200px] sm:min-h-[300px]"
                                src="https://www.youtube.com/embed/VhhSSdp1tyo"
                                title="Rental Buddy Trackit Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                            <div className="mt-3 md:mt-4 pt-3 border-t border-border bg-secondary rounded-lg p-3">
                              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1 md:mb-2 text-center">Hardware Partner</p>
                              <img 
                                src="/images/design-mode/teltonika-download.png" 
                                alt="Teltonika" 
                                className="h-6 sm:h-8 mx-auto object-contain"
                              />
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5 text-foreground">What Makes It Different</h3>
                            <div className="space-y-4">
                              <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3 mb-2">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                                    1
                                  </span>
                                  <h4 className="text-base sm:text-lg font-bold text-foreground leading-tight">Delay & No-Return Detection</h4>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed ml-9">
                                  Catch late or missed returns before they happen.
                                </p>
                              </div>

                              <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3 mb-2">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                                    2
                                  </span>
                                  <h4 className="text-base sm:text-lg font-bold text-foreground leading-tight">Geofence Intention Alerts</h4>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed ml-9">
                                  Know when a renter is heading toward a restricted area.
                                </p>
                              </div>

                              <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3 mb-2">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                                    3
                                  </span>
                                  <h4 className="text-base sm:text-lg font-bold text-foreground leading-tight">Customer Journey Insights</h4>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed ml-9">
                                  See where your renters go and understand travel patterns in real time.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CHANGE: Centered Spatial Operational Data section to remove white space */}
                        <div className="max-w-3xl mx-auto">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">{"Spatial Operational Data\n"}</h3>
                            <div 
                              className="relative aspect-video bg-secondary rounded-lg md:rounded-xl overflow-hidden border border-border group cursor-pointer"
                              onClick={() => {
                                setLightboxSource('spatial')
                                setLightboxOpen(true)
                              }}
                            >
                              <img 
                                src={carouselImages[carouselIndex].src || "/placeholder.svg"}
                                alt={carouselImages[carouselIndex].alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              
                              {/* Zoom icon indicator */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-3 shadow-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                  </svg>
                                </div>
                              </div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  prevCarouselImage()
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                              >
                                <ChevronLeft />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextCarouselImage()
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                              >
                                <ChevronRight />
                              </button>

                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {carouselImages.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCarouselIndex(idx)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                      idx === carouselIndex 
                                        ? 'bg-white w-6' 
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>

                              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                {carouselIndex + 1} / {carouselImages.length}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-lg">
                          <button
                            onClick={() => setTrackingOptionsOpen(!trackingOptionsOpen)}
                            className="w-full px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                          >
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Trackit Options</h3>
                            <svg
                              className={`w-5 h-5 sm:w-6 sm:h-6 text-primary transform transition-transform duration-300 ${
                                trackingOptionsOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          <div
                            className={`transition-all duration-300 ease-in-out ${
                              trackingOptionsOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            } overflow-hidden`}
                          >
                            <div className="p-5 sm:p-8 space-y-6 md:space-y-8">
                              <div>
                                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
                                  Essentials
                                </h4>
                                <div className="space-y-2 md:space-y-3 ml-3 md:ml-4">
                                  {[
                                    { key: 'gpsLocation', label: 'GPS Location' },
                                    { key: 'alerts', label: 'Alerts' },
                                    { key: 'geofencing', label: 'Geofencing' },
                                    { key: 'crashEvents', label: 'Crash Events' },
                                    { key: 'dtcCodes', label: 'DTC Codes' },
                                    { key: 'batteryAlerts', label: 'Battery Alerts' },
                                    { key: 'twelveMonthHistory', label: '12-Month History' },
                                  ].map((item) => (
                                    <label
                                      key={item.key}
                                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors duration-150"
                                    >
                                      <span className="text-base sm:text-lg text-foreground">{item.label}</span>
                                      <input
                                        type="checkbox"
                                        checked={trackingEssentials[item.key as keyof typeof trackingEssentials] || false}
                                        onChange={(e) =>
                                          setTrackingEssentials({
                                            ...trackingEssentials,
                                            [item.key]: e.target.checked,
                                          })
                                        }
                                        className="w-4 h-4 sm:w-5 sm:h-5 rounded focus:ring-2 focus:ring-primary accent-primary cursor-pointer"
                                      />
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
                                  AI & Intelligent Data
                                </h4>
                                <div className="space-y-2 md:space-y-3 ml-3 md:ml-4">
                                  {[
                                    { 
                                      key: 'lateMissedReturnPrediction', 
                                      label: 'Late & Missed Return Prediction',
                                      tooltip: 'Detect potential delays or missed drop-offs before they happen.'
                                    },
                                    { 
                                      key: 'geofenceEntryIntentPrediction', 
                                      label: 'Geofence Entry & Intent Prediction',
                                      tooltip: 'Predict renter intention to travel toward or enter a restricted (non-permitted) area.' // Updated description
                                    },
                                    { 
                                      key: 'routeDestinationInsights', 
                                      label: 'Route & Destination Insights',
                                      tooltip: 'Identify where renters actually travel and discover high-demand zones.'
                                    },
                                    { 
                                      key: 'drivingBehaviorTripQuality', 
                                      label: 'Driving Behavior & Trip Quality',
                                      tooltip: 'Detect patterns like overspeeding, harsh braking, or detours to assess trip quality and safety.'
                                    },
                                  ].map((item) => (
                                    <label
                                      key={item.key}
                                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors duration-150 group"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-base sm:text-lg text-foreground">{item.label}</span>
                                        <div className="relative inline-block">
                                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs font-bold cursor-help peer">
                                            ?
                                          </div>
                                          <div className="invisible peer-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-10">
                                            {item.tooltip}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                          </div>
                                        </div>
                                      </div>
                                      <input
                                        type="checkbox"
                                        checked={aiDataIntelligence[item.key as keyof typeof aiDataIntelligence] || false}
                                        onChange={(e) =>
                                          setAiDataIntelligence({
                                            ...aiDataIntelligence,
                                            [item.key]: e.target.checked,
                                          })
                                        }
                                        className="w-4 h-4 sm:w-5 sm:h-5 rounded focus:ring-2 focus:ring-primary accent-primary cursor-pointer"
                                      />
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                {/* CHANGE: Updated section title and replaced questions */}
                                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
                                  Tell us a bit more about your needs
                                </h4>
                                <div className="ml-3 md:ml-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                      What kind of information or data would help you make better or faster decisions?
                                    </label>
                                    <textarea
                                      rows={2}
                                      className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200 text-base text-foreground placeholder:text-muted-foreground resize-none"
                                      placeholder="Your answer..."
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                      Are there any specific events, behaviors, or renter patterns you wish the system could predict?
                                    </label>
                                    <textarea
                                      rows={2}
                                      className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200 text-base text-foreground placeholder:text-muted-foreground resize-none"
                                      placeholder="Your answer..."
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                      Any additional comments or ideas?
                                    </label>
                                    <textarea
                                      rows={2}
                                      className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200 text-base text-foreground placeholder:text-muted-foreground resize-none"
                                      placeholder="Your answer..."
                                    />
                                  </div>
                                </div>
                              </div>
                                  
                              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                                <div className="bg-card p-4 sm:p-6 rounded-lg md:rounded-xl shadow-lg border-2 border-primary">
                                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <span className="text-xl sm:text-2xl font-bold text-foreground">PRICE:</span>
                                    <span className="text-3xl sm:text-4xl font-black text-primary">USD $10</span>
                                    <span className="text-base sm:text-xl font-semibold text-foreground">per vehicle per month</span>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-6 flex justify-center">
                                  <button
                                    onClick={async () => {
                                      await saveSelectionsToFirebase('trackitSelections', {
                                        trackingEssentials,
                                        aiDataIntelligence,
                                        savedAt: new Date().toISOString(),
                                      })
                                      alert('Your Trackit selections have been saved!')
                                    }}
                                    className="px-6 sm:px-8 py-2 sm:py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                  >
                                    Save Selection
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSubTab === 2 && (
                    <div className="animate-in fade-in slide-in-from-right duration-500">
                      <div className="space-y-5 sm:space-y-8">
                        <div className="text-center">
                          <h2 className={`${heroHeading} mb-2 md:mb-3`}>
                            Rental Buddy Flexible Pick-Up & Drop-Off
                          </h2>
                          <p className={`${sectionSubtitle} text-center`}>
                            Built for how renters move — digital, flexible, and on their own time
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Replaced static demo placeholder with carousel using the 7 new images */}
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-md">
                            <h3 className="text-lg sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">See It in Action</h3>
                            {/* CHANGE: Reduced container size from aspect-[9/16] to max-w-xs and added centering */}
                            <div 
                              className="relative max-w-xs mx-auto bg-secondary rounded-lg md:rounded-xl overflow-hidden border border-border group cursor-pointer"
                              onClick={() => {
                                setLightboxSource('seeItInAction')
                                setLightboxOpen(true)
                              }}
                            >
                              <img 
                                src={pickupJourneyImages[seeItInActionIndex].src || "/placeholder.svg"}
                                alt={pickupJourneyImages[seeItInActionIndex].alt}
                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                              />
                              
                              {/* Zoom icon indicator */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-3 shadow-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                  </svg>
                                </div>
                              </div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  prevSeeItInActionImage()
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                              >
                                <ChevronLeft />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextSeeItInActionImage()
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                              >
                                <ChevronRight />
                              </button>

                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {pickupJourneyImages.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSeeItInActionIndex(idx)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                      idx === seeItInActionIndex 
                                        ? 'bg-white w-6' 
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>

                              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                {seeItInActionIndex + 1} / {pickupJourneyImages.length}
                              </div>
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl border border-border flex flex-col">
                            <h3 className="text-lg sm:text-2xl font-bold mb-3 md:mb-4 text-center text-primary">
                              Proven Impact
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                              {[
                                { value: '80–90%', label: 'faster renter flow' },
                                { value: '35–40%', label: 'shorter turnaround' },
                                { value: '5–15%', label: 'more revenue\n(after-hours & better insurance rates)' },
                                { value: '40–50%', label: 'fewer desk hours' },
                              ].map((metric, idx) => (
                                <div key={idx} className="relative bg-card p-3 sm:p-4 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow flex flex-col justify-center">
                                  <div className="text-2xl sm:text-3xl font-black mb-1 text-primary flex-shrink-0 min-h-[2.5rem] flex items-start">
                                    {metric.value}
                                  </div>
                                  <div className="text-xs sm:text-sm font-semibold text-muted-foreground">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CHANGE: Replaced carousel with single mosaic image */}
                        <div className="bg-card p-3 sm:p-4 rounded-xl md:rounded-2xl border border-border shadow-lg">
                          <h3 className="text-2xl sm:text-4xl font-bold mb-3 md:mb-4 text-primary text-center">Complete Digital Journey</h3>
                          <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-4 md:mb-5 text-center max-w-4xl mx-auto font-medium">
                            Transform every rental into a guided digital flow from verification to return. 
                            Renters move on their own time, not the branch's.
                          </p>
                          
                          <div className="mb-6 md:mb-8">
                            <img 
                              src="/images/design-mode/Product-mosaic2-1.png"
                              alt="Complete digital journey flow showing all screens from check-in to drop-off"
                              className="w-full h-auto rounded-lg md:rounded-xl border border-border shadow-lg"
                            />
                          </div>
                          
                          
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-2xl font-bold mb-3 md:mb-4 text-center text-primary">
                            Why It Matters
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                            {/* Operations Column */}
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border-2 border-primary/20 shadow-md">
                              <div className="flex items-center gap-2 mb-4 justify-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <FaBolt className="text-lg text-primary" />
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-primary">Operations</h4>
                              </div>
                              <div className="space-y-3">
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaMobileAlt className="text-lg text-primary flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Frictionless Check-In</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaUnlock className="text-lg text-primary flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">24/7 Access</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaBolt className="text-lg text-primary flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Faster Turnaround</span>
                                </div>
                              </div>
                            </div>

                            {/* Revenue Column */}
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border-2 border-accent/20 shadow-md">
                              <div className="flex items-center gap-2 mb-4 justify-center">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                  <FaDollarSign className="text-lg text-accent" />
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-accent">Revenue</h4>
                              </div>
                              <div className="space-y-3">
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaDollarSign className="text-lg text-accent flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Extra Revenue</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaBullseye className="text-lg text-accent flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Smart Upselling</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaSyncAlt className="text-lg text-accent flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Flexible Staffing</span>
                                </div>
                              </div>
                            </div>

                            {/* Customer & Risk Column */}
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border-2 border-green-500/20 shadow-md">
                              <div className="flex items-center gap-2 mb-4 justify-center">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                  <FaSmile className="text-lg text-green-600" />
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-green-600">Customer & Risk</h4>
                              </div>
                              <div className="space-y-3">
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaSmile className="text-lg text-green-600 flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">High Satisfaction</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaShieldAlt className="text-lg text-green-600 flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Risk Control</span>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border flex items-center gap-2">
                                  <FaRocket className="text-lg text-green-600 flex-shrink-0" />
                                  <span className="font-semibold text-foreground text-sm">Future-Ready</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-lg overflow-hidden mt-6 md:mt-8">
                        <button
                          onClick={() => setPickupDropoffOpen(!pickupDropoffOpen)}
                          className="w-full px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                        >
                          <h3 className="text-lg sm:text-2xl font-bold text-foreground">Pick-Up & Drop-Off Options</h3>
                          <svg
                            className={`w-5 h-5 sm:w-6 sm:h-6 text-primary transform transition-transform duration-300 ${
                              pickupDropoffOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            pickupDropoffOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-5 sm:p-8 space-y-4 md:space-y-6">
                            {[
                              {
                                title: 'Login & Welcome',
                                icon: '🔐',
                                items: [
                                  { key: 'login', label: 'Login with email or phone number' },
                                  { key: 'welcomeScreen', label: 'Welcome screen and rental information display' },
                                ]
                              },
                              {
                                title: 'Check-In',
                                icon: '✅',
                                items: [
                                  { key: 'idVerification', label: 'ID Verification' },
                                  { key: 'agreementSignature', label: 'Agreement Signature' },
                                  { key: 'insuranceOptions', label: 'Coverage / Insurance Options' },
                                  { key: 'addOns', label: 'Add-Ons Selection' },
                                ]
                              },
                              {
                                title: 'Pick-Up',
                                icon: '🚗',
                                items: [
                                  { key: 'videoDisplay', label: 'Video Display (how-to or vehicle overview)' },
                                  { key: 'vehicleLocation', label: 'Vehicle Location' },
                                  { key: 'preTripPhotos', label: 'Pre-Trip Photos' },
                                  { key: 'codeDisplay', label: 'Code Display or Lock / Unlock' },
                                  { key: 'openScreen', label: 'Open Screen' },
                                  { key: 'goodTripScreen', label: '"Good Trip" Screen' },
                                ]
                              },
                              {
                                title: 'Drop-Off',
                                icon: '🏁',
                                items: [
                                  { key: 'checklistReminder', label: 'Checklist Reminder' },
                                  { key: 'postTripPhotos', label: 'Post-Trip Photos' },
                                  { key: 'keyPhoto', label: 'Key Photo' },
                                  { key: 'lockScreen', label: 'Lock Screen' },
                                  { key: 'dropOffForm', label: 'Drop-Off Form' },
                                  { key: 'feedbackForm', label: 'Feedback Form' },
                                  { key: 'googleReview', label: 'Google Review' },
                                ]
                              },
                            ].map((group) => (
                              <div key={group.title} className="bg-secondary p-4 sm:p-6 rounded-lg border border-gray-200">
                                <h4 className="text-base sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
                                  <span className="text-xl sm:text-2xl">{group.icon}</span>
                                  {group.title}
                                </h4>
                                <div className="space-y-2 md:space-y-3">
                                  {group.items.map((item) => (
                                    <label
                                      key={item.key}
                                      className="flex items-center justify-between p-2 sm:p-3 bg-card rounded-lg hover:bg-secondary cursor-pointer transition-colors duration-150 border border-gray-200"
                                    >
                                      <span className="text-sm sm:text-base font-medium text-foreground">{item.label}</span>
                                      <input
                                        type="checkbox"
                                        checked={pickupDropoffOptions[item.key as keyof typeof pickupDropoffOptions]}
                                        onChange={(e) =>
                                          setPickupDropoffOptions({
                                            ...pickupDropoffOptions,
                                            [item.key]: e.target.checked,
                                          })
                                        }
                                        className="w-4 h-4 sm:w-5 sm:h-5 rounded focus:ring-2 focus:ring-primary accent-primary cursor-pointer"
                                      />
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}

                            <div className="pt-3 md:pt-4 flex justify-center">
                              <button
                                onClick={async () => {
                                  await saveSelectionsToFirebase('pickupDropoffSelections', {
                                    options: pickupDropoffOptions,
                                    savedAt: new Date().toISOString(),
                                  })
                                  alert('Your selections have been saved!')
                                }}
                                className="px-7 sm:px-10 py-2 sm:py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base sm:text-lg rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                              >
                                Save Selections
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-lg overflow-hidden mt-6 md:mt-8">
                        <button
                          onClick={() => {
                            // const currentState = pickupDropoffOpen // This line seems unused, removing it.
                            setPricingOpen(!pricingOpen)
                          }}
                          className="w-full px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                        >
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground">Pricing</h3>
                          <svg
                            className={`w-5 h-5 sm:w-6 sm:h-6 text-primary transform transition-transform duration-300 ${
                              pricingOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            pricingOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-5 sm:p-8">
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse bg-card rounded-lg shadow-sm">
                                <thead>
                                  <tr className="bg-secondary border-b-2 border-border">
                                    <th className="px-4 py-3 text-left text-sm sm:text-base font-bold text-foreground">Tier</th>
                                    <th className="px-4 py-3 text-left text-sm sm:text-base font-bold text-foreground">Monthly Rentals (range)</th>
                                    <th className="px-4 py-3 text-left text-sm sm:text-base font-bold text-foreground">Suggested Monthly Fee</th>
                                    <th className="px-4 py-3 text-left text-sm sm:text-base font-bold text-foreground">Cost per Rental</th>
                                    <th className="px-4 py-3 text-left text-sm sm:text-base font-bold text-foreground">Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    { tier: 'Tier 1', range: 'Up to 250', fee: '$450', cost: '$1.80', notes: 'Basic plan' },
                                    { tier: 'Tier 2', range: '251–1,000', fee: '$950', cost: '$0.95', notes: 'Volume discount' },
                                    { tier: 'Tier 3', range: '1,001–2,000', fee: '$1,500', cost: '$0.75', notes: 'Multi-branch growth' },
                                    { tier: 'Tier 4', range: '2,001+', fee: 'Starting at $2,500', cost: '$0.60–$0.70', notes: 'Enterprise' },
                                  ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
                                      <td className="px-4 py-3 text-sm sm:text-base font-semibold text-primary">{row.tier}</td>
                                      <td className="px-4 py-3 text-sm sm:text-base text-foreground">{row.range}</td>
                                      <td className="px-4 py-3 text-sm sm:text-base font-semibold text-foreground">{row.fee}</td>
                                      <td className="px-4 py-3 text-sm sm:text-base text-foreground">{row.cost}</td>
                                      <td className="px-4 py-3 text-sm sm:text-base text-muted-foreground">{row.notes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
                              <p className="text-sm text-muted-foreground italic">
                                Billed at the tier that covers your total completed rentals per calendar month. 
                              </p>
                            </div>

                            <div className="mt-6 p-6 bg-card rounded-lg border-2 border-primary/30">
                              <h4 className="text-lg font-bold text-foreground mb-4">What happens if you exceed your tier?</h4>
                              <div className="space-y-3">
                                <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg border border-border">
                                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                    <FaCheckCircle className="text-primary text-xl" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">Option A: Move up to the next tier</p>
                                    <p className="text-xs text-muted-foreground">Upgrade to access the benefits of the next tier level</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg border border-border">
                                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                    <FaCheckCircle className="text-primary text-xl" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">Option B: Stay in your tier and pay only for the extra rentals</p>
                                    <p className="text-xs text-muted-foreground">(at the per-rental rate of the tier you are currently in)</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSubTab === 3 && (
                    <div className="animate-in fade-in slide-in-from-right duration-500">
                      <div className="space-y-6 md:space-y-10">
                        <div className="text-center">
                          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-primary text-balance leading-tight">
                            Rental Buddy Shakkii
                      </h2>
                          <p className="text-xl sm:text-2xl text-muted-foreground italic">
                            The operational brain of your entire rental business
                          </p>
                          <p className="text-base sm:text-lg text-muted-foreground mt-2">
                            The place where data, tasks, and people work together
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md flex flex-col">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">Shakkii Intro Video (1 min)</h3>
                            
                            <div className="flex-1 bg-black rounded-lg md:rounded-xl overflow-hidden border border-border min-h-[200px] sm:min-h-[300px] flex items-center justify-center">
                              <p className="text-white text-sm sm:text-base">[Video placeholder - Insert Shakkii intro video]</p>
                            </div>
                          </div>

                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md flex items-center">
                            <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed">
                              {"An agentic Kanban board where every board, list, and card is an AI agent that prioritizes work and moves tasks automatically.\n\nIt becomes the single place where all your data arrives: GPS events, vehicle status, renter actions, and operational workflows, giving your entire team one clear and unified view of operations."}
                            </p>
                          </div>
                        </div>

                        <div className="bg-card p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-lg">
                          <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-primary text-center">
                            Core Components
                          </h3>
                          
                          <div className="space-y-6 md:space-y-8">
                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg sm:text-xl font-bold shadow-md">
                                    1
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 md:mb-3">Agentic Kanban Board</h4>
                                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
                                    A live board where every column, card, and workflow is an AI agent.
                                  </p>
                                  <ul className="space-y-2 text-sm sm:text-base text-foreground">
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Prioritizes work automatically</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Highlights what matters today</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Flags delays and bottlenecks</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Gives full visibility to every team member</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Uses Kanban methodology for real-time flow</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                      <span>Reduces manual coordination</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg sm:text-xl font-bold shadow-md">
                                    2
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 md:mb-3">Form Generator & Operational Modules</h4>
                                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
                                    Structured forms that feed AI agents with the exact data they need.
                                  </p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                                    {['Maintenance', 'Inspections', 'Damage', 'Cleaning', 'Customer interactions', 'Custom processes'].map((item, idx) => (
                                      <div key={idx} className="bg-card px-3 py-2 rounded-lg border border-border text-sm sm:text-base text-foreground font-medium">
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 md:mt-4">
                                    Forms become the starting point of automated workflows, creating tasks, assigning work, and triggering actions across the system.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg sm:text-xl font-bold shadow-md">
                                    3
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 md:mb-3">AI Training via Simple Prompts</h4>
                                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
                                    Users train each agent with short, guided prompts.
                                  </p>
                                  <div className="space-y-2 md:space-y-3">
                                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                                      <p className="text-sm sm:text-base text-foreground italic">
                                        "When a drop-off happens, create cleaning and inspection tasks."
                                      </p>
                                    </div>
                                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                                      <p className="text-sm sm:text-base text-foreground italic">
                                        "If a vehicle has a DTC code, notify maintenance."
                                      </p>
                                    </div>
                                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                                      <p className="text-sm sm:text-base text-foreground italic">
                                        "Prioritize all units with bookings today."
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 md:mt-4">
                                    Every agent learns expectations and handles tasks automatically.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-lg">
                          <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-primary text-center">Why It Matters</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaDesktop className="text-primary" />
                                A single operational source of truth
                              </h4>
                              <p className="text-base sm:text-lg text-muted-foreground mb-3">
                                The Master Operator combines all your data:
                              </p>
                              <ul className="space-y-2 text-sm sm:text-base text-foreground">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>GPS movement & status</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>Renter data</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>Vehicle data</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>Pick-up / drop-off events</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>Internal tasks and workflows</span>
                                </li>
                              </ul>
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 font-semibold">
                                Everything arrives to one place where your team can take action instantly.
                              </p>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaCheckCircle className="text-primary" />
                                Clarity for every role
                              </h4>
                              <ul className="space-y-2 text-sm sm:text-base text-foreground">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>What needs to be done now</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>What is delayed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>What is ready</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>What is blocked</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                  <span>What needs attention today</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaBullseye className="text-primary" />
                                Better prioritization
                              </h4>
                              <p className="text-base sm:text-lg text-muted-foreground">
                                AI identifies the most important tasks and orders them by urgency, schedule, and impact.
                              </p>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaShieldAlt className="text-primary" />
                                Less chaos. More control.
                              </h4>
                              <p className="text-base sm:text-lg text-muted-foreground">
                                Teams stop guessing and start operating with precision.
                              </p>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaExclamationTriangle className="text-primary" />
                                Bottleneck reduction
                              </h4>
                              <p className="text-base sm:text-lg text-muted-foreground">
                                Master Operator detects slow points and helps teams solve them faster.
                              </p>
                            </div>

                            <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                <FaRocket className="text-primary" />
                                Operational efficiency
                              </h4>
                              <p className="text-base sm:text-lg text-muted-foreground">
                                Everything becomes faster, clearer, more consistent, and easier to manage.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-lg">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-primary text-center flex items-center justify-center gap-2">
                          <FaCloud className="text-2xl sm:text-3xl" />
                          Technical Foundation
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaRobot className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">Agentic Kanban framework</h4>
                              <p className="text-sm text-muted-foreground">AI-powered workflow management</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaSyncAlt className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">Forms → agents → actions pipeline</h4>
                              <p className="text-sm text-muted-foreground">Automated workflow generation</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaMapMarkerAlt className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">Integrates with RCM, Trackit, Pick-Up & Drop-Off</h4>
                              <p className="text-sm text-muted-foreground">Seamless data flow across platforms</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaBell className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">Chat + notifications</h4>
                              <p className="text-sm text-muted-foreground">SMS, Email, Slack, WhatsApp</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaChartBar className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">GPS + renter + vehicle data combined</h4>
                              <p className="text-sm text-muted-foreground">Unified data system</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                            <FaLock className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">User-level roles and permissions</h4>
                              <p className="text-sm text-muted-foreground">Secure access control</p>
                            </div>
                          </div>
                          
                          <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3 sm:col-span-2">
                            <FaCloud className="text-xl text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-foreground mb-1">Cloud storage & audit history</h4>
                              <p className="text-sm text-muted-foreground">Complete operational transparency and data retention</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {currentSlide === 3 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${sectionHeading} mb-6 md:mb-10`}>
                    Demo
                  </h2>
                  <div className="space-y-4 md:space-y-6 text-base sm:text-xl text-muted-foreground leading-relaxed">
                    <p>[Add your implementation benefits content here]</p>
                  </div>
                </div>
              )}

              {currentSlide === 4 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${sectionHeading} mb-6 md:mb-10`}>
                    Implementation
                  </h2>
                  <div className="space-y-4 md:space-y-6 text-base sm:text-xl text-muted-foreground leading-relaxed">
                    <p>[Add your implementation details content here]</p>
                  </div>
                </div>
              )}

              {currentSlide === 5 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${sectionHeading} mb-6 md:mb-10`}>
                    Next Steps
                  </h2>
                  <div className="space-y-4 md:space-y-6 text-base sm:text-xl text-muted-foreground leading-relaxed">
                    <p>[Add your next steps content here]</p>
                  </div>
                </div>
              )}

              <div className="mt-8 md:mt-12">
                <WorkshopChecklist />
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-gray-200 bg-white py-6 md:py-8 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between max-w-6xl mx-auto gap-4">
              <Button
                onClick={prevSlide}
                disabled={currentSlide === 0 && currentSubTab === 0}
                variant="outline"
                size="lg"
                className="gap-1 md:gap-2 disabled:opacity-30 border-gray-300 hover:bg-gray-50 font-medium text-sm md:text-base px-3 md:px-4"
              >
                <ChevronLeft />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="text-xs md:text-sm font-medium text-foreground bg-gray-100 px-3 md:px-6 py-1.5 md:py-2.5 rounded-full border border-gray-200 shadow-sm">
                  {currentSlide === 2
                    ? `${currentSubTab + 1} / ${productSubTabs.length}`
                    : `${currentSlide + 1} / ${slides.length}`}
                </div>
                <div className="text-xs text-muted-foreground items-center gap-1 hidden sm:flex">
                  <kbd className="px-2 py-0.5 text-xs font-medium text-foreground bg-card border border-gray-300 rounded">
                    ←
                  </kbd>
                  <kbd className="px-2 py-0.5 text-xs font-medium text-foreground bg-card border border-gray-300 rounded">
                    →
                  </kbd>
                  <span>to navigate</span>
                </div>
              </div>

              <Button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                variant="outline"
                size="lg"
                className="gap-1 md:gap-2 disabled:opacity-30 border-gray-300 hover:bg-gray-50 font-medium text-sm md:text-base px-3 md:px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </footer>

        </main>

        {lightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                if (lightboxSource === 'spatial') {
                prevCarouselImage()
                } else if (lightboxSource === 'technical') {
                  prevTechFoundationImage()
                } else if (lightboxSource === 'pickup') {
                  prevPickupImage()
                } else if (lightboxSource === 'seeItInAction') {
                  prevSeeItInActionImage()
                } else { // lightboxSource === 'pickupJourney'
                  prevPickupJourneyImage()
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                if (lightboxSource === 'spatial') {
                nextCarouselImage()
                } else if (lightboxSource === 'technical') {
                  nextTechFoundationImage()
                } else if (lightboxSource === 'pickup') {
                  nextPickupImage()
                } else if (lightboxSource === 'seeItInAction') {
                  nextSeeItInActionImage()
                } else { // lightboxSource === 'pickupJourney'
                  nextPickupJourneyImage()
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight />
            </button>

            <div className="max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={
                  lightboxSource === 'spatial' 
                    ? carouselImages[carouselIndex].src 
                    : lightboxSource === 'technical'
                    ? technicalFoundationImages[techFoundationIndex].src
                    : lightboxSource === 'pickup'
                    ? pickupCarouselImages[pickupCarouselIndex].src
                    : lightboxSource === 'seeItInAction'
                    ? pickupJourneyImages[seeItInActionIndex].src
                    : pickupJourneyImages[pickupJourneyIndex].src
                }
                alt={
                  lightboxSource === 'spatial' 
                    ? carouselImages[carouselIndex].alt 
                    : lightboxSource === 'technical'
                    ? technicalFoundationImages[techFoundationIndex].alt
                    : lightboxSource === 'pickup'
                    ? pickupCarouselImages[pickupCarouselIndex].alt
                    : lightboxSource === 'seeItInAction'
                    ? pickupJourneyImages[seeItInActionIndex].alt
                    : pickupJourneyImages[pickupJourneyIndex].alt
                }
                className="max-w-full max-h-[calc(100vh-80px)] object-contain rounded-lg shadow-2xl"
                style={{ maxWidth: '90vw' }}
              />
              
              <div className="mt-4 text-center">
                <p className="text-white text-sm md:text-base mb-2">
                  {lightboxSource === 'spatial' 
                    ? carouselImages[carouselIndex].alt 
                    : lightboxSource === 'technical'
                    ? technicalFoundationImages[techFoundationIndex].alt
                    : lightboxSource === 'pickup'
                    ? pickupCarouselImages[pickupCarouselIndex].alt
                    : lightboxSource === 'seeItInAction'
                    ? pickupJourneyImages[seeItInActionIndex].alt
                    : pickupJourneyImages[pickupJourneyIndex].alt
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {(lightboxSource === 'spatial' 
                    ? carouselImages 
                    : lightboxSource === 'technical' 
                    ? technicalFoundationImages 
                    : lightboxSource === 'pickup'
                    ? pickupCarouselImages
                    : lightboxSource === 'seeItInAction'
                    ? pickupJourneyImages
                    : pickupJourneyImages
                  ).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (lightboxSource === 'spatial') {
                          setCarouselIndex(idx)
                        } else if (lightboxSource === 'technical') {
                          setTechFoundationIndex(idx)
                        } else if (lightboxSource === 'pickup') {
                          setPickupCarouselIndex(idx)
                        } else if (lightboxSource === 'seeItInAction') {
                          setSeeItInActionIndex(idx)
                        } else { // lightboxSource === 'pickupJourney'
                          setPickupJourneyIndex(idx)
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        idx === (lightboxSource === 'spatial' 
                          ? carouselIndex 
                          : lightboxSource === 'technical' 
                          ? techFoundationIndex 
                          : lightboxSource === 'pickup'
                          ? pickupCarouselIndex
                          : lightboxSource === 'seeItInAction'
                          ? seeItInActionIndex
                          : pickupJourneyIndex)
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="text-white/70 text-xs mt-2">
                  {lightboxSource === 'spatial' 
                    ? `${carouselIndex + 1} / ${carouselImages.length}`
                    : lightboxSource === 'technical'
                    ? `${techFoundationIndex + 1} / ${technicalFoundationImages.length}`
                    : lightboxSource === 'pickup'
                    ? `${pickupCarouselIndex + 1} / ${pickupCarouselImages.length}`
                    : lightboxSource === 'seeItInAction'
                    ? `${seeItInActionIndex + 1} / ${pickupJourneyImages.length}`
                    : `${pickupJourneyIndex + 1} / ${pickupJourneyImages.length}`
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
