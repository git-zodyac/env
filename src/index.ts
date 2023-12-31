import { config } from "dotenv";
import { PartialZodEnvOptions } from "types";
import { ZodRawShape, z } from "zod";

/**
 * Parses your Environment Variables with a Zod Schema
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
  options?: PartialZodEnvOptions,
): z.infer<typeof schema> {
  const process_env = options?.ignoreProcessEnv ? undefined : process.env;
  const dotenv = options?.path ? config({ path: options?.path }) : config();

  const raw = dotenv.parsed ?? process_env;
  if (!raw) throw new Error("No environment variables found");

  const result = schema.safeParse(raw);
  if (!result.success) throw new Error(result.error.errors[0].message);

  return result.data;
}
