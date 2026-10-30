from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def reverseOddLevels(self, root):
        if not root:
            return None
        q = deque([root])
        level = 0
        
        while q:
            sz = len(q)
            nodes = list(q)
            if level % 2 == 1:
                l, r = 0, sz - 1
                while l < r:
                    nodes[l].val, nodes[r].val = nodes[r].val, nodes[l].val
                    l += 1
                    r -= 1
            for _ in range(sz):
                node = q.popleft()
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            level += 1
        return root
