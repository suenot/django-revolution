# Django Revolution Web App

Modern web application showcasing the auto-generated TypeScript API client from Django Revolution.

## Features

- **Modern UI/UX**: Built with Tailwind CSS for a clean, responsive design
- **Email Authentication**: Login/register system using email instead of username
- **Public API Demo**: Explore publicly available data (posts only)
- **Private API Demo**: Access protected data with authentication (categories, products, orders)
- **Auto-generated SDK**: Uses TypeScript SDK generated from Django REST API
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Turbopack**: Fast development with Next.js 15 Turbopack

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v3.4 with custom components
- **Authentication**: JWT-based auth with email login
- **API Client**: Auto-generated TypeScript SDK from Django Revolution
- **Build Tool**: Turbopack for fast development
- **Package Manager**: pnpm with workspace support

## Pages

### Home (`/`)
- Hero section with call-to-action buttons
- Welcome message for authenticated users
- Latest posts preview
- Quick access to public and private APIs

### Public API (`/public`)
- Browse public posts only
- Real-time data fetching with loading states
- Error handling and empty states
- Simplified interface without user management

### Private API (`/private`)
- **Authentication required**
- Access to protected data: categories, products, orders
- Tabbed interface for different data types
- User profile display
- Automatic redirect to login if not authenticated

### Authentication
- **Login** (`/login`): Modern form with email-based authentication
- **Register** (`/register`): Complete registration form with email
- Auto-login after successful registration
- JWT token management with refresh

## API Integration

The app uses a centralized API client with three main sections:

1. **Accounts API** (`api.accounts`): Authentication and user management
2. **Public API** (`api.public`): Publicly accessible data (posts only)
3. **Private API** (`api.private`): Protected data requiring authentication

### API Client Structure
```typescript
// Centralized API client
import api from '../api';

// Usage examples
await api.accounts.authLoginCreate({ body: { email, password } });
await api.public.apiPublicApiPostsList();
await api.private.categoriesList();
```

## Authentication Changes

### Email-Based Login
- **Before**: Username-based authentication
- **Now**: Email-based authentication for better UX
- **Benefits**: 
  - Users don't need to remember usernames
  - More intuitive login process
  - Consistent with modern web standards

### API Structure Updates
- **Removed**: User model from public_api (simplified architecture)
- **Updated**: Post model now uses main User model via `settings.AUTH_USER_MODEL`
- **Fixed**: Serializer conflicts between different User models

## Design System

### Colors
- Primary: Blue gradient (`primary-600` to `primary-800`)
- Success: Green (`green-100` to `green-800`)
- Warning: Yellow (`yellow-100` to `yellow-800`)
- Error: Red (`red-100` to `red-800`)
- Neutral: Gray scale

### Components
- `.btn-primary`: Primary action buttons
- `.btn-secondary`: Secondary action buttons
- `.btn-danger`: Destructive action buttons
- `.card`: Content containers with shadow
- `.input-field`: Form inputs with focus states

### Layout
- Responsive navigation with active states
- Hero sections for main pages
- Tabbed interfaces for data browsing
- Consistent spacing and typography

## Getting Started

1. **Prerequisites**: Make sure you have pnpm installed globally
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies** (from monorepo root):
   ```bash
   cd opensource/pypi/revolution/monorepo
   pnpm install
   ```

3. **Set environment variables**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**:
   ```bash
   # From monorepo root (recommended)
   pnpm dev --filter web
   
   # Or from web app directory
   cd apps/web
   pnpm dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Development

### File Structure
```
app/
├── globals.css          # Tailwind CSS and custom styles
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Home page
├── login/page.tsx       # Login page
├── register/page.tsx    # Register page
├── public/page.tsx      # Public API demo (posts only)
└── private/page.tsx     # Private API demo

components/
├── LoginForm.tsx        # Login form component (email-based)
├── RegisterForm.tsx     # Register form component
└── UserProfile.tsx      # User profile component

context/
├── AuthContext.tsx      # Authentication context
├── types.ts            # Auth types (updated for email)
└── index.ts            # Context exports

layouts/
└── MainLayout/
    ├── index.tsx        # Main layout wrapper
    └── Navigation.tsx   # Navigation component

api/
├── index.ts            # API client configuration
└── types.ts            # API type definitions (updated)
```

### Key Features

1. **Authentication Flow**:
   - Email-based login/register forms with validation
   - JWT token storage and refresh
   - Protected route handling
   - Auto-redirect on auth state changes

2. **Data Fetching**:
   - Loading states with spinners
   - Error handling with user-friendly messages
   - Empty states with helpful illustrations
   - Real-time data refresh

3. **Responsive Design**:
   - Mobile-first approach
   - Breakpoint-specific layouts
   - Touch-friendly interactions
   - Consistent spacing across devices

4. **Type Safety**:
   - Full TypeScript integration
   - Auto-generated API types
   - Strict type checking
   - IntelliSense support

## API Endpoints Used

### Public API
- `GET /api/public_api/posts/` - List public posts

### Private API
- `GET /api/private/categories/` - List categories
- `GET /api/private/products/` - List products
- `GET /api/private/orders/` - List orders

### Authentication
- `POST /api/users/auth/login/` - User login (email-based)
- `POST /api/users/auth/register/` - User registration
- `POST /api/users/auth/logout/` - User logout
- `GET /api/users/profile/` - Get user profile

## Recent Changes

### v1.2.0 - Email Authentication & API Simplification
- **Email-based authentication**: Changed from username to email login
- **Simplified public API**: Removed User model from public_api
- **Fixed serializer conflicts**: Resolved User model conflicts
- **Updated TypeScript types**: Fixed API type definitions
- **Improved error handling**: Better validation and error messages

### v1.1.0 - UI/UX Improvements
- **Tailwind CSS v3.4**: Migrated for better stability
- **Enhanced responsive design**: Better mobile experience
- **Improved loading states**: More intuitive user feedback

### v1.0.0 - Architecture Refactor
- **Single MainLayout**: Unified layout system
- **Centralized API client**: Better code organization
- **Separate API pages**: Clear separation of concerns
- **Enhanced error handling**: User-friendly error messages

## Troubleshooting

### Authentication Issues
- Ensure you're using email instead of username for login
- Check that the Django backend is running and accessible
- Verify JWT token configuration in Django settings

### Turbopack Issues
If you encounter Turbopack errors:
1. Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
2. Run from monorepo root: `pnpm dev --filter web`
3. Check that Next.js is properly installed in the workspace

### Build Issues
- Ensure all dependencies are installed: `pnpm install`
- Check TypeScript types match API schema
- Verify environment variables are set correctly

### API Connection Issues
- Ensure Django backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS settings on backend

## Contributing

1. Follow the existing code style and patterns
2. Use Tailwind CSS for styling
3. Maintain type safety with TypeScript
4. Test authentication flows with email
5. Ensure responsive design works on all devices
6. Use the centralized API client for all API calls

## License

This project is part of the Django Revolution ecosystem.
