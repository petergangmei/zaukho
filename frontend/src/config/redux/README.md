# Redux Structure

This directory contains the Redux store configuration and state management for the Zaukho application.

## Directory Structure

- `slices/` - Contains Redux slices with reducers and selectors
- `thunks/` - Contains Redux thunks for async operations
- `store.js` - Redux store configuration
- `index.js` - Exports the store and other Redux utilities

## Slices

Slices are responsible for defining:
- Initial state
- Reducers for synchronous state updates
- Selectors for accessing state
- Extra reducers for handling async thunk actions

Each slice is focused on a specific domain of the application (auth, content, etc.).

## Thunks

Thunks are responsible for:
- Handling async operations (API calls, etc.)
- Dispatching actions based on the result of those operations
- Error handling for async operations

Thunks are separated from slices to improve code organization and maintainability.

## Usage

### Using Slices

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, clearError } from '../config/redux/slices/authSlice';

function MyComponent() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const handleClearError = () => {
    dispatch(clearError());
  };
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={handleClearError}>Clear Error</button>
    </div>
  );
}
```

### Using Thunks

```javascript
import { useDispatch } from 'react-redux';
import { login } from '../config/redux/thunks';

function LoginForm() {
  const dispatch = useDispatch();
  
  const handleSubmit = (credentials) => {
    dispatch(login(credentials));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## Adding New State

To add new state to the application:

1. Create a new slice file in the `slices/` directory
2. Create thunk files in the `thunks/` directory for async operations
3. Add the slice reducer to the store in `store.js`
4. Export the slice from `slices/index.js`
5. Export the thunks from `thunks/index.js` 