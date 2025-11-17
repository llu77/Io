import Anthropic from "@anthropic-ai/sdk";

export interface LLMClientConfig {
  provider: "anthropic";
  apiKey?: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ToolFunction {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean;
  };
}

export interface Tool {
  type: "function";
  function: ToolFunction;
}

export interface ToolChoice {
  type: "function";
  function: {
    name: string;
  };
}

export interface ChatCompletionRequest {
  model: string;
  max_tokens: number;
  messages: ChatMessage[];
  tools?: Tool[];
  tool_choice?: ToolChoice;
}

export function createLLMClient(config: LLMClientConfig) {
  if (config.provider === "anthropic") {
    const client = new Anthropic({
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    });

    return {
      chat: {
        completions: {
          async create(request: ChatCompletionRequest) {
            // Convert OpenAI-style format to Anthropic format
            const anthropicTools = request.tools?.map((tool) => ({
              name: tool.function.name,
              description: tool.function.description,
              input_schema: tool.function.parameters,
            }));

            const anthropicMessages = request.messages.map((msg) => ({
              role: msg.role === "system" ? "user" : msg.role,
              content: msg.content,
            }));

            const anthropicRequest: any = {
              model: request.model,
              max_tokens: request.max_tokens,
              messages: anthropicMessages,
            };

            if (anthropicTools && anthropicTools.length > 0) {
              anthropicRequest.tools = anthropicTools;
            }

            if (request.tool_choice) {
              anthropicRequest.tool_choice = {
                type: "tool",
                name: request.tool_choice.function.name,
              };
            }

            const response = await client.messages.create(anthropicRequest);
            return response;
          },
        },
      },
    };
  }

  throw new Error(`Unsupported provider: ${config.provider}`);
}
