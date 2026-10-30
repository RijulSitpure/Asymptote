from collections import defaultdict

class Solution:
    def fixedRatio(self, s: str, num1: int, num2: int) -> int:
        counts = defaultdict(int)
        counts[0] = 1
        cur = 0
        ans = 0
        for c in s:
            if c == '0':
                cur += num2
            else:
                cur -= num1
            ans += counts[cur]
            counts[cur] += 1
        return ans
