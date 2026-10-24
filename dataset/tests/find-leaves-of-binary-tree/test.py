from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []

        def dfs(node):
            if not node:
                return -1
            left_h = dfs(node.left)
            right_h = dfs(node.right)
            h = 1 + max(left_h, right_h)
            if h == len(res):
                res.append([])
            res[h].append(node.val)
            return h

        dfs(root)
        return res

def build_tree(lst):
    if not lst:
        return None
    root = TreeNode(lst[0])
    q = [root]
    i = 1
    while q and i < len(lst):
        node = q.pop(0)
        if i < len(lst) and lst[i] is not None:
            node.left = TreeNode(lst[i])
            q.append(node.left)
        i += 1
        if i < len(lst) and lst[i] is not None:
            node.right = TreeNode(lst[i])
            q.append(node.right)
        i += 1
    return root

def test():
    sol = Solution()
    t1 = build_tree([1,2,3,4,5])
    assert sol.findLeaves(t1) == [[4,5,3],[2],[1]], "test 1 failed"
    t2 = build_tree([1])
    assert sol.findLeaves(t2) == [[1]], "test 2 failed"
    print("✓ find-leaves-of-binary-tree passed")

if __name__ == "__main__":
    test()
