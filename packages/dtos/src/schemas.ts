import { z } from 'zod'

export const IdSchema = z.number().int().positive()

const NonEmptyStringSchema = z.string().min(1, 'must be a non-empty string');

export const PlayerSchema = z.object({
    name: NonEmptyStringSchema,
    avatar_path: z.string().optional()
})

export const GameSchema = z.object({
    players: z.array(z.number())
})

export const ChoiceSchema = z.object({
    player: z.number(),
    round: z.number(),
    action: z.string()
})

export const RoundSchema = z.object({
    number: z.number(),
    game: z.number(),
})