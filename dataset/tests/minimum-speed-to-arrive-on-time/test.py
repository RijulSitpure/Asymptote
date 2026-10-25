import math

class Solution:
    def minSpeedOnTime(self, dist: list[int], hour: float) -> int:
        if len(dist) - 1 >= hour:
            return -1

        def check(speed: int) -> bool:
            time = sum(math.ceil(d / speed) for d in dist[:-1]) + dist[-1] / speed
            return time <= hour

        low, high = 1, 10**7
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    assert sol.minSpeedOnTime([1,3,2], 6) == 1
    assert sol.minSpeedOnTime([1,3,2], 2.7) == 3
    assert sol.minSpeedOnTime([1,3,2], 1.9) == -1

if __name__ == '__main__':
    test()
