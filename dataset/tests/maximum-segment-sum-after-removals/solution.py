class Solution:
    def maximumSegmentSum(self, nums: list[int], removeQueries: list[int]) -> list[int]:
        n = len(nums)
        parent = list(range(n))
        seg_sum = [0] * n
        active = [False] * n
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
        def union(i, j):
            ri, rj = find(i), find(j)
            if ri != rj:
                parent[ri] = rj
                seg_sum[rj] += seg_sum[ri]
        ans = [0] * n
        cur_max = 0
        for q_idx in range(n - 1, -1, -1):
            ans[q_idx] = cur_max
            i = removeQueries[q_idx]
            active[i] = True
            seg_sum[i] = nums[i]
            if i > 0 and active[i - 1]:
                union(i, i - 1)
            if i < n - 1 and active[i + 1]:
                union(i, i + 1)
            cur_max = max(cur_max, seg_sum[find(i)])
        return ans
