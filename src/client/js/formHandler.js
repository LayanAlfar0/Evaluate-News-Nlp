import axios from "axios";
import { isValidURL } from "./validateURL";

const updateUI = (selector, message, isVisible, className = ' ') => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.innerHTML = message ? `<p class='${className}'>${message}</p>` : '';
  element.style.display = isVisible ? 'block' : 'none';
};

const handleURLValidation = (value) => {
  if (!isValidURL(value)) {
    handleFeedback(true, "Enter a valid URL", 'feedback-error');
    return false;
  }
  handleFeedback(false, ""); // Clear any existing feedback
  return true;
};

const setLoading = (isVisible) => {
  updateUI(".loader", 'Loading...', isVisible);
};

const handleError = (isVisible, message) => {
  updateUI(".error", message, isVisible, 'error-message');
};

const handleFeedback = (isVisible, message, className) => {
  updateUI(".feedback", message, isVisible, className);
};
const renderResponse = (data) => {
  if (!data) {
    handleError(true, "Internal error: No data received.");
    return;
  }

  if (data.error) {
    handleError(true, `Error: ${data.error}`);
    return;
  }

  const resultsHTML = Object.entries(data).map(([key, value]) =>
    `<p class="result-part">${key.charAt(0).toUpperCase() + key.slice(1)}: <span>${value}</span></p>`
  ).join('');

  document.getElementById("results").innerHTML = resultsHTML;
};

const handleSubmit = async (event) => {
  document.getElementById("results").innerHTML = '';
  document.querySelector(".error").innerHTML = ' ';

  event.preventDefault();
  const input = document.querySelector("#url-form input");

  if (!handleURLValidation(input.value)) {
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post('http://localhost:8000/', { url: input.value });
    renderResponse(response.data);
    handleFeedback(true, "Success!", "feedback-success");
  } catch (error) {
    console.error("Failed to process the request:", error);
    handleError(true, `Failed to load data: ${error.message || 'Unknown error'}`);
  } finally {
    setLoading(false);
  }
};

export { handleSubmit };
