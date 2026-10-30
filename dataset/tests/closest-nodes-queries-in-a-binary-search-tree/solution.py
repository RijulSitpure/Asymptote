import bisect

class Solution:
    def closestNodes(self, root, queries: list[int]) -> list[list[int]]:
        vals = []
        def inorder(node):
            if not node:
                return
            inorder(node.left)
            vals.append(node.val)
            inorder(node.right)
        inorder(root)
        n = len(vals)
        ans = []
        for q in queries:
            idx = bisect.bisect_right(vals, q)
            mini = vals[idx - 1] if idx > 0 else -1
            if idx > 0 and vals[idx - 1] == q:
                maxi = q
            else:
                maxi = vals[idx] if idx < n else -1
            ans.append([mini, maxi])
        return ans
