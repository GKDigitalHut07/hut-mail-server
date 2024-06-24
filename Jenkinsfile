pipeline {
    agent any
    tools {
        maven 'Maven 3.9.8'
    }
    environment {
        CONTAINER_NAME = 'email-server-container'
        IMAGE_NAME_BASE = 'hut-email-server'
        IMAGE_VERSION = ''  // Initialize IMAGE_VERSION
        PLATFORM = 'linux/amd64/v3'
        GIT_CREDENTIALS_ID = 'gkgithub'  // Jenkins credential ID for Git authentication
    }

    stages {
        stage('Build and Test') {
            steps {
                sh '''
                mvn -v
                mvn clean install
                '''
            }
        }

        stage('Read and Increment Version') {
            steps {
                script {
                    // Read the current Git commit hash
                    def gitCommitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Git commit hash: ${gitCommitHash}"

                    // Use the Git commit hash as the IMAGE_VERSION or customize as needed
                    env.IMAGE_VERSION = gitCommitHash
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    retry(3) { // Retry the following block up to 3 times on failure
                        def imageName = "${IMAGE_NAME_BASE}:${IMAGE_VERSION}"
                        def dockerBuildArgs = "--platform ${PLATFORM} ."
                        docker.build(imageName, dockerBuildArgs)
                    }
                }
            }
        }

        stage('Stop running container') {
            steps {
                script {
                    def containerExists = sh(script: "docker ps -q -f name=${CONTAINER_NAME}", returnStdout: true).trim()
                    if (containerExists) {
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME}"
                    }
                }
            }
        }

        stage('Run new container') {
            steps {
                script {
                    def imageName = "${IMAGE_NAME_BASE}:${IMAGE_VERSION}"
                    sh "docker run -d --name ${CONTAINER_NAME} ${imageName}"
                }
            }
        }

        stage('Tag Git Repository') {
            steps {
                script {
                    // Configure git credentials
                    withCredentials([usernamePassword(credentialsId: "${GIT_CREDENTIALS_ID}", usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        // Tag the Git repository with IMAGE_VERSION
                        sh """
                        git tag -a ${IMAGE_VERSION} -m 'Tagging version ${IMAGE_VERSION}'
                        git push origin ${IMAGE_VERSION}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded!"
            // Add further actions on success if required
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
