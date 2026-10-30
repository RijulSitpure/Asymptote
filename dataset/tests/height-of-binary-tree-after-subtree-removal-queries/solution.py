class Solution:
    def treeQueries(self, root, queries: list[int]) -> list[int]:
        heights = {}
        depths = {}
        def get_height(node, d):
            if not node:
                return -1
            depths[node.val] = d
            h = 1 + max(get_height(node.left, d + 1), get_height(node.right, d + 1))
            heights[node.val] = h
            return h
        get_height(root, 0)
        
        from collections import defaultdict
        depth_to_nodes = defaultdict(list)
        for val, d in depths.items():
            h = heights[val]
            depth_to_nodes[d].append((h, val))
        
        top2 = {}
        for d, nodes in depth_to_nodes.items():
            nodes.sort(reverse=True)
            top2[d] = nodes[:2]
        
        ans = []
        for q in queries:
            d = depths[q]
            candidates = top2[d]
            if len(candidates) == 1:
                ans.append(d - 1)
            elif candidates[0][1] == q:
                ans.append(d + candidates[1][0])
            else:
                ans.append(d + candidates[0][0])
        return ans
