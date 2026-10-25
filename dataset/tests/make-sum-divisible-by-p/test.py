class Solution:
    def minSubarray(self, nums: list[int], p: int) -> int:
        total_rem = sum(nums) % p
        if total_rem == 0:
            return 0
        pos = {0: -1}
        cur = 0
        ans = len(nums)
        for i, x in enumerate(nums):
            cur = (cur + x) % p
            needed = (cur - total_rem + p) % p
            if needed in pos:
                ans = min(ans, i - pos[needed])
            pos[cur] = i
        return ans if ans < len(nums) else -1

def test():
    sol = Solution()
    assert sol.minSubarray([3,1,4,2], 6) == 1, "test 1 failed"
    assert sol.minSubarray([6,3,5,2], 9) == 2, "test 2 failed"
    assert sol.minSubarray([1,2,3], 3) == 0, "test 3 failed"
    print("✓ make-sum-divisible-by-p passed")

if __name__ == "__main__":
    test()
