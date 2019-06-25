/* created by kueiapp.com */

/**
 * @extends Error from Node
 */
class MyError extends Error {
  constructor(message, status, isPublic, code)
  {
    // init super class Error
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true;
    // track stack trace
    Error.captureStackTrace(this, this.constructor.name);
  }
}
/**
 * @extends MyError
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
export class SqlError extends MyError
{
  constructor(message, status = 401, isPublic = true, code = 401)
  {
    // init super class MyError
    super(message, status, isPublic, code);
    this.name = 'SQL Error';
    this.message = message;
  }
}
