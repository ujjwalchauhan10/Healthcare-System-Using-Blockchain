// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract SoulBoundToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Minter {
        string name;
        address addr;
    }

    address[] private _minterAddresses;

    mapping(uint256 => Minter) private _tokenMinters; // Mapping to store minter for each token
    mapping(address => uint256[]) private _minterTokens; // Mapping to store tokens minted by each minter

    mapping(address => Minter) private _minters;
    mapping(address => uint256[]) private _userTokens; // Mapping to store user tokens

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);
    event MinterAdded(string name, address indexed addr);
    event MinterRemoved(address indexed addr);
    event MinterNameEdited(address indexed minterAddr, string newName);

    modifier onlyMinter() {
        require(
            _minters[msg.sender].addr == msg.sender,
            "Caller is not a minter"
        );
        _;
    }

    constructor() ERC721("SoulBound", "SBT") {
        _addMinter("admin", owner());
    }

    function addMinter(string memory name, address minterAddr)
        public
        onlyOwner
    {
        _addMinter(name, minterAddr);
    }

    function removeMinter(address minterAddr) public onlyOwner {
        _removeMinter(minterAddr);
    }

    function safeMint(address to, string memory uri) public onlyMinter {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        // Record minter information
        _recordMinter(tokenId, msg.sender);

        // Add the token to the user's list
        _userTokens[to].push(tokenId);

        emit Attest(to, tokenId);
    }

    function getMinterTokenURIs()
        public
        view
        onlyMinter
        returns (string[] memory)
    {
        uint256[] memory minterTokens = _minterTokens[msg.sender];
        string[] memory tokenURIs = new string[](minterTokens.length);

        for (uint256 i = 0; i < minterTokens.length; i++) {
            tokenURIs[i] = tokenURI(minterTokens[i]);
        }

        return tokenURIs;
    }

    function getUserTokenURIs() public view returns (string[] memory) {
        address user = msg.sender;
        uint256[] memory userTokens = _userTokens[user];
        string[] memory tokenURIs = new string[](userTokens.length);

        for (uint256 i = 0; i < userTokens.length; i++) {
            tokenURIs[i] = tokenURI(userTokens[i]);
        }

        return tokenURIs;
    }

    function getUserTokenURIsByMinter(address user)
        public
        view
        onlyMinter
        returns (string[] memory)
    {
        uint256[] memory userTokens = _userTokens[user];
        string[] memory tokenURIs = new string[](userTokens.length);

        for (uint256 i = 0; i < userTokens.length; i++) {
            tokenURIs[i] = tokenURI(userTokens[i]);
        }

        return tokenURIs;
    }

    function editMinterName(address minterAddr, string memory newName)
        public
        onlyOwner
    {
        require(bytes(newName).length > 0, "New name cannot be empty");
        _minters[minterAddr].name = newName;
        emit MinterNameEdited(minterAddr, newName);
    }

    function getMintersAddresses() public view onlyOwner returns (address[] memory) {
    return _minterAddresses;
}

    function burn(uint256 tokenId) external {
        address tokenOwner = ownerOf(tokenId);
        require(
            tokenOwner == msg.sender,
            "Only owner of the token can burn it"
        );

        // Remove minter information
        _removeMinterInfo(tokenId);

        _burn(tokenId);
        emit Revoke(msg.sender, tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        // Remove minter information
        _removeMinterInfo(tokenId);

        _burn(tokenId);
        emit Revoke(address(0), tokenId);
    }

    function _recordMinter(uint256 tokenId, address minterAddr) internal {
        _tokenMinters[tokenId] = _minters[minterAddr];
        _minterTokens[minterAddr].push(tokenId);
    }

    function _removeMinterInfo(uint256 tokenId) internal {
        delete _tokenMinters[tokenId];
    }

    function _addMinter(string memory name, address minterAddr) internal {
        require(minterAddr != address(0), "Minter address cannot be zero");
        require(
            _minters[minterAddr].addr != minterAddr,
            "Address is already a minter"
        );
        _minterAddresses.push(minterAddr);
        _minters[minterAddr] = Minter(name, minterAddr);
        emit MinterAdded(name, minterAddr);
    }

    function _removeMinter(address minterAddr) internal {
        require(
            _minters[minterAddr].addr == minterAddr,
            "Address is not a minter"
        );
        for (uint256 i = 0; i < _minterAddresses.length; i++) {
        if (_minterAddresses[i] == minterAddr) {
            // Move the last element to the position to be deleted
            _minterAddresses[i] = _minterAddresses[_minterAddresses.length - 1];
            // Remove the last element (which is now a duplicate)
            _minterAddresses.pop();
            break;
        }
    }
        delete _minters[minterAddr];
        emit MinterRemoved(minterAddr);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "Not allowed to transfer token"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
