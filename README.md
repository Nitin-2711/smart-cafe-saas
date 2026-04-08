# ☕ SmartCafé

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**SmartCafé** is a premium, multi-tenant SaaS platform designed to revolutionize the dining experience. By leveraging QR-based ordering and real-time synchronization, it empowers cafés to digitize their operations, reduce wait times, and provide a seamless "privacy-first" experience for customers.

---

## ✨ Features

### 🛒 Customer Experience
- **QR-Driven Ordering**: Instant menu access via table-specific QR codes.
- **Real-Time Tracking**: Live order status updates without page refreshes.
- **Privacy Mode**: "Do Not Disturb" toggle for focused work or quiet dining.
- **Interactive Menu**: Grouped items, high-quality images, and smooth animations.

### 🍱 Staff & Operations
- **KDS (Kitchen Display System)**: A real-time dashboard for staff to manage and progress orders.
- **Administrative Control**: Manage menus, categories, and inventory across multiple tenants.
- **Real-Time Analytics**: Insights into peak hours, popular items, and revenue trends.
- **Multi-Tenant Architecture**: Scale easily across multiple café locations with isolated data.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Infrastructure
- **BaaS**: [Firebase](https://firebase.google.com/) (Firestore & Realtime Database)
- **API (Optional Service Layer)**: Node.js Express (for advanced integrations)
- **Authentication**: Firebase Auth
- **Payments**: Razorpay Integration (Planned/Simulated)

---

## 🏗 Architecture Overview

The system follows a modern **Clean Architecture** pattern to ensure scalability and maintainability.

- **Multi-Tenancy**: Data is siloed per "Café ID", allowing a single instance to serve multiple businesses.
- **Real-Time Sync**: Firebase Realtime Database handles the critical order lifecycle (Pending → Accepted → Ready → Delivered).
- **Persistent Storage**: Firestore manages complex relationships like Menus, Categories, and Historical Analytics.
- **Modular Components**: Shadcn-based UI components ensure a consistent, themeable, and accessible interface.

---

## 📁 Project Structure

```bash
smart-cafe/
├── frontend/             # Next.js Web Application
│   ├── src/
│   │   ├── app/          # App Router (Pages & Layouts)
│   │   ├── components/   # Atomic UI Components (Shadcn)
│   │   ├── hooks/        # Custom React Hooks
│   │   ├── services/     # Firebase Initialization & API Calls
│   │   ├── store/        # Zustand State Management
│   │   └── types/        # TypeScript Definitions
├── backend/              # Node.js Service Layer (Firebase Admin)
│   └── package.json
└── shared/               # Shared Constants & Types (Optional)
```

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn
- A Firebase Project

### 2. Environment Configuration
Create a `.env.local` file in the `frontend/` directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url

# Razorpay (Optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
```

### 3. Installation
```bash
# Install root dependencies
npm install

# Navigate to frontend and start development
cd frontend
npm install
npm run dev
```

---

## 🔗 Local Testing URLs

| Role | URL | Description |
|---|---|---|
| **Customer** | `http://localhost:3000/menu` | Public menu for ordering |
| **Staff/KDS** | `http://localhost:3000/dashboard/staff` | Kitchen display system |
| **Admin** | `http://localhost:3000/dashboard/admin` | Business analytics & settings |

---

## 🔐 Security Note

- **Environment Variables**: Never commit `.env` files. This project uses `.env.example` as a template.
- **Firebase Security Rules**: Ensure Firestore and Realtime Database rules are configured to restrict access by `tenantId` and `userId`.
- **API Limits**: Rate limiting should be applied on the Firebase Admin layer if using Cloud Functions.

---

## 🚢 Deployment Guide

### Vercel (Frontend)
1. Push your code to GitHub.
2. Link your repository to Vercel.
3. Add the Environment Variables listed above in the Vercel Dashboard.
4. Deploy!

### Firebase (Backend/Database)
1. Initialize Firebase CLI: `firebase init`
2. Select Firestore, Realtime Database, and Hosting (if applicable).
3. Deploy rules: `firebase deploy --only firestore:rules,database:rules`

---

## 🗺 Roadmap

- [ ] Multi-lingual menu support (i18n)
- [ ] AI-powered recommendation engine based on order history
- [ ] Integration with Physical Thermal Printers
- [ ] Loyalty points and reward system for frequent customers
- [ ] PWA support for offline menu browsing

---

<p align="center">
  Built with ❤️ by the SmartCafé Team.
</p>
