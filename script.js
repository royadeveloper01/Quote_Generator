// Getting the DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true
}

const hideLoadingSpinner= () => {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
    } 
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try {
    let response = await fetch(proxyUrl + apiUrl)
    let data = await response.json()

    // if author is blank, replace with Anonymous
    if(data.quoteAuthor === ''){
        quoteAuthor.innerText = "Anonymous"
    } else {
        quoteAuthor.innerText = data.quoteAuthor
    }
    quoteText.innerText = data.quoteText;

    // Reduce font size if length of quote text is longer than 100 words
    if(data.quoteText.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Stop Loader and Show the Quote
    hideLoadingSpinner();
   } catch (error) { 
       console.log('Whoops! No quote',error)
       getQuote()
   }
}

// Tweet Quotes
const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
tweetQuoteBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();