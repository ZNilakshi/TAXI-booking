router.post("/send-whatsapp", async (req, res) => {
    const { mobileNumber, bookingId } = req.body;
  
    try {
      const message = await client.messages.create({
        from: "whatsapp:+94705742033", // Twilio WhatsApp sandbox number
        to: `whatsapp:${mobileNumber}`,
        body: `Your booking (ID: ${bookingId}) is confirmed! Thank you for choosing us.`,
      });
  
      res.status(200).json({ success: true, message: "WhatsApp message sent!" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  