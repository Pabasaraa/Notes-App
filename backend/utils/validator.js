export const validateNote = (req, res, next) => {
  if (!req.body.title) {
    return res.json({ message: 'Title is required' });
  }
  next();
};
