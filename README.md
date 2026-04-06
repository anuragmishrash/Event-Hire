# EventHire — Multi-Step Requirement Posting App

A full-stack web app where event organizers post hiring needs for planners, performers, or crew.

## Tech Stack

| Layer      | Tech                                          |
|------------|-----------------------------------------------|
| Frontend   | Next.js 14 (App Router), Tailwind CSS, Framer Motion |
| Backend    | Node.js + Express.js                          |
| Database   | MongoDB Atlas                                 |
| HTTP       | Axios                                         |

---

## Project Structure

```
eventhire/
├── frontend/         # Next.js 14 app (port 3000)
└── backend/          # Express API (port 5000)
```

---

## Setup & Running

### 1. Backend

```bash
cd eventhire/backend
npm install
npm run dev        # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd eventhire/frontend
npm install
npm run dev        # starts on http://localhost:3000
```

Open `http://localhost:3000` — it auto-redirects to `/post`.

---

## Environment Variables

**`backend/.env`**
```
MONGO_URI=mongodb+srv://lordgameranurag:987654321Anu@cluster0.lfpl7c7.mongodb.net/EventHire?retryWrites=true&w=majority
PORT=5000
```

---

## API Reference

| Method | Endpoint                         | Description                  |
|--------|----------------------------------|------------------------------|
| POST   | `/api/requirements/planner`      | Create a planner requirement |
| POST   | `/api/requirements/performer`    | Create performer requirement |
| POST   | `/api/requirements/crew`         | Create a crew requirement    |
| GET    | `/api/requirements/all`          | Get all requirements (merged)|

### POST body (shared base fields)
```json
{
  "eventName": "Sharma Wedding",
  "eventType": "Wedding",
  "dateType": "single",
  "eventDate": "2024-12-15",
  "location": "Mumbai",
  "venue": "Grand Hyatt",
  "category": "planner"
}
```

### GET /api/requirements/all — Response
```json
{
  "success": true,
  "count": 3,
  "data": [ ...merged array sorted by createdAt desc ]
}
```

---

## MongoDB Collections

| Collection                 | Category  |
|----------------------------|-----------|
| `plannerrequirements`      | planner   |
| `performerrequirements`    | performer |
| `crewrequirements`         | crew      |

---

## Features

- ✅ 4-step multi-step form with animated transitions
- ✅ Category-adaptive Steps 2 & 3 (Planner / Performer / Crew)
- ✅ Chip multi-selects, number steppers, conditional fields  
- ✅ Framer Motion slide + spring animations throughout
- ✅ Full form validation per step
- ✅ MongoDB Atlas persistence per category
- ✅ Success screen with animated checkmark
- ✅ Mobile responsive (single column on mobile)
