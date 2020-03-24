class API {
    constructor(apikey) {
        this.apikey = apikey;
    }


    async getAPICoins() {
        const url = new String(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`);

        // fetch à l'API 
        const getCoinsUrl = await fetch(url);

        const coins = await getCoinsUrl.json();

        return {
            coins
        };
    }

    async getValues(currency, crypto) {
        const url = new String(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}&api_key=${this.apikey}`);

        // convertir en rest api
        const urlConvertir = await fetch(url);

        const result = await urlConvertir.json();

        return {
            result
        };
    }
}