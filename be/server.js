// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const bodyParser = express.json()
// Define routes or APIs here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(bodyParser);
app.use(cors());
app.post('/api/mint', (req, res) => {

    const { cat_name, image_url, description } = req.body;

    const mintCat = async ({ name, image, description }) => {
        const NETWORK = process.env.POLYGON_AMOY_TESTNET;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const API_KEY = process.env.API_KEY

        const sdk = ThirdwebSDK.fromPrivateKey(
          PRIVATE_KEY,
          NETWORK,
          {
            secretKey: API_KEY,
          },
        );
      
        try {
          const nftCollection = await sdk.getContract(process.env.CONTRACT_ADDRESS);
          const nft = await nftCollection.erc721.mint({
            name,
            image,
            description
          });
          console.log("NFT DATA", nft);
          res.send('SUCCESS')
          return nft;
        } catch (error) {
          console.error("Error minting NFT:", error);
          res.send('FAIL')
          throw error;
        }
    };

    mintCat({ 
        name: cat_name,
        description: description,
        image: image_url
    });
});
