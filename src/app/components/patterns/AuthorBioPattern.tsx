/**
 * Author Bio Pattern - WordPress BEM CSS Version
 * 
 * Displays author information including avatar, bio, and social links.
 * Used at the end of blog posts and on author archive pages.
 * 
 * @module AuthorBioPattern
 * @category patterns
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { EnvelopeSimple as Mail, Globe, LinkedinLogo as Linkedin, TwitterLogo as Twitter, InstagramLogo as Instagram } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export interface AuthorSocial {
  platform: 'email' | 'website' | 'linkedin' | 'twitter' | 'instagram' | 'custom';
  url: string;
  label?: string;
}

export interface AuthorBioPatternProps {
  name: string;
  role?: string;
  bio: string;
  avatar?: string;
  socialLinks?: AuthorSocial[];
  articleCount?: number;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

const socialIcons = {
  email: Mail,
  website: Globe,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function AuthorBioPattern({
  name,
  role,
  bio,
  avatar,
  socialLinks = [],
  articleCount,
  variant = 'default',
  className,
}: AuthorBioPatternProps) {
  const isCompact = variant === 'compact';
  const isInline = variant === 'inline';

  return (
    <section className={cn("py-section-sm", className)}>
      <Container maxWidth={isInline ? 'lg' : 'md'}>
        <article className={cn(
          "wp-pattern-author-bio",
          `wp-pattern-author-bio--${variant}`,
          "bg-card border border-border rounded-lg p-6 md:p-8"
        )}>
          <div className={cn(
            "flex gap-6 md:gap-8",
            isCompact || isInline ? "flex-row items-start" : "flex-col md:flex-row md:items-center"
          )}>
            {/* Avatar */}
            {avatar && (
              <div className="flex-shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className={cn(
                    "rounded-full object-cover border-2 border-primary/10",
                    isCompact ? "w-16 h-16" : "w-24 h-24 md:w-32 md:h-32"
                  )}
                />
              </div>
            )}

            {/* Author Info */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-4">
                <HeadingBlock 
                  level={isCompact ? 4 : 3}
                  className="mb-1"
                >
                  {name}
                </HeadingBlock>
                {role && (
                  <p className="text-primary font-medium text-sm md:text-base">
                    {role}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="mb-6">
                <ParagraphBlock className="text-muted-foreground leading-relaxed">
                  {bio}
                </ParagraphBlock>
              </div>

              {/* Footer Meta & Social */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                {articleCount !== undefined && (
                  <span className="text-sm text-muted-foreground font-medium">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </span>
                )}

                {socialLinks.length > 0 && (
                  <nav className="flex items-center gap-3" aria-label={`Social links for ${name}`}>
                    {socialLinks.map((social, index) => {
                      const Icon = socialIcons[social.platform as keyof typeof socialIcons] || Globe;
                      
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all"
                          aria-label={social.label || `${name}'s ${social.platform}`}
                        >
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
