const { ObjectId } = require("mongodb");
const client = require("../database/connection");
const { Users, Questions } = require("../database/connection");
const { WrongAnswer } = require("../errors/index");

const createQuestion = async (req, res, next) => {
  try {
    const { question, answer, longitude, latitude, city } = req.body;

    const answersLowerCase = answer.map((el) => el.toLowerCase());

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
    const { _id } = req.user;

    let lon;
    let lat;
    if (req.query.search) {
      console.log("I'm in the search");
      //Add to this later when you know how to geocode search inputs.
    } else {
      lon = +req.query.lon;
      lat = +req.query.lat;
    }
    if (!lon || !lat) {
      // if something is missing, default to central Stockholm
      lon = 18.0651611;
      lat = 59.3286073;
    }
    console.log(lon, lat);
    const responseCursor = Questions.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lon, lat] },
          distanceField: "dist.calculated",
          maxDistance: 1000, // Maybe make this dynamic later on depending on zoom
        },
      },
      {
        $project: {
          type: 1,
          "properties.city": 1,
          "properties.question": 1,
          "properties.answered": {
            $in: [_id, "$properties.answeredBy"],
          },
          geometry: 1,
        },
      },
    ]);

    const responseArray = [];

    for await (const doc of responseCursor) {
      responseArray.push(doc);
    }

    res.status(200).json({ responseArray });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuestion,
  checkAnswer,
  getQuestions,
};
