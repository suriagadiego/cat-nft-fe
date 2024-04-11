import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const mintCat = async ({ name, image_url, description }) => {
  const NETWORK = "https://80002.rpc.thirdweb.com";
  const sdk = ThirdwebSDK.fromPrivateKey(
    "8c63e3d7c7a7677010ffa71d71831a261500c1fbf80994b9fddbb2f5272271c5",
    NETWORK,
    {
      secretKey: "_XT5lJGRSYA7uIwsmW2ByVedAmxyVtckpTFOsRjXxJQaa2w0LHdTx5A7GuXoMGg_uS40phvwClglgPuPq60kDQ",
    },
  );

  try {
    const nftCollection = await sdk.getContract("0xb2CC72A8C2C5f603b36761633f3927db861D81ef");
    const nft = await nftCollection.erc721.mint({
      name,
      image: image_url,
      description
    });
    console.log("NFT DATA", nft);
    return nft; // Return the minted NFT data if needed
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error; // Throw the error to handle it in the calling code
  }
};
