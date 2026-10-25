class Solution:
    def maxAscendingSum(self, nums: list[int]) -> int:
        curr = nums[0]
        mx = curr
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                curr += nums[i]
            else:
                curr = nums[i]
            mx = max(mx, curr)
        return mx

def test():
    sol = Solution()
    assert sol.maxAscendingSum([10,20,30,5,10,50]) == 65
    assert sol.maxAscendingSum([10,20,30,40,50]) == 150
    assert sol.maxAscendingSum([12,17,15,13,10,11,12]) == 33

    print("✓ maximum-ascending-subarray-sum passed")

if __name__ == '__main__':
    test()
