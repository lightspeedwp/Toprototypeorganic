/**
 * Site Footer — WordPress Template Part
 *
 * Comprehensive footer consuming navigation and contact data from
 * the centralized data files. No hardcoded links or contact info.
 *
 * WordPress Mapping: parts/footer.html
 * CSS: /src/styles/parts/footer.css (BEM: .wp-part-footer__*)
 *
 * @module FooterNew
 * @category parts
 */

import { Container } from "../common/Container";
import { SiteLogo, SiteTagline } from "../blocks/theme";
import { FacebookLogo as Facebook, InstagramLogo as Instagram, TwitterLogo as Twitter, LinkedinLogo as Linkedin, YoutubeLogo as Youtube, ArrowUpRight, EnvelopeSimple as Mail, Phone, MapPin } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { FOOTER_NAV, SOCIAL_LINKS, CONTACT_INFO } from "../../data/content/navigation";
import type { SocialPlatform } from "../../data/types/template-parts";

interface FooterNewProps {
  currentPage?: string;
  onNavigate?: (path: string) => void;
}

/** Map platform id → lucide icon component. */
const SOCIAL_ICON_MAP: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Instagram, // fallback
  pinterest: Instagram, // fallback
};

export function FooterNew({ currentPage, onNavigate }: FooterNewProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wp-part-footer bg-card border-t-2 border-border/50 p-[0px]">
      {/* Prime Footer Content */}
      <section className="px-[24px] py-[60px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 md:gap-24">
            {/* Brand Manifesto */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <SiteLogo width="220px" onClick={() => onNavigate?.('/')} />
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm m-0 italic font-serif">
                  "Defining the intersection of profound wilderness and refined architecture."
                </p>
              </div>
              
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ id, platform, url, label }) => {
                  const Icon = SOCIAL_ICON_MAP[platform];
                  return (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="size-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Nav Ecosystem — driven by FOOTER_NAV data */}
            {FOOTER_NAV.map((section) => (
              <div key={section.id}>
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-8">{section.heading}</h4>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {section.items.map(item => (
                    <li key={item.id} className="m-0">
                      <button
                        onClick={() => onNavigate?.(item.href)}
                        className={cn(
                          "text-sm font-bold transition-all flex items-center gap-2 group",
                          currentPage === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust & Contact Strip — driven by CONTACT_INFO data */}
      <section className="bg-muted/30 border-y-2 border-border/50 px-[24px] py-[48px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-background border border-border shadow-sm"><Mail className="size-5 text-primary" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Dossier Request</p>
                <p className="text-sm font-bold">{CONTACT_INFO.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-background border border-border shadow-sm"><Phone className="size-5 text-primary" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Direct Access</p>
                <p className="text-sm font-bold">{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-background border border-border shadow-sm"><MapPin className="size-5 text-primary" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">HQ Studio</p>
                <p className="text-sm font-bold">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Legal / Copyright */}
      <section className="px-[24px] py-[16px]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 m-0">
                &copy; {currentYear} LightSpeed Studio. Architectural Safaris.
              </p>
            </div>
            
            <div className="flex gap-8">
              <button onClick={() => onNavigate?.('/dev-tools/template-tester')} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border">Template Navigator</button>
              <button onClick={() => onNavigate?.('/dev-tools')} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border">System Logic</button>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export default FooterNew;
