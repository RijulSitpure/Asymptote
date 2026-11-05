class Solution:
    def smallestDivisor(self, nums: list[int], limit: int) -> int:
        low, high = 1, max(nums)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            total = sum((x + mid - 1) // mid for x in nums)
            if total <= limit:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def run_tests():
    sol = Solution()
    assert sol.smallestDivisor([1, 2, 5, 9], 6) == 5 # 1/5=1, 2/5=1, 5/5=1, 9/5=2 -> 5 <= 6
    assert sol.smallestDivisor([44, 22, 33, 11, 1], 5) == 44
    print("All tests passed for 3824.")

if __name__ == "__main__":
    run_tests()
