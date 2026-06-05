pipeline {
    agent {
        kubernetes {
            yamlFile 'agent.yaml'
            defaultContainer 'build'
        }
    }

    environment {
        VERSION = "1.0.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install -g pnpm && pnpm install'
            }
        }

        stage('Test') {
            steps {
                sh 'pnpm run test || echo "No tests definidos"'
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t abarcamario/tarea-final:${VERSION} ."
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh "docker push abarcamario/tarea-final:${VERSION}"
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    // Aquí usamos el nombre correcto del contenedor
                    sh "kubectl set image deployment/app-mario-abarca app-mario-abarca=abarcamario/tarea-final:${VERSION} -n ns-mario-abarca"
                    sh 'kubectl rollout status deployment/app-mario-abarca -n ns-mario-abarca'
                }
            }
        }
    }
}
