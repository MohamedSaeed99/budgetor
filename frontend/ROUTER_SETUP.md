# React Router Setup for Budgetor

This document explains the React Router implementation for the Budgetor application.

## Installation

First, install React Router DOM:

```bash
npm install react-router-dom @types/react-router-dom
```

## Structure

### Routes
- `/login` - Login/Signup page
- `/` - Home dashboard (protected route)
- `*` - Catch-all route that redirects to appropriate page based on authentication

### Components

#### App.tsx
- Main router setup with `BrowserRouter`
- Uses `AuthProvider` for authentication state management
- Implements protected routes with automatic redirects

#### AuthContext.tsx
- Provides authentication state (`isAuthenticated`)
- Provides `login()` and `logout()` functions
- Wraps the entire application

#### Login.tsx
- Handles both sign-in and sign-up functionality
- Uses `useNavigate` for programmatic navigation
- Calls `onSuccess` callback after successful authentication

#### Home.tsx
- Protected dashboard component
- Includes logout functionality
- Features app bar with logout button

## Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Authenticated users** are redirected to `/` (home)
3. **Login success** automatically navigates to home
4. **Logout** navigates back to login page

## Usage

### Protected Routes
Routes automatically redirect based on authentication status:
- If authenticated and trying to access `/login` → redirected to `/`
- If not authenticated and trying to access `/` → redirected to `/login`

### Navigation
- Use `useNavigate()` hook for programmatic navigation
- Use `useAuth()` hook to access authentication functions

### Adding New Routes
To add new protected routes, add them to the `Routes` component in `App.tsx`:

```tsx
<Route 
  path="/new-route" 
  element={isAuthenticated ? <NewComponent /> : <Navigate to="/login" replace />} 
/>
```

## Features

- ✅ Protected routes with automatic redirects
- ✅ Authentication context for state management
- ✅ Login/Signup with navigation
- ✅ Logout functionality
- ✅ Responsive design with Material-UI
- ✅ TypeScript support 