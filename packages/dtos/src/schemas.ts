import { z } from 'zod'

const NonEmptyStringSchema = z.string().min(1, 'must be a non-empty string');
export const PlayerSchema = z.object({
    name: NonEmptyStringSchema,
    avatar_path: z.string().optional()
})

export const GameSchema = z.object({
    players: z.array(PlayerSchema)
})