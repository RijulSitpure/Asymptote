class Solution:
    def makeSubKSumEqual(self, arr: list[int], k: int) -> int:
        import math
        n = len(arr)
        g = math.gcd(n, k)
        ans = 0
        for i in range(g):
            group = [arr[j] for j in range(i, n, g)]
            group.sort()
            med = group[len(group) // 2]
            ans += sum(abs(x - med) for x in group)
        return ans
