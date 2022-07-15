export const serverURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://berlin-gardens.herokuapp.com";
