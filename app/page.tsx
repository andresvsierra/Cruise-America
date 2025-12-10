"use client"

import { useState, useEffect } from "react"
import type { IconType } from "react-icons"
import { Button } from "@/components/ui/button"
import { database, ref, set, push, update } from "@/lib/firebase"
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
  FaCar,
  FaDesktop,
  FaRobot,
  FaCloud,
  FaSignInAlt,
  FaClipboardCheck,
  FaFlagCheckered,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft
} from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'

type SelectionOption = {
  key: string
  label: string
  tooltip?: string
}

type PickupOptionGroup = {
  title: string
  icon: IconType
  items: SelectionOption[]
}

const trackitEssentialsOptions: SelectionOption[] = [
  { key: 'gpsLocation', label: 'GPS Location' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'geofencing', label: 'Geofencing' },
  { key: 'crashEvents', label: 'Crash Events' },
  { key: 'dtcCodes', label: 'DTC Codes' },
  { key: 'batteryAlerts', label: 'Battery Alerts' },
  { key: 'twelveMonthHistory', label: '12-Month History' },
]

const trackitAiOptions: SelectionOption[] = [
  { 
    key: 'lateMissedReturnPrediction', 
    label: 'Late & Missed Return Prediction',
    tooltip: 'Detect potential delays or missed drop-offs before they happen.'
  },
  { 
    key: 'geofenceEntryIntentPrediction', 
    label: 'Geofence Entry & Intent Prediction',
    tooltip: 'Predict renter intention to travel toward or enter a restricted (non-permitted) area.'
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
]

const buildLabelMap = (options: SelectionOption[], prefix: string) =>
  options.reduce((acc, option) => {
    acc[option.key] = `${prefix} · ${option.label}`
    return acc
  }, {} as Record<string, string>)

const trackitEssentialsLabels = buildLabelMap(trackitEssentialsOptions, 'Trackit Essentials')
const trackitAiLabels = buildLabelMap(trackitAiOptions, 'Trackit AI')

const carouselImages = [
  {
    src: "/Gemini_Generated_Image_lbl5lylbl5lylbl5.png",
    alt: "Birds-eye AI visualization of a vehicle fleet across a stylized city map"
  },
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

const pickupDropoffReviews = [
  {
    quote: 'The pickup and drop-off process were quick and painless.'
  },
  {
    quote: 'The pick up and drop off were straightforward. I would recommend this company to family and friends!'
  },
  {
    quote: 'Pickup was flawless and hassle free. Without a delay during pickup, we were free to get right on the road.'
  },
  {
    quote: 'Seamless, easy experience with Native Campervans from check-in to check out! Staff were available on call when needed to initially unlock lock box and for last minute checkout questions. Every staff member we interacted with was pleasant and helpful.'
  },
  {
    quote: 'Fantastic communication. Easy pick up and drop off. I was early for my pick up, no problem. Later required a later drop off, again very accommodating.'
  },
  {
    quote: 'Great first time experience with Native Campervans out of Denver. I have used a competitor several times and found the convenience of contactless pickup and drop-off such a benefit to trip planning.'
  },
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
    src: "/images/screenshots/A-RB.png",
    alt: "Screenshot A-RB"
  },
  {
    src: "/images/screenshots/B-RB.png",
    alt: "Screenshot B-RB"
  },
  {
    src: "/images/screenshots/c-RB.png",
    alt: "Screenshot C-RB"
  },
  {
    src: "/images/screenshots/D-RB.png",
    alt: "Screenshot D-RB"
  },
  {
    src: "/images/screenshots/E-RB.png",
    alt: "Screenshot E-RB"
  },
  {
    src: "/images/screenshots/F-RB.png",
    alt: "Screenshot F-RB"
  },
  {
    src: "/images/screenshots/G-RB.png",
    alt: "Screenshot G-RB"
  },
  {
    src: "/images/screenshots/H-RB.png",
    alt: "Screenshot H-RB"
  },
  {
    src: "/images/screenshots/I-RB.png",
    alt: "Screenshot I-RB"
  },
  {
    src: "/images/screenshots/J-RB.png",
    alt: "Screenshot J-RB"
  },
  {
    src: "/images/screenshots/K-RB.png",
    alt: "Screenshot K-RB"
  },
  {
    src: "/images/screenshots/L-RB.png",
    alt: "Screenshot L-RB"
  }
]

const pickupOptionGroups: PickupOptionGroup[] = [
  {
    title: 'Login & Welcome',
    icon: FaSignInAlt,
    items: [
      { key: 'login', label: 'Login with email or phone number' },
      { key: 'welcomeScreen', label: 'Welcome screen and rental information display' },
    ]
  },
  {
    title: 'Check-In',
    icon: FaClipboardCheck,
    items: [
      { key: 'idVerification', label: 'ID Verification' },
      { key: 'agreementSignature', label: 'Agreement Signature' },
      { key: 'insuranceOptions', label: 'Coverage / Insurance Options' },
      { key: 'addOns', label: 'Add-Ons Selection' },
    ]
  },
  {
    title: 'Pick-Up',
    icon: FaCar,
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
    icon: FaFlagCheckered,
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
]

const pickupOptionLabelMap = pickupOptionGroups.reduce((acc, group) => {
  group.items.forEach((item) => {
    acc[item.key] = `${group.title} · ${item.label}`
  })
  return acc
}, {} as Record<string, string>)

const summarizeSelections = (
  selections: Record<string, boolean>,
  labels: Record<string, string>
) =>
  Object.entries(selections)
    .filter(([, value]) => value)
    .map(([key]) => labels[key] ?? key)

const slides = [
  {
    id: "welcome",
    title: "Welcome",
    tabLine1: "Welcome",
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

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentSubTab, setCurrentSubTab] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [presentationDate, setPresentationDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [techFoundationIndex, setTechFoundationIndex] = useState(0)
  const [pickupCarouselIndex, setPickupCarouselIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSource, setLightboxSource] = useState<'spatial' | 'technical' | 'pickup' | 'pickupJourney' | 'seeItInAction' | 'shakkii'>('spatial')
  
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
  const [trackitQuestionnaire, setTrackitQuestionnaire] = useState({
    decisionData: '',
    predictionNeeds: '',
    additionalComments: '',
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

  // CHANGE: Added new carousel state for Shakkii section
  const [shakkiiIndex, setShakkiiIndex] = useState(0)
  
  const shakkiiImages = [
    {
      src: "/images/rental_blocks_shakkii.png",
      alt: "Rental Buddy Shakkii operational flow"
    },
    {
      src: "/images/poster mac copy.png",
      alt: "Shakkii Interface Overview"
    }
  ]

  const nextShakkiiImage = () => {
    setShakkiiIndex((prev) => (prev + 1) % shakkiiImages.length)
  }

  const prevShakkiiImage = () => {
    setShakkiiIndex((prev) => (prev - 1 + shakkiiImages.length) % shakkiiImages.length)
  }

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
        } else if (lightboxSource === 'shakkii') {
          nextShakkiiImage()
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
        } else if (lightboxSource === 'shakkii') {
          prevShakkiiImage()
        } else { // lightboxSource === 'pickupJourney'
          prevPickupJourneyImage()
        }
      }
    }

    window.addEventListener('keydown', handleLightboxKeyDown)
    return () => window.removeEventListener('keydown', handleLightboxKeyDown)
  }, [lightboxOpen, carouselIndex, techFoundationIndex, pickupCarouselIndex, pickupJourneyIndex, seeItInActionIndex, shakkiiIndex, lightboxSource])
  

  const handleStartPresentation = async () => {
    if (!companyName.trim()) {
      alert('Please enter a company name')
      return
    }
    if (!fullName.trim()) {
      alert('Please enter a full name')
      return
    }
    if (!email.trim()) {
      alert('Please enter an email address')
      return
    }

    try {
      // Create new session in Firebase
      const sessionsRef = ref(database, 'sessions')
      const newSessionRef = push(sessionsRef)
      const newSessionId = newSessionRef.key

      await set(newSessionRef, {
        companyName: companyName.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
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
      alert('Please start the presentation to save your selections.')
      console.error('[v0] No session ID available')
      return
    }

    try {
      const sessionRef = ref(database, `sessions/${sessionId}`)
      await update(sessionRef, {
        companyName: companyName.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        presentationDate,
        lastUpdated: new Date().toISOString(),
        [selectionType]: data,
      })
      console.log(`[v0] Saved ${selectionType} to Firebase`)
    } catch (error) {
      console.error(`[v0] Error saving ${selectionType}:`, error)
      alert('We could not save your selections. Please try again.')
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
                Let&apos;s start your presentation
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-base font-medium text-foreground mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="text-base p-4 border-2 focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleStartPresentation()
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-foreground mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base p-4 border-2 focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleStartPresentation()
                      }
                    }}
                  />
                </div>
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
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <img src="/images/shaka_round_orange.png" alt="Workspace logo" className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <nav className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto px-0 sm:px-2 py-1.5 scrollbar-hide min-h-[40px]">
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
                <div className="animate-in fade-in slide-in-from-right duration-500 text-center space-y-6 md:space-y-8">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-muted-foreground">
                    Welcome
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight flex flex-wrap justify-center gap-x-2">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-bold text-[#ff7a45]">
                        &ldquo;Inconsistency is the only true enemy of scalability.&rdquo;
                      </span>
                      <span className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                        Principle inspired by W. Edwards Deming and Taiichi Ohno, the fathers of modern operational excellence
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground italic">
                      Rental Buddy: Controlling Operational Variability.
                    </p>
                  </div>
                </div>
              )}

              {currentSlide === 3 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                  <h2 className={`${heroHeading} mb-4 md:mb-6 text-center`}>
                    Next Steps · Phase Zero
                  </h2>
                  <p className={`${sectionSubtitle} text-center mb-6`}>
                    Low risk, high insight. Data-driven validation before full rollout.
                  </p>
                  <div className="bg-secondary p-6 sm:p-8 rounded-2xl border border-border shadow-xl space-y-6">
                    <div>
                      <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-muted-foreground">
                        Phase Zero
                      </p>
                      <h3 className="text-2xl sm:text-4xl font-bold text-primary">
                        The Consistency Pilot
                      </h3>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                      {[
                        {
                          label: 'Scope',
                          text: '50–100 Units · Single Location',
                          subtext: 'Runs in parallel without disrupting operations.',
                        },
                        {
                          label: 'Duration',
                          text: '45 Days',
                        },
                        {
                          label: 'Objective',
                          text: 'Prove reduction in downtime & increase in upsells',
                        },
                        {
                          label: 'Deliverable',
                          text: 'Comparative Data Report (Pilot vs. Fleet Average)',
                        },
                      ].map((item, index) => (
                        <div key={item.label} className="bg-card p-4 rounded-xl border border-border shadow-sm flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-md">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-lg font-semibold text-primary">{item.text}</p>
                            {item.subtext && (
                              <p className="text-sm text-muted-foreground mt-2">{item.subtext}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-card rounded-xl border border-dashed border-primary p-4 sm:p-6 text-center">
                      <p className="text-xl font-bold text-primary mb-2">
                        “Low Risk. High Insight. Data-Driven Decision.”
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Phase Zero shows how Rental Buddy stabilizes operations before scaling the rollout.
                      </p>
                    </div>
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
                      We turn operational chaos into a coordinated rental rhythm.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-sm sm:text-base md:text-lg">
                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">Operators + Engineers</h3>
                        <p className="text-foreground leading-relaxed">
                          We ran rental fleets and built the technology behind them, so every workflow is designed with on-the-ground realities in mind.
                        </p>
                      </div>

                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">Where Data Gets Stuck</h3>
                        <p className="text-foreground leading-relaxed">
                          Teams jump between Your Booking system, trackers, spreadsheets, and chats. Information exists—but it rarely moves together or reaches the right person on time.
                        </p>
                      </div>

                      <div className="bg-secondary p-4 sm:p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 md:mb-3">Coordination Engine</h3>
                        <p className="text-foreground leading-relaxed">
                          Rental Buddy orchestrates AI + IoT workflows that keep every update flowing through a single interface, so teams execute with clarity.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-secondary border-l-4 border-primary p-4 sm:p-6 rounded-lg shadow-sm">
                      <p className="text-base sm:text-xl font-semibold text-foreground italic">
                        {"Coordination beats more dashboards. We give rentals one source of truth so every decision happens faster."}
                      </p>
                    </div>

                    <div className="bg-secondary p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-md mt-6 md:mt-8">
                      <p className="font-bold text-foreground mb-4 md:mb-6 text-lg sm:text-2xl text-center">Our AI-Ready Platform | Beyond SaaS</p>
                      <div className="mb-6 md:mb-8 flex justify-center">
                        <img
                          src="/images/logos_uber_zipcar_toyota.png"
                          alt="Partner logos"
                          className="max-w-[70%] sm:max-w-[60%] h-auto object-contain"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Trackit
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Turn tracking data into clear fleet decisions
                          </p>
                        </div>

                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Flexible Pick-Up & Drop-Off
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Make renting a vehicle as easy as renting a Zipcar.
                          </p>
                        </div>

                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col">
                          <h4 className="font-bold text-base sm:text-xl mb-2 md:mb-3 text-primary min-h-[3rem] flex items-center">
                            Master Operator
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground flex-1 min-h-[4rem]">
                            Simplify daily operations with structure and clarity.
                          </p>
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
                    
                      <div className="bg-card p-4 sm:p-6 md:p-10 rounded-2xl border border-border shadow-lg">
                        <h3 className={`${sectionHeading} text-center mb-4 md:mb-6`}>
                          What Makes Us Unique
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          {[
                            {
                              title: 'Integrated Ecosystem',
                              description:
                                'TrackIt, RentalBuddy, and Shakkii work together seamlessly to create a unified operational platform.',
                            },
                            {
                              title: 'Agentic AI (Action-First)',
                              description:
                                'Our system doesn’t just analyze — it detects, decides, and executes actions autonomously.',
                            },
                            {
                              title: 'Zero-Friction Operations',
                              description:
                                'Fully automated pickup and maintenance workflows eliminate manual steps and reduce customer effort.',
                            },
                            {
                              title: 'Immediate Impact',
                              description:
                                'Significant reduction in administrative workload and instant response across all touchpoints.',
                            },
                          ].map((item) => (
                            <div
                              key={item.title}
                              className="bg-secondary/90 rounded-xl border border-border p-4 sm:p-5 md:p-6 shadow-sm group hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                                  <span>★</span>
                                </div>
                                <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                              </div>
                              <p className="text-sm sm:text-base text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          ))}
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
                                <h4 className="font-bold text-foreground text-lg sm:text-xl mb-2 md:mb-3 min-h-[3rem] flex items-center">We don&apos;t replace your booking system</h4>
                                <p className="text-muted-foreground min-h-[5rem]">
                                  We add an <span className="font-bold text-primary">AI layer</span> that <span className="font-bold">connects to Your Booking system</span> — <span className="font-bold">automating</span> and <span className="font-bold">linking every step</span> from booking to return.
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
                                  Our system <span className="font-bold">connects</span> <span className="font-bold text-primary">Your Booking system, tracking devices, operations, and user data</span> to <span className="font-bold">reveal patterns</span> and <span className="font-bold">improve decisions</span>.
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
                                  <span className="font-bold">Your Booking system stays your core</span> — Rental Buddy <span className="font-bold text-primary">unifies all operations</span> into a <span className="font-bold text-primary">single source of truth</span>.
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
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">Trackit Intro Video (20 sec)</h3>
                            
                            <div className="flex-1 bg-black rounded-lg md:rounded-xl overflow-hidden border border-border min-h-[200px] sm:min-h-[300px]">
                              <iframe
                                className="w-full h-full min-h-[200px] sm:min-h-[300px]"
                                src="https://www.youtube.com/embed/y6xqKsA1Xh4"
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
                                <FaChevronLeft className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextCarouselImage()
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                              >
                                <FaChevronRight className="w-4 h-4" />
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
                            <FaChevronDown
                              className={`w-5 h-5 sm:w-6 sm:h-6 text-primary transform transition-transform duration-300 ${
                                trackingOptionsOpen ? 'rotate-180' : ''
                              }`}
                            />
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
                                  {trackitEssentialsOptions.map((item) => (
                                    <div
                                      key={item.key}
                                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-secondary transition-colors duration-150"
                                    >
                                      <span className="text-base sm:text-lg text-foreground">{item.label}</span>
                                      <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-1 md:gap-2">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
                                  AI & Intelligent Data
                                </h4>
                                <div className="space-y-2 md:space-y-3 ml-3 md:ml-4">
                                  {trackitAiOptions.map((item) => (
                                    <div
                                      key={item.key}
                                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-secondary transition-colors duration-150 group"
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
                                      <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                  ))}
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
                                <FaChevronLeft className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextSeeItInActionImage()
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                              >
                                <FaChevronRight className="w-4 h-4" />
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
                            Renters move on their own time, not the branch&apos;s.
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
                    <div className="bg-card p-4 sm:p-6 md:p-8 rounded-2xl border border-border shadow-lg">
                      <div className="text-center mb-5 md:mb-8">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Google Reviews
                        </p>
                        <h3 className="text-xl sm:text-3xl font-bold text-foreground mt-2">
                          Real renters love flexible pick-up & drop-off
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl mx-auto">
                          Pulled directamente de reseñas públicas en Google de programas contactless impulsados por Rental Buddy.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {pickupDropoffReviews.map((review) => (
                          <div
                            key={review.quote}
                            className="bg-secondary/80 dark:bg-card rounded-xl border border-border p-4 sm:p-5 flex flex-col gap-3 shadow-sm"
                          >
                            <FaQuoteLeft className="text-primary text-2xl" />
                            <p className="text-sm sm:text-base text-foreground leading-relaxed">
                              {review.quote}
                            </p>
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                              Google reviewer
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                      </div>

                      <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-lg overflow-hidden mt-6 md:mt-8">
                        <button
                          onClick={() => setPickupDropoffOpen(!pickupDropoffOpen)}
                          className="w-full px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                        >
                          <h3 className="text-lg sm:text-2xl font-bold text-foreground">Pick-Up & Drop-Off Options</h3>
                          <FaChevronDown
                            className={`w-5 h-5 sm:w-6 sm:h-6 text-primary transform transition-transform duration-300 ${
                              pickupDropoffOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            pickupDropoffOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-5 sm:p-8 space-y-4 md:space-y-6">
                            {pickupOptionGroups.map((group) => {
                              const Icon = group.icon
                              return (
                                <div key={group.title} className="bg-secondary p-4 sm:p-6 rounded-lg border border-gray-200">
                                  <h4 className="text-base sm:text-xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                                    <Icon className="text-xl sm:text-2xl text-primary" />
                                    {group.title}
                                  </h4>
                                  <div className="space-y-2 md:space-y-3">
                                    {group.items.map((item) => (
                                      <div
                                        key={item.key}
                                        className="flex items-center justify-between p-2 sm:p-3 bg-card rounded-lg hover:bg-secondary transition-colors duration-150 border border-gray-200"
                                      >
                                        <span className="text-sm sm:text-base font-medium text-foreground">{item.label}</span>
                                        <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                            })}
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

                        <div className="max-w-4xl mx-auto w-full">
                          <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md flex flex-col">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground text-center">Shakkii Intro Video (1 min)</h3>
                            
                            <div className="flex-1 bg-black rounded-lg md:rounded-xl overflow-hidden border border-border min-h-[200px] sm:min-h-[300px]">
                              <iframe
                                className="w-full h-full min-h-[200px] sm:min-h-[300px]"
                                src="https://www.youtube.com/embed/hqgyjSo7C-I"
                                title="Rental Buddy Shakkii Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md">
                          <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-foreground text-center">Shakkii delivers</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                              <FaCloud className="text-xl text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-bold text-foreground mb-1">Unified Source of Truth</h4>
                                <p className="text-sm text-muted-foreground">
                                  Creation of a Unified Source of Truth for Asset Tracking.
                                </p>
                              </div>
                            </div>
                            <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                              <FaRobot className="text-xl text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-bold text-foreground mb-1">AI Guidance Everywhere</h4>
                                <p className="text-sm text-muted-foreground">
                                  Leveraging AI to prevent bottlenecks and guide actions.
                                </p>
                              </div>
                            </div>
                            <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                              <FaDesktop className="text-xl text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-bold text-foreground mb-1">Dynamic Workforce Management</h4>
                                <p className="text-sm text-muted-foreground">
                                  Dynamic workforce management keeps crews aligned with live demand.
                                </p>
                              </div>
                            </div>
                            <div className="bg-card p-4 sm:p-5 rounded-lg border border-border shadow-sm flex items-start gap-3">
                              <FaBullseye className="text-xl text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-bold text-foreground mb-1">Continuous Outcomes</h4>
                                <p className="text-sm text-muted-foreground">
                                  Focus on practical business outcomes and continuous improvement.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card p-6 sm:p-8 rounded-xl md:rounded-2xl border border-border shadow-lg">
                          <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-primary text-center">
                            What it does
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-base sm:text-lg leading-relaxed text-foreground">
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                              <h4 className="font-bold text-lg sm:text-xl mb-2 text-primary">Ensures consistent execution through custom checklists</h4>
                              <p>Operational checklists keep processes aligned across branches and crews, eliminating gaps in handoffs and inspections.</p>
                            </div>
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                              <h4 className="font-bold text-lg sm:text-xl mb-2 text-primary">Improves team efficiency with clear prioritization</h4>
                              <p>Every task is ranked by urgency and impact, helping managers and frontline staff focus on what keeps rentals flowing.</p>
                            </div>
                            <div className="bg-secondary p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                              <h4 className="font-bold text-lg sm:text-xl mb-2 text-primary">Increases team output without increasing headcount</h4>
                              <p>Automation handles repetitive steps while agents surface exceptions, allowing the same team to handle more vehicles and renters.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary p-4 sm:p-6 rounded-xl md:rounded-2xl border border-border shadow-md flex justify-center">
                          <div 
                            className="relative w-full max-w-4xl mx-auto rounded-lg md:rounded-xl overflow-hidden border border-border group cursor-pointer"
                            onClick={() => {
                              setLightboxSource('shakkii')
                              setLightboxOpen(true)
                            }}
                          >
                            <img
                              src={shakkiiImages[shakkiiIndex].src || "/placeholder.svg"}
                              alt={shakkiiImages[shakkiiIndex].alt}
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
                                prevShakkiiImage()
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                              aria-label="Previous image"
                            >
                              <FaChevronLeft className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                nextShakkiiImage()
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                              aria-label="Next image"
                            >
                              <FaChevronRight className="w-4 h-4" />
                            </button>

                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                              {shakkiiImages.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setShakkiiIndex(idx)
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    idx === shakkiiIndex 
                                      ? 'bg-white w-6' 
                                      : 'bg-white/50 hover:bg-white/75'
                                  }`}
                                  aria-label={`Go to image ${idx + 1}`}
                                />
                              ))}
                            </div>

                            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                              {shakkiiIndex + 1} / {shakkiiImages.length}
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}
                </>
              )}
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
                <FaChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="text-xs md:text-sm font-medium text-foreground bg-gray-100 px-3 md:px-6 py-1.5 md:py-2.5 rounded-full border border-gray-200 shadow-sm">
                  {currentSlide === 2
                    ? `${currentSubTab + 1} / ${productSubTabs.length}`
                    : `${currentSlide + 1} / ${slides.length}`}
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
                <FaChevronRight className="w-4 h-4" />
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
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

              <button
              type="button"
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
                } else if (lightboxSource === 'shakkii') {
                  prevShakkiiImage()
                } else { // lightboxSource === 'pickupJourney'
                  prevPickupJourneyImage()
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
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
                } else if (lightboxSource === 'shakkii') {
                  nextShakkiiImage()
                } else { // lightboxSource === 'pickupJourney'
                  nextPickupJourneyImage()
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <FaChevronRight className="w-5 h-5" />
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
                    : lightboxSource === 'shakkii'
                    ? shakkiiImages[shakkiiIndex].src
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
                    : lightboxSource === 'shakkii'
                    ? shakkiiImages[shakkiiIndex].alt
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
                    : lightboxSource === 'shakkii'
                    ? shakkiiImages[shakkiiIndex].alt
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
                    : lightboxSource === 'shakkii'
                    ? shakkiiImages
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
                        } else if (lightboxSource === 'shakkii') {
                          setShakkiiIndex(idx)
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
                          : lightboxSource === 'shakkii'
                          ? shakkiiIndex
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
                    : lightboxSource === 'shakkii'
                    ? `${shakkiiIndex + 1} / ${shakkiiImages.length}`
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
