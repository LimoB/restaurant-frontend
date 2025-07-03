# Restaurant Frontend

A modern, role-based restaurant management frontend application built with React and TypeScript. This project supports multiple user roles including Admin, Owner, Driver, and User with tailored interfaces and functionalities for each.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This frontend application provides a rich, interactive UI for managing a restaurant platform. Users have different roles with specific capabilities:

- **Admin**: Manage categories, cities, users, orders, restaurants, states, and statuses.
- **Owner**: Manage their restaurants and menus.
- **Driver**: Manage deliveries and view routes.
- **User**: Browse menus, place orders, and track orders.

The app is built with scalability and maintainability in mind, using feature-based folder structure, TypeScript, and React hooks.

---

## Features

- Role-based access and routing
- Dynamic menu browsing and ordering
- Order management dashboard for admins and owners
- Driver delivery tracking with maps integration
- Responsive and accessible UI components
- Authentication and authorization handling
- State management with Redux (or your chosen store)
- API services abstracted for clean data fetching

---

## Tech Stack

- React 18+ with TypeScript
- Vite as build tool
- Redux Toolkit for state management
- React Router for navigation
- CSS Modules / Tailwind CSS (adjust based on your setup)
- REST API integration (backend separate)

---

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm or npm package manager

### Installation

```bash
# Clone repo
git clone https://github.com/LimoB/restaurant-frontend.git
cd restaurant-frontend

# Install dependencies
pnpm install
```
