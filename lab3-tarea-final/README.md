# Laboratorio 3 - CI/CD en Kubernetes
**Autor:** Mario Andres Abarca Barrios  
**Año:** 2026  

Este proyecto implementa un flujo completo de integración y entrega continua (CI/CD) usando **Docker**, **Docker Hub**, **Jenkins** y **Kubernetes**.  
La aplicación se despliega automáticamente en un cluster local de Kubernetes.

---

## Pasos de ejecución

### 1. Construcción de la imagen Docker

# Manual (ejemplo inicial)
docker build -t abarcamario/tarea-final:1.0.0 .
docker push abarcamario/tarea-final:1.0.0

# Automático con Jenkins
La imagen se construye y publica con el tag dinámico:
abarcamario/tarea-final:1.0.${BUILD_NUMBER}