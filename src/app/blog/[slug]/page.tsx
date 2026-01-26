import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
} from "@phosphor-icons/react/dist/ssr";
import { brand } from "@/config/brand";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  blogCategories,
} from "@/content/blog";
import { NavPill } from "@/components/layout/NavPill";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | ${brand.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // JSON-LD for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: brand.siteUrl,
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${brand.siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <NoiseOverlay />
      <NavPill />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="pt-32 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Category */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{
                backgroundColor: `color-mix(in srgb, ${blogCategories[post.category].color} 15%, transparent)`,
                color: blogCategories[post.category].color,
              }}
            >
              {blogCategories[post.category].label}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--ember-amber)] to-[var(--ember-coral)] flex items-center justify-center text-primary-foreground font-semibold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-xs">{post.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min de lecture
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-[var(--ember-amber)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-[var(--ember-amber)]
              prose-code:text-[var(--ember-amber)] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-table:text-sm
              prose-th:text-foreground prose-th:font-semibold prose-th:bg-white/5 prose-th:px-4 prose-th:py-2
              prose-td:text-muted-foreground prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Besoin d&apos;aide pour optimiser votre site ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Demandez un mini-audit gratuit et recevez des recommandations
              personnalisées.
            </p>
            <Link
              href="/audit-gratuit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg aurora-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Obtenir mon audit gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <article className="glass rounded-xl p-5 h-full transition-all duration-300 hover:bg-white/[0.06]">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-3"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${blogCategories[relatedPost.category].color} 15%, transparent)`,
                          color: blogCategories[relatedPost.category].color,
                        }}
                      >
                        {blogCategories[relatedPost.category].label}
                      </span>
                      <h3 className="font-semibold text-foreground group-hover:text-[var(--ember-amber)] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {relatedPost.readingTime} min
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
