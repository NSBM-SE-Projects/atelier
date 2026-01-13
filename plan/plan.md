# 3-Day Online Shopping Cart System Implementation Plan
**Deadline:** 3 days | **Team:** 2-3 coders | **Status:** Starting from scratch

## Tech Stack (Optimized for Your Team)

**Backend:**
- Spring Boot 3+ (spring-boot-starter-web, spring-boot-starter-data-jpa)
- Lombok (eliminates boilerplate)
- Spring DevTools (hot reload)
- PostgreSQL Driver
- Spring Validation (jakarta.validation)
- MapStruct (DTO mapping, optional)

**Frontend:**
- React 18+
- Vite 6+
- Tailwind CSS 3+
- shadcn/ui v0.1+
- React Router (navigation)
- TanStack Query v5+ (server state management)
- Axios (API calls)
- Zod (validation)
- Zustand (client state, optional)

**Database:**
- PostgreSQL
- Supabase (free hosting + team access)

**Development Tools:**
- Docker Compose (PostgreSQL local development)
- IntelliJ IDEA Community or VS Code + Extension Pack for Java
- Postman (API testing)
- GitHub (version control)

**Deployment:**
- Backend: Render (free tier) or Azure
- Frontend: Vercel (free tier)
- Database: Supabase (free tier)

**Why This Stack:**
- ✅ Spring Boot taught in your lectures (instructor approval obtained)
- ✅ Zero learning curve on frontend (exact stack your team masters)
- ✅ Clean separation: REST API backend + React frontend (industry standard)
- ✅ Faster team collaboration (parallel development possible)
- ✅ Realistic deployment (Vercel + Render, not legacy configs)
- ✅ Demonstrates OOP + modern architecture patterns
- ✅ Matches your experience: MS SQL → PostgreSQL, Express → Spring Boot, React → React

---

## Project Architecture Overview

### Monorepo Structure
```
atelier/
├── backend/                          # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/shoppingcart/
│   │   │   │   ├── models/          # Domain entities (OOP principles)
│   │   │   │   │   ├── User.java                 # Abstract base (Inheritance + Abstraction)
│   │   │   │   │   ├── Customer.java             # Extends User
│   │   │   │   │   ├── Admin.java                # Extends User
│   │   │   │   │   ├── Product.java              # Encapsulation
│   │   │   │   │   ├── Order.java                # Implements Reportable
│   │   │   │   │   ├── OrderItem.java            # Composition
│   │   │   │   │   ├── Cart.java                 # Composition
│   │   │   │   │   └── Reportable.java           # Interface (Abstraction)
│   │   │   │   ├── repositories/    # Spring Data JPA repositories
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   ├── OrderRepository.java
│   │   │   │   │   └── CartRepository.java
│   │   │   │   ├── services/        # Business logic
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── ProductService.java
│   │   │   │   │   ├── CartService.java
│   │   │   │   │   ├── OrderService.java
│   │   │   │   │   └── ReportService.java
│   │   │   │   ├── controllers/     # REST endpoints
│   │   │   │   │   ├── AuthController.java       # /api/auth/*
│   │   │   │   │   ├── ProductController.java    # /api/products/*
│   │   │   │   │   ├── CartController.java       # /api/cart/*
│   │   │   │   │   ├── OrderController.java      # /api/orders/*
│   │   │   │   │   └── ReportController.java     # /api/reports/*
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── ProductDTO.java
│   │   │   │   │   └── OrderDTO.java
│   │   │   │   ├── config/          # Configuration
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   └── utils/           # Utilities
│   │   │   │       ├── PasswordUtil.java
│   │   │   │       └── ValidationUtil.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-dev.properties
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                         # React + Vite app
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── Reports.jsx
│   │   ├── lib/                     # Utilities
│   │   │   ├── api.js               # Axios instance
│   │   │   └── utils.js
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useAuth.js
│   │   ├── store/                   # Zustand stores (optional)
│   │   │   └── authStore.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml               # PostgreSQL + services
├── .gitignore
└── README.md
```

**Architecture Benefits:**
- Clean separation of concerns (backend API, frontend UI)
- Team can work in parallel (backend devs + frontend devs)
- Matches your Node.js/Express + React experience
- Easy deployment (separate services)

---

## Database Schema (PostgreSQL)

