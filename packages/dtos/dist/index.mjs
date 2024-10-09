// src/enums.ts
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["NOT_STARTED"] = "NOT_STARTED";
  Status2["IN_PROGRESS"] = "IN_PROGRESS";
  Status2["FINISHED"] = "FINISHED";
  return Status2;
})(Status || {});

// src/schemas.ts
import { z } from "zod";
var NonEmptyStringSchema = z.string().min(1, "must be a non-empty string");
var PlayerSchema = z.object({
  name: NonEmptyStringSchema,
  avatar_path: z.string().optional()
});
var GameSchema = z.object({
  players: z.array(PlayerSchema)
});
export {
  GameSchema,
  PlayerSchema,
  Status
};
