import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "@phosphor-icons/react/dist/ssr";
import { brand } from "@/config/brand";
import { getAllPosts, getFeaturedPosts, blogCategories } from "@/content/blog";
import { NavPill } from "@/components/layout/NavPill";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur la performance web, le SEO, le cloud et le développement. Conseils et études de cas par Stellar Wave.",
  openGraph: {
    title: `Blog | ${brand.name}`,
    description:
      "Articles sur la performance web, le SEO, le cloud et le développement.",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="min-h-screen bg-background">
      <NoiseOverlay />
      <NavPill />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
              Blog & Ressources
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Insights & <span className="text-gradient">Études de cas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Performance, SEO, Cloud, Développement. Conseils pratiques et retours
              d&apos;expérience pour améliorer votre présence digitale.
            </p>
          </div>

          {/* Featured posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-20">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                À la une
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="glass rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1">
                      {/* Category badge */}
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${blogCategories[post.category].color} 15%, transparent)`,
                          color: blogCategories[post.category].color,
                        }}
                      >
                        {blogCategories[post.category].label}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 group-hover:text-[var(--ember-amber)] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readingTime} min
                        </span>
                      </div>

                      {/* Read more */}
                      <div className="mt-6 flex items-center gap-2 text-[var(--ember-amber)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire l&apos;article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All posts */}
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
              Tous les articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1">
                    {/* Category badge */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${blogCategories[post.category].color} 15%, transparent)`,
                        color: blogCategories[post.category].color,
                      }}
                    >
                      {blogCategories[post.category].label}
                    </span>

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[var(--ember-amber)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 text-center">
            <div className="glass rounded-2xl p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Recevez nos conseils par email
              </h2>
              <p className="text-muted-foreground mb-8">
                Un article par semaine sur la performance, le SEO et le cloud.
                Pas de spam.
              </p>
              <Link
                href="/audit-gratuit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg aurora-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Commencer par un mini-audit gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
