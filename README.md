# 🛍️ Atelier - Online Shopping Cart System

💻 A full-stack web application demonstrating Object-Oriented Programming principles using **Java**

<div>
  <img src="./frontend/src/assets/logo.png" alt="Atelier Logo" height="300"/>
</div>

## 🧰 Stack
![Spring Boot 3.5.9](https://img.shields.io/badge/Spring_Boot-3.5.9-6DB33F?style=for-the-badge&labelColor=6DB33F&logo=springboot&logoColor=white)
![Java 21 LTS](https://img.shields.io/badge/Java-21_LTS-ED8B00?style=for-the-badge&labelColor=ED8B00&logo=openjdk&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&labelColor=6DB33F&logo=spring&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-EA1E63?style=for-the-badge&labelColor=EA1E63&logo=lombok&logoColor=white)
![Spring Validation](https://img.shields.io/badge/Spring_Validation-6DB33F?style=for-the-badge&labelColor=6DB33F&logo=spring&logoColor=white)
![React v18+](https://img.shields.io/badge/React-v18+-4DA1E0?style=for-the-badge&labelColor=61DAFB&logo=react&logoColor=black)
![Vite v6+](https://img.shields.io/badge/Vite-v6+-646CFF?style=for-the-badge&labelColor=646CFF&logo=vite&logoColor=white)
![Tailwind CSS 3+](https://img.shields.io/badge/Tailwind_CSS-v3+-38BDF8?style=for-the-badge&labelColor=38BDF8&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white)
![TanStack Query v5+](https://img.shields.io/badge/TanStack_Query-v5+-FF4154?style=for-the-badge&labelColor=FF4154&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&labelColor=5A29E4&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&labelColor=CA4245&logo=reactrouter&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white)
![PostgreSQL 15](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&labelColor=4169E1&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E5A8?style=for-the-badge&labelColor=00E5A8&logo=neon&logoColor=000000)
![DBeaver](https://img.shields.io/badge/DBeaver-372923?style=for-the-badge&labelColor=372923&logo=dbeaver&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&labelColor=0052CC&logo=trello&logoColor=white)

## ✨ Key Features

- 🗂️ Product Catalog Management (CRUD)
- 🛒 Shopping Cart & Checkout
- 📊 Sales Reporting System

## 🗂️ Project Structure

```
atelier/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/com/shoppingcart/atelier/
│   │   ├── models/                   # Domain entities 
│   │   ├── repositories/             # Spring Data JPA repositories
│   │   ├── services/                 # Business logic
│   │   ├── controllers/              # REST endpoints
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── config/                   # Configuration
│   │   └── utils/                    # Utilities
│   ├── src/main/resources/
│   │   ├── application.properties.example  # Template
│   │   └── application.properties          
│   └── pom.xml
├── frontend/                         
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Route pages
│   │   ├── lib/                      # Utilities
│   │   └── hooks/                    # Custom hooks
│   └── package.json
├── database/                         # SQL scripts
├── docs/                             # Documentation
│   ├── uml/                          # UML diagrams
│   ├── api/                          # API documentation
│   └── report/                      # Final report
├── docker-compose.yml                # PostgreSQL container
├── .gitignore
└── README.md
```

## 🚀 Setup Guide

### 🧩 Prerequisites
- Java JDK 21
- Node.js 24+
- PostgreSQL JDBC Driver
- Git
- IntelliJ IDEA Community & VS Code
- Postman

---

### 📥 1. Clone Repository

```bash
git clone https://github.com/NSBM-SE-Projects/atelier.git
cd atelier
```

---

### ⚙️ 2. Backend Setup

```bash
cd backend

# Request the application.propeties from @dwainXDL
# Then paste in backend/src/main/resources

# Run the application in IntelliJ
```

🔗 Backend URL - `http://localhost:8080`

📘 Full API documentation: `./docs/api`

---

### 🎨 3. Frontend Setup

```bash
cd frontend

# Install node dependencies
npm i

# Run development server
npm run dev
```

🔗 Frontend URL - `http://localhost:5173`

---

## 🧪 Testing

### 🔍 Backend API Testing (Postman)
1. Import collection from `docs/api/atelier_api_collection.json`
3. Verify responses and status codes

## 👥 The Team

**Project Lead:** [@dwainXDL](https://github.com/dwainXDL) 
**Documentation Lead:** [@drnykteresteinwayne](https://github.com/drnykteresteinwayne)
**Software Development Lead:** [@PWTMihisara](https://github.com/PWTMihisara)
**UI/UX Lead:** [@thiranya123](https://github.com/thiranya123)
**UI/UX Designer:** [@Yameesha](https://github.com/Yameeshaa)         
**UI/UX Designer:** [@kmss-sew](https://github.com/kmss-sew)

## 📫 Contact

Further questions? Contact [@dwainXDL](https://github.com/dwainXDL) : D 

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?
    font=Fira+Code
    &size=24
    &duration=3000
    &pause=800
    &color=6DB33F
    &center=true
    &vCenter=true
    &width=700
    &lines=Atelier+-+Online+Shopping+Cart+System;
    Spring+Boot+%7C+React+%7C+PostgreSQL;
    PUSL2024+-+Software+Engineering+2" />
</p>


