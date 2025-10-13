---
layout: doc
title: Configuration
description: System configuration options for Raghim AI Enterprise Platform
---

# Configuration Guide

This guide covers all configuration options for the Enterprise RAG System.

## System Requirements

### Minimum Requirements
- **CPU**: 4 cores minimum
- **RAM**: 16GB minimum
- **VRAM**: 8GB NVIDIA GPU (recommended)
- **Storage**: 20GB+ free space
- **OS**: Linux (Ubuntu 18.04+, CentOS 7+, or compatible)

### Recommended Configuration
- **CPU**: 8+ cores
- **RAM**: 32GB+
- **VRAM**: 16GB+ NVIDIA GPU
- **Storage**: 50GB+ SSD

## GPU Configuration

### Automatic GPU Detection
The system automatically detects and configures GPU support:

```bash
# Check GPU status
nvidia-smi

# Verify CUDA support
docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
```

### Manual GPU Configuration
If automatic detection fails, configure manually:

```env
# In .env file
GPU_ENABLED=true
CUDA_VISIBLE_DEVICES=0
OLLAMA_GPU_LAYERS=40
OLLAMA_GPU_MEMORY_FRACTION=0.85
```

## Model Configuration

### Default Models
The system comes pre-configured with:

- **Embedding Model**: `paraphrase-multilingual:278m-mpnet-base-v2-fp16`
- **LLM Model**: `llama3.2:3b-instruct-q4_K_M`
- **Translation Model**: `aya:8b`

### Custom Model Configuration
Override default models in your `.env` file:

```env
# Custom model configuration
EMBEDDING_MODEL=mistral:7b-instruct-q4_K_M
LLM_MODEL=llama3.2:7b-instruct-q4_K_M
TRANSLATION_MODEL=aya:8b
```

### Adding New Models
To add additional models:

```bash
# Access Ollama container
docker exec -it rag-ollama bash

# Pull new models
ollama pull llama3.2:7b-instruct-q4_K_M
ollama pull codellama:7b-instruct-q4_K_M

# List available models
ollama list
```

## Database Configuration

### PostgreSQL Settings
Default database configuration:

```env
POSTGRES_PASSWORD=secure_password_123
DB_HOST=postgres
DB_PORT=5432
DB_NAME=raghim_ai
```

### Redis Configuration
Cache and session storage:

```env
REDIS_PASSWORD=redis_password_123
REDIS_URL=redis://:redis_password_123@redis:6379/0
```

## Network Configuration

### Local Deployment
For local development:

```env
FRONTEND_URL=http://localhost
API_URL=http://localhost:8000
```

### VM/Cloud Deployment
For external access:

```env
FRONTEND_URL=http://YOUR_SERVER_IP
API_URL=http://YOUR_SERVER_IP:8000
```

### Widget Domains
Configure domains where widgets will be embedded:

```env
WIDGET_DOMAINS=https://mycompany.com,https://app.mycompany.com,http://localhost:3000
```

## Security Configuration

### License Key
Your enterprise license key is embedded in the Docker images.

### JWT Configuration
Configure JWT secret for authentication:

```env
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
```

### User Limits
Configure maximum users:

```env
MAX_USERS=100
```

## Performance Tuning

### Resource Limits
Configure container resource limits:

```env
# Ollama service limits
OLLAMA_CPU_LIMIT=8.0
OLLAMA_MEMORY_LIMIT=16G
OLLAMA_CPU_RESERVATION=4.0
OLLAMA_MEMORY_RESERVATION=8G

# Backend service limits
BACKEND_CPU_LIMIT=8.0
BACKEND_MEMORY_LIMIT=8G
BACKEND_CPU_RESERVATION=2.0
BACKEND_MEMORY_RESERVATION=4G
```

### Concurrency Settings
Optimize for your hardware:

```env
# For 8 vCPU + 16GB VRAM (3-5 concurrent users)
OLLAMA_NUM_PARALLEL=8
OLLAMA_MAX_LOADED_MODELS=3
OLLAMA_NUM_THREADS=8
OLLAMA_NUM_CTX=4096
OLLAMA_BATCH_SIZE=256
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VERSION` | System version | (from package) |
| `REGISTRY` | Docker registry | raghimai |
| `POSTGRES_PASSWORD` | Database password | secure_password_123 |
| `REDIS_PASSWORD` | Redis password | redis_password_123 |
| `JWT_SECRET_KEY` | JWT secret key | (generated) |
| `GPU_ENABLED` | Enable GPU acceleration | true |
| `CUDA_VISIBLE_DEVICES` | GPU device ID | 0 |
| `MAX_USERS` | Maximum users | 100 |
| `FRONTEND_URL` | Frontend URL | http://localhost |
| `API_URL` | Backend API URL | http://localhost:8000 |
| `WIDGET_DOMAINS` | Widget domains | (empty) |
| `EMBEDDING_MODEL` | Embedding model | paraphrase-multilingual:278m-mpnet-base-v2-fp16 |
| `LLM_MODEL` | LLM model | llama3.2:3b-instruct-q4_K_M |
| `TRANSLATION_MODEL` | Translation model | aya:8b |

## Configuration Validation

### Check Configuration
Validate your configuration:

```bash
# Check environment variables
docker-compose -f docker-compose/docker-compose.yml config

# Verify services
./scripts/health_check.sh
```

### Common Configuration Issues

**GPU Not Detected:**
- Ensure NVIDIA drivers are installed
- Verify Docker GPU runtime is configured
- Check `nvidia-smi` output

**Memory Issues:**
- Increase `OLLAMA_MEMORY_LIMIT`
- Reduce `OLLAMA_MAX_LOADED_MODELS`
- Check available system memory

**Performance Issues:**
- Enable GPU acceleration
- Increase `OLLAMA_NUM_PARALLEL`
- Optimize model selection