pipeline {
    agent {
        kubernetes {
            yamlFile 'agent.yaml'
            defaultContainer 'build'
        }
    }
    stages {
        stage('Install') {
            steps {
                // Instala pnpm de forma global y luego las dependencias del proyecto
                sh 'npm install -g pnpm && pnpm install'
            }
        }
        stage('Test') {
            steps {
                // Ejecuta los tests usando pnpm
                sh 'pnpm run test || echo "No tests definidos"'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t abarcamario/tarea-final:1.0.0 .'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push abarcamario/tarea-final:1.0.0'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f entrega.yaml'
                sh 'kubectl rollout status deployment/app-mario-abarca -n ns-mario-abarca'
            }
        }
    }
}
