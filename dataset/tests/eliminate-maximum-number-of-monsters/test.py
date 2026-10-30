import math

class Solution:
    def eliminateMaximum(self, dist: list[int], speed: list[int]) -> int:
        arrival = sorted(math.ceil(d / s) for d, s in zip(dist, speed))
        for i, t in enumerate(arrival):
            if t <= i:
                return i
        return len(dist)

def test_eliminate_monsters():
    sol = Solution()
    assert sol.eliminateMaximum([1, 3, 4], [1, 1, 1]) == 3
    assert sol.eliminateMaximum([1, 1, 2, 3], [1, 1, 1, 1]) == 1
    assert sol.eliminateMaximum([3, 2, 4], [5, 3, 2]) == 1

