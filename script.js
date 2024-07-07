document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const resultParagraph = document.getElementById('result');

    // Hardcoded conversion rates
    const conversionRates = {
        USD: { EUR: 0.85, GBP: 0.75 },
        EUR: { USD: 1.18, GBP: 0.88 },
        GBP: { USD: 1.33, EUR: 1.14 }
    };

    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || fromCurrency === toCurrency) {
            resultParagraph.textContent = 'Please enter a valid amount and select different currencies.';
            return;
        }

        const rate = conversionRates[fromCurrency][toCurrency];
        const convertedAmount = amount * rate;
        resultParagraph.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    convertButton.addEventListener('click', convertCurrency);
});
