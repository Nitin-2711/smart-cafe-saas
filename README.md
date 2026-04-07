# SmartCafé | Privacy-First QR Ordering SaaS

![SmartCafé Ecosystem Banner](https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600&h=400)

SmartCafé is a multi-tenant, privacy-first QR ordering SaaS designed for high-end cafés. It features a complete ecosystem combining a beautiful consumer-facing web app, a high-speed staff command center, and an enterprise admin dashboard, all synchronized via real-time Firebase listeners.

## 🌟 Core Features

- **Multi-Tenant Architecture**: Single SaaS deployment mapping to hundreds of independent cafés securely via URL segmenting (`/[cafeId]`) and indexed Firestore queries.
- **Privacy-First DND Mode**: Unique "Silent Drop" toggles allowing customers to explicitly ask wait-staff not to interrupt their dates or deep-work sessions.
- **Zero-Refresh Workflow**: Absolute real-time UI synchronization using Firebase `onSnapshot` from customer's phone to the staff Kitchen Display System (KDS).
- **Service Request Hooks**: Floating Action Button allowing seamless pinging for Water, Bill, or Waiter Assistance.
- **Micro-Animations & Premium UI**: Apple/Linear-inspired interactions, skeleton loading states, glassmorphism, and seamless page transitions utilizing ShadCN UI and Framer Motion.

---

## 🏗️ Technical Architecture

### Frontend (Next.js 15 App Router)
- **Framework**: `Next.js` utilizing the App router with complete server-side capabilities.
- **State Management**: `zustand` for high-performance localized cart logic.
- **Styling**: `TailwindCSS v4` paired with `Shadcn UI` components for structural beauty.
- **Animations**: `framer-motion` for complex un-mounting and lifecycle animations.

### Backend (Firebase)
- **Database**: Firestore. Highly indexed, NoSQL architecture relying on shallow queries for maximum performance.
- **Realtime sync**: Full WebSocket connection streaming delta updates (preventing long-polling latency).

---

## 🗂️ Project Structure

```text
├── src/
│   ├── app/
│   │   ├── page.tsx                           # Global SaaS Marketing Landing Page
│   │   ├── layout.tsx                         # Global Theme/Toaster definitions
│   │   ├── admin/                             # Super-Admin Tenant Management Dashboard
│   │   ├── staff/[cafeId]/                    # Kitchen / Waiter Command Center
│   │   └── [cafeId]/                          # Consumer QR Dashboard
│   │       ├── cart/                          # Cart & Razorpay Checkout Simulation
│   │       ├── order/[orderId]/               # Live Apple-style Order tracker
│   │       └── components/                    # Consumer-specific components
│   ├── components/ui/                         # Headless Shadcn Components
│   ├── hooks/
│   │   └── useRealtime.ts                     # Real-time WebSocket Firebase Subscriptions
│   ├── lib/
│   │   └── firebase/config.ts                 # Firebase Client App Initialization
│   ├── services/
│   │   └── db.ts                              # Cloud Firestore Mutations / Writers
│   ├── store/
│   │   └── useAppStore.ts                     # Zustand Client Store
│   └── types/
│       └── index.ts                           # Comprehensive System Interfaces
```

---

## 🚀 Getting Started

### 1. Requirements
Ensure you have `Node.js 18+` installed on your machine.

### 2. Environment Variables
To connect this to your specific Firebase instance, create a `.env.local` file at the root of the project with your Firebase Config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

> **Note**: For initial development, the app will gracefully fall back to a mock data system if the Firebase keys are absent or utilizing the default placeholder config.

### 3. Installation

Run the following inside your terminal:
```bash
npm install
npm run dev
```

The application will be running at `http://localhost:3000`.

---

## 🧩 Exploring the Application

You can seamlessly test all 3 personas of the SaaS locally:

1. **The Customer View**: Open `http://localhost:3000/blue-tokai-1` to simulate a customer scanning a table QR code. You can browse the menu, toggle Privacy Mode, use the floating chat widget, and place an order.
2. **The KDS (Staff) View**: Open `http://localhost:3000/staff/blue-tokai-1` in a separate window. Note how orders placed by the customer appear *instantly* without browser refreshes. Change an order status here to see the customer tracker update live.
3. **The Admin View**: Open `http://localhost:3000/admin` to observe the global analytics simulating all tenant dashboards.

---

## 🗄️ Database Schemas (Firestore)

The multi-tenant nature implies that every core document is stamped with a `cafeId`. 

- **orders**: `{ id, cafeId, tableNumber, items[], totalAmount, status, paymentStatus, createdAt, doNotDisturb }`
- **menu**: `{ id, cafeId, name, description, price, imageUrl, isVeg, isAvailable }`
- **chatRequests**: `{ id, cafeId, tableNumber, type(water|bill|waiter|help), status, createdAt }`

*Highly recommended to add composite indexes in Firebase for: `(cafeId, status)` and `(cafeId, createdAt DESC)` to ensure rapid loading.*

---

## 🔐 Security & Deployment

For a production deployment to **Vercel**:
1. Commit the code to GitHub.
2. Connect the repository to Vercel.
3. Inject the production Firebase variables into the Vercel Environment Configuration.
4. Deploy. Next.js App Router will handle all Route Caching optimizing the initial loads automatically.

### Firebase Security Rules
Ensure your Firestore rules restrict reading/writing to the appropriate roles within the `[cafeId]` tenant parameters to prevent Cross-Tenant Data Leakage.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // REPLACE IN PRODUCTION WITH ROLE-BASED AUTH
    }
  }
}
```

---
*Built to modern SaaS standards for scalability, aesthetics, and user privacy.*
