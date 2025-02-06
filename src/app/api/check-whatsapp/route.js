router.post("/check-whatsapp", async (req, res) => {
    const { mobileNumber } = req.body;
    try {
      const isWhatsApp = await checkWhatsAppNumber(mobileNumber);
      res.json({ isWhatsApp });
    } catch (error) {
      res.status(500).json({ error: "Failed to check WhatsApp number" });
    }
  });
  