class Trie:
    def __init__(self, max_bit=48):
        self.root = {}
        self.max_bit = max_bit
    def insert(self, num):
        node = self.root
        for bit in range(self.max_bit, -1, -1):
            b = (num >> bit) & 1
            if b not in node:
                node[b] = {}
            node = node[b]
    def get_max_xor(self, num):
        if not self.root:
            return 0
        node = self.root
        res = 0
        for bit in range(self.max_bit, -1, -1):
            b = (num >> bit) & 1
            toggle = b ^ 1
            if toggle in node:
                res |= (1 << bit)
                node = node[toggle]
            elif b in node:
                node = node[b]
            else:
                break
        return res

class Solution:
    def maxXor(self, n: int, edges: list[list[int]], values: list[int]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        subtree_sum = [0] * n
        def get_sums(u, p):
            s = values[u]
            for v in adj[u]:
                if v != p:
                    s += get_sums(v, u)
            subtree_sum[u] = s
            return s
        get_sums(0, -1)
        total_sum = subtree_sum[0]
        max_bit = max(total_sum.bit_length(), 1)
        trie = Trie(max_bit)
        ans = 0
        def dfs(u, p):
            nonlocal ans
            if trie.root:
                ans = max(ans, trie.get_max_xor(subtree_sum[u]))
            for v in adj[u]:
                if v != p:
                    dfs(v, u)
            trie.insert(subtree_sum[u])
        dfs(0, -1)
        return ans
