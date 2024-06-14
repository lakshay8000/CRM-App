# CRM App

Welcome to our CRM (Customer Relationship Management) application! This project serves as a showcase of frontend development skills using React and Redux toolkit, utilizing various technologies and libraries to create a comprehensive and user-friendly CRM solution.


## Features

- **Customer Homepage**: Provides an overview of open, in-progress, resolved, on-hold, and cancelled tickets, accompanied by visual representations through pie, line, and bar charts.
- **Ticket Management**: Customers can view all tickets, create new ones, and update ticket descriptions.
- **Download Tickets**: Users have the option to download tickets in PDF format directly from the dashboard page.
- **Engineer Homepage**: Engineers have access to tickets assigned to them, with the ability to update ticket description, priority, and status.
- **Default Assignment**: All tickets created are currently assigned to "testEngineer1".
- **Admin Homepage**: Admins can manage all tickets and user accounts, including approving new engineer accounts and updating user status.
- **Responsive Design**: The application is designed to be responsive, ensuring a seamless experience across devices.
--**Seamless Data Fetching Experience**: Implementing loaders that ensures a seamless user experience by preventing UI blocking during data fetching.
- **Future Enhancements**: Plans to implement search functionality in the dashboard and continuous improvements to enhance user experience.


## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management library for React applications.
- **Tailwind CSS with Daisy UI Plugin**: Utility-first CSS framework with a plugin for additional components.
- **React Router**: Declarative routing for React applications.
- **Axios**: Utilized for handling asynchronous HTTP requests with ease.
- **React Data Table Component Library**: Library for creating data tables in React applications.
- **React Icons**: Library providing a set of icons for React applications.
- **React-to-PDF Library**: Library for generating PDF documents from React components.
- **React Hot Toast**: Toast notifications library for React applications.
- **React ChartJS 2**: Wrapper for Chart.js to create interactive charts in React applications.
- **Vite**: Fast build tool for JavaScript and TypeScript projects, perfect for React applications.
- **ESLint with eslint-plugin-simple-import-sort**: JavaScript linter for maintaining code quality and consistency.
 

## Backend Installation

I have used a third-party backend for this app.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/lakshay8000/CRMAppBackend.git
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd your_backend_repo
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Database Setup:**
   - Create a MongoDB database on your preferred platform.
   - Ensure you have access credentials and the database URI handy.

5. **Environment Variable Configuration:**
   - Create a `.env` file in the root directory of the backend.
   - Define the following environment variables in the `.env` file:
     ```.env
     JWT_SECRET_KEY=your_secret_key_here
     MONGODB_URI=your_mongodb_uri_here
     ```
     Replace `your_secret_key_here` with a secure string for JWT token encryption and `your_mongodb_uri_here` with the URI of your MongoDB database.

6. **Start the Server:**
   ```bash
   npm start
   ```

Note- On the deployed app, the backend is hosted on a free instance backend deployment, which may respond slowly and experience delays due to inactivity. Requests might be delayed by up to 50 seconds if the backend instance needs to spin up. Please keep this in mind when testing or using the deployed application.


## Frontend Installation:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/lakshay8000/CRM-App.git
   ```

2. **Navigate to the Frontend Directory:**
   ```bash
   cd your_frontend_repo
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Variable Configuration:**
   - Create a `.env` file in the root directory of the frontend.
   - Set up the Base URL and API timeout for backend requests in the `.env` file:
     ```.env
     VITE_BASE_URL=your_backend_base_url_here
     VITE_API_TIMEOUT=your_api_timeout_here
     ```
     Replace `your_backend_base_url_here` with the base URL of your backend API and `your_api_timeout_here` with the desired API timeout value.

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

By following these steps, you should be able to set up the frontend of the CRM app successfully. If you encounter any issues during installation or configuration, feel free to reach out for assistance.


## Contributing:

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features you'd like to add.

This project is created as a personal project for inclusion in my portfolio. Its purpose is to showcase my skills in building React applications with Redux toolkit. If you have any questions or feedback, feel free to reach out.


## LICENSE:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.