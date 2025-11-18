# Claude Code Plugin Structure

This document describes the structure and requirements for creating Claude Code plugins, based on the official [Claude Code plugins documentation](https://github.com/anthropics/claude-code/blob/main/plugins/README.md).

## Overview

Claude Code plugins extend the functionality of Claude Code by adding custom commands, agents, skills, and integrations. This repository serves as both a TypeScript library and a Claude Code plugin example.

## Plugin Structure

A typical Claude Code plugin follows this structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json         # Plugin metadata (required)
├── commands/               # Custom slash commands (optional)
│   └── command.md
├── agents/                 # Custom agent definitions (optional)
│   └── agent.md
├── skills/                 # Agent skills (optional)
│   └── skill-name/
│       └── SKILL.md
├── hooks/                  # Event handlers (optional)
│   └── hooks.json
└── README.md               # Plugin documentation
```

## Required Files

### `.claude-plugin/plugin.json`

The only required file for a valid plugin. It contains metadata about your plugin:

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "A brief description of what your plugin does",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "keywords": ["keyword1", "keyword2"],
  "license": "MIT"
}
```

**Required fields:**
- `name`: Unique plugin identifier
- `version`: Semantic version (e.g., "1.0.0")
- `description`: Brief description of the plugin's purpose

**Optional fields:**
- `author`: Plugin author information
- `keywords`: Array of searchable keywords
- `license`: License identifier
- `commands`: Array of paths to command definitions
- `agents`: Array of paths to agent definitions
- `hooks`: Path to hooks configuration
- `mcpServers`: Path to MCP servers configuration

## Optional Components

### Commands

Commands are custom slash commands that users can invoke in Claude Code. Each command is defined in a Markdown file:

```markdown
# /command-name

Description of what the command does.

## Usage

/command-name [arguments]

## Examples

/command-name example-arg
```

### Agents

Agents are specialized AI assistants with specific capabilities and instructions. Define them in Markdown files:

```markdown
# Agent Name

Agent description and purpose.

## Instructions

Detailed instructions for the agent's behavior.

## Capabilities

- Capability 1
- Capability 2
```

### Skills

Skills are reusable capabilities that agents can use. Each skill should be in its own directory with a `SKILL.md` file:

```markdown
# Skill Name

What this skill does.

## Usage

How to use this skill.

## Requirements

Any dependencies or prerequisites.
```

### Hooks

Hooks allow plugins to respond to events in Claude Code. Define them in `hooks/hooks.json`:

```json
{
  "onSessionStart": "./handlers/session-start.js",
  "onSessionEnd": "./handlers/session-end.js"
}
```

## Plugin Marketplace

To make your plugin discoverable, create a marketplace with a `.claude-plugin/marketplace.json`:

```json
{
  "name": "marketplace-name",
  "owner": { "name": "Your Name" },
  "plugins": [
    {
      "name": "plugin-name",
      "source": "./plugin-directory",
      "description": "Plugin description",
      "category": "development",
      "version": "1.0.0",
      "author": "Your Name"
    }
  ]
}
```

**Categories:**
- `development`: Development tools
- `productivity`: Productivity enhancements
- `security`: Security-focused plugins

## Installation

### Adding a Plugin Marketplace

```bash
/plugin marketplace add <github-repo> or <url>
```

### Installing a Plugin

```bash
/plugin install <plugin-name>@<marketplace-name>
```

### Local Development

For local plugin development, add your local plugin directory:

```bash
/plugin marketplace add /path/to/your/plugin
```

## Best Practices

1. **Keep it Simple**: Start with just `plugin.json` and add components as needed
2. **Semantic Versioning**: Use semver for version numbers (MAJOR.MINOR.PATCH)
3. **Clear Documentation**: Provide comprehensive README files
4. **Descriptive Names**: Use clear, descriptive names for commands and agents
5. **Test Thoroughly**: Test your plugin in various scenarios before publishing

## Example: This Repository as a Plugin

This repository (`io-llm-client`) is structured as a valid Claude Code plugin:

- **Name**: `io-llm-client`
- **Purpose**: Provides a unified TypeScript interface for LLM providers
- **Components**: 
  - `.claude-plugin/plugin.json`: Core plugin manifest
  - Source code in `src/`: TypeScript LLM client library
  - Examples in `examples/`: Usage examples

### Installing This Plugin

```bash
# Add this repository as a marketplace
/plugin marketplace add llu77/Io

# Install the plugin
/plugin install io-llm-client@llu77-Io
```

## Resources

- [Claude Code Official Documentation](https://code.claude.com/docs/en/plugins)
- [Claude Code GitHub Repository](https://github.com/anthropics/claude-code)
- [Plugin Development Guide](https://www.claudepluginhub.com/learn/building-plugins)
- [Plugin Marketplace Documentation](https://code.claude.com/docs/en/plugin-marketplaces)

## Contributing

To contribute to this plugin or documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC
