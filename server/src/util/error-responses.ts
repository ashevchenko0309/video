import { Response } from "express"

type ErrorMaster = {
  response: Response
  errCode: number
  error?: Error | null
  body?: Object | null
};

function errorResponseMaster({
 response, errCode, error, body 
}: ErrorMaster) {
  if (errCode === 422) {
    return response.status(errCode).json(body)
  }
  if (errCode === 404) {
    return response.status(errCode).json({ message: "not found!" })
  }
  if (error) {
    return response
      .status(errCode)
      .json({ error: `Something went wrong: ${error.toString()}` })
  }
  return response.status(errCode).json({ error: "Something went wrong..." })
}

export default errorResponseMaster
