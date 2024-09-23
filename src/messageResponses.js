// send a response
const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
};

// turn data into xml
const toXML = (id, message) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <id>${id}</id>`;
  responseXML = `${responseXML} <message>${message}</message>`;
  responseXML = `${responseXML} </response>`;

  return responseXML;
};

// create a constant for each url, then send a response in both xml and json
const getSuccess = (request, response) => {
  const success = {
    message: 'This is a successful response',
    id: 'success',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    const successXML = toXML(success.id, success.message);
    return respond(request, response, 200, successXML, 'text/xml');
  }

  const successString = JSON.stringify(success);
  return respond(request, response, 200, successString, 'application/json');
};

const getBadRequest = (request, response) => {
  let badRequest = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  // check query parameters
  if (!request.query.valid || request.query.valid !== 'true') {
    if (request.acceptedTypes[0] === 'text/xml') {
      const badRequestXML = toXML(badRequest.id, badRequest.message);
      return respond(request, response, 400, badRequestXML, 'text/xml');
    }

    const badRequestString = JSON.stringify(badRequest);
    return respond(request, response, 400, badRequestString, 'application/json');
  }

  badRequest = {
    message: 'This is a successful response',
    id: 'success',
  };

  return respond(request, response, 200, JSON.stringify(badRequest), 'application/json');
};

const getUnauthorized = (request, response) => {
  let unauthorized = {
    message: 'Missing loggedIn parameter set to yes',
    id: 'unauthorized',
  };

  // check query parameters
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    if (request.acceptedTypes[0] === 'text/xml') {
      const unauthorizedXML = toXML(unauthorized.id, unauthorized.message);
      return respond(request, response, 401, unauthorizedXML, 'text/xml');
    }

    const unauthorizedString = JSON.stringify(unauthorized);
    return respond(request, response, 401, unauthorizedString, 'application/json');
  }

  unauthorized = {
    message: 'This is a successful response',
    id: 'success',
  };

  return respond(request, response, 200, JSON.stringify(unauthorized), 'application/json');
};

const getForbidden = (request, response) => {
  const forbidden = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    const forbiddenXML = toXML(forbidden.id, forbidden.message);
    return respond(request, response, 403, forbiddenXML, 'text/xml');
  }

  const forbiddenString = JSON.stringify(forbidden);
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const getInternalError = (request, response) => {
  const internalError = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    const internalErrorXML = toXML(internalError.id, internalError.message);
    return respond(request, response, 500, internalErrorXML, 'text/xml');
  }

  const internalErrorString = JSON.stringify(internalError);
  return respond(request, response, 500, internalErrorString, 'application/json');
};

const getNotImplemented = (request, response) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    const notImplementedXML = toXML(notImplemented.id, notImplemented.message);
    return respond(request, response, 501, notImplementedXML, 'text/xml');
  }

  const notImplementedString = JSON.stringify(notImplemented);
  return respond(request, response, 501, notImplementedString, 'application/json');
};

const getNotFound = (request, response) => {
  const notFound = {
    message: 'Page not found',
    id: 'notFound',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    const notFoundXML = toXML(notFound.id, notFound.message);
    return respond(request, response, 404, notFoundXML, 'text/xml');
  }

  const notFoundString = JSON.stringify(notFound);
  return respond(request, response, 404, notFoundString, 'application/json');
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalError,
  getNotImplemented,
  getNotFound,
};
