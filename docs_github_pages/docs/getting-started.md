---
layout: doc
title: Getting Started
description: Learn how to get started with Raghim AI Enterprise Platform
---

# Getting Started with Raghim AI

This guide will help you set up and configure Raghim AI for your enterprise environment.

## Prerequisites

Before you begin, ensure you have:

- **System Requirements**: Minimum 8GB RAM, 4 CPU cores
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Network Access**: Internet connectivity for model downloads

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/raghim-ai/raghim-app.git
cd raghim-app/enterprise
```

### 2. Configure Environment

Copy the example configuration file:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=raghim_enterprise
DB_USER=raghim_user
DB_PASSWORD=your_secure_password

# AI Model Configuration
MODEL_PROVIDER=ollama
MODEL_NAME=llama2:7b
```

### 3. Start Services

Launch the platform using Docker Compose:

```bash
docker-compose up -d
```

### 4. Verify Installation

Check that all services are running:

```bash
docker-compose ps
```

Access the web interface at `http://localhost:3000`

## Next Steps

- [Configure your AI models](/docs/configuration)
- [Set up user authentication](/docs/authentication)
- [Integrate with your systems](/docs/integration)

## Common Issues

**Port conflicts**: If you encounter port conflicts, modify the ports in `docker-compose.yml`

**Memory issues**: Ensure your system has sufficient RAM for the AI models

**Network connectivity**: Verify internet access for model downloads
