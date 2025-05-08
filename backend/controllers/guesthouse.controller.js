import { Guesthouse } from "../models/Guesthouse.model.js";
import { GuesthouseOwner } from "../models/GuesthouseOwner.model.js";

// Create a new guesthouse
export const createGuesthouse = async (req, res) => {
    const userId = req.userId; // assuming you're using auth middleware to set req.userId
    const { name, location, pricePerNight, images, description, amenities } = req.body;

    try {
        const owner = await GuesthouseOwner.findOne({ userId });
        if (!owner) return res.status(404).json({ error: "Guesthouse owner not found" });

        const guesthouse = await Guesthouse.create({
            name,
            location,
            pricePerNight,
            images,
            description,
            amenities,
            owner: owner._id
        });

        // Add to owner's guesthouses list
        owner.guesthouses.push(guesthouse._id);
        await owner.save();

        res.status(201).json({ message: "Guesthouse created", guesthouse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all guesthouses (for travelers or public view)
export const getAllGuesthouses = async (req, res) => {
    try {
        const guesthouses = await Guesthouse.find().populate("owner", "businessName");
        res.status(200).json(guesthouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get guesthouse by ID (for travelers or public view)
export const getGuesthouseById = async (req, res) => {
    const { id } = req.params;

    try {
        const guesthouse = await Guesthouse.findById(id).populate("owner", "businessName");
        if (!guesthouse) return res.status(404).json({ error: "Guesthouse not found" });

        res.status(200).json(guesthouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get guesthouses owned by the current user
export const getMyGuesthouses = async (req, res) => {
    const userId = req.userId;

    try {
        const owner = await GuesthouseOwner.findOne({ userId });
        if (!owner) return res.status(404).json({ error: "Guesthouse owner not found" });


        const guesthouses = await Guesthouse.find({ owner: owner._id });
        res.status(200).json(guesthouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a guesthouse
export const updateGuesthouse = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const owner = await GuesthouseOwner.findOne({ userId });
        if (!owner) return res.status(403).json({ error: "Not authorized" });

        const guesthouse = await Guesthouse.findOneAndUpdate(
            { _id: id, owner: owner._id },
            req.body,
            { new: true }
        );

        if (!guesthouse) return res.status(404).json({ error: "Guesthouse not found or unauthorized" });

        res.status(200).json({ message: "Guesthouse updated", guesthouse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a guesthouse
export const deleteGuesthouse = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const owner = await GuesthouseOwner.findOne({ userId });
        if (!owner) return res.status(403).json({ error: "Not authorized" });

        const guesthouse = await Guesthouse.findOneAndDelete({ _id: id, owner: owner._id });
        if (!guesthouse) return res.status(404).json({ error: "Guesthouse not found or unauthorized" });

        // Remove from owner's list
        owner.guesthouses.pull(guesthouse._id);
        await owner.save();

        res.status(200).json({ message: "Guesthouse deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
