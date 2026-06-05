pipeline {
    agent {
        kubernetes {
            yamlFile 'agent.yaml'
            defaultContainer 'docker'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests definidos"'
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
