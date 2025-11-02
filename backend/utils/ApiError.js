class ApiError extends Error {
  constructor(message, status = 500, details = "No details"){
    super(message);
    this.status = status;
    this.details = details;
  }
}

export default ApiError;