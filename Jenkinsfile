node {
    stage('Build ng image') {
        stage('Pull repository') {
                checkout scm
        }
        stage('Stopping Nginx') {
            sh 'sudo systemctl disable nginx'
        }
        stage('Cleaning NPM Cache') {
            sh 'sudo npm cache clean --force'
        }
        stage('Deleting Existing Files') {
            sh 'sudo rm -rf node_modules/* 2> /dev/null'
        }
        stage('Installing required files') {
            sh 'sudo npm i --legacy-peer-deps'
        }
        stage('Building Dist') {
            sh 'sudo npm run build'
        }
        stage('Clear Files') {
            sh 'sudo rm -rf /var/www/html/brc.abhinayresume.online/*'
        }
        stage('Moving Files') {
            sh ' sudo cp -rf ./dist/excel-gen/browser/* /var/www/html/brc.abhinayresume.online/'
        }
        stage('Starting Nginx') {
            sh 'sudo systemctl enable nginx'
        }
    }
}
