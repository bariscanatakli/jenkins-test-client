pipeline {
    agent any
    
    stages {
        stage('Checkout Client') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/bariscanatakli/jenkins-test-client.git']]])
            }
        }
        
        stage('Frontend Tests') {
            steps {
                dir('frontend/jenkins-test') {
                    sh 'npm install'
                    sh 'npm run test:unit'
                }
            }
        }
        
        stage('Build Client Image') {
            steps {
                sh 'docker-compose build client'
            }
        }
        
        stage('Deploy Client') {
            steps {
                sh 'docker-compose up -d client'
            }
        }
    }
}