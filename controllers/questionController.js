const { ObjectId } = require("mongodb");
const client = require("../database/connection");
const { Users, Questions } = require("../database/connection");
const { WrongAnswer } = require("../errors/index");

const createQuestion = async (req, res, next) => {
  try {
    const { question, answer, longitude, latitude, city } = req.body;
    console.log(question, answer);
    const answersLowerCase = answer.map((el) => el.toLowerCase());
    console.log(answersLowerCase);
    const questionObj = {
      type: "Feature",
      properties: {
        city: city,
        question: question,
        answer: answersLowerCase,
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

const checkAnswer = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { answer } = req.body;
    const question = await Questions.findOne({ _id: ObjectId(_id) });

    if (!question.properties.answer.includes(answer.toLowerCase())) {
      throw new WrongAnswer();
    } else {
      const session = client.startSession();

      try {
        await session.withTransaction(async () => {
          const userColl = Users;
          const questionsColl = Questions;
          const response = await questionsColl.updateOne(
            { _id: ObjectId(_id) },
            { $addToSet: { "properties.answeredBy": req.user._id } },
            { session }
          );

          if (response.modifiedCount == 1) {
            await userColl.updateOne(
              { _id: ObjectId(req.user._id) },
              { $inc: { score: 5 } },
              { session }
            );
          }
        });
      } finally {
        await session.endSession();
        res.status(200).json({ message: "Correct!" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    //accept longitute and latitude from req.params
    //Questions.aggregate([$geonear...])
    //project answeredBy array to answered: true/false
    // add a limit
    console.log("In get questions.");
    res.status(200).json({ message: "all questions" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuestion,
  checkAnswer,
  getQuestions,
};
