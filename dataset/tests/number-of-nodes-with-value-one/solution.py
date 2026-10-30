class Solution:
    def numberOfNodes(self, n: int, queries: list[int]) -> int:
        flips = [0] * (n + 1)
        for q in queries:
            flips[q] ^= 1
        
        ans = 0
        for i in range(1, n + 1):
            p = i // 2
            if p > 0:
                flips[i] ^= flips[p]
            if flips[i] == 1:
                ans += 1
        return ans
