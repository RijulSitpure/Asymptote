from collections import defaultdict

class Solution:
    def countServers(self, n: int, logs: list[list[int]], x: int, queries: list[int]) -> list[int]:
        logs.sort(key=lambda item: item[1])
        q_sorted = sorted([(q, i) for i, q in enumerate(queries)])
        ans = [0] * len(queries)
        active_counts = defaultdict(int)
        left = 0
        right = 0
        num_logs = len(logs)
        for q_time, q_idx in q_sorted:
            # Expand right boundary: include logs with time <= q_time
            while right < num_logs and logs[right][1] <= q_time:
                active_counts[logs[right][0]] += 1
                right += 1
            # Shrink left boundary: exclude logs with time < q_time - x
            while left < num_logs and logs[left][1] < q_time - x:
                srv = logs[left][0]
                active_counts[srv] -= 1
                if active_counts[srv] == 0:
                    del active_counts[srv]
                left += 1
            ans[q_idx] = n - len(active_counts)
        return ans
