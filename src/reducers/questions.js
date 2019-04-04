import { RECEIVE_QUESTIONS, CREATE_QUESTION, ADD_VOTE_TO_QUESTION } from '../actions/questions'

// Deals with the "Questions" slice of state
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { // Return the existing questions plus the action's questions
        ...state,
        ...action.questions
      }
    case CREATE_QUESTION:
      const { question } = action
      return {
        ...state, // the existing questions
        [question.id]: question // new question at its id
      }
    case ADD_VOTE_TO_QUESTION:
      const { qid, activeUser, answer } = action
      console.log(state[qid][answer])
      return {
        ...state,
        [qid]: {
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([activeUser])
          }
        }
      }
    default:
      return state
  }
}