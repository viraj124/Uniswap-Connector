pragma solidity ^0.5.7;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see {ERC20Detailed}.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface UniswapFactory {
     // Create Exchange
    function createExchange(address token) external returns (address exchange);
    // Get Exchange and Token Info
    function getExchange(address token) external view returns (address exchange);
}


interface UniswapPool {
    // Address of ERC20 token sold on this exchange
    function tokenAddress() external view returns (address token);
    // Address of Uniswap Factory
    function factoryAddress() external view returns (address factory);
    // Provide Liquidity
    function addLiquidity(uint256 minLiquidity, uint256 maxTokens, uint256 deadline) external payable returns (uint256);
    
    function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256  tokens_bought);
    
    function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256  eth_bought);
  
    function tokenToTokenSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr) external returns (uint256  tokens_bought);


    // Remove Liquidity
    function removeLiquidity(
        uint256 amount,
        uint256 minEth,
        uint256 minTokens,
        uint256 deadline
        ) external returns (uint256, uint256);

    // ERC20 comaptibility for liquidity tokens
    function totalSupply() external view returns (uint);
}

contract Connector {
    
    function createExchange(address token) public returns (address exchange) {
        UniswapFactory(0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30).createExchange(token);
    }
    
    function addLiquidity(uint256 minLiquidity, uint256 maxTokens, uint256 deadline) external payable returns (uint256) {
       uint256 uniswap = UniswapPool(0x8Bcd6f821012989b8d32EF002667a6524296A279).addLiquidity.value(msg.value)(minLiquidity, maxTokens, deadline);
        return uniswap;
    }
    
    function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256  tokens_bought) {
        uint256 tokens = UniswapPool(0x8Bcd6f821012989b8d32EF002667a6524296A279).ethToTokenSwapInput.value(msg.value)(min_tokens, deadline);
        return tokens;
    }
    
    function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256  eth_bought) {
        uint256 tokens = UniswapPool(0x8Bcd6f821012989b8d32EF002667a6524296A279).tokenToEthSwapInput(tokens_sold, min_eth, deadline);
        return tokens;
    }
    
        function tokenToTokenSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr) external returns (uint256  tokens_bought) {
        uint256 tokens = UniswapPool(0x8Bcd6f821012989b8d32EF002667a6524296A279).tokenToTokenSwapInput(tokens_sold, min_tokens_bought, min_eth_bought, deadline, token_addr);
        return tokens;
        }


    
    function approve(address spender, uint256 amount) external returns (bool) {
        bool approved = IERC20(0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6).approve(spender, amount);
        return approved;
    }
    
        function transfer(address recipient, uint256 amount) external returns (bool) {
            bool transfered = IERC20(0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6).transfer(recipient, amount);
            return transfered;
        }
        
            function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
            bool transfered = IERC20(0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6).transferFrom(sender, recipient, amount);
            return transfered;
            }
}
