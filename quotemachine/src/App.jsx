import React, { useEffect, useState, Fragment } from "react";
import "./style/App.scss";
import randomcolor from "randomcolor";
import QuoteText from "./components/QuoteText";
import Axios from "axios";
function App() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getQuote = async () => {
    var containerEl = document.querySelector(".container");
    var spinner = document.querySelector(".spinner-border");
    containerEl.classList.remove("fadeIn");
    containerEl.classList.add("fadeOut");
    spinner.classList.remove("d-none");
    await Axios.get("https://api.kanye.rest", {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.data) setQuote(response.data.quote);
        else setError(response.statusText);
        var bodyEl = document.querySelector("body");
        bodyEl.style.backgroundColor = randomcolor({ luminosity: "light" });
        containerEl.classList.remove("fadeOut");
        containerEl.classList.add("fadeIn");
        spinner.classList.add("d-none");
      })
      .catch(err => setError(err.message));
  };
  useEffect(() => {
    setIsLoading(true);
    getQuote();
    setIsLoading(false);
  }, [isLoading]);
  return (
    <Fragment>
         <div className="spinner-border text-info d-none" role="status">
          <span className="sr-only">Loading...</span>
        </div>

    <div className="container">
      <div className="row vh-100 justify-content-center align-content-center">
        <div className="h1 col col-12 text-center mb-4">
          Kanye Quote Machine
        </div>
        <div className="quote-box p-4 col col-sm-12 col-md-6">
          <QuoteText quote={quote} error={error} />
          <div className="controls d-flex flex-row flex-nowrap">
            <button className="btn btn-primary w-auto mr-2">
              <i className="icon-instagram"></i>
            </button>
            <button className="btn btn-primary w-auto">
              <i className="icon-twitter"></i>
            </button>
            <button
              disabled={isLoading}
              onClick={getQuote}
              className="btn btn-primary ml-auto"
            >
              <i className="icon-arrows-cw"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>

  );
}

export default App;