```sql
-- Users table (authentication)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    user_type VARCHAR(20) CHECK (user_type IN ('customer', 'admin')) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(20) CHECK (order_status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Order items table
CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Cart table
CREATE TABLE cart_items (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

---

## OOP Principles Implementation Strategy

### 1. **Encapsulation**
- All model classes use private fields with Lombok annotations (`@Data`, `@Getter`, `@Setter`)
- Example in `Product.java`:
  ```java
  @Entity
  @Data
  public class Product {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long productId;

      private String name;
      private String description;
      private Double price;
      private Integer stockQuantity;
      private String category;
      private String imageUrl;
  }
  ```

### 2. **Inheritance**
- `User` as abstract base class
- `Customer` and `Admin` extend `User`
- Demonstrates is-a relationship and code reuse
- Example structure:
  ```java
  @Entity
  @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
  @DiscriminatorColumn(name = "user_type")
  public abstract class User {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      protected Long userId;
      protected String username;
      protected String email;
      protected String password;

      public abstract String getUserType();
  }

  @Entity
  @DiscriminatorValue("customer")
  public class Customer extends User {
      private String shippingAddress;

      @Override
      public String getUserType() { return "CUSTOMER"; }
  }

  @Entity
  @DiscriminatorValue("admin")
  public class Admin extends User {
      @Override
      public String getUserType() { return "ADMIN"; }
  }
  ```

### 3. **Polymorphism**
- **Method Overriding:** `getUserType()` in Customer/Admin classes
- **Runtime Polymorphism:** `User user = customerRepository.findById(id);`
- **Method Overloading:** Multiple service methods, constructors

### 4. **Abstraction**
- `Reportable` interface for generating different report types
- Abstract `User` class defining common behavior
- Example:
  ```java
  public interface Reportable {
      String generateReport();
      byte[] exportToCSV();
  }

  @Entity
  public class Order implements Reportable {
      @Override
      public String generateReport() {
          // Implementation
      }

      @Override
      public byte[] exportToCSV() {
          // Implementation
      }
  }
  ```

---

## 3 Key Functionalities (Beyond Login/Logout)

### 1. **Product Catalog Management (CRUD)**
- Admin: Add, Edit, Delete products (REST API)
- Customer: Browse, Search, Filter products
- Category-based organization

### 2. **Shopping Cart & Checkout**
- Add/Remove items from cart
- Update quantities
- View cart total
- Complete purchase (create order)
- Order history

### 3. **Sales Reporting System**
- Generate sales reports by date range
- View top-selling products
- Customer order history
- Export reports (CSV format)
- Admin analytics dashboard

---

## DAY 1: Foundation & Core Backend (8-10 hours)

### Hour 0-1: Environment Setup
**Assigned to:** All team members
- [ ] Install Java JDK 17+ (verify: `java --version`)
- [ ] Install PostgreSQL locally OR set up Supabase account (recommended)
- [ ] Install IntelliJ IDEA Community Edition or VS Code
- [ ] Install Postman for API testing
- [ ] Create GitHub repository (monorepo structure)
- [ ] Clone repo to all team machines
- [ ] Add `.gitignore` for Java, Node, IDE files

**Verification:** Java installed, PostgreSQL/Supabase accessible, GitHub repo ready

### Hour 1-2: Backend Project Initialization
**Assigned to:** Person A

- [ ] Use Spring Initializr (https://start.spring.io/) to generate project:
  - Project: Maven
  - Language: Java
  - Spring Boot: 3.2+ (latest stable)
  - Packaging: Jar
  - Java: 17 or 21
  - Dependencies: Spring Web, Spring Data JPA, PostgreSQL Driver, Lombok, Spring DevTools, Validation

- [ ] Download and extract to `backend/` folder
- [ ] Configure `application.properties`:
  ```properties
  spring.application.name=shopping-cart-api
  spring.datasource.url=jdbc:postgresql://localhost:5432/shopping_cart_db
  spring.datasource.username=your_username
  spring.datasource.password=your_password
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  server.port=8080
  ```

- [ ] Create `application-dev.properties` for local development
- [ ] Run application: `./mvnw spring-boot:run` (verify startup)
- [ ] Commit: "Initialize Spring Boot backend project"

**Verification:** Backend starts successfully on port 8080

### Hour 2-3: Database Setup
**Assigned to:** Person A

- [ ] Create PostgreSQL database `shopping_cart_db` (local or Supabase)
- [ ] Execute database schema (create all 5 tables using SQL above)
- [ ] Insert sample data:
  - 2 admin users (username: admin, password: hashed)
  - 5 customer test accounts
  - 20-30 sample products across 3-4 categories
- [ ] Create `database/schema.sql` and `database/seed.sql` files in repo
- [ ] Document database credentials in `.env.example` (don't commit actual .env)

**Verification:** All tables created, sample data inserted, can connect from backend

### Hour 3-5: Core Model Classes (OOP Focus)
**Assigned to:** Person B & C (split classes)

#### Person B: User hierarchy & Product
- [ ] Create `User.java` (abstract base class with JPA annotations)
  - `@Entity`, `@Inheritance`, `@DiscriminatorColumn`
  - Fields: userId, username, password, email
  - Abstract method: `getUserType()`

- [ ] Create `Customer.java extends User`
  - `@Entity`, `@DiscriminatorValue("customer")`
  - Additional field: shippingAddress
  - Override `getUserType()` return "CUSTOMER"

- [ ] Create `Admin.java extends User`
  - `@Entity`, `@DiscriminatorValue("admin")`
  - Override `getUserType()` return "ADMIN"

- [ ] Create `Product.java`
  - `@Entity`, `@Data` (Lombok)
  - All fields with proper JPA annotations

#### Person C: Order, Cart & Interface
- [ ] Create `Reportable.java` (interface for abstraction)
  - Methods: `String generateReport()`, `byte[] exportToCSV()`

- [ ] Create `Order.java implements Reportable`
  - `@Entity`, JPA relationships with OrderItem
  - Implement report generation methods

- [ ] Create `OrderItem.java`
  - `@Entity`, JPA relationships

- [ ] Create `Cart.java` or `CartItem.java`
  - `@Entity`, JPA relationships
  - Methods demonstrating method overloading

**Verification:** All model classes compile, proper JPA annotations, commit: "Add core model classes with OOP principles"

### Hour 5-7: Repositories & Services Layer
**Assigned to:** Person A

- [ ] Create Spring Data JPA repositories:
  - `UserRepository extends JpaRepository<User, Long>`
    - Custom query: `Optional<User> findByUsername(String username)`
  - `ProductRepository extends JpaRepository<Product, Long>`
    - Custom query: `List<Product> findByNameContainingIgnoreCase(String keyword)`
  - `OrderRepository extends JpaRepository<Order, Long>`
    - Custom query: `List<Order> findByUserId(Long userId)`
  - `CartRepository extends JpaRepository<CartItem, Long>`

- [ ] Create service classes:
  - `ProductService.java` with methods:
    - `List<Product> getAllProducts()`
    - `Product getProductById(Long id)`
    - `Product createProduct(Product product)`
    - `Product updateProduct(Long id, Product product)`
    - `void deleteProduct(Long id)`
    - `List<Product> searchProducts(String keyword)`

  - `OrderService.java` with methods:
    - `Order createOrder(Order order)`
    - `List<Order> getOrdersByUserId(Long userId)`
    - `List<Order> getAllOrders()`

**Verification:** Services compile, Spring Boot starts without errors

### Hour 7-8: Utility Classes
**Assigned to:** Person B

- [ ] Create `PasswordUtil.java`
  - `String hashPassword(String plain)` using BCrypt
  - `boolean verifyPassword(String plain, String hashed)`

- [ ] Create `ValidationUtil.java`
  - `boolean isValidEmail(String email)`
  - `boolean isStrongPassword(String password)`

- [ ] Create `AuthService.java`
  - `User registerUser(RegisterRequest request)`
  - `User loginUser(LoginRequest request)`

**Verification:** Utilities work correctly

### End of Day 1 Deliverables:
- ✅ Complete PostgreSQL database with sample data
- ✅ All model classes demonstrating OOP principles
- ✅ Complete repository layer (Spring Data JPA)
- ✅ Service layer with business logic
- ✅ Backend tested independently (can run successfully)
- ✅ 3-5 commits to GitHub with clear messages
- ✅ Each team member has contributed code

---

## DAY 2: REST API & React Frontend (10-12 hours)

### Hour 0-2: REST API Controllers
**Assigned to:** Person A

- [ ] Create `AuthController.java` (`@RestController`, `/api/auth`)
  - `POST /register` - register new user
  - `POST /login` - authenticate user
  - `POST /logout` - logout (if session-based)

- [ ] Create `ProductController.java` (`@RestController`, `/api/products`)
  - `GET /api/products` - get all products
  - `GET /api/products/{id}` - get product by ID
  - `POST /api/products` - create product (admin only)
  - `PUT /api/products/{id}` - update product (admin only)
  - `DELETE /api/products/{id}` - delete product (admin only)
  - `GET /api/products/search?q={keyword}` - search products

- [ ] Create `CartController.java` (`@RestController`, `/api/cart`)
  - `GET /api/cart` - get user cart
  - `POST /api/cart` - add item to cart
  - `PUT /api/cart/{itemId}` - update cart item quantity
  - `DELETE /api/cart/{itemId}` - remove item from cart

- [ ] Create `OrderController.java` (`@RestController`, `/api/orders`)
  - `POST /api/orders` - create order (checkout)
  - `GET /api/orders` - get user orders
  - `GET /api/orders/{id}` - get order details

- [ ] Test all endpoints with Postman
- [ ] Create Postman collection and export to `docs/postman_collection.json`

**Verification:** All API endpoints work correctly in Postman, commit code

### Hour 2-3: Frontend Project Setup
**Assigned to:** Person C

- [ ] Initialize Vite + React project in `frontend/` folder:
  ```bash
  npm create vite@latest frontend -- --template react
  cd frontend
  npm install
  ```

- [ ] Install dependencies:
  ```bash
  npm install react-router-dom @tanstack/react-query axios zustand
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [ ] Set up Tailwind CSS in `tailwind.config.js`
- [ ] Install shadcn/ui:
  ```bash
  npx shadcn-ui@latest init
  ```

