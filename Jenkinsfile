pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    IMAGE_BACKEND = "mohamedhafid825/trendz-backend:latest"
    IMAGE_FRONTEND = "mohamedhafid825/trendz-frontend:latest"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/mohamedshafid/trendZ.git'

      }
    }

    stage('Build Backend Docker Image') {
      steps {
        bat 'docker build -t $IMAGE_BACKEND ./backend'
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        bat 'docker build -t $IMAGE_FRONTEND ./frontend'
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        bat 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        bat 'docker push $IMAGE_BACKEND'
        bat 'docker push $IMAGE_FRONTEND'
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        bat 'docker-compose down'
        bat 'docker-compose pull'
        bat 'docker-compose up -d'
      }
    }
  }
}
