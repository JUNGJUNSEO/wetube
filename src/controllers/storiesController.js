export const hompage = (req, res) => res.send("Home Page Videos");
export const trending = (req, res) => res.send("trending");
export const see = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => {
  return res.send("Edit");
};

export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};