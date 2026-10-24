from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        smallest = "~"
        def dfs(node: Optional[TreeNode], path: list[str]):
            nonlocal smallest
            if not node:
                return
            path.append(chr(ord("a") + node.val))
            if not node.left and not node.right:
                leaf_str = "".join(reversed(path))
                if leaf_str < smallest:
                    smallest = leaf_str
            else:
                dfs(node.left, path)
                dfs(node.right, path)
            path.pop()
        dfs(root, [])
        return smallest

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
    r1 = build_tree([0,1,2,3,4,3,4])
    assert sol.smallestFromLeaf(r1) == "dba", "test 1 failed"
    r2 = build_tree([25,1,3,1,3,0,2])
    assert sol.smallestFromLeaf(r2) == "adz", "test 2 failed"
    print("✓ smallest-string-starting-from-leaf passed")

if __name__ == "__main__":
    test()
