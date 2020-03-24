class Interface {

    constructor() {
        this.init();
    }

    init() {
        this.makeSelect();
    }

    makeSelect() {
        contributor.getAPICoins()
            .then(res => {

                // creer un select tag 
                const select = document.getElementById('crypto-currency');
                // parcourir les données de l'API  
                for (const [key, value] of Object.entries(res.coins.Data)) {
                    // ajouter Symbole et nom comme options
                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                }
            })
    }

    /**
     * 
     * @param {*message Message to show
     * @param {*classes List of class to add
     */
    showMessage(message, classes) {
        const div = document.createElement('div');
        div.className = classes;
        div.appendChild(document.createTextNode(message));

        // selectionner le containeur des messages 
        const messagesContainer = document.querySelector('.messages');

        // Afficher contenu
        messagesContainer.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000);
    }


    showResult(result, currency, crypto) {
        // s'il y a un resultat avant, alor on le cache
        const prevResult = document.querySelector('#result > div');
        if (prevResult) prevResult.remove();

        let template;

        if (result !== undefined && Object.entries(result).length !== 0) {

            let data = result[crypto][currency];

            // mettre le prix a deux décimals
            let price = data.PRICE.toFixed(2),
                lastUpdate = new Date(data.LASTUPDATE * 1000).toLocaleDateString('fr-CH');

            // creer template 
            template = `
                <div class="card bg-light">
                   <div class="card-body text-dark">
                        <h2 class="card-title">Result : </h2>
                        <p>Le prix de <strong>${data.FROMSYMBOL}</strong> à <strong>${data.TOSYMBOL}</strong> est de <strong>${price} ${currency} </strong></p>
                        <p>Changement dernier jour : ${data.CHANGEPCTDAY.toFixed(5)}%</p>
                        <p>Dernière mise à jour : le ${lastUpdate} </p>
                    </div>
                </div>
            `;
        } else {
            template = `<div class="alert bg-warning">La cryptomonnaie n'est plus disponible</div>`;
        }

        // Afficher spinner loader 
        this.showAndHideSpinner('block');
        // inserer dans le DOM 
        setTimeout(() => {
            document.getElementById('result').innerHTML = template;
            // cacher le spinner 
            this.showAndHideSpinner('none');
        }, 2000);
    }


    showAndHideSpinner(display) {
        const spinner = document.querySelector('.spinner-content');
        spinner.style.display = display;
    }
}