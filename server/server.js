const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./src/routers/authRoutes");
const userRouter = require("./src/routers/userRoutes");
const productRouter = require("./src/routers/productRoutes");
const adRoute = require("./src/routers/adRoutes");
const provinceRoutes = require("./src/routers/provinceRoutes");
const categoryRoutes = require("./src/routers/categoryRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const dbUri = `mongodb://127.0.0.1:27017/rao-vat`;
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connect DB success!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/ad", adRoute);
app.use("/category", categoryRoutes);
app.use('/province', provinceRoutes);

// Route để gửi email
app.post("/sendEmail", async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "linhnvnde160328@fpt.edu.vn",
      pass: "pqmwyzzhvywkuzpg",
    },
  });

  await transporter.sendMail(
    {
      from: "linhnvnde160328@fpt.edu.vn",
      to: email,
      subject: "Hello Customer",
      text: "Hello world",
    },
    (err) => {
      if (err) {
        return res.json({
          message: "Send fail",
          error: err,
        });
      }
      return res.json({
        message: `Send successfully to address ${email}`,
      });
    }
  );
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

