import { z } from "zod";

export const ConcertFormSchema = z.object({
  artistBand: z
    .string()
    .min(1, { message: "Artist or Band name must be at least 2 characters" }),
  location: z
    .string()
    .min(1, { message: "Location must be at least 2 characters" }),
  showDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  venue: z.string().optional(),
  tourName: z.string().optional(),
  topTracks: z.array(z.string().optional()).max(3),
  genre: z.string().optional(),
  review: z
    .string()
    .max(400, { message: "Your review can maximum be 400 characters" })
    .optional(),
});

export type Post = z.infer<typeof ConcertFormSchema>;
