document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const resultParagraph = document.getElementById('result');

    // Hardcoded conversion rate from USD to EUR
    const conversionRate = 0.85;

    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            resultParagraph.textContent = 'Please enter a valid amount.';
            return;
        }

        const convertedAmount = amount * conversionRate;
        resultParagraph.textContent = `${convertedAmount.toFixed(2)} EUR`;
    };

    convertButton.addEventListener('click', convertCurrency);
});
