from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        nodes = []
        def dfs(node: Optional[TreeNode], r: int, c: int):
            if not node:
                return
            nodes.append((c, r, node.val))
            dfs(node.left, r + 1, c - 1)
            dfs(node.right, r + 1, c + 1)
        dfs(root, 0, 0)
        nodes.sort()
        res = []
        last_c = None
        for c, r, val in nodes:
            if c != last_c:
                res.append([])
                last_c = c
            res[-1].append(val)
        return res

def build_tree(lst):
    if not lst:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in lst]
    q = [nodes[0]]
    i = 1
    while q and i < len(nodes):
        curr = q.pop(0)
        if curr:
            if i < len(nodes):
                curr.left = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
            if i < len(nodes):
                curr.right = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
    return nodes[0]

def test():
    sol = Solution()
    r1 = build_tree([3,9,20,None,None,15,7])
    assert sol.verticalTraversal(r1) == [[9],[3,15],[20],[7]], "test 1 failed"
    r2 = build_tree([1,2,3,4,5,6,7])
    assert sol.verticalTraversal(r2) == [[4],[2],[1,5,6],[3],[7]], "test 2 failed"
    print("✓ vertical-order-traversal-of-a-binary-tree passed")

if __name__ == "__main__":
    test()
