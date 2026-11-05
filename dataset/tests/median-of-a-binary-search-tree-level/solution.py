from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelMedian(root: TreeNode, level: int) -> float:
    if not root:
        return 0.0
    q = deque([root])
    cur_lvl = 1
    while q:
        size = len(q)
        vals = []
        for _ in range(size):
            node = q.popleft()
            vals.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        if cur_lvl == level:
            m = len(vals)
            if m % 2 == 1:
                return float(vals[m // 2])
            else:
                return (vals[m // 2 - 1] + vals[m // 2]) / 2.0
        cur_lvl += 1
    return 0.0