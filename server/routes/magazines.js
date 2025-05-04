import { Router } from "express";

import { getMagazines } from "../controllers/magazineController.js";

const router = Router();

// would add validation middleware but skipping this for now since this is a frontend assessment
router.get("/", getMagazines, (req, res) => {
  res.json({ message: `Magazines retrieved successfully` });
});

export default router;