- [ ] Create `src/lib/api.js` with Axios instance:
  ```javascript
  import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  export default api;
  ```

- [ ] Set up React Router in `App.jsx`
- [ ] Test that frontend runs on port 5173: `npm run dev`
- [ ] Commit: "Initialize React frontend with Vite and Tailwind"

**Verification:** Frontend runs successfully, Tailwind works

### Hour 3-5: Authentication Pages
**Assigned to:** Person B

- [ ] Create `src/pages/Login.jsx`
  - Tailwind-styled form (username, password)
  - Use shadcn/ui components for inputs, buttons
  - Form submission with Axios POST to `/api/auth/login`
  - Store user data in localStorage or Zustand store

- [ ] Create `src/pages/Register.jsx`
  - Tailwind-styled form (username, email, password)
  - shadcn/ui components
  - Form submission to `/api/auth/register`
  - Client-side validation with Zod

- [ ] Create `src/hooks/useAuth.js` custom hook
  - Handle login, logout, current user state

- [ ] Create `src/components/Navbar.jsx`
  - Responsive navbar with Tailwind
  - Conditional rendering (login/logout button based on auth state)
  - Links: Home, Products, Cart, Orders (if logged in), Admin (if admin)

**Verification:** Can register, login, see auth state, commit code

### Hour 5-7: Product Catalog Pages
**Assigned to:** Person C

