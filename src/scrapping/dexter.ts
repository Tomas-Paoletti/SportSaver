import axios from "axios";
import cheerio from "cheerio";

// URL del sitio web a scrapear
const url =
  "https://www.dexter.com.ar/buscar?q=puma&search-button=&lang=default";

// Realiza una petición HTTP GET a la URL
async function scrapData() {
  axios
    .get(url)
    .then((response) => {
      // Utiliza Cheerio para cargar el HTML de la respuesta
      const $ = cheerio.load(response.data);
      for (let i = 1; i < 4; i++) {
        // Encuentra y extrae información específica utilizando selectores CSS
        $(
          `div.page:nth-child(2) div.container.search-results:nth-child(4) div.row:nth-child(3) div.tab-content.col-12 div.tab-pane.container.active:nth-child(1) div.row:nth-child(2) div.col-sm-12.col-md-9 div.row.product-grid:nth-child(2) div.col-6.col-sm-4:nth-child(${i})`
        ).each((index, element) => {
          const image = $(element)
            .find(
              "div.product:nth-child(4) div.product-tile div.image-container a:nth-child(1) div.product-image-container > img.tile-image"
            )
            .attr("src");
          // console.log(image);
          const link = $(element)
            .find("div.tile-body div.pdp-link > a.link")
            .attr("href");
          //console.log("https://www.dexter.com.ar" + link);
          const name = $(element)
            .find("div.tile-body div.pdp-link > a.link")
            .text();
          const price = $(element)
            .find(
              "div.tile-body div.price span:nth-child(1) span.sales > span.value"
            )
            .text();
          console.log(price.trim());
          console.log(name);
        });
      }
    })

    .catch((error) => {
      console.log(`Ocurrió un error: ${error}`);
    });
}
export default scrapData;
