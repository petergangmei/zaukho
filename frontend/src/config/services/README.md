# Zaukho API Services

This directory contains the API service modules for the Zaukho frontend application. Each service is responsible for a specific domain of API calls to the backend.

## Structure

The services are organized as follows:

- `apiClient.js` - Base axios instance with interceptors for authentication and error handling
- `index.js` - Exports all services for easy importing
- Individual service files for each domain:
  - `auth.service.js` - Authentication operations (login, register, token management)
  - `profile.service.js` - User profile operations
  - `content.service.js` - Content-related operations
  - `categories.service.js` - Category-related operations
  - `search.service.js` - Search operations
  - `watchlist.service.js` - User watchlist operations
  - `library.service.js` - User library operations
  - `purchases.service.js` - Purchase operations
  - `rentals.service.js` - Rental operations
  - `ratings.service.js` - Rating operations
  - `comments.service.js` - Comment operations
  - `home.service.js` - Homepage-related operations

## Usage

### Modern Import (Recommended)

Import specific services directly:

```javascript
import { authService, contentService } from '@/config/services';

// Use the services
authService.login(credentials);
contentService.getFeatured();
```

### Legacy Import

For backward compatibility, you can still use the combined API object:

```javascript
import api from '@/config/services';

// Use the services
api.auth.login(credentials);
api.content.getFeatured();
```

## Adding New Services

To add a new service:

1. Create a new file named `your-feature.service.js`
2. Import the apiClient and export your service methods
3. Add the service to `index.js` for exporting

Example:

```javascript
// your-feature.service.js
import apiClient from './apiClient';

const yourFeatureService = {
  getSomething: () => apiClient.get('/your-feature/something/'),
  createSomething: (data) => apiClient.post('/your-feature/something/', data),
};

export default yourFeatureService;
```

Then update `index.js` to include your new service. 