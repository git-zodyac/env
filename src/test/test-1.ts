import { z } from "zod";
import { parse } from '../index.js';

const schema = z.object({
  TEST_FIELD_1: z.coerce.number({
    required_error: "TEST_FIELD_1 field is required",
    invalid_type_error: "TEST_FIELD_1 field must be a number. Did you forget to use coerce?",
  }),
});

const env = parse(schema);
console.log(env);
