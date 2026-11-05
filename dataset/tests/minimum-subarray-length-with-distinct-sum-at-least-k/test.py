from collections import defaultdict

class Solution:
    def minSubarrayLen(self, nums: list[int], k: int) -> int:
        counts = defaultdict(int)
        cur_sum = 0
        left = 0
        min_len = float('inf')
        
        for right, x in enumerate(nums):
            if counts[x] == 0:
                cur_sum += x
            counts[x] += 1
            
            while cur_sum >= k and left <= right:
                min_len = min(min_len, right - left + 1)
                out = nums[left]
                counts[out] -= 1
                if counts[out] == 0:
                    cur_sum -= out
                left += 1
        
        return min_len if min_len != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minSubarrayLen([2, 3, 1, 2, 4, 3], 7) == 2 # [4, 3] distinct sum = 7
    assert sol.minSubarrayLen([1, 4, 4], 4) == 1
    assert sol.minSubarrayLen([1, 1, 1], 5) == -1
    print("All tests passed for 3795.")

if __name__ == "__main__":
    run_tests()
