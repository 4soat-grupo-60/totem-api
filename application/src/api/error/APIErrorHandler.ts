import { Class } from "type-fest";
import CPFExistsError from "../../entities/errors/CPFExistsError";
import EmailExistsError from "../../entities/errors/EmailExistsError";
import { InvalidEmailError } from "../../entities/errors/InvalidEmailError";
import { InvalidCPFError } from "../../entities/errors/InvalidCPFError";
import { InvalidNameError } from "../../entities/errors/InvalidNameError";
import RecordNotFoundError from "../../entities/errors/RecordNotFoundError";
import InvalidCategoryError from "../../entities/errors/InvalidCategoryError";
import InvalidOrderStatusError from "../../entities/errors/InvalidOrderStatusError";
import ProductInactiveError from "../../entities/errors/ProductInactiveError";

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
export default class APIErrorHandler {
  static getBusinessErrors(): Map<Class<any>, number> {
    const errors = new Map<Class<any>, number>();

    // Conflict errors
    errors.set(CPFExistsError, HTTP_STATUS_CONFLICT);
    errors.set(EmailExistsError, HTTP_STATUS_CONFLICT);
    errors.set(ProductInactiveError, HTTP_STATUS_CONFLICT);

    // Bad request errors
    errors.set(InvalidEmailError, HTTP_STATUS_BAD_REQUEST);
    errors.set(InvalidCPFError, HTTP_STATUS_BAD_REQUEST);
    errors.set(InvalidNameError, HTTP_STATUS_BAD_REQUEST);
    errors.set(InvalidCategoryError, HTTP_STATUS_BAD_REQUEST);
    errors.set(InvalidOrderStatusError, HTTP_STATUS_BAD_REQUEST);

    // Not Found
    errors.set(RecordNotFoundError, HTTP_STATUS_NOT_FOUND);

    return errors;
  }

  static getStatusCodeFor(occurredError: Error): number {
    const businessErrors = this.getBusinessErrors();

    for (let knownError of businessErrors.entries()) {
      const [errorClass, statusCode] = knownError;

      if (occurredError instanceof errorClass) {
        return statusCode;
      }
    }

    console.error(occurredError);

    // Internal server error for unknown errors
    return HTTP_INTERNAL_SERVER_ERROR;
  }
}

/**
 * Handle API business errors and send the appropriate status code and message
 */
// @ts-ignore
export function handleAPIError(res: Response<any, any>, e: Error) {
  const statusCode = APIErrorHandler.getStatusCodeFor(e);

  res.status(statusCode);
  res.send({
    code: statusCode,
    error: e.message,
  });
}