- [ ] Create `src/pages/Products.jsx`
  - Fetch products with TanStack Query: `useQuery(['products'], fetchProducts)`
  - Display products in Tailwind grid (3 columns on desktop, 1 on mobile)
  - Product cards with shadcn/ui Card component
  - Search bar at top
  - "Add to Cart" button per product

- [ ] Create `src/components/ProductCard.jsx`
  - Reusable component for product display
  - Props: product data
  - shadcn/ui styling

- [ ] Create `src/pages/Home.jsx`
  - Landing page with hero section
  - Featured products
  - CTA button to browse products

**Verification:** Can browse products, search works, UI looks clean

### Hour 7-9: Shopping Cart & Checkout
**Assigned to:** Person A & C (collaborate)

- [ ] Create `src/pages/Cart.jsx`
  - Fetch cart items from `/api/cart`
  - Display items in table/card layout
  - Quantity update controls
  - Remove item button
  - Total amount calculation
  - "Checkout" button (navigate to checkout page)
  - Use TanStack Query mutations for updates

- [ ] Create `src/components/CartItem.jsx`
  - Reusable cart item component

- [ ] Create `src/pages/Checkout.jsx`
  - Order summary
  - Shipping address form
  - "Place Order" button
  - POST to `/api/orders` on submit
  - Navigate to order confirmation on success

- [ ] Create `src/pages/Orders.jsx`
  - Fetch user orders from `/api/orders`
  - Display orders in list/table
  - Show: order ID, date, total, status

**Verification:** Can add to cart, update quantities, checkout, view order history

### Hour 9-11: Admin Panel
**Assigned to:** Person B

- [ ] Create `src/pages/AdminDashboard.jsx`
  - Protected route (check if user is admin)
  - Dashboard stats: total products, orders, customers
  - Navigation to product management

