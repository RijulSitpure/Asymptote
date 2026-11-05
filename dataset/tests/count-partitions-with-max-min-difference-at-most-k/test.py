from typing import List
from collections import deque

class Solution:
    def countPartitions(self, nums: List[int], k: int) -> int:
        n = len(nums)
        MOD = 1_000_000_007
        
        dp = [0] * (n + 1)
        dp[0] = 1
        pref = [0] * (n + 2)
        pref[1] = 1
        
        max_dq = deque()
        min_dq = deque()
        left = 0
        
        for right in range(n):
            while max_dq and nums[max_dq[-1]] <= nums[right]:
                max_dq.pop()
            max_dq.append(right)
            
            while min_dq and nums[min_dq[-1]] >= nums[right]:
                min_dq.pop()
            min_dq.append(right)
            
            while max_dq and min_dq and (nums[max_dq[0]] - nums[min_dq[0]]) > k:
                if max_dq[0] == left:
                    max_dq.popleft()
                if min_dq[0] == left:
                    min_dq.popleft()
                left += 1
                
            # valid partition starts from left to right
            # sum dp[left ... right] = pref[right + 1] - pref[left]
            ways = (pref[right + 1] - pref[left]) % MOD
            dp[right + 1] = ways
            pref[right + 2] = (pref[right + 1] + ways) % MOD
            
        return dp[n]

def run_tests():
    s = Solution()
    res1 = s.countPartitions([1, 2, 3], 1)
    assert res1 == 3, f"Expected 3, got {res1}" # [1,2],[3] or [1],[2,3] or [1],[2],[3]
    res2 = s.countPartitions([1, 10, 20], 5)
    assert res2 == 1, f"Expected 1, got {res2}" # only [1],[10],[20]
    print("3578 count-partitions-with-max-min-difference-at-most-k PASSED")

if __name__ == "__main__":
    run_tests()
