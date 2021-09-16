const ERROR_LIST = {
  E00000: { message: 'default error', status: 403 },
};

/**
 * api回傳格式
 * createSuccessObject 成功的格式
 * createErrorObject 失敗的格式
 * @returns {object}
 */
class ResponseObject {
  static createSuccessObject() {
    return Object.assign({}, {
      success: true,
      data: {},
    });
  }

  static createErrorObject() {
    return Object.assign({}, {
      success: false,
      error: {
        message: 'error',
      },
    });
  }

  static getMessageByErrorCode(errorCode) {
    return ERROR_LIST[errorCode] ? ERROR_LIST[errorCode].message : 'error';
  }

  static getStatusCode(errorCode) {
    return ERROR_LIST[errorCode] ? ERROR_LIST[errorCode].status : 500;
  }
}

module.exports = ResponseObject;
