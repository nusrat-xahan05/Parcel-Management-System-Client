# 📦 Parcel Delivery System -- Frontend

ParcelRunner **frontend application** which is basically a Parcel Delivery System,
providing role-based dashboards for creating, cancelling, confirming tracking parcels and other more functionalities.

------------------------------------------------------------------------

## 🚀 Technologies Used

-   **React** -- Frontend framework
-   **React Router** -- Routing & navigation
-   **AXIOS**, **Redix RTK Query** -- State management & API calls
-   **TypeScript** -- Type safety
-   **Tailwind CSS**, **ShadCN**, **Origin UI** -- Styling, UI components
-   **Recharts** -- Data visualization (charts & graphs)
-   **Nodemailer**, **Redis** -- OTP verification system
-   **Toast Notifications** -- User feedback
-   **Loading Spinner** -- Smooth UI data loading experience

------------------------------------------------------------------------

## 🌍 Public Routes

-   *Home Page*, *About Page*, *Services Page*, *FAQ Section*, *Contact Page*
-   *Authentication*
    -   Login (JWT-based authentication)
    -   Register (Sender or Receiver role)
    -   Logout functionality

------------------------------------------------------------------------

## 📊 Role-Based Dashboards & Features

### 👑 Admin

-   Manage all **users** & **parcels** (filter, block, verify, approve,
    etc.)
-   View detailed user and parcel information
-   Approve/reject **agent requests**
-   Assign parcels to delivery agents
-   Update parcel statuses
-   **Analytics Dashboard** with statistics cards & pie charts

### 📤 Sender

-   Create new parcel requests
-   Update own profile information
-   Submit agent requests
-   Cancel parcels (if not yet dispatched)
-   View list of created parcels & detailed status logs

### 📥 Receiver

-   View incoming parcels
-   Confirm delivery once received
-   View delivery history
-   Submit agent requests

### 🚚 Agent

-   View assigned parcels
-   Update parcel delivery statuses step by step

------------------------------------------------------------------------

## 🔒 Security & Access Control

-   Only **verified users** can log in
-   Verification via **email OTP** or **admin approval**
-   Once an agent request is rejected, it **cannot be resubmitted**

------------------------------------------------------------------------


## 📂 Project Setup

``` bash
# Clone repo
git clone <repo-url>

# Navigate to frontend folder
cd parcel-delivery-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

------------------------------------------------------------------------

## 📮 Environment Variables

Create a `.env` file in the root of the frontend:

``` env
VITE_API_URL=http://localhost:5000/api/v1
```

------------------------------------------------------------------------

