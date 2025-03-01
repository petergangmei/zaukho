# Zaukho - Movie and TV Series Streaming Platform

Zaukho is a full-stack web application for streaming, renting, and purchasing movies and TV shows. It features a modern React frontend and a Django REST Framework backend.

## Project Structure

```
zaukho/        # Root folder
│── /backend/               # Django + DRF backend
│   ├── /zaukho_api/        # DRF app (Movies, TV shows, Users, Payments)
│   ├── /core/              # Main Django project settings
│   ├── /media/             # Uploaded video files
│   ├── /static/            # Static files
│   ├── manage.py           # Django CLI
│   ├── requirements.txt    # Backend dependencies
│── /frontend/              # React.js frontend
│   ├── /src/               # React source files
│   │   ├── /components/    # Reusable components
│   │   ├── /pages/         # Page views
│   │   ├── /utils/         # Helper functions
│   │   ├── App.js          # Main entry file
│   ├── package.json        # Frontend dependencies
│── /env/                   # Virtual environment
```

## Features

- User authentication and authorization
- Browse movies and TV shows by category
- View movie and TV show details
- Purchase or rent movies and TV shows
- User library to access purchased/rented content
- Admin panel for content management

## Tech Stack

### Backend
- Django 5.1.6
- Django REST Framework 3.15.2
- SQLite (development) / PostgreSQL (production)
- Pillow for image processing

### Frontend
- React 18.2.0
- React Router 6.22.3
- Bootstrap 5.3.2
- Sass for styling
- Axios for API requests

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd zaukho/backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd zaukho/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `/api/movies/` - List all movies
- `/api/tv-series/` - List all TV series
- `/api/categories/` - List all categories
- `/api/seasons/` - List all seasons
- `/api/episodes/` - List all episodes
- `/api/purchases/` - User purchases
- `/api/rentals/` - User rentals
- `/api/library/` - User's library of purchased/rented content

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Your Name - Initial work # zaukho
