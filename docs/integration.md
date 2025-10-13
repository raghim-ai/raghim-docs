---
layout: doc
title: Integration
description: System integration guide for Raghim AI Enterprise Platform
---

# Integration Guide

This guide covers integrating the Enterprise RAG System with your existing infrastructure and applications.

## API Integration

### REST API Endpoints
The system provides comprehensive REST API access:

**Base URL**: `http://your-server:8000/api/v1`

### Authentication
All API requests require authentication:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     http://your-server:8000/api/v1/endpoint
```

### Key Endpoints

#### Chat Completions
```bash
POST /api/v1/chat/completions
```

#### Document Management
```bash
POST /api/v1/documents
GET /api/v1/documents/{id}
```

#### User Management
```bash
GET /api/v1/users
POST /api/v1/users
```

## Widget Integration

### Embedding Widgets
Embed AI chat widgets in your applications:

```html
<script src="http://your-server/static/rag-chat-sdk.js"></script>
<script>
  RaghimChat.init({
    apiUrl: 'http://your-server:8000',
    containerId: 'chat-widget',
    theme: 'light'
  });
</script>
```

### Widget Configuration
Configure widget domains during installation:

```env
WIDGET_DOMAINS=https://mycompany.com,https://app.mycompany.com,http://localhost:3000
```

## Database Integration

### PostgreSQL Access
Connect to the system database:

```bash
# Connection details
Host: localhost
Port: 5432
Database: raghim_ai
User: raghim_user
Password: (from .env file)
```

### Custom Database Connections
The system supports external database connections for document processing:

1. **Configure Connection**: Add database credentials
2. **Schema Analysis**: System analyzes database structure
3. **Query Processing**: AI can query your databases
4. **Data Integration**: Seamless data access

## External Services

### Ollama Integration
Connect to external Ollama instances:

```env
OLLAMA_FALLBACK_URL=http://external-ollama-server:11434
```

### ChromaDB Integration
Use external ChromaDB instances:

```env
CHROMA_URL=http://external-chromadb:8000
```

## Webhook Integration

### Event Webhooks
Configure webhooks for system events:

```env
WEBHOOK_URL=https://your-webhook-endpoint.com/events
WEBHOOK_SECRET=your-webhook-secret
```

### Supported Events
- User registration
- Document processing completion
- Chat session events
- System alerts

## Custom Applications

### SDK Integration
Use the provided SDKs for integration:

**Python SDK:**
```python
import raghim

client = raghim.Client(
    api_url="http://your-server:8000",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="llama3.2:3b-instruct-q4_K_M",
    messages=[{"role": "user", "content": "Hello"}]
)
```

**JavaScript SDK:**
```javascript
const RaghimAI = require('raghim-ai');

const client = new RaghimAI({
  apiUrl: 'http://your-server:8000',
  apiKey: 'your-api-key'
});

const response = await client.chat.completions.create({
  model: 'llama3.2:3b-instruct-q4_K_M',
  messages: [{ role: 'user', content: 'Hello' }]
});
```

## Security Considerations

### API Security
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Monitor API usage

### Network Security
- Configure firewall rules
- Use VPN for remote access
- Implement IP whitelisting
- Regular security audits

## Performance Optimization

### Caching
- Enable Redis caching
- Configure cache expiration
- Monitor cache hit rates
- Optimize cache keys

### Load Balancing
- Use multiple backend instances
- Configure load balancer
- Monitor resource usage
- Scale horizontally as needed

## Monitoring and Logging

### System Monitoring
Monitor system health:

```bash
# Health check endpoint
curl http://your-server:8000/health

# Detailed status
curl http://your-server:8000/api/v1/status
```

### Logging
Access system logs:

```bash
# View all logs
docker-compose -f docker-compose/docker-compose.yml logs -f

# View specific service logs
docker-compose -f docker-compose/docker-compose.yml logs -f backend
```

## Troubleshooting Integration

### Common Issues

**API Connection Failures:**
- Verify API URL and port
- Check firewall settings
- Validate authentication tokens
- Test network connectivity

**Widget Not Loading:**
- Check domain whitelist
- Verify CORS settings
- Test JavaScript console
- Validate API endpoints

**Database Connection Issues:**
- Verify connection credentials
- Check network connectivity
- Validate database permissions
- Test connection strings

### Debug Mode
Enable debug mode for troubleshooting:

```env
DEBUG=true
LOG_LEVEL=DEBUG
```

## Best Practices

### API Usage
- Implement proper error handling
- Use pagination for large datasets
- Cache responses when appropriate
- Monitor API rate limits

### Security
- Use strong authentication
- Implement proper authorization
- Regular security updates
- Monitor access logs

### Performance
- Optimize API calls
- Use appropriate data formats
- Implement caching strategies
- Monitor response times