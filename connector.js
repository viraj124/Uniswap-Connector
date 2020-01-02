import React, { Component } from 'react';
import logo from '../logo.png';
import Marvel from '../abis/Marvel.json';
import Web3 from 'web3';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
         }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const abi = [
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "_target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "execute",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "response",
            "type": "bytes32"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      }
    ]
    const address = '0x2895a328a8fa5611dd5ae5a08186f0d8e82aa398'
    // Load account
    var buyObjLogic = {
      "constant": false,
      "inputs": [
        {
          "name": "src",
          "type": "address"
        },
        {
          "name": "dest",
          "type": "address"
        },
        {
          "name": "srcAmt",
          "type": "uint256"
        },
        {
          "name": "maxDestAmt",
          "type": "uint256"
        },
        {
          "name": "slippageRate",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [
        {
          "name": "destAmt",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    };
    var args = [
      '0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6',
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      '100000000000000000000',
      "10000000000000000",
      1 
  ]
  const bNo = await web3.eth.getBlock(web3.eth.blockNumber)
    console.log(bNo['timestamp'] + 200)

    const uniswapExchangeAbi =    {
      "name": "ethToTokenSwapInput",
      "outputs": [{ "type": "uint256", "name": "out" }],
      "inputs": [{ "type": "uint256", "name": "min_tokens" }, { "type": "uint256", "name": "deadline" }],
      "constant": false,
      "payable": true,
      "type": "function"
        };
    var uniswapargs = [
     '100000000000000',
     1899063809898
    ]

    const uniswapTokenToEthAbi =  {
      "name": "tokenToEthSwapInput",
      "outputs": [{ "type": "uint256", "name": "out" }],
      "inputs": [
        { "type": "uint256", "name": "tokens_sold" },
        { "type": "uint256", "name": "min_eth" },
        { "type": "uint256", "name": "deadline" }
      ],
      "constant": false,
      "payable": false,
      "type": "function"
        }
    
    const uniswapTokenToEthArgs = [
      "100000000000000",
      "10000",
      18990638098787
    ]

const uniswapTokenToTokenAbi = {
  "name": "tokenToTokenSwapInput",
  "outputs": [{ "type": "uint256", "name": "out" }],
  "inputs": [
    { "type": "uint256", "name": "tokens_sold" },
    { "type": "uint256", "name": "min_tokens_bought" },
    { "type": "uint256", "name": "min_eth_bought" },
    { "type": "uint256", "name": "deadline" },
    { "type": "address", "name": "token_addr" }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  }

  const uniswapTokenArgs = [
    "100000000000",
    "10000",
    "10000",
    18990638098784,
    "0xaD6D458402F60fD3Bd25163575031ACDce07538D"
  ]

  const approveExchange = {
    "name": "approve",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [{ "type": "address", "name": "_spender" }, { "type": "uint256", "name": "_value" }],
    "constant": false,
    "payable": false,
    "type": "function"
    }

    const approveExchangeArgs = [
      '0x8Bcd6f821012989b8d32EF002667a6524296A279',
      "100000000000"
    ]

  const uniswapLiquidity =  {
    "name": "addLiquidity",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "min_liquidity" },
      { "type": "uint256", "name": "max_tokens" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": true,
    "type": "function"  }

   

    // console.log(await web3.eth.getBlock(web3.eth.blockNumber).timestamp);
  var uniswapLiquidityArgs = [
    "1000",
    "1000000000000000000000000000000000000000000000000000000000000000",
    1899063809
    ]

    const transferFromAbi = 
      {
        "name": "transferFrom",
        "outputs": [{ "type": "bool", "name": "out" }],
        "inputs": [
          { "type": "address", "name": "_from" },
          { "type": "address", "name": "_to" },
          { "type": "uint256", "name": "_value" }
        ],
        "constant": false,
        "payable": false,
        "type": "function"      }

      var transferFromArgs = [
        '0x2a5c6e0eb76915466c0ce771dcfb6f258a572336',
        '0x457f9ccaabd00f4d77f6e8fe089b0ecf3ecee59e',
        "100000000000"
      ]

      const transferAbi =  {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }

    var transferArgs = [
      '0x457f9ccaabd00f4d77f6e8fe089b0ecf3ecee59e',
      "10000000000000000000"
    ]

    const transferData = await web3.eth.abi.encodeFunctionCall(transferFromAbi, transferFromArgs);
    console.log(transferData)

      const transferFromData = await web3.eth.abi.encodeFunctionCall(transferFromAbi, transferFromArgs);
      console.log(transferFromData)

    const uniswapapprovedata = await web3.eth.abi.encodeFunctionCall(approveExchange, approveExchangeArgs)
    console.log(uniswapapprovedata)    

  const uniswapLiquiditydata = await web3.eth.abi.encodeFunctionCall(uniswapLiquidity, uniswapLiquidityArgs)
  console.log(uniswapLiquiditydata)

  const uniswapdata = await web3.eth.abi.encodeFunctionCall(uniswapExchangeAbi, uniswapargs)
  console.log(uniswapdata)

  const uniswapTokenToEthData = await web3.eth.abi.encodeFunctionCall(uniswapTokenToEthAbi, uniswapTokenToEthArgs);
  console.log(uniswapTokenToEthData)

  const uniswapTokenToTokenData = await web3.eth.abi.encodeFunctionCall(uniswapTokenToTokenAbi, uniswapTokenArgs);
  console.log(uniswapTokenToTokenData)




    const data = await web3.eth.abi.encodeFunctionCall(buyObjLogic, args)
    console.log(data)
    const accounts = await web3.eth.getAccounts()
    this.setState({
        account: accounts[0]
    })

    const er20abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const erc20address = '0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6'

    const uniswapAddress = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
    const uniswapAbi = [
      {
        "name": "NewExchange",
        "inputs": [
          { "type": "address", "name": "token", "indexed": true },
          { "type": "address", "name": "exchange", "indexed": true }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "initializeFactory",
        "outputs": [],
        "inputs": [{ "type": "address", "name": "template" }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 35725
      },
      {
        "name": "createExchange",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [{ "type": "address", "name": "token" }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 187911
      },
      {
        "name": "getExchange",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [{ "type": "address", "name": "token" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 715
      },
      {
        "name": "getToken",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [{ "type": "address", "name": "exchange" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 745
      },
      {
        "name": "getTokenWithId",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "token_id" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 736
      },
      {
        "name": "exchangeTemplate",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 633
      },
      {
        "name": "tokenCount",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 663
      }
    ]

  
    const uniswapexchangeabis = [
      {
        "name": "TokenPurchase",
        "inputs": [
          { "type": "address", "name": "buyer", "indexed": true },
          { "type": "uint256", "name": "eth_sold", "indexed": true },
          { "type": "uint256", "name": "tokens_bought", "indexed": true }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "EthPurchase",
        "inputs": [
          { "type": "address", "name": "buyer", "indexed": true },
          { "type": "uint256", "name": "tokens_sold", "indexed": true },
          { "type": "uint256", "name": "eth_bought", "indexed": true }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "AddLiquidity",
        "inputs": [
          { "type": "address", "name": "provider", "indexed": true },
          { "type": "uint256", "name": "eth_amount", "indexed": true },
          { "type": "uint256", "name": "token_amount", "indexed": true }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "RemoveLiquidity",
        "inputs": [
          { "type": "address", "name": "provider", "indexed": true },
          { "type": "uint256", "name": "eth_amount", "indexed": true },
          { "type": "uint256", "name": "token_amount", "indexed": true }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "Transfer",
        "inputs": [
          { "type": "address", "name": "_from", "indexed": true },
          { "type": "address", "name": "_to", "indexed": true },
          { "type": "uint256", "name": "_value", "indexed": false }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "Approval",
        "inputs": [
          { "type": "address", "name": "_owner", "indexed": true },
          { "type": "address", "name": "_spender", "indexed": true },
          { "type": "uint256", "name": "_value", "indexed": false }
        ],
        "anonymous": false,
        "type": "event"
      },
      {
        "name": "setup",
        "outputs": [],
        "inputs": [{ "type": "address", "name": "token_addr" }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 175875
      },
      {
        "name": "addLiquidity",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "min_liquidity" },
          { "type": "uint256", "name": "max_tokens" },
          { "type": "uint256", "name": "deadline" }
        ],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 82616
      },
      {
        "name": "removeLiquidity",
        "outputs": [{ "type": "uint256", "name": "out" }, { "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "amount" },
          { "type": "uint256", "name": "min_eth" },
          { "type": "uint256", "name": "min_tokens" },
          { "type": "uint256", "name": "deadline" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 116814
      },
      { "name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function" },
      {
        "name": "ethToTokenSwapInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "min_tokens" }, { "type": "uint256", "name": "deadline" }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 12757
      },
      {
        "name": "ethToTokenTransferInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "min_tokens" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" }
        ],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 12965
      },
      {
        "name": "ethToTokenSwapOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "tokens_bought" }, { "type": "uint256", "name": "deadline" }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 50463
      },
      {
        "name": "ethToTokenTransferOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_bought" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" }
        ],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 50671
      },
      {
        "name": "tokenToEthSwapInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_eth" },
          { "type": "uint256", "name": "deadline" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 47503
      },
      {
        "name": "tokenToEthTransferInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_eth" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 47712
      },
      {
        "name": "tokenToEthSwapOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "eth_bought" },
          { "type": "uint256", "name": "max_tokens" },
          { "type": "uint256", "name": "deadline" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 50175
      },
      {
        "name": "tokenToEthTransferOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "eth_bought" },
          { "type": "uint256", "name": "max_tokens" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 50384
      },
      {
        "name": "tokenToTokenSwapInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_tokens_bought" },
          { "type": "uint256", "name": "min_eth_bought" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "token_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 51007
      },
      {
        "name": "tokenToTokenTransferInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_tokens_bought" },
          { "type": "uint256", "name": "min_eth_bought" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" },
          { "type": "address", "name": "token_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 51098
      },
      {
        "name": "tokenToTokenSwapOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_bought" },
          { "type": "uint256", "name": "max_tokens_sold" },
          { "type": "uint256", "name": "max_eth_sold" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "token_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 54928
      },
      {
        "name": "tokenToTokenTransferOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_bought" },
          { "type": "uint256", "name": "max_tokens_sold" },
          { "type": "uint256", "name": "max_eth_sold" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" },
          { "type": "address", "name": "token_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 55019
      },
      {
        "name": "tokenToExchangeSwapInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_tokens_bought" },
          { "type": "uint256", "name": "min_eth_bought" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "exchange_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 49342
      },
      {
        "name": "tokenToExchangeTransferInput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_sold" },
          { "type": "uint256", "name": "min_tokens_bought" },
          { "type": "uint256", "name": "min_eth_bought" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" },
          { "type": "address", "name": "exchange_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 49532
      },
      {
        "name": "tokenToExchangeSwapOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_bought" },
          { "type": "uint256", "name": "max_tokens_sold" },
          { "type": "uint256", "name": "max_eth_sold" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "exchange_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 53233
      },
      {
        "name": "tokenToExchangeTransferOutput",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [
          { "type": "uint256", "name": "tokens_bought" },
          { "type": "uint256", "name": "max_tokens_sold" },
          { "type": "uint256", "name": "max_eth_sold" },
          { "type": "uint256", "name": "deadline" },
          { "type": "address", "name": "recipient" },
          { "type": "address", "name": "exchange_addr" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 53423
      },
      {
        "name": "getEthToTokenInputPrice",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "eth_sold" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 5542
      },
      {
        "name": "getEthToTokenOutputPrice",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "tokens_bought" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 6872
      },
      {
        "name": "getTokenToEthInputPrice",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "tokens_sold" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 5637
      },
      {
        "name": "getTokenToEthOutputPrice",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "uint256", "name": "eth_bought" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 6897
      },
      {
        "name": "tokenAddress",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1413
      },
      {
        "name": "factoryAddress",
        "outputs": [{ "type": "address", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1443
      },
      {
        "name": "balanceOf",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "address", "name": "_owner" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1645
      },
      {
        "name": "transfer",
        "outputs": [{ "type": "bool", "name": "out" }],
        "inputs": [{ "type": "address", "name": "_to" }, { "type": "uint256", "name": "_value" }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 75034
      },
      {
        "name": "transferFrom",
        "outputs": [{ "type": "bool", "name": "out" }],
        "inputs": [
          { "type": "address", "name": "_from" },
          { "type": "address", "name": "_to" },
          { "type": "uint256", "name": "_value" }
        ],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 110907
      },
      {
        "name": "approve",
        "outputs": [{ "type": "bool", "name": "out" }],
        "inputs": [{ "type": "address", "name": "_spender" }, { "type": "uint256", "name": "_value" }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 38769
      },
      {
        "name": "allowance",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [{ "type": "address", "name": "_owner" }, { "type": "address", "name": "_spender" }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1925
      },
      {
        "name": "name",
        "outputs": [{ "type": "bytes32", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1623
      },
      {
        "name": "symbol",
        "outputs": [{ "type": "bytes32", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1653
      },
      {
        "name": "decimals",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1683
      },
      {
        "name": "totalSupply",
        "outputs": [{ "type": "uint256", "name": "out" }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1713
      }
    ]

  }


  render() {
    return (
      <div>
        Defi Connector
      </div>
    );
  }
}

export default App;
