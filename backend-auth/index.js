import express from "./src/config/express.js";

const main = () => {
  try {
    express();
  } catch (e) {
    console.log("Error starting auth backend", e);
  }
};

main();
