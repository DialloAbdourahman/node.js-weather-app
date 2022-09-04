// Fetch is a browser api i.e it cannot run in node.js
// Calling fetch is going to kick off an asynchronous process that is we do not have access to the data right away and so we will need to use a call that will run in some point in the future when the data is availabe. But with the fetch API we will instead need a .then methode that will run on the return value of the fetch.

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  if (location.length === 0) {
    messageOne.textContent = "Please enter a value.";
    messageTwo.textContent = "";
    return;
  }

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });
});
