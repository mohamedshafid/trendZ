pipeline {
  agent any

  environment {
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
        sh 'docker build -t $IMAGE_BACKEND ./backend'
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_FRONTEND ./frontend'
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker push $IMAGE_BACKEND'
          sh 'docker push $IMAGE_FRONTEND'
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh """
          docker-compose down
          docker-compose pull
          docker-compose up -d
        """
      }
    }
  }
}
