node {
    stage('Build ng image') {
        stage('Pull repository') {
                checkout scm
        }
        stage('Stopping Nginx') {
            sh 'sudo systemctl disable nginx'
        }
        stage('Clear Files') {
            sh 'sudo rm -rf /var/www/html/*'
        }
        stage('Install npm') {
            sh 'sudo cp index.html /var/www/html/index.html'
        }
        stage('Starting Nginx') {
            sh 'sudo systemctl enable nginx'
        }
    }
}
