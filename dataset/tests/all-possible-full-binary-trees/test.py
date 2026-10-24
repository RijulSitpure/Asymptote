from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        memo = {}
        def solve(k):
            if k % 2 == 0:
                return []
            if k == 1:
                return [TreeNode(0)]
            if k in memo:
                return memo[k]
            res = []
            for left_cnt in range(1, k, 2):
                right_cnt = k - 1 - left_cnt
                for left_t in solve(left_cnt):
                    for right_t in solve(right_cnt):
                        root = TreeNode(0, left_t, right_t)
                        res.append(root)
            memo[k] = res
            return res
        return solve(n)

def count_nodes(root):
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

def test():
    sol = Solution()
    res1 = sol.allPossibleFBT(7)
    assert len(res1) == 5, f"test 1 failed: {len(res1)}"
    for t in res1:
        assert count_nodes(t) == 7

    res2 = sol.allPossibleFBT(3)
    assert len(res2) == 1, f"test 2 failed: {len(res2)}"

    res3 = sol.allPossibleFBT(2)
    assert len(res3) == 0, f"test 3 failed: {len(res3)}"
    print("✓ all-possible-full-binary-trees passed")

if __name__ == "__main__":
    test()
