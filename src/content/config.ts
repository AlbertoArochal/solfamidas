import { defineCollection, z } from "astro:content";

const eventos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    city: z.string(),
    type: z.enum([
      "Recital Solo",
      "Boda / Gala",
      "Música de Cámara",
      "Evento Privado",
    ]),
    link: z.string().url().optional(),
  }),
});

const galeria = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.enum([
      "Conciertos",
      "Bodas",
      "Sesión Editorial",
      "Detrás de Escena",
    ]),
  }),
});

const media = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.enum(["youtube", "soundcloud", "spotify", "vimeo"]),
    /** URL de la página del embed (YouTube/SoundCloud/Spotify/Vimeo) */
    url: z.string().url(),
    description: z.string().optional(),
  }),
});

const bio = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().default("Biografía"),
  }),
});

export const collections = { eventos, galeria, media, bio };
