from typing import List

class Solution:
    def maxWeight(self, weights: List[int], capacity1: int, capacity2: int) -> int:
        reachable = {(0, 0)}
        for w in weights:
            nxt = set(reachable)
            for w1, w2 in reachable:
                if w1 + w <= capacity1:
                    nxt.add((w1 + w, w2))
                if w2 + w <= capacity2:
                    nxt.add((w1, w2 + w))
            reachable = nxt
        return max(w1 + w2 for w1, w2 in reachable)

def run_tests():
    sol = Solution()
    assert sol.maxWeight([3, 4, 5, 2], 5, 6) == 11
    assert sol.maxWeight([10, 20, 30], 5, 5) == 0
    assert sol.maxWeight([2, 2, 2], 3, 3) == 4
    print("All tests passed for 3647.")

if __name__ == "__main__":
    run_tests()
