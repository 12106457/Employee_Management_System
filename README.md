# Employee Management Dashboard

A modern, full-stack web application for managing employee records with real authentication, image compression, MongoDB storage, and comprehensive CRUD operations.

## Project Overview

The Employee Management Dashboard is a production-ready application that enables organizations to manage employee information efficiently. It features secure JWT authentication with bcryptjs password hashing, MongoDB database storage with compressed image support, a responsive dashboard with real-time filtering, and comprehensive employee management capabilities.

## Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose ODM)
- **Image Storage**: MongoDB Binary (Compressed via Sharp)
- **Authentication**: JWT (jsonwebtoken) + Bcryptjs password hashing
- **File Upload**: Multer with memory storage
- **Image Compression**: Sharp (500x500px, 75% JPEG quality, ~97% size reduction)
- **Port**: 5000

### Frontend
- **Framework**: Next.js 14+ (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT tokens with localStorage + cookies
- **API Client**: Fetch API
- **Image Processing**: Base64 conversion for display
- **Port**: 3000

## Folder Structure

```
EmpolyeeManagementSystem/
├── backend/
│   ├── controllers/
│   │   └── employeeController.js      # Employee CRUD logic
│   ├── routes/
│   │   ├── auth.js                    # Authentication routes
│   │   └── employees.js               # Employee management routes
│   ├── middleware/
│   │   └── uploadMiddleware.js        # Multer configuration for image uploads
│   ├── data/
│   │   └── employees.json             # Employee data storage
│   ├── index.js                       # Express server entry point
│   └── package.json                   # Backend dependencies
│
└── frontend/
    ├── app/
    │   ├── layout.tsx                 # Root layout with AuthProvider
    │   ├── page.tsx                   # Home page
    │   ├── login/
    │   │   └── page.tsx               # Login page
    │   └── dashboard/
    │       └── page.tsx               # Main dashboard with summary & table
    ├── components/
    │   ├── EmployeeForm.tsx           # Form for add/edit employees
    │   ├── EmployeeTable.tsx          # Employee table with actions
    │   └── Filters.tsx                # Search & filter controls
    ├── context/
    │   └── AuthContext.tsx            # Authentication context & hooks
    ├── services/
    │   └── apiService.ts              # API communication layer
    ├── middleware.ts                  # Next.js route protection
    ├── package.json                   # Frontend dependencies
    ├── tsconfig.json                  # TypeScript configuration
    └── tailwind.config.ts             # Tailwind CSS configuration
```

## Setup & Installation

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

4. **Start production server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Features Implemented

### Authentication
- Mock JWT-based authentication system
- Login with email and password
- Token persistence using localStorage
- Automatic token restoration on page refresh
- Secure logout functionality

### Employee Management
- **View Employees**: Display all employees in a responsive table
- **Add Employee**: Create new employee records with image upload
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employee records with confirmation
- **Toggle Status**: Mark employees as active/inactive
- **Print Employee**: Generate and print employee details

### Dashboard
- Summary cards showing total, active, and inactive employee counts
- Real-time data fetching from backend
- Professional dashboard layout with navigation

### Filtering & Search
- Search employees by name or email
- Filter by gender (Male, Female, Other)
- Filter by active/inactive status
- Combined filtering with clear filters button
- Live filter results

### User Interface
- Responsive design for desktop and mobile
- Tailwind CSS styling for modern appearance
- Form validation with error messages
- Image preview before upload
- Loading states for better UX
- Confirmation dialogs for destructive actions

## Design Decisions & Assumptions

### Data Storage
- **JSON File Storage**: The backend uses a JSON file (data/employees.json) for simplicity and easy setup without requiring a database server
- **Server Restart**: Changes persist in the file system but are loaded into memory on each request

### Authentication
- **Mock Authentication**: The auth system always returns success, suitable for development/demo purposes
- **JWT Tokens**: Mock JWT tokens are generated for each login for consistency
- **Client-side Storage**: Tokens stored in localStorage for session persistence

### File Uploads
- **Multer Integration**: Configured to accept image files (JPEG, PNG, GIF, WebP)
- **Upload Directory**: Files saved to `/uploads` folder, served as static assets
- **UUID Filenames**: Ensures unique file names to prevent conflicts

### API Design
- **RESTful Architecture**: Standard REST endpoints for CRUD operations
- **CORS Enabled**: Frontend and backend run on different ports
- **Error Handling**: Consistent error responses with appropriate status codes

### Frontend Architecture
- **Next.js App Router**: Uses modern App Router for better performance
- **React Context**: Authentication state managed globally via Context API
- **TypeScript**: Full type safety for better development experience
- **Middleware Protection**: Route protection implemented at middleware level

### Image Handling
- **Client-side Preview**: Image preview shown before form submission
- **File Upload**: Images sent via FormData to support multipart/form-data
- **Optional Images**: Profile images are optional for employee records

## Running the Full Application

1. **Terminal 1 - Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**
   - Open browser to `http://localhost:3000`
   - Login with any email and password (no validation)
   - Navigate to dashboard to manage employees

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real authentication with password hashing
- Pagination for large employee lists
- Advanced filtering and sorting
- Bulk operations
- Audit logging
- Email notifications
- Role-based access control
- Dark mode support

## Development Notes

- Both backend and frontend use CommonJS (Node.js) and ES Modules (Next.js)
- Ensure both servers are running for full functionality
- Backend must be running before frontend can fetch employee data
- Images are stored locally in `/uploads` directory
- CORS is enabled to allow cross-origin requests from frontend

## License

ISC
