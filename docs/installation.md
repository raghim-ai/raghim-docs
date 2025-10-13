---
layout: doc
title: Installation Guide
description: Detailed installation instructions for Raghim AI Enterprise Platform
---

# Installation Guide

This comprehensive guide covers installation of the Enterprise RAG System using the offline distribution package.

## Prerequisites

### System Requirements
- **CPU**: Minimum 4 cores (8+ recommended)
- **RAM**: Minimum 16GB (32GB+ recommended)
- **VRAM**: 8GB NVIDIA GPU (16GB+ recommended)
- **Storage**: 20GB+ free space
- **OS**: Linux (Ubuntu 18.04+, CentOS 7+, or compatible)

### Software Requirements
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **NVIDIA Drivers**: For GPU acceleration (recommended)
- **CUDA Support**: For optimal performance

## Installation Methods

### Interactive Installation (Recommended)

The Enterprise RAG System uses an interactive installer for easy setup:

```bash
# Extract the offline package
tar -xzf rag-enterprise-*.tar.gz
cd rag-enterprise-*-offline

# Run the interactive installer
./INSTALL.sh
```

The installer will guide you through:
- License agreement acceptance
- Environment configuration
- Network setup
- GPU configuration
- Database setup
- Service deployment

### Non-Interactive Installation

For automated deployments or CI/CD environments:

```bash
# Extract the offline package
tar -xzf rag-enterprise-*.tar.gz
cd rag-enterprise-*-offline

# Run automated deployment
./DEPLOY.sh
```

This method:
- Uses default configuration
- Auto-detects network settings
- Creates `.env` file automatically
- Deploys without user interaction

## Installation Process

### 1. Package Extraction
```bash
# Download package from your Raghim representative
tar -xzf rag-enterprise-*.tar.gz
cd rag-enterprise-*-offline
```

### 2. Compatibility Check
```bash
# Test system compatibility
./installer/test_compatibility.sh
```

### 3. Installation
```bash
# Interactive installation
./INSTALL.sh

# OR automated installation
./DEPLOY.sh
```

### 4. Verification
```bash
# Check system health
./scripts/health_check.sh

# Test API endpoints
curl http://localhost:8000/health
```

## Configuration

### Environment Variables
The installer configures these key variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VERSION` | System version | (from package) |
| `REGISTRY` | Docker registry | raghimai |
| `POSTGRES_PASSWORD` | Database password | secure_password_123 |
| `REDIS_PASSWORD` | Redis password | redis_password_123 |
| `JWT_SECRET_KEY` | JWT secret key | (generated) |
| `GPU_ENABLED` | Enable GPU acceleration | true |
| `MAX_USERS` | Maximum users | 100 |
| `FRONTEND_URL` | Frontend URL | http://localhost |
| `API_URL` | Backend API URL | http://localhost:8000 |

### GPU Configuration
For optimal performance, configure GPU support:

```env
# GPU settings
GPU_ENABLED=true
CUDA_VISIBLE_DEVICES=0
OLLAMA_GPU_LAYERS=40
OLLAMA_GPU_MEMORY_FRACTION=0.85

# Performance settings for 8 vCPU + 16GB VRAM
OLLAMA_NUM_PARALLEL=8
OLLAMA_MAX_LOADED_MODELS=3
OLLAMA_NUM_THREADS=8
OLLAMA_NUM_CTX=4096
OLLAMA_BATCH_SIZE=256
```

### Model Configuration
Default models included:

- **Embedding**: `paraphrase-multilingual:278m-mpnet-base-v2-fp16`
- **LLM**: `llama3.2:3b-instruct-q4_K_M`
- **Translation**: `aya:8b`

Override models in `.env`:
```env
EMBEDDING_MODEL=mistral:7b-instruct-q4_K_M
LLM_MODEL=llama3.2:7b-instruct-q4_K_M
TRANSLATION_MODEL=aya:8b
```

## Verification

### Service Status
Check that all services are running:

```bash
# View service status
docker-compose -f docker-compose/docker-compose.yml ps

# Check health
./scripts/health_check.sh
```

### API Testing
Test API endpoints:

```bash
# Health check
curl http://localhost:8000/health

# List models
curl http://localhost:8000/api/v1/models

# Test chat completion
curl -X POST http://localhost:8000/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "llama3.2:3b-instruct-q4_K_M", "messages": [{"role": "user", "content": "Hello"}]}'
```

### Web Interface
Access the web interface:
- **Local**: http://localhost
- **VM/Server**: http://YOUR_SERVER_IP

## Troubleshooting

### Common Installation Issues

**Docker Issues:**
- Ensure Docker is running: `sudo systemctl status docker`
- Check available disk space: `df -h`
- Verify Docker Compose version: `docker-compose --version`

**GPU Issues:**
- Check NVIDIA drivers: `nvidia-smi`
- Verify CUDA support: `docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi`
- Check GPU runtime: `docker info | grep -i runtime`

**Memory Issues:**
- Check available RAM: `free -h`
- Verify swap space: `swapon --show`
- Increase memory limits in `.env`

**Network Issues:**
- Check firewall settings
- Verify port availability: `netstat -tulpn | grep :80`
- Test connectivity: `curl http://localhost`

### Getting Help

If you encounter issues:

1. **Check Logs**: `docker-compose -f docker-compose/docker-compose.yml logs -f`
2. **Run Diagnostics**: `./scripts/comprehensive_diagnostic.sh`
3. **Health Check**: `./scripts/health_check.sh`
4. **Contact Support**: Reach out to your Raghim representative

## Post-Installation

### Initial Setup
1. **Access Admin Panel**: Navigate to `/admin`
2. **Create Admin User**: Use installer-provided credentials
3. **Change Default Password**: Update admin password
4. **Configure Users**: Create user accounts as needed

### System Management
- **Monitor Performance**: Use built-in health checks
- **Update Configuration**: Modify `.env` file as needed
- **Scale Resources**: Adjust limits based on usage
- **Backup Data**: Regular database backups

### Maintenance
- **Regular Health Checks**: Monitor system status
- **Log Monitoring**: Check for errors and issues
- **Resource Monitoring**: Track CPU, memory, and GPU usage
- **Security Updates**: Keep system components updated
