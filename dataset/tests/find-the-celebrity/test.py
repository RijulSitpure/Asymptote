import sys

_graph = {}

def knows(a: int, b: int) -> bool:
    return b in _graph.get(a, set())

class Solution:
    def findCelebrity(self, n: int) -> int:
        cand = 0
        for i in range(1, n):
            if knows(cand, i):
                cand = i
        for i in range(n):
            if i == cand:
                continue
            if knows(cand, i) or not knows(i, cand):
                return -1
        return cand

def test():
    global _graph
    sol = Solution()
    _graph = {0: {1}, 1: set(), 2: {1}}
    assert sol.findCelebrity(3) == 1, "test 1 failed"
    _graph = {0: {1}, 1: {2}, 2: {0}}
    assert sol.findCelebrity(3) == -1, "test 2 failed"
    print("✓ find-the-celebrity passed")

if __name__ == "__main__":
    test()
