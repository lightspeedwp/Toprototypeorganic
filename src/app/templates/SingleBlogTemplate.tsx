/**
 * Single Blog Template
 * 
 * Comprehensive blog post detail page using design system tokens.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useParams } from "react-router";
import { 
  Calendar, User, Tag, Clock, ShareNetwork as Share2, ChatCircle as MessageSquare, EnvelopeSimple as Mail, ArrowRight, Compass, Hash
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { AuthorBioPattern } from "../components/patterns/AuthorBioPattern";
import { NewsletterSignupPattern } from "../components/patterns/NewsletterSignupPattern";
import { BlogCard } from "../components/patterns/BlogCard";
import { CardGrid } from "../components/patterns/CardGrid";
import { useNavigation } from "../contexts/NavigationContext";
import { 
  ALL_BLOG_POSTS, ALL_BLOG_CATEGORIES, ALL_TEAM as TEAM_MEMBERS 
} from "../data/mockExpanded";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export function SingleBlogTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateToBlogPost, navigateTo } = useNavigation();
  
  const post = ALL_BLOG_POSTS.find(p => p.slug === slug) || ALL_BLOG_POSTS[0];
  const author = TEAM_MEMBERS.find(member => member.id === post.authorId);
  const categories = post.categories.map(catId => ALL_BLOG_CATEGORIES.find(c => c.id === catId)).filter(Boolean);

  const relatedPosts = ALL_BLOG_POSTS.filter(p => 
    p.id !== post.id && p.categories.some(cat => post.categories.includes(cat))
  ).slice(0, 3);

  if (relatedPosts.length < 3) {
    const extraPosts = ALL_BLOG_POSTS.filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id)).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...extraPosts);
  }

  return (
    <main className="wp-template-single-post theme-organic">
      <div className="organic-section-top">
        <BreadcrumbsPattern
          items={[
            { label: "Home", href: "/", onClick: () => navigateTo("/") },
            { label: "Chronicles", href: "/blog", onClick: () => navigateTo("/blog") },
            { label: post.title, isCurrent: true },
          ]}
          fullWidth={true}
        />

        <Hero
          title={post.title}
          intro={post.excerpt}
          context={categories[0]?.name || "Exploration"}
          image={post.featuredImage}
          height="medium"
          animated
          primaryCTA={{
            label: "Back to Chronicles",
            onClick: () => navigateTo("/blog")
          }}
          secondaryCTA={{
            label: "Book a Similar Trip",
            onClick: () => navigateTo("/tours"),
            variant: "outline"
          }}
        />

        {/* Post Meta Strip */}
        <div className="bg-card border-y-2 border-border/50 py-6 sticky top-0 z-[30] backdrop-blur-xl bg-background/80">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary"><Calendar className="size-4" /></div>
                  <span className="text-fluid-xs font-bold uppercase tracking-widest text-muted-foreground">{post.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary"><User className="size-4" /></div>
                  <span className="text-fluid-xs font-bold uppercase tracking-widest text-muted-foreground">{author?.name || "Expert Narrator"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-element-sm rounded-[var(--radius-sm)] bg-primary/5 text-primary"><Clock className="size-4" /></div>
                  <span className="text-fluid-xs font-bold uppercase tracking-widest text-muted-foreground">{post.readTime || "8 min reading"}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-fluid-xs font-bold uppercase tracking-widest text-foreground">Disseminate:</span>
                <button className="p-element-sm rounded-[var(--radius-sm)] hover:bg-primary/10 transition-colors"><Share2 className="size-4 text-primary" /></button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="organic-section-middle">
        <section className="py-section-lg">
          <Container>
            <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
              {/* Main Content */}
              <div className="lg:col-span-8 flex flex-col gap-section-sm">
                <article className="wp-entry-content prose prose-lg prose-serif max-w-none">
                  <EditorialContent
                    content={post.content}
                    variant="minimal"
                    className="p-0 border-0"
                  />
                </article>

                {/* Taxonomy Bar */}
                <div className="pt-element-lg border-t border-border/50">
                  <div className="flex flex-wrap items-center gap-element-md">
                    <div className="size-10 rounded-[var(--radius-sm)] bg-muted flex items-center justify-center text-muted-foreground"><Hash className="size-4" /></div>
                    {categories.map((cat: any) => (
                      <button 
                        key={cat.id}
                        onClick={() => navigateTo(`/blog/category/${cat.slug}`)}
                        className="px-element-md py-element-sm rounded-[var(--radius-md)] bg-muted hover:bg-primary hover:text-primary-foreground text-fluid-xs font-bold uppercase tracking-widest transition-all"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Perspective */}
                {author && (
                  <div>
                    <AuthorBioPattern 
                      member={author}
                      onClick={() => navigateTo(`/team/${author.slug}`)}
                    />
                  </div>
                )}

                {/* Engagement Section */}
                <div className="flex flex-col gap-element-lg">
                  <div className="flex items-center gap-element-md border-b border-border/50 pb-element-lg">
                    <div className="size-12 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center text-primary"><MessageSquare className="size-6" /></div>
                    <h3 className="text-fluid-3xl font-bold font-serif mb-0 wp-text--hand">Discourse</h3>
                  </div>
                  <div className="bg-muted/30 p-[var(--spacing-section-sm)] rounded-[var(--radius-lg)] text-center border-2 border-dashed border-border group hover:border-primary/30 transition-all duration-500 flex flex-col items-center gap-element-lg">
                    <p className="text-muted-foreground text-fluid-lg max-w-md italic">Share your unique perspective on this chronicle.</p>
                    <button className="bg-card border-2 border-border hover:border-primary px-element-xl py-element-md rounded-[var(--radius-md)] font-bold transition-all shadow-sm hover:shadow-xl">
                      Contribute a Thought
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col gap-12">
                  {/* Refined Signup */}
                  <div className="p-element-xl rounded-[var(--radius-lg)] bg-card border-2 border-border shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700"><Mail className="size-24" /></div>
                    <NewsletterSignupPattern
                      title="The Insider"
                      description="Profound insights delivered monthly."
                      variant="minimal"
                    />
                  </div>

                  {/* Categories Widget */}
                  <div className="p-element-xl rounded-[var(--radius-lg)] bg-muted/30 border-2 border-border/50 flex flex-col gap-element-lg">
                    <h4 className="text-fluid-xs font-bold uppercase tracking-widest text-foreground">Chronicle Themes</h4>
                    <ul className="flex flex-col gap-element-sm m-0 p-0 list-none">
                      {ALL_BLOG_CATEGORIES.map(cat => (
                        <li key={cat.id}>
                          <button 
                            onClick={() => navigateTo(`/blog/category/${cat.slug}`)}
                            className="flex items-center justify-between w-full p-element-sm rounded-[var(--radius-sm)] hover:bg-background border border-transparent hover:border-border transition-all group"
                          >
                            <span className="font-bold text-muted-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                            <span className="text-fluid-xs font-bold bg-muted group-hover:bg-primary group-hover:text-primary-foreground px-2 py-1 rounded-[var(--radius-sm)] transition-all">
                              {Math.floor(Math.random() * 12) + 1}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Promotional Context */}
                  <div className="p-element-xl rounded-[var(--radius-lg)] bg-primary text-primary-foreground shadow-2xl overflow-hidden relative group cursor-pointer" onClick={() => navigateTo("/tours")}>
                    <div className="relative z-10 flex flex-col gap-element-md">
                      <span className="text-fluid-xs font-bold uppercase tracking-[0.2em] opacity-70 block">Expedition Call</span>
                      <h4 className="text-fluid-2xl font-bold font-serif leading-tight wp-text--hand">Translate Inspiration into Reality</h4>
                      <p className="text-fluid-sm opacity-80 leading-relaxed">Begin crafting your own African chronicle with our master architects.</p>
                      <div className="flex items-center gap-element-sm text-fluid-xs font-bold uppercase tracking-widest bg-background/10 backdrop-blur-md px-element-lg py-element-sm rounded-[var(--radius-sm)] w-fit">
                        Begin Journey <ArrowRight className="size-4" />
                      </div>
                    </div>
                    <Compass className="size-48 text-white/5 absolute -bottom-12 -right-12 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle-alt">
        {/* Continuation Feed */}
        <section className="py-section-lg bg-muted/10 border-t-2 border-border/50">
          <Container>
            <div className="flex flex-col gap-fluid-md">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="max-w-2xl flex flex-col gap-element-sm">
                  <span className="text-fluid-xs font-bold uppercase tracking-widest text-primary block">Related Chronicles</span>
                  <h2 className="text-fluid-4xl font-bold font-serif wp-text--hand">Extend Your Discovery</h2>
                </div>
                <button 
                  onClick={() => navigateTo("/blog")}
                  className="text-fluid-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-8 transition-all"
                >
                  Archive Repository →
                </button>
              </div>
              
              <CardGrid columns={3} animated>
                {relatedPosts.map(post => (
                  <BlogCard 
                    key={post.id}
                    post={post}
                    onClick={() => navigateToBlogPost(post.slug)}
                  />
                ))}
              </CardGrid>
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-bottom">
        <CTA
          title="Command Your Perspective"
          description="Join our curated expeditions and experience the raw poetry of the African wilderness firsthand."
          variant="default"
          primaryAction={{ label: "View Active Expeditions", onClick: () => navigateTo("/tours") }}
          secondaryAction={{ label: "Request Curated Dossier", onClick: () => navigateTo("/contact") }}
        />
      </div>
    </main>
  );
}

export default SingleBlogTemplate;