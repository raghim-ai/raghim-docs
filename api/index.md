---
layout: doc
title: API Reference
description: Complete API documentation for Raghim AI Enterprise Platform
---

# API Reference

The Raghim AI API provides programmatic access to all platform features through RESTful endpoints.

## Authentication

All API requests require authentication using API keys:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.raghim.com/v1/endpoint
```

## Base URL

- **Production**: `https://api.raghim.com/v1`
- **Staging**: `https://staging-api.raghim.com/v1`
- **Local Development**: `http://localhost:8000/api/v1`

## Endpoints

### Chat Completions

Send messages to AI models and receive responses.

**POST** `/chat/completions`

**Request Body:**
```json
{
  "model": "llama2:7b",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how can you help me?"
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.7
}
```

**Response:**
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "llama2:7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm here to help you with various tasks..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

### Models

List available AI models.

**GET** `/models`

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "llama2:7b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "raghim",
      "permission": [],
      "root": "llama2:7b",
      "parent": null
    }
  ]
}
```

### Documents

Manage document uploads and processing.

**POST** `/documents`

Upload a document for processing:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@document.pdf" \
  -F "name=My Document" \
  https://api.raghim.com/v1/documents
```

**GET** `/documents/{id}`

Retrieve document information:

```json
{
  "id": "doc_123",
  "name": "My Document",
  "status": "processed",
  "created_at": "2023-03-01T10:00:00Z",
  "file_size": 1024000,
  "pages": 10
}
```

## Error Handling

The API uses standard HTTP status codes and returns error details in JSON format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "type": "invalid_request_error"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid request format |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Rate Limited - Too many requests |
| 500 | Internal Server Error - Server error |

## Rate Limits

API requests are rate-limited per API key:

- **Free Tier**: 100 requests per hour
- **Pro Tier**: 1,000 requests per hour
- **Enterprise**: Custom limits

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1677652288
```

## SDKs

Official SDKs are available for:

- **Python**: `pip install raghim-ai`
- **JavaScript**: `npm install raghim-ai`
- **Go**: `go get github.com/raghim-ai/go-sdk`
- **Java**: Available via Maven Central

## Examples

### Python Example

```python
import raghim

client = raghim.Client(api_key="your-api-key")

response = client.chat.completions.create(
    model="llama2:7b",
    messages=[
        {"role": "user", "content": "Explain quantum computing"}
    ]
)

print(response.choices[0].message.content)
```

### JavaScript Example

```javascript
const RaghimAI = require('raghim-ai');

const client = new RaghimAI({
  apiKey: 'your-api-key'
});

const response = await client.chat.completions.create({
  model: 'llama2:7b',
  messages: [
    { role: 'user', content: 'Explain quantum computing' }
  ]
});

console.log(response.choices[0].message.content);
```
