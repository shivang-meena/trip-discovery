# Buddy In Hills - Trip Discovery Web Application

A responsive, high-performance Trip Discovery Web Application built for the Buddy In Hills Frontend Developer Internship assessment.

* **Live Demo:** [https://trip-discovery.vercel.app/](https://trip-discovery.vercel.app/)
* **GitHub Repository:** [https://github.com/shivang-meena/trip-discovery](https://github.com/shivang-meena/trip-discovery)

---

## Setup Instructions

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shivang-meena/trip-discovery.git](https://github.com/shivang-meena/trip-discovery.git)
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
The application is modular and component-driven to ensure clean architecture and readability:

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

Data Fetching: Native Fetch API (No Axios or external libraries)

State Management: React Hooks (useState, useEffect) & localStorage

Assumptions Made
API Data Mapping: The dummyjson product data fields were mapped to fit a travel context (e.g., treating a product as a travel package, utilizing the thumbnail and images for destination visuals).

Category UI Density: The API returns a large volume of categories. For a cleaner mobile-friendly UI, the category array is sliced to display a manageable subset on the home screen.

Wishlist Persistence: The wishlist feature is intended for individual user sessions, making localStorage the optimal choice for persistence without requiring backend database integration.

Challenges Faced
API Filtering Limitations:

Challenge: The provided DummyJSON API does not support simultaneous endpoints for searching text and filtering by category (e.g., searching for a specific keyword exclusively within a selected category).

Solution: I implemented a robust client-side filtering system. When both states are active, the application fetches the search results from the API and then utilizes standard JavaScript .filter() methods to narrow the array down to the selected category locally. This prevents UI resets and provides a seamless user experience.

Vite & Tailwind CSS v4 Conflict:

Challenge: During the initial build phase, the newly released Tailwind CSS v4 caused plugin resolution errors within Vite's caching system, breaking the dark mode utility classes.

Solution: To ensure stability, clean code, and meet the tight deadline, I successfully rolled the configuration back to a highly stable Tailwind v3 environment.

Future Improvements
If given more time beyond the assessment deadline, I would implement the following optimizations:

Infinite Scrolling: Replace the manual "Load More" pagination button with an IntersectionObserver to automatically fetch the next batch of trips when the user reaches the bottom of the grid.

Unit Testing: Integrate Vitest and React Testing Library to ensure the custom useDebounce hook and client-side filtering logic remain strictly bug-free as the application scales.

Framer Motion Animations: Implement highly fluid, physics-based page transitions between the Home layout and the Trip Details route to create a native app-like experience.