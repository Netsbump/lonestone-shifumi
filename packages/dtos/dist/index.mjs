// src/constants.ts
var PLAYER = "player";
var OPPONENT = "opponent";
var DRAW = "draw";
var LEAF = "LEAF";
var STONE = "STONE";
var SCISSORS = "SCISSORS";
var FORFEIT = "FORFEIT";

// src/enums.ts
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["NOT_STARTED"] = "NOT_STARTED";
  Status2["IN_PROGRESS"] = "IN_PROGRESS";
  Status2["FINISHED"] = "FINISHED";
  return Status2;
})(Status || {});

// src/schemas.ts
import { z } from "zod";
var IdSchema = z.coerce.number().int().positive();
var NonEmptyStringSchema = z.string().min(1, "must be a non-empty string");
var PlayerSchema = z.object({
  name: NonEmptyStringSchema,
  isNPC: z.boolean(),
  avatar_path: z.string().optional()
});
var GameSchema = z.object({
  playerName: NonEmptyStringSchema,
  opponentName: NonEmptyStringSchema
});
var ChoiceSchema = z.object({
  playerId: z.number(),
  round: z.number(),
  action: z.string()
});
var PlayerPatchSchema = PlayerSchema.pick({
  name: true,
  isNPC: true,
  avatar_path: true
}).partial();
var RoundSchema = z.object({
  number: z.number(),
  game: z.number()
});
var CreatePlayerChoiceSchema = ChoiceSchema.pick({
  playerId: true,
  action: true
});
var CreateRoundSchema = z.object({
  gameId: z.number(),
  player: z.object({
    name: z.string(),
    action: z.string()
  })
});
var ChoicePatchSchema = ChoiceSchema.pick({
  playerId: true,
  round: true,
  action: true
}).partial();
var RoundPatchSchema = RoundSchema.pick({
  number: true,
  game: true
}).partial();
export {
  ChoicePatchSchema,
  ChoiceSchema,
  CreatePlayerChoiceSchema,
  CreateRoundSchema,
  DRAW,
  FORFEIT,
  GameSchema,
  IdSchema,
  LEAF,
  OPPONENT,
  PLAYER,
  PlayerPatchSchema,
  PlayerSchema,
  RoundPatchSchema,
  SCISSORS,
  STONE,
  Status
};
