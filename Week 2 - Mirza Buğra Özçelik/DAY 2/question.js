/**
 * @param {number} n
 * @param {Object} memo
 * @returns {number}
 */
function collatzChainLength(n, memo = {}) {
  if (n === 1) return 1;

  if (memo[n]) return memo[n];

  if (n % 2 === 0) {
    memo[n] = 1 + collatzChainLength(n / 2, memo);
  } else {
    memo[n] = 1 + collatzChainLength(3 * n + 1, memo);
  }

  return memo[n];
}

/**
  @param {number} limit
  @returns {number} 
 */
function findLongestCollatz(limit) {
  let maxChainLength = 0;
  let startingNumberWithMaxChain = 0;
  let memo = {};

  for (let i = 2; i < limit; i++) {
    const currentChainLength = collatzChainLength(i, memo);
    if (currentChainLength > maxChainLength) {
      maxChainLength = currentChainLength;
      startingNumberWithMaxChain = i;
    }
  }

  return startingNumberWithMaxChain;
}

const result = findLongestCollatz(1000000);
console.log(
  `Longest chain produced by the starting number under one million: ${result}`
);
