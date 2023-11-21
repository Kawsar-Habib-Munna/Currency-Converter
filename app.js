document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');

    // Replace 'YOUR_FIXER_IO_API_KEY' with your Fixer.io API key
    const fixerApiKey = 'e78fd7ee7ae195ab94ac65fe677f1105';
    const fixerBaseUrl = `http://data.fixer.io/api/latest?access_key=${fixerApiKey}`;

    // Fetch available currencies from Fixer.io
    fetch(fixerBaseUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const currencies = Object.keys(data.rates);
            populateSelectOptions(fromCurrencySelect, currencies);
            populateSelectOptions(toCurrencySelect, currencies);
        })
        .catch(error => console.error('Error fetching currencies:', error));

    // Function to populate select options
    function populateSelectOptions(selectElement, options) {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    // Function to convert currency
    window.convertCurrency = function () {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Fetch conversion rates from Fixer.io
        fetch(`${fixerBaseUrl}&base=${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data); // Log the response.json() data
                const conversionRate = data.rates[toCurrency];
               
                if (conversionRate) {
                    const convertedAmount = (amount * conversionRate).toFixed(2);
                    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    resultDiv.textContent = 'Invalid currency selection';
                }
            })
            .catch(error => console.error('Error converting currency:', error));
    };
});
