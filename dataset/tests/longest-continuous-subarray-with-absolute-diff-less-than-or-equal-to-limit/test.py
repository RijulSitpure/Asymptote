from collections import deque

class Solution:
    def longestSubarray(self, nums: list[int], limit: int) -> int:
        max_q = deque()
        min_q = deque()
        left = 0
        max_len = 0
        for right, x in enumerate(nums):
            while max_q and nums[max_q[-1]] <= x:
                max_q.pop()
            max_q.append(right)
            while min_q and nums[min_q[-1]] >= x:
                min_q.pop()
            min_q.append(right)
            while nums[max_q[0]] - nums[min_q[0]] > limit:
                left += 1
                if max_q[0] < left:
                    max_q.popleft()
                if min_q[0] < left:
                    min_q.popleft()
            max_len = max(max_len, right - left + 1)
        return max_len

def test():
    sol = Solution()
    assert sol.longestSubarray([8,2,4,7], 4) == 2, "test 1 failed"
    assert sol.longestSubarray([10,1,2,4,7,2], 5) == 4, "test 2 failed"
    assert sol.longestSubarray([4,2,2,2,4,4,2,2], 0) == 3, "test 3 failed"
    print("✓ longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit passed")

if __name__ == "__main__":
    test()
