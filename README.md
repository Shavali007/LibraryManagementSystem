![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/SpringBoot-2.7.0-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Maven](https://img.shields.io/badge/Maven-3.9.0-red)
![Node](https://img.shields.io/badge/Node-18.17.0-green)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Library Management System**
---
A full-stack Library Management System built with **Java Spring Boot** (backend) and **React.js** (frontend).  
This application allows managing books, authors, categories, and members. Users can borrow and return books, and search the library efficiently. An integrated System to ease library management

---
## Features
- Add, update, delete books
- Borrow and return books
- Search for books by title, author, or category
- Manage authors and categories
- User-friendly frontend built with React
- RESTful API backend with Spring Boot
---

## Project Structure
```markdown

LibraryManagement/
├── backend/ # Spring Boot backend
│ ├── src/
│ ├── pom.xml
│ └── mvnw
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
├── README.md
└── .gitignore
```
---
## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/krkarthik-dev/LibraryManagement.git
cd LibraryManagement
```

### 2. Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and connect to the backend API.

---

## Technologies Used

* **Backend:** Java, Spring Boot, Spring Data JPA, MySQL/H2
* **Frontend:** React.js, Bootstrap, Axios
* **Version Control:** Git & GitHub
* **Build Tools:** Maven, npm

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

**K R Karthik** – [GitHub Profile](https://github.com/krkarthik-dev)

GitHub webhook integration tested successfully.
