pipeline {
    agent any
    tools {
        maven 'Maven 3.9.8'
    }
	environment {
        CONTAINER_NAME = 'email-server-container'
        IMAGE_NAME_BASE = 'hut-email-server'
        VERSION_FILE = 'version.txt'
		PLATFORM = 'linux/amd64/v3'
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
				// Read the current version
				def version = readFile(VERSION_FILE).trim()
				echo "Current version: ${version}"

				// Split the version into parts and increment
				def parts = version.split('\\.')
				parts[-1] = (parts[-1].toInteger() + 1).toString()
				def newVersion = parts.join('.')
				echo "New version: ${newVersion}"

				// Write the new version back to the file
				writeFile(file: VERSION_FILE, text: newVersion)

				// Set the new version as an environment variable
				env.IMAGE_VERSION = newVersion
		     	}
		    }
	    }
		stage('Build Docker Image') {
		steps {
			script {
				retry(3) {
				def imageName = "${IMAGE_NAME_BASE}:${IMAGE_VERSION}"
				docker.build(imageName, "--platform ${PLATFORM} .")
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
	stage('Commit New Version to GIT') {
		steps {
			script {
                              sh '''
			      git config user.email "gkdigitalhut@gmail.com"
	                      git config user.name "GK Digital Hut"
		              git add ${VERSION_FILE}
		              git commit -m "Incrementing Docker image version"
		              git push origin develop
		              '''
				}
			}
		}
	}
}
