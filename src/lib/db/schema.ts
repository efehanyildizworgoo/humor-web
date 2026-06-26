import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============ ADMIN ============
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============ SERVICES ============
export const services = pgTable(
  "services",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    icon: varchar("icon", { length: 64 }).notNull(), // lucide icon name
    title: text("title").notNull(),
    menuLabel: text("menu_label").notNull().default(""), // optional short name for nav/mega-menu; falls back to title
    shortDesc: text("short_desc").notNull().default(""),
    heroImage: text("hero_image").notNull().default(""),
    aboutImage: text("about_image").notNull().default(""),
    description: text("description").notNull().default(""),
    longDescription: text("long_description").notNull().default(""),
    whyUs: text("why_us").notNull().default(""),
    seoText: text("seo_text").notNull().default(""),
    metaTitle: text("meta_title").notNull().default(""),
    metaDescription: text("meta_description").notNull().default(""),
    bannerText: text("banner_text").notNull().default(""),
    orderIndex: integer("order_index").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("services_slug_idx").on(t.slug)],
);

export const serviceKeywords = pgTable("service_keywords", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  keyword: text("keyword").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceIdealFor = pgTable("service_ideal_for", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  item: text("item").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceFeatures = pgTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  text: text("text").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceProcess = pgTable("service_process", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  step: text("step").notNull(),
  desc: text("desc").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceFaqs = pgTable("service_faqs", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  q: text("q").notNull(),
  a: text("a").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceGallery = pgTable("service_gallery", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const serviceTestimonials = pgTable("service_testimonials", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  title: text("title").notNull().default(""),
  text: text("text").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const servicesRelations = relations(services, ({ many }) => ({
  keywords: many(serviceKeywords),
  idealFor: many(serviceIdealFor),
  features: many(serviceFeatures),
  process: many(serviceProcess),
  faqs: many(serviceFaqs),
  gallery: many(serviceGallery),
  testimonials: many(serviceTestimonials),
}));

// ============ PROJECTS ============
export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: text("title").notNull(),
    category: text("category").notNull().default(""),
    image: text("image").notNull().default(""),
    desc: text("desc").notNull().default(""),
    client: text("client").notNull().default(""),
    year: varchar("year", { length: 16 }).notNull().default(""),
    challenge: text("challenge").notNull().default(""),
    solution: text("solution").notNull().default(""),
    orderIndex: integer("order_index").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("projects_slug_idx").on(t.slug)],
);

export const projectServices = pgTable("project_services", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const projectResults = pgTable("project_results", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const projectGallery = pgTable("project_gallery", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  servicesList: many(projectServices),
  results: many(projectResults),
  gallery: many(projectGallery),
}));

// ============ GLOBAL CONTENT ============
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull().default(""),
  text: text("text").notNull(),
  avatar: text("avatar").notNull().default(""),
  orderIndex: integer("order_index").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  q: text("q").notNull(),
  a: text("a").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

// ============ NAV / FOOTER ============
export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const footerLinks = pgTable("footer_links", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(), // e.g. "Hizmetler", "Kurumsal"
  label: text("label").notNull(),
  href: text("href").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

// ============ SETTINGS (key/value) ============
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 128 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============ MESSAGES ============
export const contactMessages = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    phone: text("phone").notNull().default(""),
    subject: text("subject").notNull().default(""),
    message: text("message").notNull(),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("contact_messages_created_idx").on(t.createdAt)],
);

// ============ BLOG ============
export const blogCategories = pgTable(
  "blog_categories",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    orderIndex: integer("order_index").notNull().default(0),
  },
  (t) => [uniqueIndex("blog_categories_slug_idx").on(t.slug)],
);

export const blogTags = pgTable(
  "blog_tags",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    name: text("name").notNull(),
    orderIndex: integer("order_index").notNull().default(0),
  },
  (t) => [uniqueIndex("blog_tags_slug_idx").on(t.slug)],
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    coverImage: text("cover_image").notNull().default(""),
    content: text("content").notNull().default(""), // sanitized HTML
    author: text("author").notNull().default(""),
    categoryId: integer("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
    seoTitle: text("seo_title").notNull().default(""),
    seoDescription: text("seo_description").notNull().default(""),
    published: boolean("published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("blog_posts_slug_idx").on(t.slug),
    index("blog_posts_published_at_idx").on(t.publishedAt),
  ],
);

export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: integer("post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id").notNull().references(() => blogTags.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("blog_post_tags_pk").on(t.postId, t.tagId)],
);

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  postTags: many(blogPostTags),
}));

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, { fields: [blogPostTags.postId], references: [blogPosts.id] }),
  tag: one(blogTags, { fields: [blogPostTags.tagId], references: [blogTags.id] }),
}));

// ============ UPLOADS ============
export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),       // stored filename on disk
  originalName: text("original_name").notNull(),
  mimeType: varchar("mime_type", { length: 128 }).notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),                  // public URL
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
