from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def digArtifacts(self, n: int, artifacts: list[list[int]], dig: list[list[int]]) -> int:
        dug = {(r, c) for r, c in dig}
        ans = 0
        for r1, c1, r2, c2 in artifacts:
            if all((r, c) in dug for r in range(r1, r2 + 1) for c in range(c1, c2 + 1)):
                ans += 1
        return ans
