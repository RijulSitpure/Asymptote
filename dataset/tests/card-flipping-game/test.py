from typing import List

class Solution:
    def flipgame(self, fronts: List[int], backs: List[int]) -> int:
        same = {f for f, b in zip(fronts, backs) if f == b}
        ans = float('inf')
        for x in fronts + backs:
            if x not in same and x < ans:
                ans = x
        return ans if ans != float('inf') else 0

def test():
    sol = Solution()
    f1 = [1, 2, 4, 4, 7]
    b1 = [1, 3, 4, 1, 3]
    assert sol.flipgame(f1, b1) == 2, "test 1 failed"
    assert sol.flipgame([1], [1]) == 0, "test 2 failed"
    print("✓ card-flipping-game passed")

if __name__ == "__main__":
    test()
