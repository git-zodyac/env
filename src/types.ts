export interface ZodEnvOptions {
  path: string;
  ignoreProcessEnv: boolean;
}

export type PartialZodEnvOptions = Partial<ZodEnvOptions>;
