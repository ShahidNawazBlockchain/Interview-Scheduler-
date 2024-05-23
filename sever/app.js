require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const slotRoutes = require('./routes/slots');
const interviewRoutes = require('./routes/interviews');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/slots', slotRoutes);
app.use('/interviews', interviewRoutes);

const confiq = {
    APIKey: process.env.ZOOM_API_KEY,
    APISecret: process.env.ZOOM_API_SECRET
};

app.post('/meeting', async (req, res) => {
    const email = req.body.email;
    const payload = {
        iss: confiq.APIKey,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // Token valid for 1 hour
    };
    const token = jwt.sign(payload, confiq.APISecret);
   console.log("token",token);
    const options = {
        method: "POST",
        uri: `https://api.zoom.us/v2/users/${email}/meetings`,
        body: {
            topic: "Interview",
            type: 1,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                audio: "both",
                auto_recording: "cloud"
            }
        },
        auth: {
            bearer: token
        },
        headers: {
            "User-Agent": "Zoom-api-Jwt-Request",
            "content-type": "application/json"
        },
        json: true
    };
//    console.log(options);
    try {
        const response = await rp(options);
         console.log("response",response);
        res.status(200).json({ join_url: response.join_url });
    } catch (err) {
        console.error("API error: ", err.message);
        res.status(500).json({ error: "Failed to create Zoom meeting" });
    }
});


app.get('/test-token', (req, res) => {
  const payload = {
      iss: confiq.APIKey,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
  };
  const token = jwt.sign(payload, confiq.APISecret);
  res.send({ token });
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Successfully Connected to Mongo DB'))
.catch(err => console.error('Failed to connect to Mongo DB', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
