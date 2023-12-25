import apiService from '../../services/apiService.js'

export const getBoard = async (boardID) => {
  try {
    return await apiService.getBoardByID(boardID);
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting board: ${error.message}`)
  }
}