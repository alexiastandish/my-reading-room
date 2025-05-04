import { Magazine } from "../models/Magazines.js";

// Mostly a duplicate of books controller.. would likely abstract some of this

// logic to a helper function for reuse if this was also a backend project / assessment
// but just going to copy it over for this
export const getMagazines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = 10;

    // Docs to skip in the query to get the correct page of results
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // dynamic field filter (column headers)
    const category = req.query.category || "title";
    // selected sub-category of active column
    const subCategory = req.query.subCategory || null;

    const sortOrder = req.query.sortOrder || "asc";

    const query = {};
    const sort = {};
    // If search category is provided, add it to the query
    // "i" makes mongo db regex search case-insensitive
    if (category && subCategory) {
      query[category] = subCategory;
    } else if (search) {
      query[category] = { $regex: search, $options: "i" };
    }

    if (category && sortOrder) {
      sort[category] = sortOrder === "asc" ? 1 : -1;
      sort["_id"] = 1;
    }

    const [magazines, totalItems] = await Promise.all([
      Magazine.find(query).sort(sort).skip(skip).limit(limit),
      Magazine.countDocuments(query),
    ]);

    res.status(200).json({
      data: magazines,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching books" });
  }
};
