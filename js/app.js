// instances des classes
const contributor = new API('1fcc7697cc40f6baf76b25d1f26dfb684b5ac6a309b53463dd69651c1a41dcb9');
const ui = new Interface();

contributor.getAPICoins();
// Lire le form

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Lire la monnaie selectionnée
    const selectCurrency = document.getElementById("currency");
    const selectedCurrency = selectCurrency.options[selectCurrency.selectedIndex].value;

    // Lire la crypto selectionnée
    const selectCrypto = document.getElementById("crypto-currency");
    const selectedCrypto = selectCrypto.options[selectCrypto.selectedIndex].value;

    // Valider form
    if (selectedCurrency === '' || selectedCrypto === '') {
        ui.showMessage('il faut choisir une devise et une crypto', 'alert bg-danger text-center');
    } else {
        // consulter l'API
        contributor.getValues(selectedCurrency, selectedCrypto)
            .then(data => {
                ui.showResult(data.result.RAW, selectedCurrency, selectedCrypto);
            })
    }

})