class Solution:
    def maximumUniqueSubarray(self, nums: list[int]) -> int:
        seen = set()
        left = 0
        curr_sum = 0
        max_sum = 0
        for right in range(len(nums)):
            x = nums[right]
            while x in seen:
                seen.remove(nums[left])
                curr_sum -= nums[left]
                left += 1
            seen.add(x)
            curr_sum += x
            if curr_sum > max_sum:
                max_sum = curr_sum
        return max_sum

def test():
    sol = Solution()
    assert sol.maximumUniqueSubarray([4,2,4,5,6]) == 17
    assert sol.maximumUniqueSubarray([5,2,1,2,5,2,1,2,5]) == 8

    print("✓ maximum-erasure-value passed")

if __name__ == '__main__':
    test()
