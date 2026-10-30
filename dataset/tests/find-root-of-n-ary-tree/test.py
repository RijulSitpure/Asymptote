class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def findRoot(self, tree: list[Node]) -> Node:
        net = 0
        for node in tree:
            net += node.val
            for child in node.children:
                net -= child.val
        for node in tree:
            if node.val == net: return node
        return None

sol = Solution()
n1 = Node(1)
n2 = Node(2)
n3 = Node(3)
n4 = Node(4)
n1.children = [n2, n3, n4]
assert sol.findRoot([n2, n4, n1, n3]) == n1
print("All tests passed successfully.")
