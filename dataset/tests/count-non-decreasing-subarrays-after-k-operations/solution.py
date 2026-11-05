from collections import deque

class Solution:
    def countNonDecreasingSubarrays(self, nums: list[int], k: int) -> int:
        ans = 0
        cost = 0
        dq = deque()
        j = len(nums) - 1
        
        for i in range(len(nums) - 1, -1, -1):
            num = nums[i]
            count = 1
            while dq and dq[-1][0] < num:
                nxt_num, nxt_count = dq.pop()
                count += nxt_count
                cost += (num - nxt_num) * nxt_count
            dq.append((num, count))
            
            while cost > k:
                rm_num, rm_count = dq.popleft()
                cost -= (rm_num - nums[j])
                j -= 1
                if rm_count > 1:
                    dq.appendleft((rm_num, rm_count - 1))
                    
            ans += j - i + 1
            
        return ans