- [ ] Create `src/pages/AdminProducts.jsx`
  - Table listing all products
  - Edit/Delete buttons per row
  - "Add New Product" button → modal or separate form
  - Use shadcn/ui Table, Dialog components
  - CRUD operations with TanStack Query mutations

- [ ] Add admin-only routes in React Router
  - Route protection with auth check

**Verification:** Admin can add/edit/delete products, non-admins can't access

### Hour 11-12: Testing & Bug Fixes
**Assigned to:** All team members

- [ ] Test complete user flow: register → login → browse → cart → checkout
- [ ] Test admin flow: login → add product → edit → delete
- [ ] Fix any bugs found
- [ ] Ensure CORS is configured properly in backend
- [ ] Test responsive design on mobile view

### End of Day 2 Deliverables:
- ✅ Complete REST API backend
- ✅ Complete React frontend with all pages
- ✅ Authentication working
- ✅ Product catalog functional
- ✅ Shopping cart and checkout working
- ✅ Admin panel operational
- ✅ 5-8 commits to GitHub
- ✅ Application runs without errors

---

## DAY 3: Reporting, Documentation & Submission (10-12 hours)

### Hour 0-2: Reporting System (3rd Major Functionality)
**Assigned to:** Person A

- [ ] Create `ReportService.java` in backend
  - Methods:
    - `String generateSalesReport(LocalDate startDate, LocalDate endDate)`
    - `List<Product> getTopSellingProducts(int limit)`
    - `byte[] exportReportToCSV(String reportType)`
  - Implement `Reportable` interface polymorphism

- [ ] Create `ReportController.java` (`@RestController`, `/api/reports`)
  - `GET /api/reports/sales?start=&end=` - generate sales report
  - `GET /api/reports/top-products?limit=10` - top products
  - `GET /api/reports/export?type=sales` - CSV export

- [ ] Create `src/pages/Reports.jsx` in frontend
  - Date range picker (shadcn/ui Calendar)
  - Report type selector
  - "Generate Report" button
  - Display report results in table
  - "Export to CSV" button (download file)

- [ ] Test report generation and CSV export

**Verification:** Reports generate correctly, CSV export works, demonstrates abstraction

### Hour 2-3: Exception Handling & Validation
**Assigned to:** Person B

- [ ] Add global exception handler in backend:
  - Create `GlobalExceptionHandler.java` with `@ControllerAdvice`
  - Handle: `ResourceNotFoundException`, `BadRequestException`, etc.
  - Return proper HTTP status codes and error messages

- [ ] Add validation annotations to DTOs:
  - `@NotNull`, `@Email`, `@Size`, etc.

- [ ] Add input validation on frontend forms:
  - Use Zod schemas for validation
  - Display error messages with shadcn/ui Alert component

- [ ] Test exception scenarios (invalid input, not found, etc.)

**Verification:** Errors handled gracefully, proper error messages shown

### Hour 3-5: UML Diagrams
**Assigned to:** Ashen

- [ ] **Class Diagram** (most important)
  - Show all classes: User, Customer, Admin, Product, Order, Cart, Repositories, Services, Controllers
  - Show relationships: inheritance (User → Customer/Admin), associations, interfaces
  - Show key attributes and methods
  - Use tools: draw.io, Lucidchart, or PlantUML

- [ ] **Sequence Diagram** - User Checkout Flow
  - Actor: Customer
  - Objects: React Frontend, CartController, OrderService, OrderRepository, Database
  - Show message flow from clicking "Checkout" to order confirmation

- [ ] **Use Case Diagram**
  - Actors: Customer, Admin
  - Use cases: Register, Login, Browse Products, Add to Cart, Checkout, Manage Products, Generate Reports
  - Relationships: extends, includes

**Verification:** All UML diagrams complete, saved as images, commit to `docs/uml/` folder

### Hour 5-8: Group Report Writing (3000 words max)
**Assigned to:** Ashen (primary), Others contribute sections

#### Report Structure:

1. **Introduction** (300 words)
   - Project overview: Online Shopping Cart System
   - Objectives: demonstrate OOP principles, modern web architecture
   - Technologies used: Spring Boot, React, PostgreSQL, REST API

2. **System Design & Architecture** (600 words)
   - System architecture overview (3-tier: presentation, business logic, data)
   - Monorepo structure explanation
   - REST API architecture
   - Database design (mention tables, relationships)
   - Class design (refer to UML class diagram)
   - Design patterns used (Repository pattern, Service pattern, MVC)

