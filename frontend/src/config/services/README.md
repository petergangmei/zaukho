# API Services

This directory contains the API service modules for the Zaukho frontend application. Each service is responsible for a specific domain of API calls.

## Structure

- `apiClient.js` - Base axios instance with interceptors for authentication and error handling
- `authService.js` - Authentication-related API calls (login, register, token management)
- `profileService.js` - User profile operations
- `contentService.js` - Content-related operations (fetching content, featured content, etc.)
- `categoryService.js` - Category-related operations
- `searchService.js` - Search functionality
- `watchlistService.js` - User watchlist operations
- `libraryService.js` - User library operations
- `transactionService.js` - Purchase and rental operations
- `engagementService.js` - User engagement operations (ratings, comments)
- `index.js` - Exports all services for easy importing

## Usage

### Modern Usage (Recommended)

Import specific services directly:

```javascript
import { authService, contentService } from '../config/services';

// Use the services
authService.login(credentials)
  .then(response => {
    // Handle login response
  });

contentService.getFeatured()
  .then(response => {
    // Handle featured content
  });
```

### Legacy Usage (For Backward Compatibility)

The old `api` object is still available for backward compatibility:

```javascript
import { api } from '../config/services';
// or
import api from '../config/services';

// Use the legacy API structure
api.auth.login(credentials)
  .then(response => {
    // Handle login response
  });

api.content.getFeatured()
  .then(response => {
    // Handle featured content
  });
```

## Migration Guide

When working on existing components, consider migrating from the legacy `api` object to the new service-specific imports. This will make your code more maintainable and easier to understand.

### Before:

```javascript
import api from '../config/services';

api.auth.login(credentials);
```

### After:

```javascript
import { authService } from '../config/services';

authService.login(credentials);
```

## Benefits of the New Structure

1. **Better Code Organization**: Each service is in its own file, making it easier to find and modify API calls.
2. **Improved Readability**: Clear separation of concerns makes the code more readable and maintainable.
3. **Better TypeScript Support**: When migrating to TypeScript, each service can have its own types.
4. **Easier Testing**: Individual services are easier to mock and test.
5. **Reduced Bundle Size**: With tree-shaking, only the services that are actually used will be included in the bundle. 