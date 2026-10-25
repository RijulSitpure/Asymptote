class Solution:
    def minOperations(self, nums: list[int], x: int) -> int:
        target = sum(nums) - x
        if target < 0:
            return -1
        if target == 0:
            return len(nums)
        max_len = -1
        curr = 0
        left = 0
        for right in range(len(nums)):
            curr += nums[right]
            while curr > target and left <= right:
                curr -= nums[left]
                left += 1
            if curr == target:
                max_len = max(max_len, right - left + 1)
        return len(nums) - max_len if max_len != -1 else -1

def test():
    sol = Solution()
    assert sol.minOperations([1,1,4,2,3], 5) == 2
    assert sol.minOperations([5,6,7,8,9], 4) == -1
    assert sol.minOperations([3,2,20,1,1,3], 10) == 5

    print("✓ minimum-operations-to-reduce-x-to-zero passed")

if __name__ == '__main__':
    test()
