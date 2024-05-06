function generateSessionId() {
  // Generate a unique identifier, such as a UUID
  return "session-" + Math.random().toString(36).substr(2, 9); // Example: session-abcd1234
}

module.exports = {
  generateSessionId,
};
