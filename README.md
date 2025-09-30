# KFC Restaurant Management Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) dashboard for managing restaurant inventory, viewing summary statistics, and handling customer reviews. This project uses JSON files for data storage and supports image uploads for inventory items.

## Features

- Dashboard with summary cards (categories, food items, popular items, reviews)
- Inventory management with add/edit/delete functionality
- Image upload for inventory items
- Customer reviews display
- Simple user authentication (optional)

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd MERN_restaurant
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

1. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

   The backend runs on [http://localhost:8080](http://localhost:8080) by default.

2. **Start the frontend React app:**
   ```bash
   cd ../frontend
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000) and proxies API requests to the backend.

### Usage

- Access the dashboard at [http://localhost:3000](http://localhost:3000)
- Inventory images should be placed in `backend/uploads/` and referenced by filename in `backend/inventory.json`.
- To add new items, use the "Add New" button in the Inventory page.

### Customization

- Update `backend/inventory.json` and `backend/dashboard.json` for your own items and reviews.
- Images must be uploaded to `backend/uploads/`.

### Troubleshooting

- If images do not appear, ensure filenames match and files are present in `uploads/`.
- If API requests fail, check that both servers are running and the proxy is set in `frontend/package.json`.

## License

MIT
