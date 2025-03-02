/**
 * Redux store configuration exports
 * This file serves as the main entry point for Redux-related imports
 */

import { store, persistor } from './store';

export { store, persistor };

// Assign to variable before exporting as default
const reduxExports = { store, persistor };
export default reduxExports; 