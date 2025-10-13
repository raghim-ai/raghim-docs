---
layout: doc
title: Installation Guide
description: Detailed installation instructions for Raghim AI Enterprise Platform
---

# Installation Guide

This comprehensive guide covers all installation methods for Raghim AI Enterprise Platform.

## Installation Methods

### Docker Installation (Recommended)

The easiest way to install Raghim AI is using Docker:

```bash
# Clone the repository
git clone https://github.com/raghim-ai/raghim-app.git
cd raghim-app/enterprise

# Start the services
docker-compose up -d
```

### Manual Installation

For advanced users who prefer manual installation:

#### 1. Install Dependencies

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install python3 python3-pip postgresql redis-server
```

**CentOS/RHEL:**
```bash
sudo yum install python3 python3-pip postgresql redis
```

#### 2. Install Python Dependencies

```bash
pip3 install -r requirements.txt
```

#### 3. Set Up Database

```bash
# Create database
sudo -u postgres createdb raghim_enterprise

# Run migrations
python3 manage.py migrate
```

#### 4. Start Services

```bash
# Start Redis
sudo systemctl start redis

# Start the application
python3 manage.py runserver
```

## Configuration

### Environment Variables

Key environment variables to configure:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | raghim_enterprise |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 |
| `SECRET_KEY` | Django secret key | (generated) |
| `DEBUG` | Debug mode | False |

### AI Model Configuration

Configure your AI models in the settings:

```python
# settings.py
AI_MODELS = {
    'default': 'llama2:7b',
    'providers': {
        'ollama': {
            'base_url': 'http://localhost:11434',
            'models': ['llama2:7b', 'codellama:7b']
        }
    }
}
```

## Verification

After installation, verify everything is working:

1. **Check Services**: All Docker containers should be running
2. **Test API**: Make a test request to the API endpoint
3. **Access Web UI**: Navigate to the web interface
4. **Test AI Models**: Send a test query to verify AI functionality

## Troubleshooting

### Common Installation Issues

**Docker Issues:**
- Ensure Docker is running: `sudo systemctl status docker`
- Check available disk space: `df -h`
- Verify Docker Compose version: `docker-compose --version`

**Database Issues:**
- Check PostgreSQL status: `sudo systemctl status postgresql`
- Verify database connection: `psql -h localhost -U raghim_user -d raghim_enterprise`

**AI Model Issues:**
- Check Ollama service: `curl http://localhost:11434/api/tags`
- Verify model availability: `ollama list`

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](/docs/troubleshooting)
2. Review the logs: `docker-compose logs`
3. Contact support with your error details
