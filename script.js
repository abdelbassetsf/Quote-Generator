const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

const showloadingSppiner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get Quote from Api
async function getQuote() {
  showloadingSppiner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Using proxy server to avoid the cors problem.
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reduce font for long quotes
    if (quoteText.innerText.length >= 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  } catch (err) {}
}

// Tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

//Add event lisnteners to buttons
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
