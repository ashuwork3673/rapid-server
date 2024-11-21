const express = require('express');
const router = express.Router();
const Card = require('../models/card');

// Get all card details
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get card details by ID
router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (card == null) {
            return res.status(404).json({ message: 'Cannot find card' });
        }
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new card
router.post('/', async (req, res) => {
    const {
        quote_id,
        billing_address,
        billing_city,
        billing_state,
        billing_zip,
        card_name,
        card_number,
        card_expiry,
        card_cvv,
    } = req.body;

    try {
        // Find the latest card and get its quote_id
        const lastCard = await Card.findOne().sort({ quote_id: -1 }); // Sort by quote_id in descending order

        // Generate the new quote_id by incrementing the last card's quote_id
        const newQuoteId = lastCard ? lastCard.quote_id + 1 : 1; // If no cards are found, start from 1

        const card = new Card({
            quote_id, // Assign the incremented quote_id
            billing_address,
            billing_city,
            billing_state,
            billing_zip,
            card_name,
            card_number,
            card_expiry,
            card_cvv,
        });

        const newCard = await card.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a card by ID
router.put('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (card == null) {
            return res.status(404).json({ message: 'Cannot find card' });
        }

        if (req.body.billing_address != null) card.billing_address = req.body.billing_address;
        if (req.body.billing_city != null) card.billing_city = req.body.billing_city;
        if (req.body.billing_state != null) card.billing_state = req.body.billing_state;
        if (req.body.billing_zip != null) card.billing_zip = req.body.billing_zip;
        if (req.body.card_name != null) card.card_name = req.body.card_name;
        if (req.body.card_number != null) card.card_number = req.body.card_number;
        if (req.body.card_expiry != null) card.card_expiry = req.body.card_expiry;
        if (req.body.card_cvv != null) card.card_cvv = req.body.card_cvv;

        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (card == null) {
            return res.status(404).json({ message: 'Cannot find card' });
        }

        await card.remove();
        res.json({ message: 'Card deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
