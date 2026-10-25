class Solution:
    def maxFrequency(self, nums: list[int], k: int) -> int:
        nums.sort()
        left = 0
        total = 0
        ans = 1
        for right in range(len(nums)):
            total += nums[right]
            while nums[right] * (right - left + 1) - total > k:
                total -= nums[left]
                left += 1
            ans = max(ans, right - left + 1)
        return ans

def test():
    sol = Solution()
    assert sol.maxFrequency([1,2,4], 5) == 3
    assert sol.maxFrequency([1,4,8,13], 5) == 2
    assert sol.maxFrequency([3,9,6], 2) == 1

if __name__ == '__main__':
    test()
