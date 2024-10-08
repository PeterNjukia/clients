pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git credentialsId: 'your-github-credentials-id', url: 'https://github.com/PeterNjukia/clients.git'
            }
        }

        // stage('Debug') {
        //     steps {
        //         // List the files in the workspace to verify script presence
        //         sh 'ls -la /var/jenkins_home/workspace/clientsApp'
        //     }
        // }

        // stage('Run Tests') {
        //     when {
        //         // Only run this stage if the branch is 'dev'
        //         branch 'dev'
        //     }
        //     steps {
        //         // Execute your test script or command
        //         sh 'npm test' // Adjust this command if your test command is different
        //     }
        // }

        stage('Build') {
            steps {
                echo 'Building the application...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
            }
        }

        stage('Confirmation') {
            steps {
                script {
                    // Check if the branch is 'dev' and if the build was successful
                    if (env.BRANCH_NAME == 'dev') {
                        echo 'Build was successful on the dev branch!'
                        // You can add any further confirmation steps here, such as notifying a user or sending an alert
                    } else {
                        echo 'Build completed, but not on the dev branch.'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
    }
}
