import React, { Fragment } from "react";

const QuoteText = ({ quote, error, className }) => {
  return (
    <Fragment>
      {quote.length > 0 ? (
        <blockquote className={className}>
          <i className="icon-quote-left"></i>
          {quote}
          <cite className="w-100 d-flex flex-row-reverse">- Kanye </cite>
        </blockquote>
      ) : (
        <p className="small text-danger">{error}</p>
      )}
    </Fragment>
  );
};

export default QuoteText;
