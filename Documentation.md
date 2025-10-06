# Part 4: Implementation Documentation

## Overview

This document provides a technical overview of the Teebay application, a simple platform for renting, buying, and selling products. The application is built with a React frontend (using Apollo Client for GraphQL), a Node.js backend with Express and Apollo Server for GraphQL, Prisma as the ORM with migrations, and PostgreSQL as the database. Data is fetched exclusively via GraphQL, and the frontend leverages Apollo's InMemoryCache for efficient data management. Unnecessary data is not stored in the cache, and removals from the database are synchronized with cache evictions.

The implementation focuses on correctness, reusability, and user experience, including input validation, error handling with notifications, and protected routes. Frontend components are organized for reusability (e.g., shared form fields, cards), and backend resolvers handle authentication via JWT. For creativity, I kept the name "Teebay" but added a custom CSS theme for a modern look.

Key nuances considered:
- **Testing**: Basic unit tests for resolvers and components using Jest (not exhaustive due to time constraints).
- **UX**: Form validations with React Hook Form, success/error notifications via custom utils (e.g., successNotification.js, errorNotification.js), and loading states.
- **FE Architecture**: Context for auth (AuthContext.jsx), hooks for reusable logic (e.g., useLogin.js, useRegistration.js), and layouts for consistent UI (MainLayout.jsx).
- **Routing**: React Router for navigation (AppRoutes.jsx).
- **DB Modeling**: Relational models with enums for categories and pricing types.
- **Best Practices**: Meaningful commits, no code duplication (e.g., reusable product cards), and error handling in resolvers.
- **Corner Cases**: Discussed below where relevant.

## Technologies Used

- **Frontend**: React, Apollo Client (for GraphQL and caching), React Hook Form (for forms), React Router (for routing), Custom CSS (in styles folder, no external UI library like Mantine to keep it lightweight—wrote from scratch for practice).
- **Backend**: Node.js with Express, Apollo Server (for GraphQL), Prisma (ORM with migrations), PostgreSQL.
- **Other**: JWT for auth, Date-fns for date handling in rentals.

Frontend folder structure:
- `components/`: Reusable UI elements (e.g., messages.js for notifications).
- `constants/`: Shared constants like JS messages.
- `context/`: AuthContext.jsx for user state.
- `graphql/`: Queries and mutations (e.g., AuthQl, graphQl for products).
- `mutation/`: JS auth mutations (e.g., JsAuthMutations.js).
- `hooks/`: Custom hooks (e.g., useLogin.js, useRegistration.js).
- `layouts/`: MainLayout.jsx for app wrapper.
- `pages/`: Route-specific pages (e.g., Auth/Login.jsx, Register.jsx; Product/AddProduct.jsx, EditProduct.jsx, etc.).
- `routes/`: AppRoutes.jsx for router config.
- `styles/`: CSS utils (e.g., errorNotification.js, successNotification.js, validators.js).
- `utils/`: Helpers (e.g., App.css for global styles).
- `App.jsx`: Entry point.

## Database Modeling

Using Prisma schema:
- **User**: id (int), firstName, lastName, email (unique), phone, address, password (hashed with bcrypt).
- **Product**: id (int), title, description, categories (enum array: ELECTRONICS, FURNITURE, HOME_APPLIANCES, SPORTING_GOODS, OUTDOOR, TOYS), buyPrice (float), price (float), pricingType (enum: DAY, HOUR, MONTH), ownerId (references User), availableForBuy (bool, default true), availableForRent (bool, default true).
- **Purchase**: id (int), productId (references Product), sellerId (references User), buyerId (references User), date (datetime).
- **Rental**: id (int), productId (references Product), renterId (references User), startDate (datetime), endDate (datetime).

Migrations handle schema changes. Products can belong to multiple categories. Relations ensure ownership and transaction tracking.

## Part 1: Preliminary Features

### Login and User Registration

- **Implementation**:
  - **Backend**: GraphQL mutations defined in userTypeDefs.gql: `registration` creates a user with hashed password (using bcrypt for basic security, though not fully hardened as per assumptions—simple string matching could be swapped in). Returns JWT token signed with a secret. `login` verifies credentials and returns JWT if valid.
  - **Frontend**: Dedicated pages (Login.jsx, Register.jsx) under pages/Auth. Forms use React Hook Form for validation (e.g., email format, required fields). On submit, Apollo's `useMutation` calls the respective mutation. Successful login/registration stores JWT in localStorage and updates AuthContext for global user state. Hooks like useLogin.js and useRegistration.js encapsulate logic for reusability.
  - **Auth Flow**: Protected routes check JWT via context. No full security (e.g., no refresh tokens), per assumptions.

