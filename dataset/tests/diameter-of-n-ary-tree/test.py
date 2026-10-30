class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def diameter(self, root: Node) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node: return 0
            max1, max2 = 0, 0
            for child in node.children:
                h = dfs(child)
                if h > max1: max1, max2 = h, max1
                elif h > max2: max2 = h
            ans = max(ans, max1 + max2)
            return max1 + 1
        dfs(root)
        return ans

sol = Solution()
r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
assert sol.diameter(r1) == 3
print("All tests passed successfully.")
