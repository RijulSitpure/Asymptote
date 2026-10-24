from collections import defaultdict
from typing import List

class Solution:
    def wordSquares(self, words: List[str]) -> List[List[str]]:
        n = len(words[0])
        prefix_map = defaultdict(list)
        for w in words:
            for i in range(n + 1):
                prefix_map[w[:i]].append(w)

        res = []
        curr = []

        def backtrack(step: int):
            if step == n:
                res.append(list(curr))
                return
            prefix = "".join(curr[i][step] for i in range(step))
            for candidate in prefix_map.get(prefix, []):
                curr.append(candidate)
                backtrack(step + 1)
                curr.pop()

        for w in words:
            curr.append(w)
            backtrack(1)
            curr.pop()

        return res

def test():
    sol = Solution()
    def norm(lst):
        return sorted([tuple(x) for x in lst])
    t1 = ["area","lead","wall","lady","ball"]
    out1 = sol.wordSquares(t1)
    assert len(out1) == 2, "test 1 count failed"
    t2 = ["abat","baba","atan","atal"]
    out2 = sol.wordSquares(t2)
    assert len(out2) == 2, "test 2 count failed"
    print("✓ word-squares passed")

if __name__ == "__main__":
    test()
