# Zod Environment parser

[![npm version](https://badge.fury.io/js/%40zodyac%2Fenv.svg)](https://badge.fury.io/js/%40zodyac%2Fenv)

> A part of [Zodyac](https://npmjs.com/org/zodyac) project.

This package allows you to parse your ```.env``` file or ```process.env``` safely.

### Installation
Install the package:

```bash
npm i @zodyac/env
 ```

### Usage
Define your environment schema:
```typescript
import { z } from 'zod';

const env_schema = z.object({
  // ... your zod schema
});
```
Don't forget to use ``` z.coerce ``` on types other than String!

Parse your environment using ```parse()```:

```typescript
import { parse } from '@zodyac/env';
const env = parse(env_schema);
```

You can also use ```z.default()``` to provide a fallback.


Now your ```env``` infers types from Zod schema.

### Configuration
By default, ```parse``` falls back to ```process.env```, if no ```.env``` file was found.

You can ignore ```process.env``` fallback by adding:
```typescript
const env = parse(env_schema, {
  ignoreProcessEnv: true,
});
```

Or you can provide it's path using ```path``` parameter:

```typescript
const env = parse(env_schema, {
  path: 'path/to/env.file',
  ignoreProcessEnv: true,
});
```

### License
MIT
