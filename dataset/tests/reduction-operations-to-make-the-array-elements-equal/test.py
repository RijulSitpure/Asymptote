class Solution:
    def reductionOperations(self, nums: list[int]) -> int:
        nums.sort()
        ans = 0
        rank = 0
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                rank += 1
            ans += rank
        return ans

def test():
    sol = Solution()
    assert sol.reductionOperations([5,1,3]) == 3
    assert sol.reductionOperations([1,1,1]) == 0
    assert sol.reductionOperations([1,1,2,2,3]) == 4

if __name__ == '__main__':
    test()
