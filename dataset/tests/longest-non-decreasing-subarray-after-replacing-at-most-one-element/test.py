class Solution:
    def maxNonDecreasingLength(self, nums: list[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n
        # left[i]: length of non-decreasing subarray ending at i
        left = [1] * n
        for i in range(1, n):
            if nums[i] >= nums[i - 1]:
                left[i] = left[i - 1] + 1
                
        # right[i]: length of non-decreasing subarray starting at i
        right = [1] * n
        for i in range(n - 2, -1, -1):
            if nums[i] <= nums[i + 1]:
                right[i] = right[i + 1] + 1
                
        ans = max(left)
        # Try replacing nums[i]
        for i in range(n):
            # If replacing at index 0 or n - 1
            if i == 0:
                ans = max(ans, 1 + (right[1] if n > 1 else 0))
            elif i == n - 1:
                ans = max(ans, left[n - 2] + 1)
            else:
                # Replace nums[i] with any value in [nums[i-1], nums[i+1]]
                if nums[i - 1] <= nums[i + 1]:
                    ans = max(ans, left[i - 1] + 1 + right[i + 1])
                else:
                    ans = max(ans, left[i - 1] + 1, 1 + right[i + 1])
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxNonDecreasingLength([1, 5, 2, 4]) == 4
    assert sol.maxNonDecreasingLength([1, 2, 10, 3, 4]) == 5
    assert sol.maxNonDecreasingLength([5, 4, 3, 2, 1]) == 2
    print("All tests passed for 3738.")

if __name__ == "__main__":
    run_tests()