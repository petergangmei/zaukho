# ZAUKHO Streaming Platform

A Netflix-inspired streaming platform built with React and Tailwind CSS.

## Project Overview

ZAUKHO is a modern streaming platform that offers movies and TV shows to users through a subscription-based model. The platform features a sleek, responsive UI inspired by Netflix, with a focus on user experience and visual appeal.

## UI Improvements

The UI has been redesigned to match a Netflix-like aesthetic using Tailwind CSS. Key improvements include:

### Common Components

A set of reusable components has been created to ensure consistency across the application:

- **Button**: Versatile button component with different variants, sizes, and states
- **FormInput**: Form input component with label and error handling
- **MediaCard**: Card component for displaying movies and TV shows
- **ContentRow**: Row component for displaying a collection of media cards
- **HeroSection**: Hero section component for displaying featured content
- **FaqItem**: Accordion-style component for displaying FAQ items
- **PricingCard**: Card component for displaying pricing plans

### Page Improvements

Several pages have been updated to use the common components and match the Netflix-like design:

- **Home**: Landing page with hero section, service highlights, and FAQ section
- **Browse**: Main content browsing page with hero section and content rows
- **Login/Register**: Authentication pages with modern design and form validation
- **Pricing**: Subscription plans page with pricing cards and feature comparison
- **About**: Company information page with mission, vision, and team sections
- **ContactUs**: Contact form page with information and FAQ section
- **NotFound**: 404 page with Netflix-like styling

### Design Features

- Dark theme with black and dark gray backgrounds
- Red accent color for buttons and highlights
- Responsive design that works on mobile, tablet, and desktop
- Card-based UI with hover effects
- Modern typography and spacing
- Consistent border styles and rounded corners
- Gradient backgrounds for visual interest

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between pages
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Toastify**: For toast notifications
- **PropTypes**: For type checking component props

## Getting Started

1. Clone the repository
2. Navigate to the frontend directory: `cd zaukho/frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
zaukho/frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Button.js
│   │   │   ├── FormInput.js
│   │   │   ├── MediaCard.js
│   │   │   ├── ContentRow.js
│   │   │   ├── HeroSection.js
│   │   │   ├── FaqItem.js
│   │   │   ├── PricingCard.js
│   │   │   ├── index.js      # Export all components
│   │   │   └── README.md     # Documentation for components
│   │   ├── Footer.js
│   │   └── Header.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── profile/
│   │   ├── library/
│   │   ├── media/
│   │   ├── policies/
│   │   ├── About.js
│   │   ├── Browse.js
│   │   ├── ContactUs.js
│   │   ├── Home.js
│   │   ├── NotFound.js
│   │   └── Pricing.js
│   ├── App.js
│   ├── App.scss
│   ├── index.js
│   └── index.scss
├── package.json
└── README.md
```

## Future Improvements

- Add more animations and transitions for a more dynamic UI
- Implement dark/light theme toggle
- Enhance accessibility features
- Add more interactive elements to the media cards
- Implement skeleton loading states for better UX during data fetching

## Credits

This project was created as part of a UI improvement initiative to enhance the user experience of the ZAUKHO streaming platform. 