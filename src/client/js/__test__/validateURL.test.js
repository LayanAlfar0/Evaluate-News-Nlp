const { isValidURL } = require("../validateURL");
describe("URL Validation", () => {
  describe("Negative Tests", () => {
    const invalidURLs = [
      "hello Udacity",
      "mailto:me@gmail.com",
      "",
      "12345",
      "ftp://ftp.example.com",
      "https://",
      "http://.com"
    ];

    test.each(invalidURLs)("'%s' should be considered an invalid URL", (url) => {
      expect(isValidURL(url)).toBeFalsy();
    });
  });

  describe("Positive Tests", () => {
    const validURLs = [
      "http://example.com",
      "https://example.com",
      "https://www.example.com",
      "http://example.com:80/path?name=val#hash",
      "https://subdomain.example.com"
    ];

    test.each(validURLs)("'%s' should be considered a valid URL", (url) => {
      expect(isValidURL(url)).toBeTruthy();
    });
  });
});
