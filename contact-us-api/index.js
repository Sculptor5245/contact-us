const express = require('express');
const cors = require('cors');
const db = require("./database");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const contactInfo = {
  header: "Contact us, we love to hear from you",
  body: "Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy, sell and own property.",
  phone: "13 24 34",
  email: "support@openagent.com.au",
  postalAddress: "PO Box 419, Alexandria NSW 1435",
  businessHours: "Monday - Friday 8:30 - 5:00",
};

app.get('/api/contact', (req, res) => {
    res.json(contactInfo);
}
);


app.post("/api/submit-form", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const query = `
        INSERT INTO contacts (firstName, lastName, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.run(query, [firstName, lastName, email, phone, message], function (err) {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to save the contact information." });
    }

    res
      .status(201)
      .json({ success: "Your message has been sent!", id: this.lastID });
  });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

