# University Management Platform

A comprehensive university management system built with SvelteKit and PocketBase.

## Features

- **Multi-role Authentication**: Students, Lecturers, Staff, and Admin roles
- **Course Management**: Create, manage, and enroll in courses
- **Assignment System**: Create assignments, submit work, and grade submissions
- **Dashboard**: Role-specific dashboards with relevant information
- **Real-time Updates**: Live updates for grades, assignments, and notifications

## Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start PocketBase Server

First, make sure you're in the project directory, then run:

```bash
# On Windows (PowerShell)
./pocketbase serve --http=0.0.0.0:8090

# On macOS/Linux
chmod +x pocketbase
./pocketbase serve --http=0.0.0.0:8090
```

The PocketBase admin interface will be available at: http://localhost:8090/_/

### 3. Populate Database

In a new terminal, run the database population script:

```bash
npm run populate-db
```

This will create:
- Sample departments
- Admin user
- Sample lecturers, students, and staff
- Initial data structure

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:5173

## Sample Login Credentials

After running the database population script, you can use these credentials:

- **Admin**: admin@university.edu / admin123
- **Lecturer**: dr.smith@university.edu / lecturer123
- **Student**: student1@university.edu / student123
- **Staff**: staff1@university.edu / staff123

## Troubleshooting

### Error 500 on Registration

If you encounter a 500 error when registering new users:

1. Make sure PocketBase is running on port 8090
2. Check that the database has been populated with initial data
3. Verify that all required fields are being sent (username is auto-generated from email)

### Database Not Populating

If the database population script fails:

1. Ensure PocketBase is running before running the script
2. Check the console for specific error messages
3. Try running the script again: `npm run populate-db`

### Vite Build Errors

If you encounter Vite build errors:

1. Clear the build cache: `rm -rf .svelte-kit`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart the development server

### PocketBase Connection Issues

If the frontend can't connect to PocketBase:

1. Verify PocketBase is running on http://localhost:8090
2. Check that the API endpoint is accessible: http://localhost:8090/api/
3. Ensure no firewall is blocking the connection

## Project Structure

```
College-Leaderboard/
├── src/
│   ├── lib/
│   │   └── pocketbase.ts          # PocketBase configuration and auth store
│   ├── routes/
│   │   ├── +page.svelte           # Login/Registration page
│   │   └── dashboard/             # Dashboard routes
│   └── app.html                   # Main HTML template
├── scripts/
│   ├── populate-db.js             # Database population script
│   └── start-pocketbase.sh        # PocketBase startup script
├── pb_migrations/                 # PocketBase database migrations
└── pocketbase                     # PocketBase binary
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run populate-db` - Populate database with sample data
- `npm run setup` - Run database setup

### Adding New Features

1. Create new Svelte components in `src/lib/components/`
2. Add new routes in `src/routes/`
3. Update PocketBase schema if needed
4. Add corresponding TypeScript interfaces in `src/lib/pocketbase.ts`

## License

This project is licensed under the MIT License.
