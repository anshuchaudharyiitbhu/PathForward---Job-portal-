import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import connectdb from './utilis/db.js';
import userroutes from './routes/user.route.js';
import companyroutes from './routes/company.routes.js'; 
import jobroutes from './routes/job.routes.js';
import approutes from './routes/application.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIXED CORS CONFIGURATION
app.use(cors({
    origin: "https://pathforward-job-portal-x7se.onrender.com",  // your frontend deployed URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.send('Hello, Anshu! Your server is running.');
});

// Routes
app.use("/api/v1/user", userroutes);
app.use("/api/v1/company", companyroutes);
app.use("/api/v1/job", jobroutes);
app.use("/api/v1/application", approutes);
app.use("/api/v1/profile/update", userroutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectdb();
    console.log(`Server is listening on http://localhost:${PORT}`);
});
