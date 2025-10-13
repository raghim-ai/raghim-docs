---
layout: doc
title: FAQ
description: Frequently asked questions for Raghim AI Enterprise Platform
---

# Frequently Asked Questions

## General Questions

### What is Raghim AI Enterprise Platform?
Raghim AI is an enterprise-grade artificial intelligence platform designed to provide advanced AI capabilities for businesses and organizations. It offers document processing, AI chat, and integration capabilities.

### What are the system requirements?
- **CPU**: Minimum 4 cores (8+ recommended)
- **RAM**: Minimum 16GB (32GB+ recommended)
- **VRAM**: 8GB NVIDIA GPU (16GB+ recommended)
- **Storage**: 20GB+ free space
- **OS**: Linux (Ubuntu 18.04+, CentOS 7+, or compatible)

## Installation Questions

### How do I install the system?
The Enterprise RAG System is distributed as an offline package:

1. Download the package from your Raghim representative
2. Extract: `tar -xzf rag-enterprise-*.tar.gz`
3. Run installer: `./INSTALL.sh`
4. Follow the interactive setup process

### Can I install without GPU?
Yes, the system can run on CPU-only servers, but with reduced performance:
- Slower response times for AI operations
- Limited concurrent users (2-3 users recommended)
- Higher resource usage for complex queries

### What models are included?
The system comes pre-configured with:
- **Embedding Model**: `paraphrase-multilingual:278m-mpnet-base-v2-fp16`
- **LLM Model**: `llama3.2:3b-instruct-q4_K_M`
- **Translation Model**: `aya:8b`

## Configuration Questions

### How do I configure GPU support?
GPU support is automatically detected. For manual configuration:

```env
GPU_ENABLED=true
CUDA_VISIBLE_DEVICES=0
OLLAMA_GPU_LAYERS=40
OLLAMA_GPU_MEMORY_FRACTION=0.85
```

### How do I add new models?
Access the Ollama container and pull new models:

```bash
docker exec -it rag-ollama bash
ollama pull llama3.2:7b-instruct-q4_K_M
ollama list
```

### How do I configure widget domains?
Set widget domains in your `.env` file:

```env
WIDGET_DOMAINS=https://mycompany.com,https://app.mycompany.com,http://localhost:3000
```

## Usage Questions

### How do I access the admin panel?
Navigate to `/admin` in your browser and use the credentials provided during installation.

### How do I create users?
Administrators can create users through the admin panel:
1. Access User Management
2. Create new users with appropriate permissions
3. Configure user roles and access levels

### How do I upload documents?
1. Log in to the web interface
2. Navigate to Documents section
3. Upload files using the upload interface
4. Organize documents into collections

## Troubleshooting Questions

### The system is running slowly
Check these areas:
- GPU acceleration enabled
- Sufficient RAM available
- Model configuration optimized
- Resource limits appropriate

### I'm getting 404 errors
Common causes:
- Incorrect URL paths
- Missing pages or files
- Jekyll build issues
- Asset path problems

### The logo isn't displaying
Check:
- Logo files exist in assets directory
- Correct asset paths in layout
- Jekyll build process
- File permissions

### API requests are failing
Verify:
- API endpoints are correct
- Authentication tokens valid
- Network connectivity
- Service status

## Support Questions

### How do I get technical support?
- Check the [Troubleshooting Guide](/docs/troubleshooting)
- Review system logs
- Contact your Raghim representative
- Use built-in diagnostic tools

### Where can I find more documentation?
- [Getting Started](/docs/getting-started)
- [Installation Guide](/docs/installation)
- [Configuration](/docs/configuration)
- [API Reference](/api/)
- [Implementation Guide](/guides/implementation)

### How do I report bugs?
Contact your Raghim representative with:
- Error messages
- System specifications
- Steps to reproduce
- Log files if available