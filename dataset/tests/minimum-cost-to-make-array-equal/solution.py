class Solution:
    def minCost(self, nums: list[int], cost: list[int]) -> int:
        pairs = sorted(zip(nums, cost))
        total_weight = sum(cost)
        half = (total_weight + 1) // 2
        
        acc = 0
        target = 0
        for x, w in pairs:
            acc += w
            if acc >= half:
                target = x
                break
        
        return sum(abs(x - target) * w for x, w in pairs)
