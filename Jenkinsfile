pipeline {
	agent any

	tools { nodejs "NodeJS" }

	stages {
		stage('Initialize') {
			steps {
				echo 'Initialized Worked'
			}
		}

		stage('Dependencies') {
			steps {
				echo 'Installing Dependencies'
				nodejs('NodeJS') {
					sh 'npm install'
				}
			}
		}

		stage('Build') {
			steps {
				echo 'Building Project'
				nodejs('NodeJS') {
					sh 'npm run build'
				}
			}
		}
	}
}