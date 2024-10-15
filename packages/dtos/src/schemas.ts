import { z } from 'zod';

export const IdSchema = z.coerce.number().int().positive();

const NonEmptyStringSchema = z.string().min(1, 'must be a non-empty string');

export const PlayerSchema = z.object({
    name: NonEmptyStringSchema,
    isNPC: z.boolean(),
    avatar_path: z.string().optional()
})

export const GameSchema = z.object({
    playerName: NonEmptyStringSchema,
    opponentName: NonEmptyStringSchema
})

export const ChoiceSchema = z.object({
    playerId: z.number(),
    round: z.number(),
    action: z.string()
})

export const PlayerPatchSchema = PlayerSchema.pick({
    name: true,
    isNPC: true,
    avatar_path: true
}).partial()

const RoundSchema = z.object({
    number: z.number(),
    game: z.number(),
})

const CreatePlayerChoiceSchema = ChoiceSchema.pick({
    playerId: true,
    action: true
})
  
export const CreateRoundSchema = RoundSchema.extend({
    playersChoices: z.array(CreatePlayerChoiceSchema),
})


export const ChoicePatchSchema = ChoiceSchema.pick({
    playerId: true,
    round: true,
    action: true
}).partial()

export const RoundPatchSchema = RoundSchema.pick({
    number: true, 
    game: true
}).partial()
