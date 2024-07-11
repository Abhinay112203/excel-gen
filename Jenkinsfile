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
        stage('testing') {
            sh 'ls'
        }
        stage('testting 2') {
            sh 'cd ./dist'
            sh 'pwd'
        }
        stage('Clear Files') {
            sh 'sudo rm -rf /var/www/html/*'
        }
        stage('Install npm') {
            sh 'sudo cp ./dist/excel-gen/browser/* /home/opc/test/excel-gen/browser/*'
        }
        stage('Starting Nginx') {
            sh 'sudo systemctl enable nginx'
        }
    }
}
