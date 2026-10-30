from typing import List

class Solution:
    def maximumGood(self, statements: List[List[int]]) -> int:
        n = len(statements)
        ans = 0
        for mask in range(1 << n):
            valid = True
            for i in range(n):
                if (mask >> i) & 1:
                    for j in range(n):
                        if statements[i][j] != 2:
                            expected = (mask >> j) & 1
                            if statements[i][j] != expected:
                                valid = False
                                break
                    if not valid:
                        break
            if valid:
                ans = max(ans, bin(mask).count('1'))
        return ans
