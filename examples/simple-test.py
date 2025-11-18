#!/usr/bin/env python3
"""
Simple test script matching the exact usage pattern from the problem statement.

Before running:
1. pip install anthropic
2. export ANTHROPIC_API_KEY="your-api-key-here"
"""

from claude_backend_expert_ultimate import *

expert = ClaudeBackendExpert()
result = expert.analyze_backend_task("صمم REST API...")
print(result["content"])
