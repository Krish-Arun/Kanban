import Item from "../models/Item.js";

export const getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

export const addItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
};

export const rateItem = async (req, res) => {
  const { rating } = req.body;

  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  // Update the average rating
  item.rating =
    (item.rating * item.ratingsCount + rating) / (item.ratingsCount + 1);

  item.ratingsCount += 1;

  await item.save();
  res.json(item);
};
