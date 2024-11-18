# Plant-Care-Assistant Web-App

## Overview
This project is a full-stack Personal-plant management application with a dashboard, developed using MERN Stack and Firebase Firestore. The application allows users to Add their Personal plants and manage them by adding growth logs. This app is integrated with Gemini AI API. AI will generate tailored plant care guides for each species.

## Getting Started
### Prerequisites
 - Node.js (>=14.x)
 - npm or yarn

### Installation
	
1. Clone the Repository:
	`git clone https://github.com/BinukaDs/Plant-care-assistant.git`
2. Install the frontend dependencies:
	```sh
	cd client
	yarn
	```
3. Install the backend dependencies:
	```sh
	cd server
	yarn
	```
### Running the Application
1. Start the frontend:
	```sh
	cd client
	yarn dev
	```
2. Start the backend:
	```sh
	cd server
	yarn dev
	```

### Ethics

-  **Code Quality:** Always strive for clean, readable, and maintainable code. Avoid using `var` for variable declarations. Use `const` by default and `let` only when necessary.

-  **Branch Naming Convention:** Follow the naming convention `pca-[feature number]` for new branches. This helps in tracking features and maintaining an organized workflow.

-  **Testing:** Ensure your code is thoroughly tested. Write unit and integration tests to cover new features and bug fixes.

-  **Collaboration:** Be respectful and considerate in code reviews. Provide constructive feedback and be open to receiving feedback.

-  **Security:** Store all the secrets and passwords in enviroment varible. Do not commit any passwords to Git.

-  **Dependency Management:** Regularly update dependencies to their latest versions and ensure they are compatible with the project.    

### Development Guidelines

- Use `const` by default. Use `let` only when you need to reassign the variable.

- Avoid using `var` for variable declarations.

- Write meaningful commit messages.

- Ensure all new features and changes are covered by tests.

- Follow the project's coding style and guidelines.

- Use ESLint to maintain code quality and consistency. Ensure your code passes all ESLint checks before submitting a pull request.

---
