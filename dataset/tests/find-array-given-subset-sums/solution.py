from collections import Counter

class Solution:
    def recoverArray(self, n: int, sums: list[int]) -> list[int]:
        sums.sort()
        ans = []
        for _ in range(n):
            d = sums[1] - sums[0]
            count = Counter(sums)
            s0, s1 = [], []
            for x in sums:
                if count[x] > 0:
                    s0.append(x)
                    s1.append(x + d)
                    count[x] -= 1
                    count[x + d] -= 1
            if 0 in s0:
                ans.append(d)
                sums = s0
            else:
                ans.append(-d)
                sums = s1
        return ans
