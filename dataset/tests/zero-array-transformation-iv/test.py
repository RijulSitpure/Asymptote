class Solution:
    def minZeroArray(self, nums: list[int], queries: list[list[int]]) -> int:
        if all(x == 0 for x in nums):
            return 0

        n = len(nums)
        masks = [1] * n

        for k, (l, r, val) in enumerate(queries):
            for i in range(l, r + 1):
                masks[i] |= (masks[i] << val)

            if all((masks[i] >> nums[i]) & 1 for i in range(n)):
                return k + 1

        return -1

def run_tests():
    s = Solution()
    assert s.minZeroArray([2, 0, 2], [[0, 2, 1], [0, 2, 1], [1, 1, 3]]) == 2
    assert s.minZeroArray([4, 3, 2, 1], [[1, 3, 2], [0, 2, 1]]) == -1
    print("All tests passed for zero-array-transformation-iv")

if __name__ == '__main__':
    run_tests()
