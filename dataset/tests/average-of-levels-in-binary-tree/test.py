from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        if not root:
            return []
        result = []
        queue = [root]
        while queue:
            level_sum = 0
            level_count = len(queue)
            next_queue = []
            for node in queue:
                level_sum += node.val
                if node.left:
                    next_queue.append(node.left)
                if node.right:
                    next_queue.append(node.right)
            result.append(level_sum / level_count)
            queue = next_queue
        return result

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
    t1 = build_tree([3, 9, 20, None, None, 15, 7])
    res1 = sol.averageOfLevels(t1)
    assert abs(res1[0] - 3.0) < 1e-5 and abs(res1[1] - 14.5) < 1e-5 and abs(res1[2] - 11.0) < 1e-5, "test 1 failed"
    t2 = build_tree([3, 9, 20, 15, 7])
    res2 = sol.averageOfLevels(t2)
    assert abs(res2[0] - 3.0) < 1e-5 and abs(res2[1] - 14.5) < 1e-5 and abs(res2[2] - 11.0) < 1e-5, "test 2 failed"
    print("✓ average-of-levels-in-binary-tree passed")

if __name__ == "__main__":
    test()
