Create a responsive React + Tailwind CSS frontend for a sports booking platform called "QuickCourt".

Theme:
- Modern, minimal, and vibrant.
- Sports-themed with a fresh green (#16A34A), dark navy (#0F172A), and white color palette.
- Use rounded corners, subtle shadows, and hover effects for interactive elements.

Pages & Components:
1. **Home Page**
   - Hero banner/carousel showcasing sports images (badminton, tennis, football turf).
   - Sections for "Popular Venues" and "Popular Sports" in a horizontal scroll card layout.
   - Each card: venue/sport image, name, location, price/hour, and a "Book Now" button.

2. **Venues Page**
   - Search bar at top with filters for sport type, price range, and rating.
   - Grid of venue cards (image, venue name, sport type, price/hour, location).
   - Pagination controls at the bottom.

3. **Single Venue Page**
   - Large venue image gallery slider.
   - Venue details: name, description, sports offered, amenities, location.
   - "Book Now" button fixed on scroll.

4. **Booking Page**
   - Form to select court, date, and time slot.
   - Pricing summary section with "Proceed to Payment" button.
   - Clean confirmation screen after simulated payment.

5. **User Dashboard (My Bookings)**
   - List of bookings in card view.
   - Each card: venue name, court, date, time, booking status, and cancel button.

6. **Facility Owner Dashboard**
   - KPI cards (Total Bookings, Active Courts, Earnings).
   - Booking trends chart (use Chart.js).
   - Buttons to add/edit facilities and courts.
   - Table of upcoming bookings.

7. **Admin Dashboard**
   - KPI cards (Total Users, Facility Owners, Total Bookings).
   - Facility approval list with approve/reject buttons.
   - User management table with search and ban/unban actions.

UI Style Guidelines:
- Font: "Inter" or "Poppins".
- Buttons: Large, rounded, with hover animations.
- Inputs: Rounded with subtle border.
- Use Tailwind's utility classes for spacing and responsiveness.
- Mobile-friendly layout with collapsible navbar.

Output:
- Full React components for each page.
- Tailwind CSS styling.
- Dummy data for cards, lists, and charts.
