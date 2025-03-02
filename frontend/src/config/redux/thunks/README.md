# Redux Thunks

This directory contains all the Redux thunks for the Zaukho application. Thunks are separated from slices to improve code organization and maintainability.

## Structure

Each file contains thunks related to a specific domain:

- `authThunks.js` - Authentication-related thunks (login, register, logout, etc.)
- `contentThunks.js` - Content-related thunks (fetching featured content, trending content, etc.)
- `index.js` - Exports all thunks for easy importing

## Usage

### Import from thunks directory

```javascript
import { login, register } from '../redux/thunks';

// Use the thunks
dispatch(login(credentials));
dispatch(register(userData));
```

### Import from slice (backward compatibility)

For backward compatibility, thunks are also exported from their respective slice files:

```javascript
import { login, register } from '../redux/slices/authSlice';

// Use the thunks
dispatch(login(credentials));
dispatch(register(userData));
```

## Adding New Thunks

To add a new thunk:

1. Create a new file or add to an existing file in the thunks directory
2. Export the thunk from the file
3. Add the export to `index.js`
4. Import the thunk in the corresponding slice file and re-export it for backward compatibility

Example:

```javascript
// thunks/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../config/services';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch user profile.'
      );
    }
  }
);
```

Then update `index.js` to export the new thunk:

```javascript
// thunks/index.js
export { fetchUserProfile } from './userThunks';
``` 