import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

async function validationResolver(req: Request, res: Response, next: NextFunction) {

  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.array() })
  }

  next()
}

export default validationResolver