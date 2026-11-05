from collections import defaultdict

class Solution:
    def countCoveredBuildings(self, n: int, buildings: list[list[int]]) -> int:
        min_y = defaultdict(lambda: float('inf'))
        max_y = defaultdict(lambda: float('-inf'))
        min_x = defaultdict(lambda: float('inf'))
        max_x = defaultdict(lambda: float('-inf'))
        for x, y in buildings:
            if y < min_y[x]: min_y[x] = y
            if y > max_y[x]: max_y[x] = y
            if x < min_x[y]: min_x[y] = x
            if x > max_x[y]: max_x[y] = x

        ans = 0
        for x, y in buildings:
            if min_y[x] < y < max_y[x] and min_x[y] < x < max_x[y]:
                ans += 1
        return ans

def run_tests():
    s = Solution()
    buildings = [[2, 2], [2, 1], [2, 3], [1, 2], [3, 2]]
    assert s.countCoveredBuildings(5, buildings) == 1
    print("All tests passed for count-covered-buildings")

if __name__ == '__main__':
    run_tests()
