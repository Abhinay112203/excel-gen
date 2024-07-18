node {
    stage('Build ng image') {
        stage('Pull repository') {
                checkout scm
        }
        stage('Stopping Nginx') {
            sh 'sudo systemctl disable nginx'
        }
        stage('Installing required files') {
            sh 'npm i --save'
        }
        stage('Building Dist') {
            sh 'npm run build'
        }
        stage('Clear Files') {
            sh 'sudo rm -rf /usr/share/nginx/html/*'
        }
        stage('Moving Files') {
            sh ' sudo cp -rf ./dist/excel-gen/browser/* /usr/share/nginx/html/'
        }
        stage('Starting Nginx') {
            sh 'sudo systemctl enable nginx'
        }
    }
}
