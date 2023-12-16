import { z } from "zod";
import { parse } from '../index.js';

const schema = z.object({
  required: z.string(),
  test: z.string().default("default value"),
  optional: z.string().optional(),
  numbered: z.coerce.number().default(0),
});

type Schema = z.infer<typeof schema>;
//    ^?
const env = parse(schema, { path: "./path.env" });
type Env = typeof env;
//    ^?
console.log(env);
