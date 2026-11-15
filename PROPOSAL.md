# Project Proposal: Library Loan Management System

| Metadata | Details |
| :--- | :--- |
| **Project Domain** | Library Loans |
| **Student Name** | CHEA Piseth |
| **Student ID** | `e20230248` |
| **Course** | Internet Programming I |
| **Class** | I4-GIC-A |

---

## 1. Introduction

### 1.1 Purpose
This document outlines the project proposal and Software Requirements Specification (SRS) for the individual **Library Loan Management System** project in *Internet Programming I*. It serves as the primary reference for system architecture, implementation, testing, and final semester evaluation.

### 1.2 Problem Statement
Manual management of book inventories and borrowing records is time-consuming and prone to human error:
* **For Librarians:** Tracking available stock, maintaining member records, and logging borrowing/returning transactions manually creates administrative bottlenecks.
* **For Students & Readers:** Users must physically search shelves without knowing real-time book availability.

A digitized Library Management System is required to streamline catalog organization, search, and loan tracking.

### 1.3 Proposed Solution
The proposed web-based Library Management System digitizes core library workflows:
* **Librarian Capabilities:** Add, update, organize, and track book stock; manage member accounts; and process loan requests and returns.
* **Patron Capabilities:** Search and filter available books in real time, submit borrowing requests online, and monitor personal loan status and history.

### 1.4 Project Scope

| In Scope | Out of Scope |
| :--- | :--- |
| • **Book Catalog Management:** Categories, stock tracking, availability status, and soft deletion.<br>• **Search & Filtering:** Query by title, author, category, and availability.<br>• **Authentication & RBAC:** Role-based login (Admin/Librarian, User/Patron) and JWT-protected routes across frontend and backend.<br>• **Loan Lifecycle:** Requesting, issuing, returning, and tracking due dates/overdue items.<br>• **Automated Testing:** Frontend component tests (Vitest) and backend API integration tests (Jest + Supertest). | • Online payment gateways, card terminals, and late-fee receipt printing.<br>• Native mobile applications (iOS / Android).<br>• Barcode and RFID hardware scanner integration.<br>• Multi-branch or multi-tenant database synchronization. |

### 1.5 Definitions and Abbreviations

| Term | Definition |
| :--- | :--- |
| **CRUD** | Create, Read, Update, Delete |
| **CSR** | Client-Side Rendering |
| **IDOR** | Insecure Direct Object Reference |
| **ISBN** | International Standard Book Number |
| **JWT** | JSON Web Token (used for stateless authentication) |
| **ORM** | Object-Relational Mapping |
| **RBAC** | Role-Based Access Control |
| **SRS** | Software Requirements Specification |

### 1.6 References
* *Internet Programming I: Individual Project Guidelines* (Course Document)
* *GeeksforGeeks: Software Requirement Specification (SRS) Document Checklist*
* Official Documentation: Vue 3, Pinia, Vue Router, Vite, NestJS 11, Prisma, PostgreSQL, Vitest, Jest, and Supertest

---

## 2. Overall Description

### 2.1 Product Perspective
The system is a standalone full-stack web application consisting of:
* **Frontend:** A Client-Side Rendered (CSR) Single-Page Application built with Vue 3 and TypeScript.
* **Backend:** A RESTful API powered by NestJS 11.
* **Database:** PostgreSQL managed via Prisma ORM.

### 2.2 User Classes and Characteristics

| Role | Target Audience | Technical Proficiency | Key Permissions |
| :--- | :--- | :--- | :--- |
| **User (Patron)** | Students / Readers | Basic | Browse/search catalog, view book details, request loans on available titles, and view personal active loans and history. |
| **Admin (Librarian)** | Library Staff | Intermediate | Full CRUD over book inventory, manage member accounts, approve/issue loans, process returns, and monitor overdue records. |

### 2.3 Operating Environment

| Layer | Technology / Specification |
| :--- | :--- |
| **Frontend** | Vue 3, TypeScript, Vite, Pinia (state management), Vue Router |
| **Backend** | NestJS 11 running on Node.js (LTS release) |
| **Database** | PostgreSQL with Prisma ORM and schema migrations |
| **Supported Browsers** | Google Chrome, Mozilla Firefox, Microsoft Edge |
| **Supported Devices** | Responsive across desktop, tablet, and mobile viewports (360px–1920px) |

### 2.4 Constraints
* **Timeline & Solo Execution:** Engineered end-to-end by one student from Week 2 to Week 16.
* **Mandatory Stack:** Must use Vue 3 + TypeScript, NestJS, and PostgreSQL with Prisma.
* **Academic Integrity:** All AI interactions must be documented in `AI_LOG.md`, and the author must be able to explain all architectural decisions and code implementations.