- **Corner Cases**:
  - Duplicate email: Prisma unique constraint throws error, caught in resolver and returned as GraphQL error. Frontend shows error notification.
  - Invalid credentials: Resolver returns error message; frontend validates inputs client-side to reduce server calls.
  - UX: Success notification on registration/login, redirect to dashboard.

## Part 2: Product Management

### Add, Edit, and Delete Products

- **Implementation**:
  - **Backend**: GraphQL types/mutations in productTypeDef.gql: `addProduct` creates a Product with owner as current user (from JWT context). `editProduct` updates fields if owned by user. `deleteProduct` soft-deletes or hard-deletes (hard in this case) if owned. Resolvers authenticate via JWT, use Prisma to interact with DB.
  - **Frontend**: 
    - **Add Product**: Multi-page form in AddProduct.jsx (wizard-style with steps: 1. Title/Description, 2. Categories (multi-select), 3. Pricing (buy/rent options with enums). Uses React Hook Form with a custom stepper component for back/forth navigation. State persists across steps via form context. On final submit, `useMutation` calls addProduct; data stored in Apollo cache via typePolicies.
    - **Edit Product**: Similar to add but in EditProduct.jsx; pre-fetches product via `useQuery` (myProducts query), pre-fills form. Allows editing only own products.
    - **Delete Product**: Button in product card (e.g., in MyProducts.jsx) triggers `useMutation` for deleteProduct. On success, evicts from Apollo cache using `cache.evict({ id: cache.identify(product) })` to sync UI without refetch.
  - **Cache Management**: Products queried via `myProducts` and stored in InMemoryCache. No unnecessary data (e.g., normalize by ID). Deletions remove from cache to prevent stale data.

- **Corner Cases**:
  - Multi-page form editing: If user goes back, form state is preserved via React Hook Form's `useForm` with defaultValues. Validation per step (e.g., required title).
  - Ownership check: Resolver throws error if not owner; frontend disables buttons for non-owned products.
  - Category handling: Enums ensure valid inputs; multi-select allows one or more.
  - Error: Network failures show error notifications; optimistic UI for mutations (assume success, rollback on error).

## Part 3: Rent and Buy/Sell

### List Products, Buy, Rent, and Display Transactions

- **Implementation**:
  - **Backend**: Queries in productTypeDef.gql: `allProducts` lists all available products. `myBoughtProducts`, `mySoldProducts`, `myBorrowedProducts`, `myLentProducts` filter by user. Mutations: `buyProduct` creates Purchase, sets product availableForBuy to false. `rentProduct` creates Rental, checks for overlaps.
  - **Frontend**: 
    - **List All**: AllProducts.jsx uses `useQuery` for allProducts, renders reusable product cards.
    - **Buy**: Button in product card triggers `useMutation` for buyProduct; updates cache to remove from available lists.
    - **Rent**: Form in product details (ProductDetails.jsx) for start/end dates; `useMutation` for rentProduct. Validates dates (start < end).
    - **Display**: Dedicated pages (e.g., MyProducts.jsx sections for bought/sold via queries; similar for borrowed/lent). Uses tables for listings.
  - **Cache Management**: Transactions stored in cache; buys/rents evict/update product availability in cache.

- **Corner Cases**:
  - **Rent Time Overlap**: In rentProduct resolver, query existing Rentals for the product, check if new [startDate, endDate] overlaps any (using date comparisons). If overlap, throw error. Frontend shows notification.  
  - **Product Availability**: After buy, update product.availableForBuy = false in resolver; cache modified accordingly. For rent, check if availableForRent and no active rentals blocking.  
  - **Date Handling**: Use ISO strings for dates; validate client-side (e.g., no past starts).  
  - **Buy Then Rent Conflict**: If a user has bought a product (availableForBuy = false), any subsequent rent attempt should fail. Resolver checks product availability for rent; if product is already sold, throw error. Frontend displays a notification indicating the product cannot be rented because it was purchased.
