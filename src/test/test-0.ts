import { z } from "zod";
import { parse } from '../index.js';

const schema = z.object({
  TEST_FIELD_0: z.string({
    required_error: "TEST_FIELD_0 field is required",
  }),
});

const env = parse(schema);
console.log(env);
