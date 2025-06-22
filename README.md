# User Management React Application

This is a React-based user management system that provides a modern interface for managing users through API calls. The application has been converted from React Native to React and uses the native fetch API for HTTP requests.

## Features

- **Get All Users**: Fetch all users from the database
- **Get Users by City**: Filter users by city
- **Get User by Phone**: Find a specific user by phone number
- **Update User Role**: Change a user's role
- **Delete User**: Remove a user from the system
- **JWT Token Management**: Secure authentication with JWT tokens

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure JWT Token**
   - Enter your JWT token in the application interface
   - Or set the token in localStorage with key `jwt_token`
   - Or update the default token in `src/api/userApi.js`

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open the Application**
   - The app will open automatically in your browser at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

## Project Structure

```
src/
├── api/
│   └── userApi.js          # API service functions (fetch-based)
├── components/
│   └── UserManagement.js   # Main user management component
├── App.js                  # Root component
├── index.js               # Application entry point
└── index.css              # Global styles
```

## API Configuration

The application uses the following API endpoints:
- Base URL: `https://139.59.75.96`
- Authentication: Bearer token in Authorization header
- All endpoints require a valid JWT token

### Available API Endpoints

1. **GET /manage-users/** - Get all users
2. **GET /manage-users/city?city={city}** - Get users by city
3. **GET /manage-users/phone/{phone_no}** - Get user by phone number
4. **PUT /manage-users/phone/{phone_no}/role** - Update user role
5. **DELETE /manage-users/phone/{phone_no}** - Delete user

### API Function Signatures

```javascript
// All functions require a JWT token parameter
getAllUsers(token)
getUsersByCity(city, token)
getUserByPhone(phone_no, token)
updateUserRole(phone_no, role, token)
deleteUserByPhone(phone_no, token)
```

## Features

### Enhanced User Experience
- **Loading States**: Buttons show loading state during API calls
- **Error Handling**: Comprehensive error messages for failed operations
- **Success Messages**: Confirmation messages for successful operations
- **Input Validation**: Client-side validation for phone numbers and required fields
- **Confirmation Dialogs**: Delete operations require user confirmation
- **JWT Token Input**: Secure token input field with password masking

### Modern React Patterns
- **Hooks**: Uses React hooks for state management
- **Functional Components**: Modern functional component approach
- **Fetch API**: Native fetch API with proper error handling
- **Controlled Components**: Form inputs are controlled by React state

### Security Features
- **Token Validation**: Validates JWT token before making API calls
- **Secure Input**: Token input is masked for security
- **Error Handling**: Proper error handling for authentication failures

## API Implementation

The application provides two API implementations:

### 1. Fetch-based API (Default)
```javascript
import { userApi } from './api/userApi';

// Example usage
const data = await userApi.getAllUsers(token);
```

### 2. Axios-based API (Alternative)
```javascript
import { userApiAxios } from './api/userApi';

// Example usage
const data = await userApiAxios.getAllUsers(token);
```

## Customization

### Styling
- Modify `src/index.css` to change the appearance
- The design maintains the original orange theme from your HTML version

### API Configuration
- Update the `BASE_URL` in `src/api/userApi.js` to point to your API
- Modify the authentication logic as needed

### Adding New Features
- Add new API functions in `src/api/userApi.js`
- Create new components in `src/components/`
- Update the main `UserManagement.js` component

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your API server allows requests from `localhost:3000`
2. **Authentication Errors**: Verify your JWT token is valid and properly configured
3. **Network Errors**: Check if the API server is running and accessible
4. **Token Issues**: Make sure you're providing a valid JWT token

### Development Tips

- Use browser developer tools to inspect network requests
- Check the console for error messages
- Verify API responses in the Network tab
- Test with different JWT tokens to ensure proper authentication

## Build for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build/` folder that you can deploy to any static hosting service.

## Migration from React Native

This application has been converted from React Native to React with the following changes:

- **Fetch API**: Replaced React Native's fetch with web fetch API
- **Token Management**: Added explicit token parameter to all API functions
- **Error Handling**: Enhanced error handling for web environment
- **UI Components**: Converted to web-compatible React components

## License

This project is open source and available under the MIT License. 