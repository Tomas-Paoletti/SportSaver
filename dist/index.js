"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1"; // URL we're scraping
const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
// Send an async HTTP Get request to the url
AxiosInstance.get(url)
    .then(
// Once we have data returned ...
(response) => {
    const html = response.data; // Get the HTML from the HTTP request
    const $ = cheerio_1.default.load(html); // Load the HTML string into cheerio
    const statsTable = $(".statsTableContainer > tr"); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    const topScorers = [];
    statsTable.each((i, elem) => {
        const rank = parseInt($(elem).find(".rank > strong").text()); // Parse the rank
        const name = $(elem).find(".playerName > strong").text(); // Parse the name
        const nationality = $(elem).find(".playerCountry").text(); // Parse the country
        const goals = parseInt($(elem).find(".mainStat").text()); // Parse the number of goals
        topScorers.push({
            rank,
            name,
            nationality,
            goals,
        });
    });
    console.log(topScorers);
})
    .catch(console.error); // Error handling
//https://www.sporting.com.ar/remera%20adidas
//https://www.dexter.com.ar/buscar?q=zapatilla+roja+adidas se concatena al princicpio buscar?q= en los espacios se cambian por +
//https://vaypol.com.ar/productos/k/remera-de-river/p/1 //cambiart desde k y cambiar valores vacios por -
//# sourceMappingURL=index.js.map