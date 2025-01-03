// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Pemilihan {
    struct Kandidat {
        uint256 id;
        string nama;
        uint256 count;
    }
    uint256 public jumlahKandidat;
    mapping(uint256 => Kandidat) public kandidat;
    mapping(address => bool) public votedornot;

    event pemilihanupdated(uint256 id, string nama, uint256 count);
    event addkandidat(string nama);

    function addKandidat(string memory nama) public {
        jumlahKandidat++;
        kandidat[jumlahKandidat] = Kandidat(jumlahKandidat, nama, 0);

        emit addkandidat(kandidat[jumlahKandidat].nama);
    }

    function Vote(uint256 _idKandidat) public {
        //the person has not voted again
        require(!votedornot[msg.sender], "anda telah memilih");
        //the id that the person has input is available
        require(
            kandidat[_idKandidat].id > 0 && _idKandidat <= jumlahKandidat,
            "id tidak ditemukan"
        );
        //pemilih bertambah
        kandidat[_idKandidat].count += 1;
        //bool true
        votedornot[msg.sender] = true;
        emit pemilihanupdated(
            _idKandidat,
            kandidat[_idKandidat].nama,
            kandidat[_idKandidat].count
        );
    }
}