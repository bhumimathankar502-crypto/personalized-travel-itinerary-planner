# Personalized Travel Itinerary Planner (YatraAI)

A full-stack, AI-powered travel planning SaaS application designed from the ground up for Indian destinations and travelers, with comprehensive support for global itineraries. The application generates realistic day-by-day schedules with time slots, authentic regional dining, budget stays, and estimated costs in **Indian Rupees (₹ / INR)**.

---

## 🌟 Key Features

- **India-First Experience & Currency**:
  - Full Indian Rupee (`₹ / INR`) pricing formatted via `en-IN` (e.g. `₹1,25,000`).
  - Pre-loaded with comprehensive knowledge bases for 30+ iconic Indian destinations (Indore, Bhopal, Ujjain, Gwalior, Jaipur, Udaipur, Jodhpur, Jaisalmer, Mumbai, Pune, Nagpur, Delhi, Agra, Varanasi, Bengaluru, Hyderabad, Chennai, Kochi, Goa, Manali, Shimla, Rishikesh, Srinagar, Kolkata, Darjeeling, Guwahati, etc.) as well as adaptive support for any custom destination worldwide.
  - Realistic travel contexts: budget hostels, dhabas, heritage homestays, local auto-rickshaws, metro networks, trains, and walking trails.
  - Distances in kilometres (km) and schedules in 24-hour time slots.
- **Intelligent Dual-Engine AI Architecture**:
  - **Generative AI Provider**: Integrates seamlessly with Google Gemini (or OpenAI / Groq) via backend prompt engineering.
  - **Zero-Downtime Knowledge Engine Fallback**: If an AI API key is not supplied or if rate limits occur, the system automatically uses an algorithmic Indian travel knowledge engine.
- **Dynamic Daily Schedules**:
  - Structured into **Morning**, **Afternoon**, and **Evening** time slots.
  - Interactive: Add custom activities, edit timings, modify costs, or remove activities on the fly.
  - Category-wise expense breakdown: Accommodation, Food & Dining, Sightseeing, Local Transport, and Contingency.
- **Data Persistence (Supabase & Local)**:
  - Supabase PostgreSQL schema with Row-Level Security (RLS) included in `supabase/schema.sql`.
  - Offline local fallback (`backend/data/saved_trips.json` & browser storage) ensures the app functions completely out of the box without requiring external database accounts.
- **Production-Ready & Responsive UI/UX**:
  - Designed with Tailwind CSS, Lucide icons, and modern travel SaaS aesthetics.
  - One-click print/PDF export and WhatsApp/clipboard sharing.
  - Real-time diagnostic pill showing Backend, AI, and Supabase status.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2, HTTPX |
| **Database** | Supabase (PostgreSQL) + Local JSON persistence fallback |
| **AI Integration** | Google Gemini 1.5 Flash / Groq / Algorithmic Knowledge Engine |
| **Deployment** | Netlify (`netlify.toml` included with SPA redirects) & GitHub |

---

## 🚀 Running the Project Locally (Windows PowerShell)

### Prerequisites
- Python 3.10 or higher
- Node.js v18 or higher (Node v20+ recommended)
- Git

### 1. Backend Setup & Run

Open a Windows PowerShell terminal:

```powershell
# Navigate to the backend directory
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install required Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
python run.py
```

The backend server starts at **`http://127.0.0.1:8000`**.
- Interactive Swagger API docs: **`http://127.0.0.1:8000/docs`**
- Health Check: **`http://127.0.0.1:8000/api/health`**

---

### 2. Frontend Setup & Run

Open a second Windows PowerShell terminal:

```powershell
# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Start the Vite development server
npm run dev
```

The frontend application will be live at **`http://localhost:5173`**.

---

## ⚙️ Environment Variables Configuration

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` if you wish to configure live AI or Supabase:

```ini
HOST=127.0.0.1
PORT=8000
FRONTEND_URL=http://localhost:5173

# Optional: Add your Google Gemini API key to use live LLM generation
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Add Supabase credentials for cloud database persistence
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:

```ini
# Leave empty in local development to use the Vite proxy
VITE_API_BASE_URL=

# Optional: Supabase client credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🗄️ Database Setup (Supabase)

To connect your Supabase project:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](file:///supabase/schema.sql).
4. (Optional) Run [`supabase/seed.sql`](file:///supabase/seed.sql) to populate sample Indian trips.
5. Copy your **Project URL** and **Anon Key** into `backend/.env`.

---

## 🚢 Deployment (Netlify)

This project is configured for deployment to Netlify:
- Root configuration file: [`netlify.toml`](file:///netlify.toml)
- Build base: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- SPA redirects configured to forward all client routes (`/* -> /index.html 200`).
