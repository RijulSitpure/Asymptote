class Solution:
    def minSubsequence(self, nums: list[int]) -> list[int]:
        nums.sort(reverse=True)
        total = sum(nums)
        sub_sum = 0
        res = []
        for x in nums:
            sub_sum += x
            res.append(x)
            if sub_sum > total - sub_sum:
                break
        return res

def test():
    sol = Solution()
    assert sol.minSubsequence([4,3,10,9,8]) == [10,9], "test 1 failed"
    assert sol.minSubsequence([4,4,7,6,7]) == [7,7,6], "test 2 failed"
    print("✓ minimum-subsequence-in-non-increasing-order passed")

if __name__ == "__main__":
    test()
