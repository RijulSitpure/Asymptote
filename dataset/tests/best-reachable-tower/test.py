import math

class Solution:
    def bestReachableTower(self, towers: list[list[int]], center: list[int], radius: int) -> list[int]:
        cx, cy = center
        r2 = radius * radius
        best_score = -1
        best_tower = []
        
        for x, y, q in towers:
            d2 = (x - cx) ** 2 + (y - cy) ** 2
            if d2 <= r2:
                d = math.sqrt(d2)
                score = math.floor(q / (1 + d))
                if score > best_score:
                    best_score = score
                    best_tower = [x, y]
                elif score == best_score and best_tower:
                    if [x, y] < best_tower:
                        best_tower = [x, y]
        return best_tower

def run_tests():
    sol = Solution()
    towers = [[1, 2, 5], [2, 1, 7], [3, 1, 9]]
    assert sol.bestReachableTower(towers, [2, 1], 2) == [2, 1]
    assert sol.bestReachableTower([[10, 10, 5]], [0, 0], 2) == []
    print("All tests passed for 3809.")

if __name__ == "__main__":
    run_tests()
