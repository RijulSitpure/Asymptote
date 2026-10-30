class Solution:
    def repairCars(self, ranks: list[int], cars: int) -> int:
        import math
        low = 1
        high = min(ranks) * cars * cars
        while low < high:
            mid = (low + high) // 2
            total = sum(math.isqrt(mid // r) for r in ranks)
            if total >= cars:
                high = mid
            else:
                low = mid + 1
        return low
