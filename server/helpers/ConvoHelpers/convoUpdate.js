const Convo = require("../../models/ConvoModel"); //Model
const LiveMeeting = require("../../models/LiveMeetingModel");
const moment = require("moment");

const convoUpdate = async (req, res, next) => {
  const user = req.user;
  const newConvo = req.body;
  const id = req.params.id;

  try {
    let mappedQuestions = [];
    if (newConvo.questions.length > 0) {
      mappedQuestions = newConvo.questions.map(currentQuestion => {
        return {
          inquirer: {
            email: user.email,
            displayName: user.displayName
          },
          question: currentQuestion
        };
      });
    }

    let questionExtract = [];
    if (mappedQuestions.length > 0) {
      questionExtract = mappedQuestions.map(q => {
        return {
          question: q.question,
          displayName: q.inquirer.displayName
          // answered: q.answered,
          // created_at: q.created_at
        };
      });
    }
    await LiveMeeting.findOneAndUpdate(
      { meeting: id },
      { questions: questionExtract },
      (err, result) => {
        if (err) {
          next({code: 500, message: err.message})
        } else {
          return result;
        }
      }
    );

    const convo = await Convo.findByIdAndUpdate(
      id,
      {
        creatorId: user._id,
        title: newConvo.title,
        description: newConvo.description,
        start_time: moment(newConvo.startTime).toDate(),
        end_time: moment(newConvo.endTime).toDate(),
        repeat: newConvo.repeat,
        questions: mappedQuestions,
        invitees: newConvo.invitees
      },
      (err, result) => {
        if (err) {
          next({code: 500, message: err.message})
        } else {
          return result;
        }
      }
    );
    if (convo.invitees.length > 0) {
      await Convo.findById(convo._id)
        .populate({
          path: "invitees",
          select: "meetings"
        })
        .exec((err, query) => {
          if (err) {
            next({code: 500, message: err.message})
          } else {
            query.invitees.forEach(async invitee => {
              if (invitee.meetings.includes(convo._id) === false) {
                invitee.meetings.push(convo._id);
                await invitee.save();
              }
            });
          }
        });
    }
    return res.status(201).send(newConvo);
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = convoUpdate;
