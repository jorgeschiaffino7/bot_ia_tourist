require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongo');
const atractivoRoutes = require('./routes/attractionsRoutes');
const turistaRoutes = require('./routes/touristRoutes');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api', require('./routes'));
//app.use('/api', );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
