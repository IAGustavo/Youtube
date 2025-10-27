export const site = {
  name: "Wiliams Gustavo Anampa Ventura",
  title: "Gestor / Desarrollador en Sistemas Informáticos",
  description: "Blog personal de desarrollo, sistemas, proyectos y aprendizaje continuo.",
  siteUrl: process.env.SITE_URL || "https://mi-blog.vercel.app",
  avatarUrl: "/avatar.jpg",
  social: {
    twitter: "",
    github: "https://github.com/IAGustavo",
    linkedin: "https://www.linkedin.com/in/gustavo-wiliams-anampa-ventura/",
    youtube: "https://www.youtube.com/@gustavoanampaventura4019",
    email: "mailto:contacto@example.com",
  },
} as const;
