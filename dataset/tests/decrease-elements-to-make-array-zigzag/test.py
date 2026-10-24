class Solution:
    def movesToMakeZigzag(self, nums: list[int]) -> int:
        n = len(nums)
        res = [0, 0]
        for i in range(n):
            left = nums[i - 1] if i > 0 else float('inf')
            right = nums[i + 1] if i < n - 1 else float('inf')
            target = min(left, right) - 1
            if nums[i] > target:
                res[i % 2] += nums[i] - target
        return min(res)

def test():
    sol = Solution()
    assert sol.movesToMakeZigzag([1, 2, 3]) == 2, "test 1 failed"
    assert sol.movesToMakeZigzag([9, 6, 1, 6, 2]) == 4, "test 2 failed"
    print("✓ decrease-elements-to-make-array-zigzag passed")

if __name__ == "__main__":
    test()
