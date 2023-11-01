import {Class} from "type-fest";
import CPFExistsError from "../../../../core/errors/CPFExistsError";
import EmailExistsError from "../../../../core/errors/EmailExistsError";
import {InvalidEmailError} from "../../../../core/errors/InvalidEmailError";
import {InvalidCPFError} from "../../../../core/errors/InvalidCPFError";
import {InvalidNameError} from "../../../../core/errors/InvalidNameError";
import RecordNotFoundError from "../../../../core/errors/RecordNotFoundError";

const HTTP_STATUS_BAD_REQUEST = 400
const HTTP_STATUS_CONFLICT = 409
const HTTP_STATUS_NOT_FOUND = 404
const HTTP_INTERNAL_SERVER_ERROR = 500
export default class APIErrorHandler {


  static getBusinessErrors(): Map<Class, number> {
    const errors = new Map<Class, number>()

    // Conflict errors
    errors.set(CPFExistsError, HTTP_STATUS_CONFLICT)
    errors.set(EmailExistsError, HTTP_STATUS_CONFLICT)

    // Bad request errors
    errors.set(InvalidEmailError, HTTP_STATUS_BAD_REQUEST)
    errors.set(InvalidCPFError, HTTP_STATUS_BAD_REQUEST)
    errors.set(InvalidNameError, HTTP_STATUS_BAD_REQUEST)

    // Not Found
    errors.set(RecordNotFoundError, HTTP_STATUS_NOT_FOUND)

    return errors
  }

  static getStatusCodeFor(occurredError: Error): number {

    const businessErrors = this.getBusinessErrors()

    for (let knownError of businessErrors.entries()) {
      const [errorClass, statusCode] = knownError

      if (occurredError instanceof errorClass) {
        return statusCode
      }
    }

    // Internal server error for unknown errors
    return HTTP_INTERNAL_SERVER_ERROR
  }

}