3. **OOP Principles Implementation** (800 words) - **CRITICAL SECTION**
   - **Encapsulation:** Explain with code examples (Lombok @Data, private fields in entities)
   - **Inheritance:** User → Customer/Admin hierarchy with JPA inheritance, code examples
   - **Polymorphism:** Method overriding (getUserType()), runtime polymorphism in services
   - **Abstraction:** Reportable interface, abstract User class with code snippets
   - Include actual code snippets from your implementation

4. **Key Functionalities** (600 words)
   - Product Catalog Management (CRUD operations via REST API)
   - Shopping Cart & Checkout System (React frontend + Spring Boot backend)
   - Sales Reporting System (CSV export, analytics)
   - Explain implementation details, challenges faced

5. **Technology Integration** (400 words)
   - Spring Boot REST API architecture
   - React frontend with TanStack Query for data fetching
   - PostgreSQL database with Spring Data JPA
   - How frontend and backend communicate (HTTP requests, JSON)

6. **Testing & Challenges** (200 words)
   - Testing approach (Postman for API, manual testing for frontend)
   - Challenges faced and solutions (CORS, authentication, state management)
   - Future improvements

7. **Conclusion** (100 words)
   - Summary of achievements
   - Learning outcomes

**Formatting Requirements:**
- Include UML diagrams
- Include code snippets with syntax highlighting
- Professional formatting (proper headings, page numbers)
- References/bibliography if any external sources used

**Verification:** Report is 2800-3000 words, includes all sections, proofread

### Hour 8-9: University Cover Page & Links Page
**Assigned to:** Ashen

#### UoP Cover Page
- [ ] University of Plymouth official format
- [ ] Include:
  - Module Code: PUSL2024
  - Module Title: Software Engineering 2
  - Module Leader: Prof. Chaminda Wijesinghe
  - Assignment: Online Shopping Cart System
  - Team member names with student IDs
  - Submission date

#### Links Page
- [ ] Create separate page (after cover) with:
  - GitHub repository URL
  - Team member GitHub usernames with roles:
    - Name - Role - GitHub username
    - Example: "John Doe - Backend Developer - @johndoe"
  - Individual contribution summary
  - Link to deployed application (if applicable)

**Verification:** Both pages complete, properly formatted

### Hour 9-10: PowerPoint Presentation
**Assigned to:** Girls team

- [ ] Create 10-15 slide deck covering:
  1. Title slide (project name, team)
  2. Problem statement
  3. System overview (architecture diagram)
  4. Tech stack (Spring Boot + React + PostgreSQL)
  5. OOP principles demonstrated (with code snippets)
  6. Key features (with screenshots)
  7. Database design (ERD)
  8. UML class diagram
  9. Demo flow screenshots (frontend + backend)
  10. API endpoints overview
  11. Challenges & solutions
  12. Future enhancements
  13. Conclusion & Q&A

- [ ] Use professional template
- [ ] Include screenshots of running application (frontend UI + Postman API tests)
- [ ] Keep text minimal, use visuals

**Verification:** Presentation complete, saved as PDF and PPTX

### Hour 10-11: Final Testing & Demo Preparation
**Assigned to:** All team members

- [ ] Complete end-to-end testing checklist:
  - [ ] Backend API: Test all endpoints in Postman
  - [ ] Frontend: Test all user flows
  - [ ] Register new user → success
  - [ ] Login with customer → see products
  - [ ] Login with admin → access admin panel
  - [ ] Browse products, search works
  - [ ] Add multiple products to cart
  - [ ] Update cart quantities
  - [ ] Remove items from cart
  - [ ] Complete checkout → order created in database
  - [ ] View order history → shows placed order
  - [ ] Admin: Add new product → appears in catalog
  - [ ] Admin: Edit product → changes reflect
  - [ ] Admin: Delete product → removed from catalog
  - [ ] Generate sales report → displays data correctly
  - [ ] Export report to CSV → file downloads

- [ ] Create demo video (optional but recommended):
  - 3-5 minutes showing complete user journey
  - Show both frontend and backend (Postman + React UI)
  - Demonstrate OOP principles in code

### Hour 11-12: Final Submission Package
**Assigned to:** Ashen (coordinator)

- [ ] GitHub repository cleanup:
  - [ ] Comprehensive README.md with:
    - Project overview
    - Tech stack
    - Setup instructions (backend + frontend + database)
    - How to run locally
    - API documentation (endpoints)
    - Team members and roles
    - Project structure explanation

