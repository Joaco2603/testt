export const handleErrors = (err, res) => {
  console.log(err);

  try {
    if (err.code === "23505") {
      res.json({
        err: "Duplicate Key",
        message: err.message,
      });
    }
    res.json({
      message: "Error not found",
      message: err.message,
    });
  } catch (error) {}
};
