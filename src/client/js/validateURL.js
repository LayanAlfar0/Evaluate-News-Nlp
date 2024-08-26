const isValidURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    // Check for HTTP and HTTPS protocols explicitly
    const allowedProtocols = ["http:", "https:"];
    return allowedProtocols.includes(parsedUrl.protocol);
  } catch (error) {
    return false;
  }
};

export { isValidURL };