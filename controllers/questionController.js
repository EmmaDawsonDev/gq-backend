const { Users, Questions } = require("../database/connection");

const createQuestion = async (req, res, next) => {
  try {
    const { question, answer, longitude, latitude, city } = req.body;

    const questionObj = {
      type: "Feature",
      properties: {
        city: city,
        question: question,
        answer: answer.toLowerCase(),
        answeredBy: [],
      },
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };

    const response = await Questions.insertOne({ ...questionObj });

    res.status(201).json({
      success: response.acknowledged,
      message: `Question with id ${response.insertedId} successfully created`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuestion,
};
