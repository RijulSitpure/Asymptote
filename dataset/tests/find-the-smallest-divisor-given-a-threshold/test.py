class Solution:
    def smallestDivisor(self, nums: list[int], threshold: int) -> int:
        def compute_sum(d: int) -> int:
            return sum((x + d - 1) // d for x in nums)
            
        low, high = 1, max(nums)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if compute_sum(mid) <= threshold:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    assert sol.smallestDivisor([1,2,5,9], 6) == 5, "test 1 failed"
    assert sol.smallestDivisor([44,22,33,11,1], 5) == 44, "test 2 failed"
    print("✓ find-the-smallest-divisor-given-a-threshold passed")

if __name__ == "__main__":
    test()
