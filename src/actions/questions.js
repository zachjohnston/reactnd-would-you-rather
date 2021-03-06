import { saveQuestion } from '../utils/api'
import { addQuestionToHistory } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const ADD_VOTE_TO_QUESTION = 'ADD_VOTE_TO_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  }
}

export function addVoteToQuestion(qid, activeUser, answer) {
  return {
    type: ADD_VOTE_TO_QUESTION,
    activeUser,
    qid,
    answer
  }
}

export function handleCreateQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { activeUser } = getState()

    // Call the API (with the parameter names that it expects in formatQuestion())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: activeUser
    })
      .then((question) => {
        dispatch(createQuestion(question))
        dispatch(addQuestionToHistory(activeUser, question.id))
      })
  }
}