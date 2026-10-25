class Solution:
    def getMaximumGenerated(self, n: int) -> int:
        if n == 0:
            return 0
        nums = [0] * (n + 1)
        nums[1] = 1
        for i in range(1, (n // 2) + 1):
            if 2 * i <= n:
                nums[2 * i] = nums[i]
            if 2 * i + 1 <= n:
                nums[2 * i + 1] = nums[i] + nums[i + 1]
        return max(nums)

def test():
    sol = Solution()
    assert sol.getMaximumGenerated(7) == 3
    assert sol.getMaximumGenerated(2) == 1
    assert sol.getMaximumGenerated(3) == 2
    assert sol.getMaximumGenerated(0) == 0

    print("✓ get-maximum-in-generated-array passed")

if __name__ == '__main__':
    test()
