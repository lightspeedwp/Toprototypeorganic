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
import { SITE_CONFIG } from "../../data/site-config";
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
      <section className="px-container-sm py-section-md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-fluid-2xl md:gap-fluid-3xl">
            {/* Brand Manifesto */}
            <div className="lg:col-span-2 flex flex-col gap-element-xl">
              <div className="flex flex-col gap-element-md">
                <SiteLogo width="160px" onClick={() => onNavigate?.('/')} />
                <p className="text-muted-foreground text-[length:var(--text-lg)] leading-relaxed max-w-sm m-0 italic font-[family-name:var(--font-family-lora)]">
                  "Defining the intersection of profound wilderness and refined architecture."
                </p>
              </div>
              
              <div className="flex gap-fluid-md">
                {SOCIAL_LINKS.map(({ id, platform, url, label }) => {
                  const Icon = SOCIAL_ICON_MAP[platform];
                  return (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="size-10 rounded-[var(--radius-xl)] bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-[var(--elevation-sm)]"
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
                <h4 className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-[0.25em] text-primary pb-element-xl">{section.heading}</h4>
                <ul className="flex flex-col gap-element-md m-0 p-0 list-none">
                  {section.items.map(item => (
                    <li key={item.id} className="m-0">
                      <button
                        onClick={() => onNavigate?.(item.href)}
                        className={cn(
                          "text-[length:var(--text-sm)] font-[var(--font-weight-bold)] transition-all flex items-center gap-fluid-sm group",
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
      <section className="bg-muted/30 border-y-2 border-border/50 px-container-sm py-section-sm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-2xl">
            <div className="flex items-center gap-fluid-md">
              <div className="p-element-sm rounded-[var(--radius-xl)] bg-background border border-border shadow-[var(--elevation-sm)]"><Mail className="size-5 text-primary" /></div>
              <div>
                <p className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground pb-element-xs">Dossier Request</p>
                <p className="text-[length:var(--text-sm)] font-[var(--font-weight-bold)]">{CONTACT_INFO.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-fluid-md">
              <div className="p-element-sm rounded-[var(--radius-xl)] bg-background border border-border shadow-[var(--elevation-sm)]"><Phone className="size-5 text-primary" /></div>
              <div>
                <p className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground pb-element-xs">Direct Access</p>
                <p className="text-[length:var(--text-sm)] font-[var(--font-weight-bold)]">{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-fluid-md">
              <div className="p-element-sm rounded-[var(--radius-xl)] bg-background border border-border shadow-[var(--elevation-sm)]"><MapPin className="size-5 text-primary" /></div>
              <div>
                <p className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground pb-element-xs">HQ Studio</p>
                <p className="text-[length:var(--text-sm)] font-[var(--font-weight-bold)]">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Legal / Copyright */}
      <section className="px-container-sm py-element-md">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-fluid-xl">
            <div className="flex items-center gap-fluid-lg">
              <p className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-[0.2em] text-muted-foreground/60 m-0">
                &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-fluid-xl">
              <button onClick={() => onNavigate?.('/dev-tools/template-tester')} className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border">Template Navigator</button>
              <button onClick={() => onNavigate?.('/dev-tools')} className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border">System Logic</button>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export default FooterNew;