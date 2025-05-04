import { Router } from "express";

import { getBooks } from "../controllers/bookController.js";

const router = Router();

// would add validation middleware but skipping this for now since this is a frontend assessment
router.get("/", getBooks, (req, res) => {
  res.json({ message: `Books retrieved successfully` });
});

export default router;
