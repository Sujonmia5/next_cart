# Nex_Cart — Premium E-commerce Experience

Nex_Cart is a state-of-the-art e-commerce platform designed for speed, style, and a premium shopping experience. Built with the latest web technologies, it offers a seamless interface for both customers and administrators.

---

## ✨ Key Features

### For Shoppers

- **Premium Design**: High-contrast, modern UI using the Syne typeface and smooth Framer Motion animations.
- **Advanced Product Filtering**: Search and filter products by category, price, and availability.
- **Smart Cart System**: LocalStorage-persisted cart with instant updates and a slide-out sidebar preview.
- **Social Authentication**: Secure one-tap login and registration via Google.
- **Responsive Experience**: Fully optimized for mobile, tablet, and desktop browsing.

### 🛡️ For Administrators

- **Comprehensive Dashboard**: Real-time overview of sales, products, and customers.
- **Product Management**: Full CRUD operations for products, including multi-image uploads to Cloudinary.
- **Customer Insights**: Manage user roles, account statuses, and profiles.
- **Order Tracking**: Detailed order management system with status updates.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth) & [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- **Images**: [Cloudinary](https://cloudinary.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sujonmia5/next_cart.git
cd nex_cart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
BASE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📍 Route Summary

### Public Routes

| Route         | Description                                        |
| :------------ | :------------------------------------------------- |
| `/`           | Home page with featured sections and testimonials. |
| `/items`      | Main shop page with search and filtering.          |
| `/items/[id]` | Detailed product view with gallery and specs.      |
| `/about`      | Our brand story and mission.                       |
| `/contact`    | Interactive contact form and office locations.     |
| `/login`      | Secure authentication gateway.                     |

### Admin Routes (Protected)

| Route                     | Description                               |
| :------------------------ | :---------------------------------------- |
| `/dashboard`              | Admin analytics and summary.              |
| `/dashboard/items/add`    | Interface for adding new products.        |
| `/dashboard/items/manage` | Inventory management and product editing. |
| `/dashboard/orders`       | Order tracking and management.            |
| `/dashboard/customers`    | User management and role assignment.      |

---

## 📦 Deployment

This project is ready to be deployed on **Vercel**.

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add the environment variables listed above in the Vercel Dashboard.
4. Deploy!

---

## 📄 License

This project is licensed under the MIT License.
