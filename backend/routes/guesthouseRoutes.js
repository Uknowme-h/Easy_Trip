import express from "express";
import {
    createGuesthouse,
    getAllGuesthouses,
    getMyGuesthouses,
    updateGuesthouse,
    deleteGuesthouse,
    getGuesthouseById
} from "../controllers/guesthouse.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const guesthouserouter = express.Router();

guesthouserouter.post("/", verifyToken, createGuesthouse);            // POST /api/guesthouses
guesthouserouter.get("/", getAllGuesthouses);                         // GET /api/guesthouses
guesthouserouter.get("/my", verifyToken, getMyGuesthouses);           // GET /api/guesthouses/my
guesthouserouter.put("/:id", verifyToken, updateGuesthouse);          // PUT /api/guesthouses/:id
guesthouserouter.delete("/:id", verifyToken, deleteGuesthouse);       // DELETE /api/guesthouses/:id
guesthouserouter.get("/:id", getGuesthouseById);                    // GET /api/guesthouses/:id

export default guesthouserouter;
