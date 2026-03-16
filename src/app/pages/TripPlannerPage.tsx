/**
 * Trip Planner Tool Page
 * 
 * Interactive multi-step form that captures high-quality leads by helping
 * users plan their perfect trip while collecting detailed preferences.
 */

import * as React from "react";
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
import "../../styles/pages/trip-planner.css";

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
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Partial<TripPlannerData>>({
    destinations: [],
    travelers: { adults: 2, children: 0 },
    travelStyle: [],
    interests: []
  });
  const [submitted, setSubmitted] = React.useState(false);

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
    <div className="flex flex-col gap-fluid-sm pb-section-sm">
      <div className="flex items-center justify-between">
        <span className="text-fluid-xs uppercase tracking-widest text-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-fluid-xs text-primary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-[var(--radius-full)] overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ '--dynamic-width': `${(currentStep / totalSteps) * 100}%`, width: 'var(--dynamic-width)' } as React.CSSProperties}
        />
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex gap-fluid-sm pt-element-xl border-t border-border/50">
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
            <div className="text-center flex flex-col gap-fluid-xl items-center">
              <div className="size-20 rounded-[var(--radius-full)] bg-primary/10 flex items-center justify-center">
                <CircleCheck className="size-10 text-primary" />
              </div>
              <div className="flex flex-col gap-fluid-sm">
                <HeadingBlock level={1}>Request Received</HeadingBlock>
                <ParagraphBlock className="text-muted-foreground pb-element-lg">
                  Our specialists are already reviewing your preferences. We'll send a personalized proposal 
                  to <strong>{formData.email}</strong> shortly.
                </ParagraphBlock>
              </div>

              <div className="bg-muted/30 p-element-xl rounded-[var(--radius-lg)] text-left border border-border/50 flex flex-col gap-fluid-lg w-full">
                <h3 className="text-fluid-xl m-0 wp-text--hand">Your Planning Roadmap</h3>
                <ul className="flex flex-col gap-fluid-lg list-none m-0 p-0">
                  <li className="flex gap-fluid-sm">
                    <div className="size-6 rounded-[var(--radius-full)] bg-primary text-primary-foreground flex items-center justify-center text-fluid-xs shrink-0">1</div>
                    <div>
                      <p className="text-fluid-sm m-0">Expert Analysis</p>
                    <p className="text-fluid-xs text-muted-foreground m-0">A safari specialist is matching your interests with the best locations.</p>
                  </div>
                </li>
                <li className="flex gap-fluid-sm">
                  <div className="size-6 rounded-[var(--radius-full)] bg-primary text-primary-foreground flex items-center justify-center text-fluid-xs shrink-0">2</div>
                  <div>
                    <p className="text-fluid-sm m-0">Personalized Proposal</p>
                    <p className="text-fluid-xs text-muted-foreground m-0">You'll receive a custom itinerary with lodges, pricing, and maps.</p>
                  </div>
                </li>
                <li className="flex gap-fluid-sm">
                  <div className="size-6 rounded-[var(--radius-full)] bg-primary text-primary-foreground flex items-center justify-center text-fluid-xs shrink-0">3</div>
                  <div>
                    <p className="text-fluid-sm m-0">Consultation</p>
                    <p className="text-fluid-xs text-muted-foreground m-0">We'll schedule a call to fine-tune every detail until it's perfect.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-fluid-sm w-full">
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
      <div className="organic-section-middle py-section-lg min-h-[80vh]">
        <Container maxWidth="md" className="flex flex-col gap-fluid-2xl">
          <div className="text-center flex flex-col gap-fluid-sm">
            <HeadingBlock level={1}>The Safari Designer</HeadingBlock>
            <ParagraphBlock className="text-muted-foreground max-w-xl self-center m-0">
              Design your dream African adventure in less than 2 minutes. 
              Our experts will turn your vision into a reality.
            </ParagraphBlock>
          </div>

          <div className="bg-card p-element-xl md:p-element-2xl rounded-[var(--radius-lg)] shadow-xl border border-border/50 flex flex-col gap-fluid-xl">
            {renderProgress()}

          {/* Step 1: Destinations */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Dream Destinations</h2>
              </div>
              <div className="wp-page-trip-planner__destinations-grid">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => toggleDestination(dest.id)}
                    className={cn(
                      "wp-page-trip-planner__destination-card",
                      formData.destinations?.includes(dest.id) &&
                        "wp-page-trip-planner__destination-card--selected"
                    )}
                  >
                    <p className="wp-page-trip-planner__destination-card__name">{dest.name}</p>
                    <p className="wp-page-trip-planner__destination-card__region">{dest.region}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Travel Month */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Calendar className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Travel Window</h2>
              </div>
              <div className="wp-page-trip-planner__months-grid">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setFormData({ ...formData, travelMonth: month })}
                    className={cn(
                      "wp-page-trip-planner__month-card",
                      formData.travelMonth === month &&
                        "wp-page-trip-planner__month-card--selected"
                    )}
                  >
                    <p className="wp-page-trip-planner__month-card__label">{month}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Travelers */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Your Party</h2>
              </div>
              <div className="flex flex-col gap-element-md max-w-sm self-center w-full">
                <div className="flex items-center justify-between p-element-lg border-2 border-border rounded-[var(--radius-lg)]">
                  <div>
                    <p className="m-0">Adults</p>
                    <p className="text-fluid-xs text-muted-foreground m-0">Age 18+</p>
                  </div>
                  <div className="flex items-center gap-fluid-md">
                    <button 
                      className="size-10 rounded-[var(--radius-full)] border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, adults: Math.max(1, (formData.travelers?.adults || 0) - 1)}})}
                    >-</button>
                    <span className="text-fluid-xl">{formData.travelers?.adults}</span>
                    <button 
                      className="size-10 rounded-[var(--radius-full)] border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, adults: (formData.travelers?.adults || 0) + 1}})}
                    >+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-element-lg border-2 border-border rounded-[var(--radius-lg)]">
                  <div>
                    <p className="m-0">Children</p>
                    <p className="text-fluid-xs text-muted-foreground m-0">Age 0-17</p>
                  </div>
                  <div className="flex items-center gap-fluid-md">
                    <button 
                      className="size-10 rounded-[var(--radius-full)] border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, children: Math.max(0, (formData.travelers?.children || 0) - 1)}})}
                    >-</button>
                    <span className="text-fluid-xl">{formData.travelers?.children}</span>
                    <button 
                      className="size-10 rounded-[var(--radius-full)] border border-border flex items-center justify-center hover:bg-muted"
                      onClick={() => setFormData({...formData, travelers: {...formData.travelers!, children: (formData.travelers?.children || 0) + 1}})}
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <DollarSign className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Budget Planning</h2>
              </div>
              <div className="flex flex-col gap-element-md">
                {budgets.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => setFormData({ ...formData, budget: budget.value })}
                    className={cn(
                      "w-full p-element-lg border-2 rounded-[var(--radius-lg)] text-left transition-all duration-300",
                      formData.budget === budget.value
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-fluid-lg m-0">{budget.label}</p>
                      <p className="text-primary m-0">{budget.range}</p>
                    </div>
                    <p className="text-fluid-sm text-muted-foreground m-0">{budget.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Travel Style */}
          {currentStep === 5 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Compass className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Safari Style</h2>
              </div>
              <div className="wp-page-trip-planner__styles-grid">
                {travelStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <button
                      key={style.id}
                      onClick={() => toggleTravelStyle(style.id)}
                      className={cn(
                        "wp-page-trip-planner__style-card",
                        formData.travelStyle?.includes(style.id) &&
                          "wp-page-trip-planner__style-card--selected"
                      )}
                    >
                      <Icon className="wp-page-trip-planner__style-card__icon" />
                      <p className="wp-page-trip-planner__style-card__label">{style.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Interests */}
          {currentStep === 6 && (
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Camera className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Must-See Experiences</h2>
              </div>
              <div className="flex flex-wrap gap-fluid-sm">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "px-element-lg py-element-md border-2 rounded-[var(--radius-full)] transition-all duration-300 text-fluid-sm",
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
            <div className="flex flex-col gap-element-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-fluid-sm">
                <div className="p-element-sm rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <h2 className="text-fluid-3xl m-0">Almost Finished</h2>
              </div>
              <div className="grid gap-fluid-md">
                <div className="flex flex-col gap-element-xs">
                  <label htmlFor="name" className="block text-fluid-sm m-0">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-element-md border-2 border-border rounded-[var(--radius-md)] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-element-xs">
                  <label htmlFor="email" className="block text-fluid-sm m-0">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Where should we send your recommendations?"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-element-md border-2 border-border rounded-[var(--radius-md)] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-element-xs">
                  <label htmlFor="phone" className="block text-fluid-sm m-0">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Optional: for a faster response"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-element-md border-2 border-border rounded-[var(--radius-md)] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {renderNavigation()}
        </div>

        {/* Trust Indicators */}
        <div className="pt-section-sm flex flex-wrap justify-center gap-fluid-lg md:gap-fluid-xl">
          <div className="flex items-center gap-fluid-sm">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-fluid-xs text-muted-foreground uppercase tracking-widest">No Commitment</span>
          </div>
          <div className="flex items-center gap-fluid-sm">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-fluid-xs text-muted-foreground uppercase tracking-widest">Expert Guided</span>
          </div>
          <div className="flex items-center gap-fluid-sm">
            <CircleCheck className="size-5 text-primary" />
            <span className="text-fluid-xs text-muted-foreground uppercase tracking-widest">Personalized</span>
          </div>
        </div>
      </Container>
      </div>
    </main>
  );
}