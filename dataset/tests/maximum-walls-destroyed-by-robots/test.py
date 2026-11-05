from typing import List

class Solution:
    def maxWallsDestroyed(self, robots: List[int], walls: List[int], bulletRange: int) -> int:
        walls.sort()
        destroyed = set()
        for r in sorted(robots):
            left_w = [w for w in walls if r - bulletRange <= w <= r]
            right_w = [w for w in walls if r <= w <= r + bulletRange]
            new_left = sum(1 for w in left_w if w not in destroyed)
            new_right = sum(1 for w in right_w if w not in destroyed)
            if new_left >= new_right:
                for w in left_w:
                    destroyed.add(w)
            else:
                for w in right_w:
                    destroyed.add(w)
        return len(destroyed)

def run_tests():
    sol = Solution()
    assert sol.maxWallsDestroyed([2], [1, 2, 3], 1) == 2
    assert sol.maxWallsDestroyed([1, 5], [1, 2, 5, 6], 1) == 4
    print("All tests passed for 3661.")

if __name__ == "__main__":
    run_tests()
