document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const reverseButton = document.getElementById('reverse');
    const resultParagraph = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    const historicalRatesDiv = document.getElementById('historical-rates');

    const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Base currency USD
    const HISTORICAL_API_URL = 'https://api.exchangerate-api.com/v4/2020-01-01'; // Example historical date

    let rates = {};

    const fetchRates = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            rates = data.rates;
            // Update dropdown options dynamically based on available currencies
            updateCurrencyOptions(Object.keys(rates));
        } catch (error) {
            console.error('Error fetching currency rates:', error);
            resultParagraph.textContent = 'Failed to fetch currency rates.';
        }
    };

    const fetchHistoricalRates = async () => {
        try {
            const response = await fetch(HISTORICAL_API_URL);
            const data = await response.json();
            displayHistoricalRates(data.rates);
        } catch (error) {
            console.error('Error fetching historical rates:', error);
            historicalRatesDiv.textContent = 'Failed to fetch historical rates.';
        }
    };

    const updateCurrencyOptions = (currencies) => {
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        currencies.forEach(currency => {
            fromCurrencySelect.add(new Option(currency, currency));
            toCurrencySelect.add(new Option(currency, currency));
        });
    };

    const validateInput = () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            errorMessage.textContent = 'Please enter a valid amount greater than zero.';
            return false;
        }
        if (fromCurrency === toCurrency) {
            errorMessage.textContent = 'Please select different currencies for conversion.';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    };

    const convertCurrency = () => {
        if (!validateInput()) {
            return;
        }

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const rate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = amount * rate;
        resultParagraph.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    const reverseCurrencies = () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        fromCurrencySelect.value = toCurrency;
        toCurrencySelect.value = fromCurrency;

        convertCurrency();
    };

    const displayHistoricalRates = (rates) => {
        historicalRatesDiv.innerHTML = '<h3>Historical Exchange Rates</h3>';
        for (const [currency, rate] of Object.entries(rates)) {
            const rateElement = document.createElement('p');
            rateElement.textContent = `${currency}: ${rate}`;
            historicalRatesDiv.appendChild(rateElement);
        }
    };

    convertButton.addEventListener('click', convertCurrency);
    reverseButton.addEventListener('click', reverseCurrencies);

    // Fetch rates and initialize currency options on load
    fetchRates();
    fetchHistoricalRates();
});
