import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";


export default function App() {
  const [Quotes, setQuote] = useState("");

  let cancelToken;

  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("Cancelling the previos requests");
  }

  cancelToken = axios.CancelToken.source();

  const getQuote = async () => {
    const { data } = await axios.get(`https://api.quotable.io/random`, {
      cancelToken: cancelToken.token,
    });
    setQuote(data);
    // console.log(data);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div class="quote-text">
          <i class="fa fa-quote-left">{Quotes.content}</i>
          <span id="text"></span>
        </div>
        <div class="quote-author">
          {Quotes.author}
          <span id="author"></span>
        </div>
        <div class="buttons">
          <a
            href="twitter.com/intent/tweet"
            class="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top"
          >
            <i class="fa fa-twitter"></i>
          </a>

          <button class="button" id="new-quote" onClick={getQuote}>
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}
