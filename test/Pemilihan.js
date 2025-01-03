const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pemilihan", function () {
  let Pemilihan;
  let pemilihan;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy contract
    [owner, addr1, addr2] = await ethers.getSigners();
    Pemilihan = await ethers.getContractFactory("Pemilihan");
    pemilihan = await Pemilihan.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pemilihan.jumlahKandidat()).to.equal(0);
    });
  });

  describe("Adding Kandidat", function () {
    it("Should add a new kandidat", async function () {
      await pemilihan.addKandidat("Kandidat 1");
      const kandidat = await pemilihan.kandidat(1);

      expect(kandidat.nama).to.equal("Kandidat 1");
      expect(kandidat.count).to.equal(0);
      expect(await pemilihan.jumlahKandidat()).to.equal(1);
    });

    it("Should emit an addkandidat event", async function () {
      await expect(pemilihan.addKandidat("Kandidat 1"))
        .to.emit(pemilihan, "addkandidat")
        .withArgs("Kandidat 1");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await pemilihan.addKandidat("Kandidat 1");
      await pemilihan.addKandidat("Kandidat 2");
    });

    it("Should allow a user to vote", async function () {
      await pemilihan.connect(addr1).Vote(1);
      const kandidat = await pemilihan.kandidat(1);
      expect(kandidat.count).to.equal(1);
    });

    it("Should emit a pemilihanupdated event", async function () {
      await expect(pemilihan.connect(addr1).Vote(1))
        .to.emit(pemilihan, "pemilihanupdated")
        .withArgs(1, "Kandidat 1", 1);
    });

    it("Should not allow double voting", async function () {
      await pemilihan.connect(addr1).Vote(1);
      await expect(pemilihan.connect(addr1).Vote(1)).to.be.revertedWith(
        "anda telah memilih"
      );
    });

    it("Should not allow voting for an invalid kandidat ID", async function () {
      await expect(pemilihan.connect(addr1).Vote(3)).to.be.revertedWith(
        "id tidak ditemukan"
      );
    });
  });
});
