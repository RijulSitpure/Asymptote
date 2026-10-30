from collections import deque

class Solution:
    def maximumRobots(self, chargeTimes: list[int], runningCosts: list[int], budget: int) -> int:
        q = deque()
        left = 0
        cur_sum = 0
        max_len = 0
        
        for right in range(len(chargeTimes)):
            cur_sum += runningCosts[right]
            while q and chargeTimes[q[-1]] <= chargeTimes[right]:
                q.pop()
            q.append(right)
            
            while left <= right and chargeTimes[q[0]] + (right - left + 1) * cur_sum > budget:
                if q[0] == left:
                    q.popleft()
                cur_sum -= runningCosts[left]
                left += 1
            
            max_len = max(max_len, right - left + 1)
        return max_len
