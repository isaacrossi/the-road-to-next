// big.js configuration file
import Big from "big.js";

// decimal precision of 2 (forces calculations to round to whole cents)
Big.DP = 2;

// Uses Round Half-Even (Banker's Rounding) as the default rounding mode.
// When a value is exactly halfway (ends in 5), it rounds to the nearest EVEN digit:
//   - 0.165 -> 0.16 (6 is even)
//   - 0.175 -> 0.18 (8 is even)
// This distributes rounding up/down equally to prevent cumulative financial bias.
Big.RM = Big.roundHalfEven;

export const MyBig = Big;
