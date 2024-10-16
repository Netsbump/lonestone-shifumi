"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ChoicePatchSchema: () => ChoicePatchSchema,
  ChoiceSchema: () => ChoiceSchema,
  CreateRoundSchema: () => CreateRoundSchema,
  DRAW: () => DRAW,
  FORFEIT: () => FORFEIT,
  GameSchema: () => GameSchema,
  IdSchema: () => IdSchema,
  LEAF: () => LEAF,
  OPPONENT: () => OPPONENT,
  PLAYER: () => PLAYER,
  PlayerPatchSchema: () => PlayerPatchSchema,
  PlayerSchema: () => PlayerSchema,
  RoundPatchSchema: () => RoundPatchSchema,
  SCISSORS: () => SCISSORS,
  STONE: () => STONE,
  Status: () => Status
});
module.exports = __toCommonJS(src_exports);

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
var import_zod = require("zod");
var IdSchema = import_zod.z.coerce.number().int().positive();
var NonEmptyStringSchema = import_zod.z.string().min(1, "must be a non-empty string");
var PlayerSchema = import_zod.z.object({
  name: NonEmptyStringSchema,
  isNPC: import_zod.z.boolean(),
  avatar_path: import_zod.z.string().optional()
});
var GameSchema = import_zod.z.object({
  playerName: NonEmptyStringSchema,
  opponentName: NonEmptyStringSchema
});
var ChoiceSchema = import_zod.z.object({
  playerId: import_zod.z.number(),
  round: import_zod.z.number(),
  action: import_zod.z.string()
});
var PlayerPatchSchema = PlayerSchema.pick({
  name: true,
  isNPC: true,
  avatar_path: true
}).partial();
var RoundSchema = import_zod.z.object({
  number: import_zod.z.number(),
  game: import_zod.z.number()
});
var CreatePlayerChoiceSchema = ChoiceSchema.pick({
  playerId: true,
  action: true
});
var CreateRoundSchema = RoundSchema.extend({
  playersChoices: import_zod.z.array(CreatePlayerChoiceSchema)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChoicePatchSchema,
  ChoiceSchema,
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
});
