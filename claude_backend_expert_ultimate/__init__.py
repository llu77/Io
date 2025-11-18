"""
Claude Backend Expert Ultimate - A Python wrapper for Claude API focused on backend development tasks.
"""

from anthropic import Anthropic
import os
from typing import Dict, Any, Optional


class ClaudeBackendExpert:
    """
    A specialized Claude AI expert for backend development tasks.
    
    This class provides methods to analyze and assist with backend development tasks
    using the Claude API from Anthropic.
    """
    
    def __init__(self, api_key: Optional[str] = None, model: str = "claude-3-5-sonnet-20241022"):
        """
        Initialize the ClaudeBackendExpert.
        
        Args:
            api_key: Anthropic API key. If not provided, will use ANTHROPIC_API_KEY environment variable.
            model: Claude model to use. Defaults to claude-3-5-sonnet-20241022.
        """
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError(
                "API key must be provided either as parameter or via ANTHROPIC_API_KEY environment variable"
            )
        
        self.client = Anthropic(api_key=self.api_key)
        self.model = model
    
    def analyze_backend_task(
        self, 
        task_description: str, 
        max_tokens: int = 4096,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Analyze a backend development task using Claude.
        
        Args:
            task_description: Description of the backend task to analyze (can be in any language).
            max_tokens: Maximum number of tokens in the response. Defaults to 4096.
            system_prompt: Optional system prompt to customize Claude's behavior.
        
        Returns:
            A dictionary containing:
                - content: The analysis and recommendations from Claude
                - model: The model used
                - usage: Token usage information
                - stop_reason: Why the response stopped
        """
        if system_prompt is None:
            system_prompt = """You are an expert backend developer with deep knowledge of:
- REST API design and best practices
- Database design and optimization
- System architecture and scalability
- Security best practices
- Performance optimization
- Microservices and distributed systems
- Cloud infrastructure (AWS, GCP, Azure)
- CI/CD and DevOps practices

Provide detailed, practical advice and solutions. Include code examples when relevant.
Support multiple languages including Arabic."""
        
        response = self.client.messages.create(
            model=self.model,
            max_tokens=max_tokens,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": task_description
                }
            ]
        )
        
        # Extract the text content from the response
        content_text = ""
        for block in response.content:
            if block.type == "text":
                content_text += block.text
        
        return {
            "content": content_text,
            "model": response.model,
            "usage": {
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens
            },
            "stop_reason": response.stop_reason,
            "id": response.id
        }
    
    def design_rest_api(
        self,
        api_description: str,
        include_code: bool = True,
        max_tokens: int = 4096
    ) -> Dict[str, Any]:
        """
        Design a REST API based on the provided description.
        
        Args:
            api_description: Description of the API to design.
            include_code: Whether to include code examples. Defaults to True.
            max_tokens: Maximum number of tokens in the response.
        
        Returns:
            A dictionary with the API design and recommendations.
        """
        prompt = f"""Design a comprehensive REST API for the following requirements:

{api_description}

Please provide:
1. API endpoints with HTTP methods
2. Request/response formats
3. Status codes
4. Authentication/authorization approach
5. Error handling strategy
6. Data validation rules
"""
        
        if include_code:
            prompt += "\n7. Sample code implementation (preferably in Python/FastAPI or Node.js/Express)"
        
        system_prompt = """You are an expert REST API architect. Design clean, scalable, and secure APIs 
following industry best practices. Use RESTful principles, proper HTTP methods, and clear resource naming.
Support multiple languages including Arabic."""
        
        return self.analyze_backend_task(prompt, max_tokens=max_tokens, system_prompt=system_prompt)


# Export all public classes and functions
__all__ = ['ClaudeBackendExpert']
