import { parse as dotParse } from "dotenv";
import { readFileSync } from "node:fs";
import { PartialZodEnvOptions } from "types";
import { ZodRawShape, z } from "zod";

/**
 * Parses your Environment Variables with a Zod Schema
 * By default, will merge `.env` file variables and `process.env` variables,
 * until you explicitly set `ignoreProcessEnv` to `true`.
 * @param schema A Zod schema of your Environment Variables
 * @param options Ignore process.env, or specify a path to a .env file
 * @returns An object of your Environment Variables
 *
 * @example
 * import { parse } from "@zodyac/env";
 *
 * const schema = z.object({
 *  PORT: z.string().default("3000"),
 *  NODE_ENV: z.enum(["development", "production"]).default("development"),
 * });
 */
export function parse<T extends ZodRawShape>(
  schema: z.ZodObject<T>,
  options: PartialZodEnvOptions = {},
): z.infer<typeof schema> {
  const raw = readEnv(options);
  const result = schema.safeParse(raw);
  if (!result.success) throw new Error(result.error.errors[0].message);
  return result.data;
}

function readEnv(opts: PartialZodEnvOptions) {
  let dotenv: Record<string, string>;
  try {
    const envFile = readFileSync(opts.path ?? ".env", { encoding: "utf-8" });
    dotenv = dotParse(envFile);
  } catch (e) {
    dotenv = {};
  }
  if (opts.ignoreProcessEnv) return dotenv;

  const rMap = new Map<string, string>();
  for (const [key, value] of Object.entries(process.env)) {
    if (key in dotenv) rMap.set(key, dotenv[key]);
    else if (value) rMap.set(key, value);
  }

  return Object.fromEntries(rMap);
}
