---
layout: doc
title: Troubleshooting
description: Common issues and solutions for Raghim AI Enterprise Platform
---

# Troubleshooting Guide

This guide covers common issues and their solutions when using Raghim AI Enterprise Platform.

## Installation Issues

### Docker Container Won't Start

**Symptoms:**
- Containers fail to start
- Error messages about port conflicts
- Permission denied errors

**Solutions:**

1. **Check Docker Status:**
   ```bash
   sudo systemctl status docker
   sudo systemctl start docker
   ```

2. **Port Conflicts:**
   ```bash
   # Check what's using the ports
   sudo netstat -tulpn | grep :3000
   sudo netstat -tulpn | grep :8000
   
   # Modify ports in docker-compose.yml if needed
   ```

3. **Permission Issues:**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   # Log out and back in
   ```

### Database Connection Errors

**Symptoms:**
- "Connection refused" errors
- Database authentication failures
- Migration errors

**Solutions:**

1. **Check PostgreSQL Status:**
   ```bash
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. **Verify Database Configuration:**
   ```bash
   # Test connection
   psql -h localhost -U raghim_user -d raghim_enterprise
   ```

3. **Reset Database:**
   ```bash
   # Drop and recreate database
   sudo -u postgres dropdb raghim_enterprise
   sudo -u postgres createdb raghim_enterprise
   ```

## AI Model Issues

### Ollama Service Not Responding

**Symptoms:**
- AI requests timeout
- "Model not found" errors
- Ollama connection refused

**Solutions:**

1. **Check Ollama Status:**
   ```bash
   curl http://localhost:11434/api/tags
   ```

2. **Restart Ollama:**
   ```bash
   sudo systemctl restart ollama
   ```

3. **Pull Required Models:**
   ```bash
   ollama pull llama2:7b
   ollama pull codellama:7b
   ```

### Model Performance Issues

**Symptoms:**
- Slow response times
- High memory usage
- Model crashes

**Solutions:**

1. **Check System Resources:**
   ```bash
   free -h
   df -h
   top
   ```

2. **Optimize Model Settings:**
   ```yaml
   # In docker-compose.yml
   environment:
     - OLLAMA_NUM_PARALLEL=1
     - OLLAMA_MAX_LOADED_MODELS=1
   ```

3. **Use Smaller Models:**
   - Switch to smaller model variants
   - Reduce context window size

## Application Issues

### Web Interface Not Loading

**Symptoms:**
- Browser shows "This site can't be reached"
- 502 Bad Gateway errors
- Blank page loads

**Solutions:**

1. **Check Container Status:**
   ```bash
   docker-compose ps
   docker-compose logs frontend
   ```

2. **Verify Port Binding:**
   ```bash
   # Check if ports are accessible
   curl http://localhost:3000
   ```

3. **Restart Services:**
   ```bash
   docker-compose restart frontend
   ```

### API Authentication Errors

**Symptoms:**
- 401 Unauthorized responses
- "Invalid API key" errors
- Token expiration issues

**Solutions:**

1. **Verify API Key:**
   ```bash
   # Check API key in environment
   echo $RAGHIM_API_KEY
   ```

2. **Regenerate API Key:**
   - Access admin panel
   - Generate new API key
   - Update client configuration

3. **Check Token Format:**
   ```bash
   # Ensure proper Bearer token format
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        http://localhost:8000/api/v1/models
   ```

## Performance Issues

### Slow Response Times

**Symptoms:**
- API requests take >30 seconds
- Web interface is sluggish
- High CPU usage

**Solutions:**

1. **Monitor Resource Usage:**
   ```bash
   docker stats
   htop
   ```

2. **Optimize Configuration:**
   ```yaml
   # Increase worker processes
   environment:
     - WORKERS=4
     - WORKER_CONNECTIONS=1000
   ```

3. **Database Optimization:**
   ```sql
   -- Check slow queries
   SELECT query, mean_time, calls 
   FROM pg_stat_statements 
   ORDER BY mean_time DESC;
   ```

### Memory Issues

**Symptoms:**
- Out of memory errors
- System becomes unresponsive
- Container restarts

**Solutions:**

1. **Check Memory Usage:**
   ```bash
   free -h
   docker stats
   ```

2. **Adjust Memory Limits:**
   ```yaml
   # In docker-compose.yml
   deploy:
     resources:
       limits:
         memory: 4G
   ```

3. **Optimize Model Loading:**
   - Use model quantization
   - Implement model caching
   - Load models on demand

## Log Analysis

### Viewing Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database

# Follow logs in real-time
docker-compose logs -f backend
```

### Common Log Patterns

**Database Connection Issues:**
```
ERROR: could not connect to server: Connection refused
```

**Model Loading Errors:**
```
ERROR: Failed to load model: llama2:7b
```

**Authentication Failures:**
```
WARNING: Invalid API key provided
```

## Getting Additional Help

If you can't resolve an issue:

1. **Collect Debug Information:**
   ```bash
   # System information
   uname -a
   docker --version
   docker-compose --version
   
   # Service status
   docker-compose ps
   docker-compose logs > debug.log
   ```

2. **Contact Support:**
   - Include error messages
   - Provide system specifications
   - Attach relevant log files

3. **Community Resources:**
   - GitHub Issues: Report bugs and feature requests
   - Documentation: Check for updates
   - Forums: Community discussions
