class Solution:
    def minimumCost(self, nums: list[int]) -> int:
        nums.sort()
        n = len(nums)
        med = nums[n // 2]
        
        def is_pal(x: int) -> bool:
            s = str(x)
            return s == s[::-1]
            
        def cost(y: int) -> int:
            return sum(abs(x - y) for x in nums)
            
        p1 = med
        while not is_pal(p1):
            p1 -= 1
        p2 = med
        while not is_pal(p2):
            p2 += 1
            
        return min(cost(p1), cost(p2))