- [ ] Create `docs/` folder in repo with:
  - [ ] Group report PDF
  - [ ] UoP cover page
  - [ ] Links page with GitHub usernames
  - [ ] UML diagrams (PNG/PDF)
  - [ ] PowerPoint presentation
  - [ ] Demo video (if created) or YouTube link
  - [ ] SQL database schema (`database/schema.sql`)
  - [ ] Postman collection (`docs/postman_collection.json`)

- [ ] Submission checklist:
  - [ ] All code committed to GitHub (verify all team members have commits)
  - [ ] Final commit with message: "Final submission - Online Shopping Cart System"
  - [ ] All documentation in docs/ folder
  - [ ] Application runs successfully from fresh clone
  - [ ] Database script tested on clean installation
  - [ ] Report includes all required sections
  - [ ] Word count: 2800-3000 words
  - [ ] All UML diagrams included
  - [ ] GitHub repository link tested (public access)

- [ ] Submit to university portal:
  - [ ] GitHub repository link
  - [ ] ZIP file backup (entire project)
  - [ ] Group report PDF
  - [ ] Presentation PDF/PPTX
  - [ ] Demo video link (if applicable)

### End of Day 3 Deliverables:
- ✅ Complete reporting system
- ✅ All UML diagrams
- ✅ 3000-word group report
- ✅ PowerPoint presentation
- ✅ Demo video (optional)
- ✅ Professional README
- ✅ Complete documentation package
- ✅ Submitted to university portal
- ✅ All team contributions tracked in GitHub

---

## Critical Success Factors

### OOP Principles Demonstration (Must Have)
- ✅ **Encapsulation:** Private fields in all model classes with Lombok @Data
- ✅ **Inheritance:** User → Customer/Admin hierarchy with JPA @Inheritance
- ✅ **Polymorphism:** Method overriding (getUserType()), runtime polymorphism in services
- ✅ **Abstraction:** Reportable interface, abstract User class

### 3 Major Functionalities (Must Have)
1. ✅ Product Catalog Management (CRUD via REST API)
2. ✅ Shopping Cart & Checkout (React + Spring Boot integration)
3. ✅ Sales Reporting System (generate reports, CSV export)

### Technical Requirements (Must Have)
- ✅ Spring Boot REST API
- ✅ Spring Data JPA with PostgreSQL
- ✅ React frontend with modern stack
- ✅ Exception handling (@ControllerAdvice)
- ✅ GitHub with individual commits visible

### Documentation (Must Have)
- ✅ UML diagrams (Class, Sequence, Use Case)
- ✅ 3000-word report with OOP explanations and code snippets
- ✅ Professional presentation
- ✅ Setup/installation instructions

---

## Team Responsibilities Summary

### Person A (Backend/Database Specialist)
- Day 1: Database setup, Spring Boot initialization, repositories
- Day 2: REST API controllers, testing with Postman
- Day 3: Reporting system, final testing

### Person B (Core Logic Specialist)
- Day 1: User hierarchy & model classes, utilities, services
- Day 2: Authentication pages (React), admin panel
- Day 3: Exception handling, validation, report contribution

### Person C (Frontend/UI Specialist)
- Day 1: Cart & Order models
- Day 2: React frontend setup, product catalog, shopping cart pages
- Day 3: UI polish, testing

### Ashen (Documentation Lead)
- Day 1: Support coding as needed
- Day 2: Support coding as needed
- Day 3: UML diagrams, group report (primary author), cover pages

### Girls Team (Presentation Specialists)
- Day 1-2: Support testing and documentation
- Day 3: PowerPoint presentation creation

---

## Risk Mitigation

### If Running Behind Schedule:
- **Priority 1 (Must Complete):** Core features (product catalog, cart, checkout), basic admin, OOP principles in code, 1 UML diagram (class), 2000-word report minimum
- **Priority 2 (Should Complete):** Reporting system, complete UML set, 3000-word report, presentation
- **Priority 3 (Nice to Have):** Demo video, advanced exception handling, deployment

### Common Pitfalls to Avoid:
- ❌ Don't spend too much time on UI polish - focus on functionality first
- ❌ Don't over-engineer - keep it simple and functional
- ❌ Don't forget to commit regularly (commit every 2-3 hours minimum)
- ❌ Don't leave report writing to last 2 hours
- ❌ Don't forget to test CORS configuration (frontend ↔ backend communication)
- ❌ Don't hardcode credentials - use environment variables

### Daily Standup (15 minutes each morning):
- What did you complete yesterday?
- What are you working on today?
- Any blockers or questions?

