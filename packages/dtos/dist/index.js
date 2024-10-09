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
  GameSchema: () => GameSchema,
  PlayerSchema: () => PlayerSchema,
  Status: () => Status
});
module.exports = __toCommonJS(src_exports);

// src/enums.ts
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["NOT_STARTED"] = "NOT_STARTED";
  Status2["IN_PROGRESS"] = "IN_PROGRESS";
  Status2["FINISHED"] = "FINISHED";
  return Status2;
})(Status || {});

// src/schemas.ts
var import_zod = require("zod");
var NonEmptyStringSchema = import_zod.z.string().min(1, "must be a non-empty string");
var PlayerSchema = import_zod.z.object({
  name: NonEmptyStringSchema,
  avatar_path: import_zod.z.string().optional()
});
var GameSchema = import_zod.z.object({
  players: import_zod.z.array(PlayerSchema)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GameSchema,
  PlayerSchema,
  Status
});
