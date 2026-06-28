# Buddy In Hills - Trip Discovery Web Application

A responsive, high-performance Trip Discovery Web Application built for the Buddy In Hills Frontend Developer Internship assessment.

**Live Demo:** [Insert Your Vercel/Netlify Link Here]

---

## Setup Instructions

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [Insert Your GitHub Repo Link Here]
   cd trip-discovery
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open in Browser:
Navigate to http://localhost:5173 in your web browser.

Folder Structure
The application is structured to ensure clear separation of concerns, scalability, and modularity:

Plaintext
trip-discovery/
├── src/
│   ├── api/
│   │   └── index.ts               # Centralized native fetch() API calls
│   ├── components/
│   │   ├── CategoryFilter.tsx     # Horizontal category selection UI
│   │   ├── Navbar.tsx             # Main navigation, search, and theme toggle
│   │   ├── SkeletonCard.tsx       # Loading state UI for trip cards
│   │   ├── TripCard.tsx           # Reusable individual trip component
│   │   └── WishlistDrawer.tsx     # Slide-out sidebar for local storage favorites
│   ├── hooks/
│   │   └── useDebounce.ts         # Custom hook for optimizing search API calls
│   ├── pages/
│   │   ├── Home.tsx               # Main dashboard with pagination and data grid
│   │   └── TripDetails.tsx        # Dynamic route for single trip details
│   ├── types/
│   │   └── index.ts               # Strict TypeScript basic `type` aliases
│   ├── App.tsx                    # React Router configuration
│   ├── index.css                  # Global styles and Tailwind directives
│   └── main.tsx                   # React DOM entry point
Technologies Used
Frontend Framework: React.js (Vite)

Language: TypeScript (Strictly utilizing basic type aliases)

Routing: React Router DOM

Styling: Tailwind CSS (v3)

Data Fetching: Native Fetch API (No external libraries like Axios used)

State Management: React Hooks (useState, useEffect) & localStorage

Assumptions Made
API Data Mapping: The dummyjson product data fields were mapped to fit a travel context (e.g., treating a product as a travel package, utilizing the thumbnail and images for destination visuals).

Category Limits: The API returns many categories; for UI cleanliness, I sliced the initial category array to display the first 10 relevant categories.

Wishlist Scope: The wishlist feature is intended for individual user sessions, thus localStorage is sufficient for persistence without requiring a backend database.

Challenges Faced
API Filtering Limitations: The provided DummyJSON API does not support simultaneous endpoints for searching text and filtering by category (e.g., searching for "Gucci" exclusively within the "Fragrances" category).

Solution: I implemented robust client-side filtering. When both states are active, the app fetches the search results and then utilizes standard JavaScript .filter() methods to narrow the array down to the selected category locally, preventing UI resets and providing a seamless user experience.

Vite & Tailwind CSS v4 Conflict: During initial setup, the newly released Tailwind CSS v4 caused plugin resolution errors within Vite's caching system.

Solution: To ensure stability and meet the tight deadline, I successfully rolled the configuration back to a highly stable Tailwind v3 environment, allowing the custom Dark Mode and UI classes to compile perfectly.

Future Improvements
If given more time beyond the assessment deadline, I would implement the following features:

Infinite Scrolling: Replace the manual "Load More" button with an IntersectionObserver to automatically fetch the next paginated batch of trips when the user reaches the bottom of the screen.

Unit Testing: Implement Vitest and React Testing Library to ensure the custom useDebounce hook and client-side filtering logic remain completely bug-free as the app scales.

Advanced Animations: Use Framer Motion to add highly fluid page transitions between the Home route and the Trip Details route.


***

**Crucial reminder:** Do not forget to replace `[Insert Your Vercel/Netlify Link Here]` and `[Insert Your GitHub Repo Link Here]` with your actual links before committing this file!

Are you ready to draft the final submission email to send to Ojaswa, or do you need help deploying it to