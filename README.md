# QuickCourt – A Local Sports Booking Platform--...

## Overview
QuickCourt is a full-stack web application that enables sports enthusiasts to discover, book, and manage local sports facilities such as badminton courts, turf grounds, and tennis tables. The platform connects **Users**, **Facility Owners**, and **Admins** to ensure a smooth booking process, accurate scheduling, and a vibrant sports community.

## Roles & Features

### **User**
- **Authentication**
  - Sign up with email, password, full name, avatar, and role.
  - Login with email and password.
  - OTP verification during signup.
- **Home Page**
  - Welcome banner/carousel.
  - Quick links to popular venues and sports.
- **Venues Page**
  - Browse approved sports venues.
  - Search and filter (sport type, price, venue type, rating).
  - Pagination with venue cards showing:
    - Venue Name
    - Sport Types
    - Price/hour
    - Location
    - Rating (optional)
- **Single Venue Page**
  - Venue details, sports list, amenities, gallery, reviews.
  - **Book Now** button.
- **Court Booking**
  - Select court, time slot, and view pricing.
  - Simulated payment.
  - Redirect to "My Bookings".
- **Profile**
  - View & edit personal details.
  - View bookings with status (Confirmed/Cancelled/Completed).
  - Option to cancel future bookings.

---

### **Facility Owner**
- **Dashboard**
  - KPIs: Total Bookings, Active Courts, Earnings (simulated), Booking Calendar.
  - Charts: Booking Trends, Earnings Summary, Peak Booking Hours.
- **Facility Management**
  - Add/edit facility details (name, location, description, sports, amenities, photos).
- **Court Management**
  - Manage courts, pricing, operating hours.
  - Block maintenance slots.
- **Booking Overview**
  - List upcoming and past bookings with status.
- **Profile**
  - Edit owner details.

---

### **Admin**
- **Dashboard**
  - Global stats: Total users, facility owners, bookings, active courts.
  - Charts: Booking Activity, User Trends, Facility Approval Trend, Popular Sports, Earnings.
- **Facility Approval**
  - Review, approve, or reject facility registrations.
- **User Management**
  - Search and filter by role/status.
  - Ban/unban users.
  - View booking history.
- **Reports & Moderation** (Optional)
  - Handle flagged facilities/users.
- **Profile**
  - Edit admin details.

---

## Tech Stack (Suggested)
- **Frontend:** React.js (with Tailwind CSS / Material UI)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Charts:** Chart.js / Recharts
- **Authentication:** JWT + OTP simulation
- **Payment Simulation:** Razorpay/Stripe (test mode) or simple "Booking Confirmed" screen

---

## Hackathon Execution Plan (24 Hours)

### **Hour 0–2: Setup**
- Create GitHub repo and initialize frontend (`create-react-app` or Vite) & backend (`Express.js`).
- Setup MongoDB schema for **Users**, **Venues**, **Courts**, **Bookings**.
- Plan minimal UI wireframes (skip perfection).

---

### **Hour 3–6: Authentication**
- Implement signup/login with role selection (User / Facility Owner / Admin).
- OTP simulation (simple code match).
- JWT authentication for protected routes.

---

### **Hour 6–10: User Features**
- **Frontend**: Home Page, Venues Page (mock data first), Venue Details Page, Booking Page.
- **Backend**: CRUD for venues & bookings.
- Simulate payment (status = "Confirmed").

---

### **Hour 10–14: Facility Owner**
- Dashboard with counts (Total Bookings, Active Courts).
- Add/Edit facility, add courts, set pricing.
- View bookings for their courts.

---

### **Hour 14–18: Admin**
- Facility approval page (approve/reject).
- User management (ban/unban, view history).
- Global stats (dummy chart data if time is short).

---

### **Hour 18–22: Polish & Charts**
- Integrate Chart.js for trends (dummy data OK if backend time is short).
- Add pagination & search filters for venues.
- Improve booking calendar for Facility Owners.

---

### **Hour 22–24: Final Touch & Deployment**
- Test all flows: User → Booking → Owner → Admin approval.
- Fix bugs, adjust styling.
- Deploy to **Vercel** (frontend) & **Render** (backend).
- Update README & record demo video.

---

## Future Enhancements
- Real payment gateway integration.
- Reviews & ratings for venues.
- Real-time slot blocking.
- Email notifications.

---

## Mockups
[QuickCourt Wireframes](https://link.excalidraw.com/l/65VNwvy7c4X/AU4FuaybEgm)
