class Solution:
    def taskSchedulerII(self, tasks: list[int], space: int) -> int:
        cur_day = 0
        last_done = {}
        for t in tasks:
            cur_day = max(cur_day + 1, last_done.get(t, -space) + space + 1)
            last_done[t] = cur_day
        return cur_day
