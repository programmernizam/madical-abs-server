const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4200;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const serviceRoute = require("./Routes/v1/services.route.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/v1/services", serviceRoute);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s7i3i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client
      .db("doctors_portal")
      .collection("services");
    const reviewCollection = client.db("doctors_portal").collection("reviews");
    const bookingCollection = client.db("doctors_portal").collection("booking");

    // Appointment data
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    // Reviews;
    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });
    app.post("/reviews", async (req, res) => {
      const newReview = req.body;
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    });
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deleteReview = await reviewCollection.deleteOne(query);
      res.send(deleteReview);
    });
    // User
    app.put("/user:email", async (req, res) => {});
    // Booking
    app.get("/booking", async (req, res) => {
      const patient = req.query.patient;
      const query = { patient: patient };
      const bookings = await bookingCollection.find(query).toArray();
      res.send(bookings);
    });
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const query = {
        treatment: booking.treatment,
        date: booking.date,
        patient: booking.patient,
      };
      const existing = await bookingCollection.findOne(query);
      if (existing) {
        return res.send({ success: false, booking: existing });
      } else {
        const result = await bookingCollection.insertOne(booking);
        return res.send({ success: true, result });
      }
    });
    // Available Booking
    app.get("/available", async (req, res) => {
      const date = req.query.date;
      const services = await serviceCollection.find().toArray();
      const query = { date: date };
      const bookings = await bookingCollection.find(query).toArray();
      services.forEach((service) => {
        const serviceBooking = bookings.filter(
          (book) => book.treatment === service.name
        );
        const bookedSlots = serviceBooking.map((book) => book.slot);
        const available = service.slots.filter(
          (slot) => !bookedSlots.includes(slot)
        );
        service.slots = available;
      });
      res.send(services);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from doctors portal");
});

// app.all("*", (req, res) => {
//   res.send(
//     `<h2 style="text-align:center;color:red;font-size:48px;">No Route Found!</h2>`
//   );
// });

app.listen(port, () => {
  console.log(`doctor portal listening port${port}`);
});
