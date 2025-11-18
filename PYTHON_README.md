# Claude Backend Expert Ultimate - Python Module

A Python wrapper for the Claude API specialized in backend development tasks.

## Installation

```bash
pip install anthropic
```

Then install this module in development mode:

```bash
pip install -e .
```

## Quick Start

### Basic Usage

```python
from claude_backend_expert_ultimate import *

# Set your API key first
export ANTHROPIC_API_KEY="your-api-key-here"

# Create an expert instance
expert = ClaudeBackendExpert()

# Analyze a backend task (supports Arabic and other languages)
result = expert.analyze_backend_task("صمم REST API...")
print(result["content"])
```

### With API Key in Code

```python
from claude_backend_expert_ultimate import ClaudeBackendExpert

# Initialize with API key
expert = ClaudeBackendExpert(api_key="your-api-key-here")

# Analyze a backend task
result = expert.analyze_backend_task(
    "How do I design a scalable microservices architecture?"
)
print(result["content"])
```

### Design REST APIs

```python
from claude_backend_expert_ultimate import ClaudeBackendExpert

expert = ClaudeBackendExpert()

# Use the specialized REST API design method
result = expert.design_rest_api(
    "Design a REST API for an e-commerce platform with products, users, and orders",
    include_code=True
)

print(result["content"])
print(f"\nTokens used: {result['usage']['input_tokens']} input, {result['usage']['output_tokens']} output")
```

## Features

### ClaudeBackendExpert Class

The main class for interacting with Claude for backend development tasks.

#### Constructor

```python
ClaudeBackendExpert(api_key=None, model="claude-3-5-sonnet-20241022")
```

**Parameters:**
- `api_key` (str, optional): Anthropic API key. If not provided, uses `ANTHROPIC_API_KEY` environment variable.
- `model` (str, optional): Claude model to use. Defaults to `claude-3-5-sonnet-20241022`.

#### Methods

##### analyze_backend_task()

Analyze any backend development task using Claude.

```python
result = expert.analyze_backend_task(
    task_description="Your backend question or task",
    max_tokens=4096,
    system_prompt=None  # Optional custom system prompt
)
```

**Parameters:**
- `task_description` (str): Description of the backend task (supports multiple languages)
- `max_tokens` (int, optional): Maximum tokens in response. Default: 4096
- `system_prompt` (str, optional): Custom system prompt to guide Claude's behavior

**Returns:**
- Dictionary with keys:
  - `content`: The analysis and recommendations from Claude
  - `model`: The model used
  - `usage`: Token usage information (input_tokens, output_tokens)
  - `stop_reason`: Why the response stopped
  - `id`: Response ID

##### design_rest_api()

Specialized method for REST API design tasks.

```python
result = expert.design_rest_api(
    api_description="Description of the API to design",
    include_code=True,
    max_tokens=4096
)
```

**Parameters:**
- `api_description` (str): Description of the API requirements
- `include_code` (bool, optional): Whether to include code examples. Default: True
- `max_tokens` (int, optional): Maximum tokens in response. Default: 4096

**Returns:**
- Same structure as `analyze_backend_task()`

## Multilingual Support

The module supports multiple languages, including:
- English
- Arabic (العربية)
- And other languages supported by Claude

Example in Arabic:
```python
expert = ClaudeBackendExpert()
result = expert.analyze_backend_task("صمم REST API لنظام إدارة المكتبة")
print(result["content"])
```

## Examples

See the `examples/` directory for complete examples:

- `examples/simple-test.py` - Minimal example matching the problem statement
- `examples/python-backend-expert.py` - Comprehensive examples with different use cases

## Expert Areas

The ClaudeBackendExpert is specialized in:

- **REST API Design**: Best practices, endpoints, request/response formats
- **Database Design**: Schema design, optimization, normalization
- **System Architecture**: Microservices, scalability, distributed systems
- **Security**: Authentication, authorization, data protection
- **Performance**: Optimization, caching, load balancing
- **Cloud Infrastructure**: AWS, GCP, Azure deployment patterns
- **CI/CD**: DevOps practices, deployment automation

## Error Handling

The module will raise a `ValueError` if no API key is provided:

```python
try:
    expert = ClaudeBackendExpert()
except ValueError as e:
    print(f"Error: {e}")
    # Make sure to set ANTHROPIC_API_KEY environment variable
```

## Requirements

- Python >= 3.8
- anthropic >= 0.40.0

## License

ISC
