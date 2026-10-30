class Node:
    def __init__(self, val=' ', left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import Counter

class Solution:
    def checkEquivalence(self, root1: Node, root2: Node) -> bool:
        def count_leaves(node, counter):
            if not node: return
            if node.val != '+': counter[node.val] += 1
            count_leaves(node.left, counter)
            count_leaves(node.right, counter)
        c1, c2 = Counter(), Counter()
        count_leaves(root1, c1)
        count_leaves(root2, c2)
        return c1 == c2

sol = Solution()
r1 = Node('+', Node('a'), Node('+', Node('b'), Node('c')))
r2 = Node('+', Node('+', Node('b'), Node('c')), Node('a'))
assert sol.checkEquivalence(r1, r2) == True
r3 = Node('+', Node('a'), Node('b'))
r4 = Node('+', Node('a'), Node('a'))
assert sol.checkEquivalence(r3, r4) == False
print("All tests passed successfully.")
