pipeline {
    agent any
    tools {
        maven 'Maven 3.9.8'
    }
    stages {
        stage('Git Clone') {
            steps {
                sh '''
                mvn -v
                mvn clean install
                '''
            }
        }
    }
}
