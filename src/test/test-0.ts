import { z } from "zod";
import { parse } from "../index.js";

const schema = z.object({
  required: z.string(),
  test: z.string().default("default value"),
  optional: z.string().optional(),
  numbered: z.coerce.number().default(0),
});

export type Schema = z.infer<typeof schema>;
//    ^?
export const env = parse(schema, { path: "./path.env" });
export type Env = typeof env;
//    ^?
console.log(env);
