from bisect import bisect_right

class Solution:
    def maximumWeight(self, intervals: list[list[int]]) -> list[int]:
        n = len(intervals)
        arr = [[intervals[i][0], intervals[i][1], intervals[i][2], i] for i in range(n)]
        arr.sort(key=lambda x: x[0])
        starts = [item[0] for item in arr]
        memo = {}

        def solve(i: int, k: int):
            if k == 0 or i == n:
                return 0, []
            state = (i, k)
            if state in memo:
                return memo[state]
                
            skip_w, skip_idx = solve(i + 1, k)
            next_idx = bisect_right(starts, arr[i][1])
            take_w, take_raw = solve(next_idx, k - 1)
            take_w += arr[i][2]
            take_idx = sorted([arr[i][3]] + take_raw)
            
            if take_w > skip_w:
                res = (take_w, take_idx)
            elif take_w < skip_w:
                res = (skip_w, skip_idx)
            else:
                res = (take_w, min(take_idx, skip_idx))
                
            memo[state] = res
            return res

        _, best_indices = solve(0, 4)
        return sorted(best_indices)
