/**
 * Example: Cloudflare Workers
 *
 * This example demonstrates a TypeScript Cloudflare Worker with proper
 * type safety, error handling, and best practices.
 *
 * To deploy: Use wrangler CLI (npm install -g wrangler)
 * wrangler deploy
 */

/// <reference types="@cloudflare/workers-types" />

/**
 * Environment variables interface
 * These should be configured in wrangler.toml or via Cloudflare dashboard
 */
interface Env {
  // KV Namespace bindings
  CACHE?: KVNamespace;

  // Environment variables
  API_KEY?: string;
  ALLOWED_ORIGINS?: string;

  // Durable Objects, R2 buckets, etc.
  // Add more as needed
}

/**
 * CORS headers configuration
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
} as const;

/**
 * Standard JSON response helper
 */
function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...headers,
    },
  });
}

/**
 * Error response helper
 */
function errorResponse(message: string, status = 500): Response {
  return jsonResponse(
    {
      success: false,
      error: {
        code: 'ERROR',
        message,
      },
    },
    status
  );
}

/**
 * Handle OPTIONS requests (CORS preflight)
 */
function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * Validate API key from request
 */
function validateApiKey(request: Request, env: Env): boolean {
  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
  return apiKey === env.API_KEY;
}

/**
 * Example: Get data from KV storage
 */
async function handleGetData(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return errorResponse('Missing key parameter', 400);
    }

    // Check KV cache
    if (env.CACHE) {
      const cached = await env.CACHE.get(key);
      if (cached) {
        return jsonResponse({
          success: true,
          data: JSON.parse(cached) as unknown,
          cached: true,
        });
      }
    }

    // In a real application, fetch from origin or database
    const data = {
      key,
      value: 'example data',
      timestamp: Date.now(),
    };

    // Store in KV cache
    if (env.CACHE) {
      await env.CACHE.put(key, JSON.stringify(data), {
        expirationTtl: 3600, // 1 hour
      });
    }

    return jsonResponse({
      success: true,
      data,
      cached: false,
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return errorResponse('Failed to fetch data');
  }
}

/**
 * Example: Post data to KV storage
 */
async function handlePostData(request: Request, env: Env): Promise<Response> {
  try {
    // Validate API key
    if (!validateApiKey(request, env)) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json<{ key: string; value: unknown }>();

    if (!body.key || !body.value) {
      return errorResponse('Missing key or value', 400);
    }

    // Store in KV
    if (env.CACHE) {
      await env.CACHE.put(body.key, JSON.stringify(body.value));
    }

    return jsonResponse({
      success: true,
      message: 'Data stored successfully',
      key: body.key,
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return errorResponse('Failed to store data');
  }
}

/**
 * Route handler
 */
async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }

  // Health check endpoint
  if (pathname === '/health') {
    return jsonResponse({
      success: true,
      status: 'healthy',
      timestamp: Date.now(),
    });
  }

  // API routes
  if (pathname.startsWith('/api/')) {
    switch (request.method) {
      case 'GET':
        if (pathname === '/api/data') {
          return handleGetData(request, env);
        }
        break;
      case 'POST':
        if (pathname === '/api/data') {
          return handlePostData(request, env);
        }
        break;
    }
  }

  // 404 for unknown routes
  return errorResponse('Not found', 404);
}

/**
 * Main Worker export
 * This is the entry point for Cloudflare Workers
 */
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error('Worker error:', error);
      return errorResponse('Internal Server Error', 500);
    }
  },

  /**
   * Optional: Scheduled event handler (for cron triggers)
   */
  async scheduled(
    controller: ScheduledController,
    _env: Env,
    _ctx: ExecutionContext
  ): Promise<void> {
    try {
      console.log('Scheduled event triggered:', controller.cron);
      // Add your scheduled task logic here
    } catch (error) {
      console.error('Scheduled event error:', error);
    }
  },
} satisfies ExportedHandler<Env>;

/**
 * Example wrangler.toml configuration:
 *
 * name = "io-worker"
 * main = "src/examples/cloudflare-worker.ts"
 * compatibility_date = "2024-01-01"
 *
 * [vars]
 * ALLOWED_ORIGINS = "https://example.com"
 *
 * [[kv_namespaces]]
 * binding = "CACHE"
 * id = "your-kv-namespace-id"
 *
 * [env.production]
 * vars = { ALLOWED_ORIGINS = "https://example.com" }
 *
 * [env.staging]
 * vars = { ALLOWED_ORIGINS = "https://staging.example.com" }
 */
