class Solution:
    def minCost(self, basket1: list[int], basket2: list[int]) -> int:
        from collections import Counter
        cnt1 = Counter(basket1)
        cnt2 = Counter(basket2)
        total = cnt1 + cnt2
        for fruit, count in total.items():
            if count % 2 != 0:
                return -1
        excess = []
        for fruit, count in total.items():
            diff = cnt1[fruit] - count // 2
            if diff > 0:
                excess.extend([fruit] * diff)
            elif diff < 0:
                excess.extend([fruit] * (-diff))
        excess.sort()
        min_fruit = min(total.keys())
        ans = 0
        m = len(excess) // 2
        for i in range(m):
            ans += min(excess[i], 2 * min_fruit)
        return ans
