// LIST PRIVATE KEYS

// # Accounts 1 : 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
// # Accounts 2 : 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
// # Accounts 3 : 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
// # Accounts 4 : 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
// # Accounts 5 : 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
// # Accounts 6 : 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

async function main() {
  // Buat instance provider dan wallet menggunakan private key akun yang diinginkan
  const provider = ethers.provider;
  const deployerPrivateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Private key Account #1
  const deployerWallet = new ethers.Wallet(deployerPrivateKey, provider);

  console.log("Deploying contracts with the account:", deployerWallet.address);

  // Deploy kontrak menggunakan wallet ini
  const Pemilihan = await ethers.getContractFactory("Pemilihan", deployerWallet);
  const pemilihan = await Pemilihan.deploy();

  console.log("Pemilihan contract deployed to:", pemilihan.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
