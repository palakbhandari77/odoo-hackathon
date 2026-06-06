# VendorBridge ERP

A streamlined, real-time procurement and financial management platform built for the Odoo Hackathon. VendorBridge enables seamless RFQ management, vendor onboarding, and automated procurement tracking.

## Features
* **Vendor Management**: Admin-controlled vendor onboarding and status approval.
* **RFQ Workflow**: Create and track Requests for Quotation in real-time.
* **Dashboard**: Live financial and procurement metrics tracking.
* **Secure Auth**: Role-based access control for Admins and Vendors.

## Tech Stack
* **Frontend**: React.js, Tailwind CSS, Vite, Lucide React
* **Backend**: Node.js, Express, PostgreSQL
* **Tools**: Axios for API integration, Dotenv for configuration

## Setup
1. Clone the repository.
2. Install dependencies: `npm install` in both `client` and `server` folders.
3. Configure your `.env` files (refer to `.env.example`).
4. Seed the database: `node src/db/seed.js` in the `server` folder.
5. Run the development environment.
