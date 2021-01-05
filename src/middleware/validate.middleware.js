import createError from 'http-errors'
import validator from 'express-validator'

const { validationResult } = validator

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(createError(400, errors.array()[0].msg))
  }
  return next()
}
