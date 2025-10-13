---
layout: doc
title: Getting Started
description: Learn how to get started with Raghim AI Enterprise Platform
---

# Getting Started with Raghim AI

This guide will help you set up and configure Raghim AI for your enterprise environment.

## Prerequisites

Before you begin, ensure you have:

- **System Requirements**: Minimum 16GB RAM, 4 CPU cores, 8GB VRAM (NVIDIA GPU recommended)
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **GPU Support**: NVIDIA GPU with CUDA support (recommended for optimal performance)
- **Disk Space**: 20GB+ free space for Docker images and models

## Installation Steps

### 1. Download Offline Package

The Enterprise RAG System is distributed as a complete offline package:

```bash
# Download the offline package
# Contact your Raghim representative for package access
```

### 2. Extract Package

```bash
tar -xzf rag-enterprise-*.tar.gz
cd rag-enterprise-*-offline
```

### 3. Run Interactive Installer

```bash
./INSTALL.sh
```

The installer will:
- Configure your environment automatically
- Set up license verification
- Configure GPU settings
- Set up database and services
- Deploy all Docker containers

### 4. Verify Installation

Check that all services are running:

```bash
./scripts/health_check.sh
```

Access the web interface at `http://localhost` (or your server IP)

## Next Steps

- [Configure your AI models](/docs/configuration)
- [Set up user authentication](/docs/authentication)
- [Integrate with your systems](/docs/integration)

## Common Issues

**Port conflicts**: If you encounter port conflicts, modify the ports in `docker-compose.yml`

**Memory issues**: Ensure your system has sufficient RAM for the AI models

**Network connectivity**: Verify internet access for model downloads