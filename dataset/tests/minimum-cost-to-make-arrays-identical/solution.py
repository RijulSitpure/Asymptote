class Solution:
    def minCost(self, arr: list[int], brr: list[int], k: int) -> int:
        cost_no_reorder = sum(abs(a - b) for a, b in zip(arr, brr))
        s_arr = sorted(arr)
        s_brr = sorted(brr)
        cost_reorder = k + sum(abs(a - b) for a, b in zip(s_arr, s_brr))
        return min(cost_no_reorder, cost_reorder)
