from typing import List

class Solution:
    def outerTrees(self, trees: List[List[int]]) -> List[List[int]]:
        trees.sort()

        def cross(o, a, b):
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

        lower = []
        for p in trees:
            while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0:
                lower.pop()
            lower.append(p)

        upper = []
        for p in reversed(trees):
            while len(upper) >= 2 and cross(upper[-2], upper[-1], p) < 0:
                upper.pop()
            upper.append(p)

        return list({tuple(p): p for p in (lower + upper)}.values())

def test():
    sol = Solution()
    def norm(lst):
        return sorted([tuple(x) for x in lst])
    t1 = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
    out1 = sol.outerTrees(t1)
    assert norm(out1) == norm([[1,1],[2,0],[4,2],[3,3],[2,4]]), "test 1 failed"
    t2 = [[1,2],[2,2],[4,2]]
    out2 = sol.outerTrees(t2)
    assert norm(out2) == norm([[1,2],[2,2],[4,2]]), "test 2 failed"
    print("✓ erect-the-fence passed")

if __name__ == "__main__":
    test()
