/**
 * Trip Planner Tool Page
 * 
 * Interactive multi-step form that captures high-quality leads by helping
 * users plan their perfect trip while collecting detailed preferences.
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { Button } from "../components/blocks/design/Button";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import { 
  MapPin, 
  Calendar, 
  Users, 
  CurrencyDollar as DollarSign,
  Compass,
  Camera,
  CaretRight as ChevronRight,
  CaretLeft as ChevronLeft,
  EnvelopeSimple as Mail,
  ArrowRight,
  CheckCircle as CircleCheck
} from "@phosphor-icons/react";
import { cn } from "../lib/utils";

interface TripPlannerData {
  destinations: string[];
  travelMonth: string;
  travelers: {
    adults: number;
    children: number;
  };
  budget: string;
  travelStyle: string[];
  interests: string[];
  email: string;
  phone: string;
  name: string;
}

export default function TripPlannerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<TripPlannerData>>({
    destinations: [],
    travelers: { adults: 2, children: 0 },
    travelStyle: [],
    interests: []
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 7;

  const destinations = [
    { id: "kenya", name: "Kenya", region: "East Africa" },
    { id: "tanzania", name: "Tanzania", region: "East Africa" },
    { id: "south-africa", name: "South Africa", region: "Southern Africa" },
    { id: "botswana", name: "Botswana", region: "Southern Africa" },
    { id: "namibia", name: "Namibia", region: "Southern Africa" },
    { id: "rwanda", name: "Rwanda", region: "East Africa" },
    { id: "zambia", name: "Zambia", region: "Southern Africa" },
    { id: "zimbabwe", name: "Zimbabwe", region: "Southern Africa" },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    "Flexible"
  ];

  const budgets = [
    { value: "budget", label: "Value", range: "Under $3,000", desc: "Authentic camps, comfortable essentials" },
    { value: "mid", label: "Classic", range: "$3,000 - $6,000", desc: "Luxury lodges, iconic locations" },
    { value: "premium", label: "Signature", range: "$6,000 - $10,000", desc: "Ultra-luxury, private concessions" },
    { value: "luxury", label: "Elite", range: "Over $10,000", desc: "Private villas, fly-in safaris, VIP treatment" }
  ];

  const travelStyles = [
    { id: "wildlife", label: "Wildlife", icon: Camera },
    { id: "adventure", label: "Adventure", icon: Compass },
    { id: "cultural", label: "Cultural", icon: Users },
    { id: "relaxation", label: "Relaxation", icon: MapPin },
    { id: "honeymoon", label: "Honeymoon", icon: CircleCheck },
    { id: "family", label: "Family", icon: Users }
  ];

  const interests = [
    "Great Migration",
    "Photography",
    "Bird Watching",
    "Walking Safaris",
    "Luxury Spas",
    "Beach Extensions",
    "Hot Air Ballooning",
    "Community Visits",
    "Gorilla Trekking",
    "Wine Tasting",
    "Marine Life",
    "Desert Landscapes"
  ];

  const toggleDestination = (destinationId: string) => {
    const current = formData.destinations || [];
    const updated = current.includes(destinationId)
      ? current.filter(d => d !== destinationId)
      : [...current, destinationId];
    setFormData({ ...formData, destinations: updated });
  };

  const toggleTravelStyle = (styleId: string) => {
    const current = formData.travelStyle || [];
    const updated = current.includes(styleId)
      ? current.filter(s => s !== styleId)
      : [...current, styleId];
    setFormData({ ...formData, travelStyle: updated });
  };

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    setFormData({ ...formData, interests: updated });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return (formData.destinations?.length || 0) > 0;
      case 2: return !!formData.travelMonth;
      case 3: return (formData.travelers?.adults || 0) > 0;
      case 4: return !!formData.budget;
      case 5: return (formData.travelStyle?.length || 0) > 0;
      case 6: return (formData.interests?.length || 0) > 0;
      case 7: return !!formData.email && !!formData.name;
      default: return true;
    }
  };

  const handleSubmit = () => {
    console.log("Trip Planner Submission:", formData);
    setSubmitted(true);
  };

  const renderProgress = () => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-bold text-primary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex gap-4 mt-12 pt-8 border-t border-border/50">
      {currentStep > 1 && (
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex-1"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
      )}
      {currentStep < totalSteps ? (
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!canProceed()}
          className="flex-1"
        >
          Continue
          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={!canProceed()}
          className="flex-1"
          variant="primary"
        >
          Create My Safari
          <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  );

  if (submitted) {
    return (
      <main className="theme-organic">
        <div className="organic-section-middle min-h-[80vh] flex items-center py-section-lg">
          <Container maxWidth="sm">
            <div className="text-center">
              <div className="size-20 organic-radius-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <CircleCheck className="size-10 text-primary" />
              </div>
              <HeadingBlock level={1}>Request Received</HeadingBlock>
              <ParagraphBlock className="text-muted-foreground mb-12">
                Our specialists are already reviewing your preferences. We'll send a personalized proposal 
                to <strong>{formData.email}</strong> shortly.
              </ParagraphBlock>

              <div className="bg-muted/30 p-8 organic-radius-lg text-left border border-border/50 mb-12">
                <h3 className="text-xl mb-6 wp-text--hand">Your Planning Roadmap</h3>
                <ul className="space-y-6 list-none p-0">
                  <li className="flex gap-4">
                    <div className="size-6 organic-radius-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <div>
                      <p className="font-bold text-sm">Expert Analysis</p>
                    <p className="text-xs text-muted-foreground">A safari specialist is matching your interests with the best locations.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <div>
                    <p className="font-bold text-sm">Personalized Proposal</p>
                    <p className="text-xs text-muted-foreground">You'll receive a custom itinerary with lodges, pricing, and maps.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <div>
                    <p className="font-bold text-sm">Consultation</p>
                    <p className="text-xs text-muted-foreground">We'll schedule a call to fine-tune every detail until it's perfect.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
              <Button className="flex-1" onClick={() => window.location.href = '/tours'}>
                Explore Tours
              </Button>
            </div>
          </div>
        </Container>
        </div>
      </main>
    );
  }

  return (
    <main className="theme-organic">
      <div className="organic-section-middle py-section-lg min-h-screen">
        <Container maxWidth="md">
          <div className="text-center mb-12">
            <HeadingBlock level={1}>The Safari Designer</HeadingBlock>
            <ParagraphBlock className="text-muted-foreground max-w-xl mx-auto">
              Design your dream African adventure in less than 2 minutes. 
              Our experts will turn your vision into a reality.
            </ParagraphBlock>
          </div>

          <div className="bg-card p-8 md:p-12 organic-radius-lg shadow-xl border border-border/50">
            {renderProgress()}

          {/* Step 1: Destinations */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Dream Destinations</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => toggleDestination(dest.id)}
                    className={cn(
                      "p-4 border-2 rounded-xl text-left transition-all duration-300",
                      formData.destinations?.includes(dest.id)
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <p className="font-bold text-sm mb-1">{dest.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{dest.region}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Travel Month */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Calendar className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Travel Window</h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setFormData({ ...formData, travelMonth: month })}
                    className={cn(
                      "p-3 border-2 rounded-xl text-center transition-all duration-300",
                      formData.travelMonth === month
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <p className="font-bold text-sm">{month}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Travelers */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Your Party</h2>
              </div>
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="flex items-center justify-between p-6 border-2 border-border rounded-2xl">
                  <div>
                    <p className="font-bold">Adults</p>
                    <p className="text-xs text-muted-foreground">Age 18+</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button 
                      className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, adults: Math.max(1, (formData.travelers?.adults || 0) - 1)}})}
                    >-</button>
                    <span className="text-xl font-bold">{formData.travelers?.adults}</span>
                    <button 
                      className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, adults: (formData.travelers?.adults || 0) + 1}})}
                    >+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 border-2 border-border rounded-2xl">
                  <div>
                    <p className="font-bold">Children</p>
                    <p className="text-xs text-muted-foreground">Age 0-17</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button 
                      className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, children: Math.max(0, (formData.travelers?.children || 0) - 1)}})}
                    >-</button>
                    <span className="text-xl font-bold">{formData.travelers?.children}</span>
                    <button 
                      className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, children: (formData.travelers?.children || 0) + 1}})}
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <DollarSign className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Budget Planning</h2>
              </div>
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => setFormData({ ...formData, budget: budget.value })}
                    className={cn(
                      "w-full p-6 border-2 rounded-2xl text-left transition-all duration-300",
                      formData.budget === budget.value
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-bold">{budget.label}</p>
                      <p className="text-primary font-bold">{budget.range}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{budget.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Travel Style */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Compass className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Safari Style</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {travelStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <button
                      key={style.id}
                      onClick={() => toggleTravelStyle(style.id)}
                      className={cn(
                        "p-6 border-2 rounded-2xl text-center transition-all duration-300",
                        formData.travelStyle?.includes(style.id)
                          ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Icon className="size-8 mx-auto mb-4 text-primary" />
                      <p className="font-bold text-sm">{style.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Interests */}
          {currentStep === 6 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Camera className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Must-See Experiences</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "px-6 py-3 border-2 rounded-full transition-all duration-300 font-bold text-sm",
                      formData.interests?.includes(interest)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Contact */}
          {currentStep === 7 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <h2 className="text-3xl mb-0">Almost Finished</h2>
              </div>
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Where should we send your recommendations?"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Optional: for a faster response"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {renderNavigation()}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No Commitment</span>
          </div>
          <div className="flex items-center gap-3">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Expert Guided</span>
          </div>
          <div className="flex items-center gap-3">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Personalized</span>
          </div>
        </div>
      </Container>
      </div>
    </main>
  );
}