class Solution:
    def minSessions(self, tasks: list[int], sessionTime: int) -> int:
        n = len(tasks)
        dp = [(n + 1, 0)] * (1 << n)
        dp[0] = (1, 0)
        for mask in range(1 << n):
            sessions, cur_time = dp[mask]
            for i in range(n):
                if not (mask & (1 << i)):
                    nxt_mask = mask | (1 << i)
                    if cur_time + tasks[i] <= sessionTime:
                        nxt_val = (sessions, cur_time + tasks[i])
                    else:
                        nxt_val = (sessions + 1, tasks[i])
                    if nxt_val < dp[nxt_mask]:
                        dp[nxt_mask] = nxt_val
        return dp[(1 << n) - 1][0]
