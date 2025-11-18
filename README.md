# IO - LLM Client Library

A TypeScript/Python library for interacting with various LLM providers using a unified interface.

This repository is also structured as a **Claude Code plugin**, allowing it to be used directly within Claude Code environments.

## Installation

### TypeScript/Node.js

```bash
npm install
```

### Python

```bash
pip install anthropic
```

Or install in development mode:

```bash
pip install -e .
```

## Dependencies

### TypeScript/Node.js
- `@anthropic-ai/sdk` - Anthropic Claude API client
- `zod` - TypeScript-first schema validation
- `zod-to-json-schema` - Convert Zod schemas to JSON Schema
- `zod-stream` - Streaming support for Zod schemas
- `stream-hooks` - Stream processing utilities
- `semver` - Semantic versioning parser and utilities

### Python
- `anthropic` - Anthropic Claude API client (version >= 0.40.0)

## Usage

### Python - Backend Expert (Claude Backend Expert Ultimate)

```python
from claude_backend_expert_ultimate import *

expert = ClaudeBackendExpert()
result = expert.analyze_backend_task("صمم REST API...")
print(result["content"])
```

Before running, make sure to set your API key:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

**Features:**
- Analyze backend development tasks in any language (including Arabic)
- Get expert advice on REST API design, database design, system architecture, and more
- Includes specialized `design_rest_api()` method for API design tasks

**Example with more options:**

```python
from claude_backend_expert_ultimate import ClaudeBackendExpert

# Initialize with custom model
expert = ClaudeBackendExpert(model="claude-3-5-sonnet-20241022")

# Design a REST API
result = expert.design_rest_api(
    "Design a REST API for a library management system",
    include_code=True
)
print(result["content"])

# Analyze any backend task
result = expert.analyze_backend_task(
    "How do I optimize database queries for a high-traffic application?"
)
print(result["content"])
```

### TypeScript/Node.js - Basic Example with Anthropic Claude

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

## Running the Examples

### Python Backend Expert Examples

To run the Python backend expert example:

```bash
python examples/python-backend-expert.py
```

For a simple test matching the problem statement:

```bash
python examples/simple-test.py
```

Note: Make sure to set your `ANTHROPIC_API_KEY` environment variable before running:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
python examples/simple-test.py
```

### TypeScript/Node.js Examples

#### Anthropic Claude Example

To run the Anthropic Claude example with tool calling:

```bash
npm run example
```

Note: Make sure to set your `ANTHROPIC_API_KEY` environment variable before running the example:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
npm run example
```

#### Semver Example

To run the semver example demonstrating semantic versioning operations:

```bash
npm run example:semver
```

This example demonstrates all semver functions including version parsing, comparison, sorting, and range operations.

## Building

To compile the TypeScript code:

```bash
npm run build
```

The compiled JavaScript files will be in the `dist/` directory.

## Claude Code Plugin

This repository is structured as a Claude Code plugin. To use it with Claude Code:

### Installation

```bash
# Add this repository as a plugin marketplace
/plugin marketplace add llu77/Io

# Install the plugin
/plugin install io-llm-client@llu77-Io
```

For detailed information about the plugin structure and how to create your own Claude Code plugins, see the [plugins/README.md](./plugins/README.md) documentation.

## Project Structure

```
.
├── .claude-plugin/
│   └── plugin.json        # Claude Code plugin manifest
├── src/
│   └── index.ts           # Main LLM client library
├── examples/
│   ├── anthropic-example.ts  # Anthropic Claude example with tool calling
│   └── semver-example.cjs    # Semver usage examples
├── plugins/
│   └── README.md          # Claude Code plugin documentation
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
