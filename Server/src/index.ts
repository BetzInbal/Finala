import connectDB from "./config/db";
import "dotenv/config";
import express, { Request, Response } from "express";
import "dotenv/config";
import analysisRoute from "./routes/analysis.route";
import relationshipsRoute from "./routes/relationships.route";
;
import cors from "cors";



connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/api/analysis", analysisRoute);
//app.use("/api/relationships", relationshipsRoute);

// Error handeling
app.use(async ( req: Request, res: Response) => {
  console.error("error")
  res.send("error")
});

app.listen(PORT, () => {
    console.log(`server is runnig on port http://localhost:${PORT}`);
  });