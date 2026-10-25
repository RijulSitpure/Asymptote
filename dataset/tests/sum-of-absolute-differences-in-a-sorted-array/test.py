class Solution:
    def getSumAbsoluteDifferences(self, nums: list[int]) -> list[int]:
        n = len(nums)
        total = sum(nums)
        pref = 0
        res = [0] * n
        for i, x in enumerate(nums):
            left_sum = i * x - pref
            right_sum = (total - pref - x) - (n - 1 - i) * x
            res[i] = left_sum + right_sum
            pref += x
        return res

def test():
    sol = Solution()
    assert sol.getSumAbsoluteDifferences([2,3,5]) == [4,3,5]
    assert sol.getSumAbsoluteDifferences([1,4,6,8,10]) == [24,15,13,15,21]

    print("✓ sum-of-absolute-differences-in-a-sorted-array passed")

if __name__ == '__main__':
    test()
