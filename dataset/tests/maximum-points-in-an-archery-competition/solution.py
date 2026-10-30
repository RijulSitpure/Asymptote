from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumBobPoints(self, numArrows: int, aliceArrows: list[int]) -> list[int]:
        best_score = -1
        best_bob = [0] * 12
        for mask in range(1 << 12):
            needed = 0
            score = 0
            for i in range(12):
                if (mask >> i) & 1:
                    needed += aliceArrows[i] + 1
                    score += i
            if needed <= numArrows and score > best_score:
                best_score = score
                bob = [0] * 12
                for i in range(12):
                    if (mask >> i) & 1:
                        bob[i] = aliceArrows[i] + 1
                bob[0] += numArrows - needed
                best_bob = bob
        return best_bob
