#!/usr/bin/env python3
"""
Example usage of claude_backend_expert_ultimate package.

This script demonstrates how to use the ClaudeBackendExpert class to analyze
backend development tasks.

Before running this script, make sure to:
1. Install the package: pip install anthropic
2. Set your API key: export ANTHROPIC_API_KEY="your-api-key"
"""

from claude_backend_expert_ultimate import ClaudeBackendExpert

# Initialize the expert
expert = ClaudeBackendExpert()

# Example 1: Analyze a backend task in Arabic (as shown in the problem statement)
print("=" * 80)
print("Example 1: Analyzing a REST API design task (Arabic)")
print("=" * 80)
result = expert.analyze_backend_task("صمم REST API لنظام إدارة المكتبة")
print(result["content"])
print("\n")

# Example 2: Use the dedicated REST API design method
print("=" * 80)
print("Example 2: Designing a REST API for a library management system (English)")
print("=" * 80)
result = expert.design_rest_api(
    "Design a REST API for a library management system that handles books, users, and borrowing"
)
print(result["content"])
print("\n")

# Show usage statistics
print("=" * 80)
print("Usage Statistics:")
print(f"Input tokens: {result['usage']['input_tokens']}")
print(f"Output tokens: {result['usage']['output_tokens']}")
print(f"Model used: {result['model']}")
print("=" * 80)
