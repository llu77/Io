# IO - LLM Client Library

A TypeScript library for interacting with various LLM providers using a unified interface.

## Installation

```bash
npm install
```

## Dependencies

- `@anthropic-ai/sdk` - Anthropic Claude API client
- `zod` - TypeScript-first schema validation
- `zod-to-json-schema` - Convert Zod schemas to JSON Schema
- `zod-stream` - Streaming support for Zod schemas
- `stream-hooks` - Stream processing utilities

## Usage

### Basic Example with Anthropic Claude

```typescript
import { createLLMClient } from "@/index";

const anthropicClient = createLLMClient({
  provider: "anthropic",
});

const completion = await anthropicClient.chat.completions.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: "My name is Dimitri Kennedy.",
    },
  ],
  tool_choice: {
    type: "function",
    function: {
      name: "say_hello",
    },
  },
  tools: [
    {
      type: "function",
      function: {
        name: "say_hello",
        description: "Say hello",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
          additionalProperties: false,
        },
      },
    },
  ],
});

console.log(JSON.stringify(completion, null, 2));
```

## Running the Example

To run the example code:

```bash
npm run example
```

Note: Make sure to set your `ANTHROPIC_API_KEY` environment variable before running the example:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
npm run example
```

## Building

To compile the TypeScript code:

```bash
npm run build
```

The compiled JavaScript files will be in the `dist/` directory.

## Project Structure

```
.
├── src/
│   └── index.ts           # Main LLM client library
├── examples/
│   └── anthropic-example.ts  # Example usage
├── dist/                  # Compiled output (generated)
├── package.json
└── tsconfig.json
```

## API

### `createLLMClient(config)`

Creates an LLM client with the specified configuration.

**Parameters:**
- `config.provider` - The LLM provider to use (currently only "anthropic" is supported)
- `config.apiKey` - Optional API key (defaults to `ANTHROPIC_API_KEY` environment variable)

**Returns:**
An LLM client object with a `chat.completions.create()` method.

## License

ISC

## Documentation

For more detailed configuration and documentation, see [README-DOCS.md](./README-DOCS.md).
