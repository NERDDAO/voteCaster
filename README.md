# 🗳️ voteCaster
We have built a frame for interactive online role games. The game master can create a frame with the session streaming and a vote poll where the Farcaster audience can interact with the game setting the actions difficulty.

# 🏗 Built using Scaffold-ETH 2

# Project Description
Project Description
I'm thrilled to share the intricate details of our project – a frame for interactive online role-playing games that harnesses the power of Farcaster, Scaffold ETH 2, Proof of Knowledge, LivePeer, Base.

Our tech stack is a harmonious fusion of cutting-edge tools and frameworks that enable us to create a truly immersive and decentralized gaming experience. At the core of our build lies Scaffold-eth 2, a robust framework that empowers us to seamlessly construct Ethereum contracts and frontends, providing a solid foundation for our decentralized application.

To facilitate seamless integration with the Farcaster ecosystem, we have leveraged the capabilities of Pinata, a versatile platform that allows us to connect and interact with the Farcaster Read and Write API. This integration enables us to create a hub where game masters can orchestrate their roleplaying sessions, and the Farcaster audience can participate through interactive voting polls, shaping the game's actions and difficulty levels.

Diving deeper into the frame's development, we have enlisted the assistance of Airstack Developer Tools, a powerful suite that streamlines the process of building and deploying frames within the Farcaster ecosystem. This tool empowers us to create immersive and captivating experiences for our users.

Ensuring the scalability and security of our application, we have chosen to deploy on Base, a secure and low-cost Ethereum-equivalent L2 blockchain built on the OP Stack by Coinbase. Base's commitment to bringing the next billion users onchain aligns perfectly with our vision of creating a decentralized gaming platform accessible to a global audience.

To enhance the trust and transparency of our platform, we have integrated the Ethereum Attestation Schema (EAS) for on-chain attestations. This schema, deployed at the address 0x4200000000000000000000000000000000000021 on Base, enables us to provide verifiable and tamper-proof attestations, further solidifying the integrity of our gaming ecosystem.

In our pursuit of delivering a seamless streaming experience, we have partnered with LivePeer, a decentralized video streaming network that leverages peer-to-peer technology. This integration ensures that our users can enjoy high-quality, uninterrupted video streams, further enriching the immersive roleplaying experience.

Our tech stack is not a static monolith; it is an ever-evolving ecosystem that adapts to the latest advancements in the Web3 space. Among our future integration plans, we are exploring the integration of Proof of Knowledge, a cutting-edge protocol that creates interconnected data units, or kEngrams, that validate and enhance one another. This integration will unlock new realms of knowledge-driven gameplay, pushing the boundaries of what is possible in the realm of decentralized gaming.

In the spirit of true blockchain developers, we are constantly seeking new and innovative ways to revolutionize the gaming industry through the power of decentralization and Web3 technologies. Our commitment to transparency, security, and user experience is unwavering, and we remain steadfast in our pursuit of creating a truly immersive and decentralized gaming ecosystem that transcends the limitations of traditional gaming platforms.

How it's Made
Building this interactive online role-playing game frame has been an exhilarating journey, one that has allowed us to push the boundaries of what is possible in the realm of decentralized gaming. At the core of our tech stack lies Scaffold-eth 2, a robust framework that empowers us to seamlessly construct Ethereum contracts and frontends, providing a solid foundation for our decentralized application.

To truly harness the power of the Farcaster ecosystem, we have integrated Pinata, a versatile platform that enables us to connect and interact with the Farcaster Read and Write API. This integration has been instrumental in creating a hub where game masters can orchestrate their role-playing sessions, while the Farcaster audience can participate through interactive voting polls, shaping the game's actions and difficulty levels.

One of the key challenges we faced was building and deploying our frame within the Farcaster ecosystem. To streamline this process, we enlisted the assistance of Airstack Developer Tools, a powerful suite that has empowered us to create truly immersive and captivating experiences for our users.

Ensuring the scalability and security of our application was of paramount importance, and that's why we chose to deploy on Base, a secure and low-cost Ethereum-equivalent L2 blockchain built on the OP Stack by Coinbase. Base's commitment to bringing the next billion users onchain aligns perfectly with our vision of creating a decentralized gaming platform accessible to a global audience.

To enhance the trust and transparency of our platform, we have integrated the Ethereum Attestation Schema (EAS) for on-chain attestations. This schema, deployed at the address 0x4200000000000000000000000000000000000021 on Base, enables us to provide verifiable and tamper-proof attestations, further solidifying the integrity of our gaming ecosystem.

Delivering a seamless streaming experience was crucial for our project, and that's why we partnered with LivePeer, a decentralized video streaming network that leverages peer-to-peer technology. This integration ensures that our users can enjoy high-quality, uninterrupted video streams, further enriching the immersive role-playing experience.

One particularly notable aspect of our project is the seamless integration of Proof of Knowledge, a cutting-edge protocol that creates interconnected data units, or kEngrams, that validate and enhance one another. This integration will unlock new realms of knowledge-driven gameplay, pushing the boundaries of what is possible in the realm of decentralized gaming.

Our tech stack is not a static monolith; it is an ever-evolving ecosystem that adapts to the latest advancements in the Web3 space. We are constantly seeking new and innovative ways to revolutionize the gaming industry through the power of decentralization and Web3 technologies. Our commitment to transparency, security, and user experience is unwavering, and we remain steadfast in our pursuit of creating a truly immersive and decentralized gaming ecosystem that transcends the limitations of traditional gaming platforms.

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
