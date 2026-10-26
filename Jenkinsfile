pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out Library Management System'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd clean compile'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd test'
                }
            }

            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'backend/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Package') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd package -DskipTests'
                }
            }

            post {
                success {
                    archiveArtifacts(
                        artifacts: 'backend/target/*.jar',
                        allowEmptyArchive: true
                    )
                }
            }
        }
    }

    post {
        success {
            echo 'Library Management CI Pipeline Succeeded!'
        }

        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
