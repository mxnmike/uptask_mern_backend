import { Types, mongo } from 'mongoose'
const { ObjectId } = Types
const { MongoError } = mongo

export const validateObjectId = id => {
  if (!ObjectId.isValid(id)) {
    throw { code: 400, message: `Invalid ObjectId` }
  }
}

export const sendError = (res, e) => {
  if (e instanceof MongoError) {
    console.error(e)
    res.status(400).send({
      code: e.code,
      message: e.code === 11000 ? 'Duplicated Value' : 'Error',
      error: true,
    })
    return
  }

  const statusCode = e.code || 500
  res.status(statusCode).send({
    statusCode: statusCode,
    message: e.message,
    error: true,
  })
}

export const sendSuccess = (res, success) => {
  const statusCode = success.code || 200
  res.status(statusCode).send({
    statusCode: statusCode,
    message: success.message,
    error: false,
  })
}

export const sendObject = (res, object) => {
  const statusCode = object.code || 200
  res.status(statusCode).send({
    statusCode: statusCode,
    object,
  })
}
