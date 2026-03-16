/**
 * Enquiry Modal Pattern Component
 * 
 * A conversion-focused modal dialog with an enquiry form.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../blocks/ui/dialog";
import { Input } from "../blocks/ui/input";
import { Textarea } from "../blocks/ui/textarea";
import { Label } from "../blocks/ui/label";
import { Button } from "../blocks/design/Button";
import { CheckCircle, Sparkle, Compass, ShieldCheck, Envelope, Phone, User, ChatText } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface EnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  successMessage?: string;
}

export function EnquiryModal({
  open,
  onOpenChange,
  title = "Begin Your Expedition Chronicle",
  description = "Translate your vision into a definitive itinerary. Our master architects are ready to curate your unique African story.",
  successMessage = "Your dossier request has been received. An expedition specialist will contact you shortly to begin the design process.",
}: EnquiryModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 500);
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[800px] p-0 overflow-hidden border-none rounded-4xl bg-background shadow-2xl")}>
        <div className="wp-pattern-enquiry">
          {/* Visual Sidebar */}
          <div className="wp-pattern-enquiry__sidebar">
            <img 
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801" 
              alt="Wilderness" 
              className="wp-pattern-enquiry__image"
              loading="lazy"
            />
            <div className="wp-pattern-enquiry__overlay" />
            
            <div className="wp-pattern-enquiry__sidebar-content">
              <div>
                <div className="wp-pattern-enquiry__icon-box">
                  <Compass size={24} weight="fill" />
                </div>
                <h3 className="wp-pattern-enquiry__sidebar-title">The Art of Exploration</h3>
                <p className="wp-pattern-enquiry__sidebar-desc">We define the intersection of profound wilderness and refined architecture.</p>
                
                <ul className="wp-pattern-enquiry__list">
                  {[
                    { icon: ShieldCheck, text: "Discrete Consultation" },
                    { icon: Sparkle, text: "Bespoke Design" },
                    { icon: Compass, text: "Expert Navigation" }
                  ].map((item, i) => (
                    <li key={i} className="wp-pattern-enquiry__list-item">
                      <item.icon size={16} className="wp-pattern-enquiry__list-icon" /> {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="wp-pattern-enquiry__footer-text">LightSpeed Studio &copy; 2026</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="wp-pattern-enquiry__form-side">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DialogHeader className="wp-pattern-enquiry__header">
                    <div className="wp-pattern-enquiry__eyebrow">
                      <div className="wp-pattern-enquiry__eyebrow-line" />
                      <span className="wp-pattern-enquiry__eyebrow-text">Inquiry Protocol</span>
                    </div>
                    <DialogTitle className="wp-pattern-enquiry__title">{title}</DialogTitle>
                    <DialogDescription className="wp-pattern-enquiry__description">
                      {description}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="wp-pattern-enquiry__form">
                    <div className="wp-pattern-enquiry__form-grid">
                      <div className="wp-pattern-enquiry__field">
                        <Label htmlFor="name" className="wp-pattern-enquiry__label">Full Name</Label>
                        <div className="wp-pattern-enquiry__input-wrapper">
                          <User size={16} className="wp-pattern-enquiry__input-icon" />
                          <Input id="name" name="name" placeholder="E.g. Julian Vane" value={formData.name} onChange={handleChange} required className="wp-pattern-enquiry__input" />
                        </div>
                      </div>
                      <div className="wp-pattern-enquiry__field">
                        <Label htmlFor="email" className="wp-pattern-enquiry__label">Digital Address</Label>
                        <div className="wp-pattern-enquiry__input-wrapper">
                          <Envelope size={16} className="wp-pattern-enquiry__input-icon" />
                          <Input id="email" name="email" type="email" placeholder="julian@vane.com" value={formData.email} onChange={handleChange} required className="wp-pattern-enquiry__input" />
                        </div>
                      </div>
                    </div>

                    <div className="wp-pattern-enquiry__field">
                      <Label htmlFor="message" className="wp-pattern-enquiry__label">Vision Brief</Label>
                      <div className="wp-pattern-enquiry__input-wrapper">
                        <ChatText size={16} className="wp-pattern-enquiry__textarea-icon" />
                        <Textarea id="message" name="message" placeholder="Describe the atmosphere, territory, and narrative you wish to experience..." value={formData.message} onChange={handleChange} className="wp-pattern-enquiry__textarea" />
                      </div>
                    </div>

                    <div className="wp-pattern-enquiry__submit-wrapper">
                      <Button type="submit" variant="primary" className="wp-pattern-enquiry__submit-btn">
                        Dispatch Request <Compass size={16} />
                      </Button>
                    </div>

                    <p className="wp-pattern-enquiry__disclaimer">Absolute discretion guaranteed</p>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="wp-pattern-enquiry__success"
                >
                  <div className="wp-pattern-enquiry__success-icon-box">
                    <CheckCircle size={48} weight="fill" />
                  </div>
                  <h3 className="wp-pattern-enquiry__success-title">Dossier Request Dispatched</h3>
                  <p className="wp-pattern-enquiry__success-desc">
                    "{successMessage}"
                  </p>
                  <div className="wp-pattern-enquiry__progress-bg">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3.5 }}
                      className="wp-pattern-enquiry__progress-bar"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EnquiryModal;