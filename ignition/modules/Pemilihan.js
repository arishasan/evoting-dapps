const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PemilihanModule", (m) => {
  // Deploy the contract
  const pemilihan = m.contract("Pemilihan");

  return { pemilihan };
});