### 2.5 Assumptions and Dependencies
* **Operational Scale:** Single-branch physical library supporting up to 5,000 physical volumes and 500 registered patrons (verified using generated mock test data).
* **Connectivity:** End-users have access to a modern web browser and an active internet/network connection.
* **Account Provisioning:** Admin (Librarian) accounts are pre-provisioned administratively, whereas User (Patron) accounts support self-registration.

---

## 3. Functional Requirements

### 3.1 Loan Lifecycle & State Machine

| Stage | Actor | Channel | Resulting Status | System Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **1. Request** | User | Web Portal | `PENDING` | User submits a borrow request online for an available book. |
| **2. Pick Up** | Admin | Front Desk / Admin Dashboard | `ACTIVE` | Admin verifies pickup, approves the loan, issues the physical book, and decrements stock. |
| **3. Return** | Admin | Library Desk | `RETURNED` | User returns the book on or before the due date; available stock is restored. |
| **4. Late** | System | Automated Check / Admin Dashboard | `OVERDUE` | The due date passes without a recorded return; the loan is flagged as overdue. |

### 3.2 Data Validation Matrix

| Field | Validation Rules |
| :--- | :--- |
| **Email** | Valid RFC email format; globally unique; max 120 characters. |
| **Password** | 8–64 characters; must contain at least 1 letter and 1 number. |
| **Title / Author / Name** | String length between 2 and 120 characters. |
| **Stock / Quantity** | Non-negative integer ($\ge 0$). |
| **Due Date** | Valid ISO-8601 date string strictly set in the future. |

### 3.3 HTTP Status & Error Handling

| Status Code | Meaning | Trigger Condition |
| :--- | :--- | :--- |
| **201** | Created | Resource record created successfully. |
| **400** | Bad Request | Request payload failed schema validation. |
| **401** | Unauthorized | Missing, expired, or malformed JWT bearer token. |
| **403** | Forbidden | Authenticated user's role lacks permission for the action. |
| **404** | Not Found | Resource ID does not exist, or an IDOR access attempt was intercepted. |
| **409** | Conflict | Duplicate ISBN, invalid loan state transition, or book out of stock. |
| **500** | Internal Server Error | Unhandled runtime exception. |

---

## 4. Non-Functional Requirements

### 4.1 Performance
* **API Latency:** List and search endpoints must respond within **1,000 ms** under standard payload conditions.
* **Frontend Load Time:** Client-side bundles must load and render rapidly on standard local network setups.

### 4.2 Security
* **Authentication & RBAC:** Stateless authentication via JWT bearer headers on all protected routes, enforced by NestJS Guards.
* **IDOR Prevention:** Patrons attempting to access or modify another patron's loan records receive an opaque `404 Not Found` response.
* **SQL Injection Defense:** All database queries use parameterized statements exclusively through Prisma ORM.
* **Network & Rate Limiting:** CORS is restricted to explicit frontend origins; login endpoints are rate-limited to **10 attempts per minute per IP**.
* **Credential Hygiene:** Secrets, API keys, and environment variables are excluded from version control.

### 4.3 Reliability
* **Data Durability:** PostgreSQL ensures relational integrity across service and container restarts.
* **Transaction Atomicity:** Multi-step mutations (such as approving a loan and decrementing book stock) execute inside atomic database transactions.
* **Graceful Error Recovery:** Axios interceptors handle failed API requests cleanly to prevent client-side white-screen crashes.

### 4.4 Usability
* **Workflow Efficiency:** Librarians can issue an approved loan in **5 clicks or fewer** after logging in.
* **Clear Feedback:** Form validation messages appear directly beside their corresponding input fields in plain language.
* **Responsive Layout:** Full UI adaptability across viewport widths from **360px** (mobile) to **1920px** (desktop).

### 4.5 Portability
* **Rapid Local Setup:** The entire stack (frontend, backend, and database migrations) can be deployed locally from source in **under 10 minutes** using the instructions in `README.md`.

---

## 5. Testing Requirements

| Test Layer | Tooling | Coverage Focus |
| :--- | :--- | :--- |
| **Backend Integration** | Jest + Supertest | Authentication boundaries, role-based authorization, loan state transitions, and HTTP status codes. |
| **Frontend Component** | Vitest + Vue Test Utils | UI component rendering, form inputs, client-side validation triggers, and state updates. |
| **Manual & API Verification** | Desktop Browsers + `requests.http` | End-to-end exploratory UI testing and scripted REST API endpoint verification. |

---

## 6. Risks and Mitigation

| Risk Event | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Feature Creep** | Missed deadlines or incomplete core features | Strictly adhere to the defined project scope and defer non-essential features (e.g., RFID, payment gateways). |
| **Loan Logic Complexity** | Inconsistent stock counts or invalid loan states | Enforce a strict, linear finite state machine with atomic database transactions and validated state transitions. |
| **Documentation Lag** | Outdated SRS or incomplete AI usage logs | Update the SRS alongside codebase milestones and log all AI prompts continuously in `AI_LOG.md`. |