class Trie:
    def __init__(self):
        self.root = {}
        
    def insert(self, val):
        node = self.root
        for i in range(17, -1, -1):
            bit = (val >> i) & 1
            if bit not in node:
                node[bit] = {"cnt": 0}
            node = node[bit]
            node["cnt"] += 1
            
    def remove(self, val):
        node = self.root
        for i in range(17, -1, -1):
            bit = (val >> i) & 1
            node = node[bit]
            node["cnt"] -= 1
            
    def max_diff(self, val):
        node = self.root
        ans = 0
        for i in range(17, -1, -1):
            bit = (val >> i) & 1
            want = 1 - bit
            if want in node and node[want]["cnt"] > 0:
                ans |= (1 << i)
                node = node[want]
            else:
                node = node[bit]
        return ans

class Solution:
    def maxGeneticDifference(self, parents: list[int], queries: list[list[int]]) -> list[int]:
        n = len(parents)
        children = [[] for _ in range(n)]
        root = -1
        for i, p in enumerate(parents):
            if p == -1:
                root = i
            else:
                children[p].append(i)
                
        q_by_node = [[] for _ in range(n)]
        for idx, (node, val) in enumerate(queries):
            q_by_node[node].append((idx, val))
            
        ans = [0] * len(queries)
        trie = Trie()
        
        def dfs(u):
            trie.insert(u)
            for q_idx, val in q_by_node[u]:
                ans[q_idx] = trie.max_diff(val)
            for v in children[u]:
                dfs(v)
            trie.remove(u)
            
        dfs(root)
        return ans

def test_max_genetic_diff():
    sol = Solution()
    assert sol.maxGeneticDifference([-1,0,1,1], [[0,2],[3,2],[2,5]]) == [2, 3, 7]
    assert sol.maxGeneticDifference([3,7,-1,2,0,7,0,2], [[4,6],[1,15],[0,5]]) == [6, 14, 7]

