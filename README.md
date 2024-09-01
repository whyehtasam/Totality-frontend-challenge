# 🏠 Real Estate Booking Platform

Welcome to the Real Estate Booking Platform! This project is a frontend challenge from **Totality Corp** that demonstrates a fully functional real estate booking application. The platform allows users to browse properties, add them to a cart, manage bookings, and check out with ease. It is built using **React** with **TypeScript** and incorporates modern UI libraries for a seamless and responsive user experience.

🌐 **Website Link**: [Totality Frontend Challenge](https://totality-frontend-challenge-theta.vercel.app/)

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Setup and Usage](#-setup-and-usage)
- [Approach and Implementation](#-approach-and-implementation)
- [Additional Notes](#-additional-notes)

## 🛠 Tech Stack

- **React** with **TypeScript**: Provides type safety and enhances code maintainability.
- **Next.js**: Used for file-based routing, server-side rendering (SSR), and static site generation (SSG).
- **Shadcn UI** and **Magic UI**: Modern UI libraries for creating responsive and aesthetically pleasing components.
- **Context API**: For managing global state across the application, including cart and booking status.
- **Firebase Authentication**: For user authentication using Google login.
- **Vercel**: For deployment and hosting.

## ✨ Features

- **Property Listings**: Browse and search properties with detailed information.
- **Filter Properties**: Filter properties based on the requriments.
- **Add to Cart**: Easily add properties to the cart for booking.
- **Manage Cart**:
  - Increase or decrease property quantity in the cart.
  - View total price dynamically.
  - Remove properties from the cart.
- **Booking Status**: Track the status of your bookings in real-time.
- **Favorites**: Mark properties as favorites for quick access.
- **Authentication**: Login and logout using Google authentication.
- **Responsive Design**: Fully responsive and optimized for all devices.
- **File-based Routing**: Utilizes Next.js file-based routing for easy navigation.

## Approach and Implementation

1. **Project Setup:**
   - Initialized the project with Next.js and TypeScript for type safety and enhanced development experience.
   - Configured ESLint and Prettier for code quality and formatting.

2. **UI Components:**
   - Utilized Shadcn UI and Magic UI for building reusable and responsive components such as buttons, cards, modals, etc.

3. **State Management:**
   - Implemented the Context API to manage global state for the cart and favorites, allowing components to access and modify state as needed.
   - Created `BookingContext` to handle cart operations, booking status, and favorites.

4. **Authentication:**
   - Integrated Firebase Authentication to enable users to log in and log out using their Google accounts.

5. **File-based Routing:**
   - Leveraged Next.js's file-based routing for clean and intuitive navigation across the platform.

6. **Responsive Design:**
   - Ensured that the application is fully responsive across all devices, using a mobile-first approach and responsive UI libraries.

7. **Deployment:**
   - Deployed the application to Vercel for easy access and fast performance.

## 📖 Additional Notes

- **Cart Management:** Users can add properties to their cart, adjust the quantity, and view the total price dynamically.
- **Booking Status:** The status of each booking is dynamically updated and displayed to the user.
- **Authentication Flow:** Users can log in or sign up to the page using email and password or google account simply.
- **Favorites:** Properties can be added or removed from the favorites list, which is stored in the global state.
- **Checkout:** After adding properties to the cart, users can proceed to checkout, where they will see the final booking status.

## 🎉 Conclusion

This project demonstrates a comprehensive approach to building a real estate booking platform using modern web technologies. It showcases effective use of state management, responsive design, and user authentication while providing a smooth and interactive user experience.
