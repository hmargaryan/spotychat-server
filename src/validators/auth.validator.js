import validator from 'express-validator'

const { query } = validator

export const isCodeValid = [query('code', 'Invalid code').exists()]
