from collections import deque

class Solution:
    def timeTaken(self, arrival: list[int], state: list[int]) -> list[int]:
        n = len(arrival)
        enter_q = deque()
        exit_q = deque()
        ans = [0] * n
        
        cur_time = 0
        last_state = -1
        idx = 0
        
        while idx < n or enter_q or exit_q:
            if not enter_q and not exit_q and cur_time < arrival[idx]:
                cur_time = arrival[idx]
                last_state = -1
                
            while idx < n and arrival[idx] <= cur_time:
                if state[idx] == 1:
                    exit_q.append(idx)
                else:
                    enter_q.append(idx)
                idx += 1
                
            if last_state == -1 or last_state == 1:
                if exit_q:
                    p = exit_q.popleft()
                    ans[p] = cur_time
                    last_state = 1
                elif enter_q:
                    p = enter_q.popleft()
                    ans[p] = cur_time
                    last_state = 0
                else:
                    last_state = -1
            else:
                if enter_q:
                    p = enter_q.popleft()
                    ans[p] = cur_time
                    last_state = 0
                elif exit_q:
                    p = exit_q.popleft()
                    ans[p] = cur_time
                    last_state = 1
                else:
                    last_state = -1
                    
            cur_time += 1
        return ans
