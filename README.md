# FutureTech Waitlist

This project is a waitlist application for FutureTech, an AI-powered productivity suite.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up Supabase:
   - Create a Supabase account and project at https://supabase.com
   - Create a new table called `waitlist` with columns:
     - `id` (int8, primary key)
     - `full_name` (text)
     - `email` (text)
     - `created_at` (timestamptz, default: now())
   - Copy your Supabase project URL and anon key
   - Create a `.env` file in the root directory with the following content:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open http://localhost:5173 in your browser to see the application.

## Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting platform of choice.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Lucide React (for icons)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).