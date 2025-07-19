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

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsoption={
    origin:"https://pathforward-job-portal-x7se.onrender.com" ,
    credentials:true
}
app.use(cors(corsoption));


app.get('/', (req, res) => {
  res.send('Hello, Anshu! Your server is running.');
});



const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userroutes);
app.use("/api/v1/company", companyroutes);
app.use("/api/v1/job", jobroutes);
app.use("/api/v1/application", approutes);
app.use("/api/v1/profile/update", userroutes);

app.listen(PORT, () => {
    connectdb();
    console.log(`Server is listening on http://localhost:${PORT}`);
});