---

## Testing Checklist

### Backend API Testing (Postman)
- [ ] POST /api/auth/register - create user
- [ ] POST /api/auth/login - authenticate user
- [ ] GET /api/products - list all products
- [ ] GET /api/products/{id} - get single product
- [ ] POST /api/products - create product (admin)
- [ ] PUT /api/products/{id} - update product (admin)
- [ ] DELETE /api/products/{id} - delete product (admin)
- [ ] GET /api/cart - get user cart
- [ ] POST /api/cart - add to cart
- [ ] PUT /api/cart/{itemId} - update cart item
- [ ] DELETE /api/cart/{itemId} - remove from cart
- [ ] POST /api/orders - create order
- [ ] GET /api/orders - get user orders
- [ ] GET /api/reports/sales - generate sales report
- [ ] GET /api/reports/export - CSV export

### Frontend Testing
- [ ] User registration with duplicate username rejection
- [ ] Login with correct/incorrect credentials
- [ ] Logout functionality
- [ ] Browse products page
- [ ] Search products
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove item from cart
- [ ] Checkout flow
- [ ] View order history
- [ ] Admin: Add product
- [ ] Admin: Edit product
- [ ] Admin: Delete product
- [ ] Generate report
- [ ] Export to CSV

### OOP Verification Testing
- [ ] Create Customer object, call getUserType() → returns "CUSTOMER"
- [ ] Create Admin object, call getUserType() → returns "ADMIN"
- [ ] Store as User reference: `User u = customerRepository.findById(id)` (polymorphism)
- [ ] All Product fields private, accessed via Lombok getters (encapsulation)
- [ ] Order implements Reportable, generates report (abstraction)

### Code Quality Checks
- [ ] No hardcoded credentials in code (use application.properties)
- [ ] All endpoints return proper HTTP status codes
- [ ] Exception handling in place (@ControllerAdvice)
- [ ] Input validation on all DTOs
- [ ] CORS configured properly for frontend-backend communication
- [ ] No console.log statements in production code

---

## Docker Setup (Optional but Recommended)

### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: shopping_cart_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with: `docker-compose up -d`

---

## GitHub Commit Message Guidelines

Use clear, consistent commit messages:
- `Initial monorepo setup with backend and frontend`
- `Add PostgreSQL database schema and seed data`
- `Implement User hierarchy with inheritance (OOP)`
- `Add Product and Order entities with JPA annotations`
- `Implement repository layer with Spring Data JPA`
- `Add REST API controllers for products and orders`
- `Implement authentication service with password hashing`
- `Initialize React frontend with Vite and Tailwind`
- `Add product catalog page with TanStack Query`
- `Implement shopping cart functionality`
- `Add checkout and order creation flow`
- `Implement admin product management panel`
- `Add reporting system with Reportable interface`
- `Add exception handling with @ControllerAdvice`
- `Add UML diagrams to documentation`
- `Complete group report`
- `Final submission - Online Shopping Cart System`

---

## Critical Files to Review

Key files to ensure demonstrate OOP principles correctly:

**Backend:**
1. **User.java** - Abstract class with JPA @Inheritance
2. **Customer.java & Admin.java** - Inheritance and polymorphism
3. **Product.java** - Encapsulation with Lombok @Data
4. **Reportable.java** - Interface demonstrating abstraction
5. **Order.java** - Implements Reportable interface
6. **ProductRepository.java** - Spring Data JPA repository
7. **ProductService.java** - Business logic layer
8. **ProductController.java** - REST API endpoints
9. **GlobalExceptionHandler.java** - Exception handling

**Frontend:**
10. **App.jsx** - React Router setup
11. **Products.jsx** - TanStack Query usage
12. **Cart.jsx** - State management
13. **api.js** - Axios configuration

---

## Deployment Guide (Optional)

### Backend to Render:
1. Create `Dockerfile` in backend folder
2. Push to GitHub
3. Connect Render to GitHub repo
4. Set environment variables (DATABASE_URL)

### Frontend to Vercel:
1. Push to GitHub
2. Import project in Vercel
3. Set build command: `cd frontend && npm run build`
4. Set environment variables (VITE_API_URL)

### Database on Supabase:
1. Create project
2. Get connection string
3. Use in backend application.properties

---

**END OF PLAN**

This plan leverages your team's modern tech stack experience while demonstrating required OOP principles. The key is parallel development (backend + frontend teams) and regular integration testing. Good luck! 🚀
