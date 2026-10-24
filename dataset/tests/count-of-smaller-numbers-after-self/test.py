import sys
from typing import List

class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        ranks = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}
        tree = [0] * (len(ranks) + 1)

        def update(i: int, delta: int):
            while i < len(tree):
                tree[i] += delta
                i += i & (-i)

        def query(i: int) -> int:
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s

        res = []
        for x in reversed(nums):
            r = ranks[x]
            res.append(query(r - 1))
            update(r, 1)

        return res[::-1]

def test():
    sol = Solution()
    assert sol.countSmaller([5, 2, 6, 1]) == [2, 1, 1, 0], "test 1 failed"
    assert sol.countSmaller([-1]) == [0], "test 2 failed"
    assert sol.countSmaller([-1, -1]) == [0, 0], "test 3 failed"
    print("✓ count-of-smaller-numbers-after-self passed")

if __name__ == "__main__":
    test()
