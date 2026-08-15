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

export const collections = { eventos, galeria };
