/**
 * Example: Claude AI API Integration
 *
 * This example demonstrates how to integrate with Claude API (Sonnet 4.5)
 * following best practices for error handling, type safety, and security.
 *
 * Install: npm install @anthropic-ai/sdk
 */

import { logger } from '../utils/logger';

// Define types for Claude API interaction
interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Configuration for Claude API
 */
const CLAUDE_CONFIG = {
  model: 'claude-sonnet-4.5-20241022',
  maxTokens: 4096,
  temperature: 1.0,
} as const;

/**
 * Simple Claude AI service example
 * Note: Install @anthropic-ai/sdk to use this in production
 */
class ClaudeService {
  constructor(apiKey?: string) {
    const key = apiKey ?? process.env['CLAUDE_API_KEY'];
    if (!key) {
      throw new Error('CLAUDE_API_KEY is required');
    }
    // Store the key for use in production with the actual Anthropic SDK
    // this.apiKey = key;
  }

  /**
   * Generate a response from Claude AI
   * @param prompt - The user prompt
   * @returns Promise with the response
   */
  async generateResponse(prompt: string): Promise<ClaudeResponse> {
    try {
      // Validate input
      if (!prompt || prompt.trim().length === 0) {
        return {
          success: false,
          error: 'Prompt cannot be empty',
        };
      }

      logger.info('Generating Claude AI response', {
        promptLength: prompt.length,
        model: CLAUDE_CONFIG.model,
      });

      // In production, use the actual Anthropic SDK:
      // const anthropic = new Anthropic({ apiKey: this.apiKey });
      // const message = await anthropic.messages.create({
      //   model: CLAUDE_CONFIG.model,
      //   max_tokens: CLAUDE_CONFIG.maxTokens,
      //   messages: [{ role: 'user', content: prompt }],
      // });
      //
      // return {
      //   success: true,
      //   data: message.content[0].type === 'text' ? message.content[0].text : '',
      // };

      // Mock response for example
      return {
        success: true,
        data: `Mock response to: "${prompt.substring(0, 50)}..."`,
      };
    } catch (error) {
      logger.error('Failed to generate Claude AI response', { error });

      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          return {
            success: false,
            error: 'Rate limit exceeded. Please try again later.',
          };
        }
        if (error.message.includes('authentication')) {
          return {
            success: false,
            error: 'Authentication failed. Please check your API key.',
          };
        }
      }

      return {
        success: false,
        error: 'An unexpected error occurred while generating response.',
      };
    }
  }

  /**
   * Generate a streaming response from Claude AI
   * @param prompt - The user prompt
   * @param onChunk - Callback for each chunk of the response
   */
  async generateStreamingResponse(
    prompt: string,
    onChunk: (chunk: string) => void
  ): Promise<ClaudeResponse> {
    try {
      if (!prompt || prompt.trim().length === 0) {
        return {
          success: false,
          error: 'Prompt cannot be empty',
        };
      }

      logger.info('Generating streaming Claude AI response', {
        promptLength: prompt.length,
      });

      // In production, use the actual Anthropic SDK with streaming:
      // const anthropic = new Anthropic({ apiKey: this.apiKey });
      // const stream = await anthropic.messages.create({
      //   model: CLAUDE_CONFIG.model,
      //   max_tokens: CLAUDE_CONFIG.maxTokens,
      //   messages: [{ role: 'user', content: prompt }],
      //   stream: true,
      // });
      //
      // let fullResponse = '';
      // for await (const chunk of stream) {
      //   if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      //     const text = chunk.delta.text;
      //     fullResponse += text;
      //     onChunk(text);
      //   }
      // }
      //
      // return { success: true, data: fullResponse };

      // Mock streaming response
      const mockResponse = `Mock streaming response to: "${prompt.substring(0, 50)}..."`;
      const words = mockResponse.split(' ');

      for (const word of words) {
        onChunk(word + ' ');
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      return { success: true, data: mockResponse };
    } catch (error) {
      logger.error('Failed to generate streaming response', { error });
      return {
        success: false,
        error: 'An unexpected error occurred during streaming.',
      };
    }
  }
}

/**
 * Example usage
 */
async function exampleUsage(): Promise<void> {
  try {
    // Initialize the service
    const claude = new ClaudeService();

    // Example 1: Simple response
    logger.info('Example 1: Simple response');
    const response1 = await claude.generateResponse(
      'Explain TypeScript strict mode in one sentence.'
    );

    if (response1.success) {
      logger.info('Claude response:', { data: response1.data });
    } else {
      logger.error('Claude error:', { error: response1.error });
    }

    // Example 2: Streaming response
    logger.info('Example 2: Streaming response');
    let streamedText = '';
    const response2 = await claude.generateStreamingResponse(
      'What are the benefits of TypeScript?',
      (chunk) => {
        streamedText += chunk;
        // In a real application, you might send this to a client via WebSocket
        process.stdout.write(chunk);
      }
    );
    console.log(); // New line after streaming

    if (response2.success) {
      logger.info('Streaming complete', { totalLength: streamedText.length });
    } else {
      logger.error('Streaming failed:', { error: response2.error });
    }
  } catch (error) {
    logger.error('Example failed:', { error });
  }
}

// Export for use in other modules
export { ClaudeService, ClaudeResponse, ClaudeMessage, CLAUDE_CONFIG };

// Run example if executed directly
if (require.main === module) {
  exampleUsage().catch((error) => {
    logger.error('Fatal error:', { error });
    process.exit(1);
  });
}
