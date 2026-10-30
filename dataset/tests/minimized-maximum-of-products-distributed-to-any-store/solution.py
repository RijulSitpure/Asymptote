class Solution:
    def minimizedMaximum(self, n: int, quantities: list[int]) -> int:
        def can_distribute(x: int) -> bool:
            return sum((q + x - 1) // x for q in quantities) <= n

        low = 1
        high = max(quantities)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if can_distribute(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
