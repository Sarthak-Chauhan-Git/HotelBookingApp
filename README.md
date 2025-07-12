# 🏨 HotelBookingApp — AirBnB Inspired

A full-stack hotel booking web application inspired by **AirBnB**, built with Node.js, Express, MongoDB, and EJS templating. Users can browse listings, leave reviews, and manage their own properties.
---

## 🚀 Features

- 🔐 **User Authentication** with Passport.js
- 🏠 **Create, Edit, Delete Listings**
- 🌍 **Search listings by location**
- ⭐ **Rate and Review listings**
- ☁️ **Image uploads using Cloudinary**
- 🗺️ **Interactive map with MapTiler**
- ✅ **Form validation with Joi**
- 💬 **Flash messages for actions**
- 📦 **Production-ready for deployment**

---

## 🛠️ Tech Stack

| Layer     | Technologies                          |
|-----------|----------------------------------------|
| Frontend  | HTML5, CSS3, Bootstrap, EJS            |
| Backend   | Node.js, Express.js                    |
| Database  | MongoDB, Mongoose                      |
| Auth      | Passport.js, express-session           |
| Uploads   | Multer, Cloudinary                     |
| Mapping   | MapTiler                               |
| Validation| Joi                                    |
| Deployment| Render                                 |

---

## 📂 Project Structure

```

HotelBookingApp/
├── models/               # Mongoose schemas
├── routes/               # Express route handlers
├── views/                # EJS templates
│   ├── listings/
│   ├── reviews/
│   └── partials/
├── public/               # Static assets
├── middleware/           # Custom middleware
├── cloudConfig.js        # Cloudinary config
├── app.js                # Entry point
├── .env                  # Environment variables (ignored)
├── package.json
└── README.md

````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sarthak-Chauhan-Git/HotelBookingApp.git
cd HotelBookingApp
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root and add the following:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPTILER_KEY=your_maptiler_key
DB_URL=mongodb://127.0.0.1:27017/hotel-app
SESSION_SECRET=your_session_secret
```

### 4. Run the App

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐞 Common Issues

### ❌ `Cannot find module '../cloudConfig.JS'`

Ensure your filename and import casing match exactly:
✅ `cloudConfig.js`
✅ `require("../cloudConfig.js")`

### ❌ Peer dependency conflict (`cloudinary` & `multer-storage-cloudinary`)

Add this to your `.npmrc` file in root:

```bash
legacy-peer-deps=true
```

Or install dependencies with:

```bash
npm install --legacy-peer-deps
```

---

## ☁️ Deployment (Render)

1. Push your code to a GitHub repository.
2. Create a **Web Service** on [Render](https://render.com/).
3. Set environment variables in the **Dashboard**.
4. Build command:

   ```bash
   npm install
   ```
5. Start command:

   ```bash
   node app.js
   ```

---

## 🙌 Author

Developed with ❤️ by [**Sarthak Chauhan**](https://github.com/Sarthak-Chauhan-Git)

---

## 🛣️ Roadmap

* [ ] Add user-to-user messaging
* [ ] Add payment gateway (e.g. Razorpay/Stripe)
* [ ] Integrate search with filters (budget, location, rating)
* [ ] Convert to React frontend (SPA)
* [ ] PWA support for offline use


