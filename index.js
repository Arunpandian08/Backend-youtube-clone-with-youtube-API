import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videosRouters from "./Routers/videosRouters.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors(
  {
    origin: `https://youtube-clone-youtube-data-api-9bdd89.netlify.app`
  }
));

app.use(express.json());

const port = Number(process.env.PORT) || 3000;

// Middleware to handle routes
app.use("/api", videosRouters);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at PORT-${port}`);
});

// Handle errors
app.on('error', (err) => {
  console.error('Server error:', err);
  throw err;
});
