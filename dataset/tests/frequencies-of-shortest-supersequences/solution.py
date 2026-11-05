class Solution:
    def supersequences(self, words: list[str]) -> list[list[int]]:
        from itertools import combinations
        nodes = sorted(list(set(''.join(words))))
        idx = {ch: i for i, ch in enumerate(nodes)}
        n = len(nodes)
        adj = [0] * n
        in_adj = [0] * n
        for w in words:
            u, v = idx[w[0]], idx[w[1]]
            adj[u] |= (1 << v)
            in_adj[v] |= (1 << u)
            
        def is_dag(r_mask):
            in_deg = [0] * n
            q = []
            count = 0
            total = 0
            for i in range(n):
                if (r_mask >> i) & 1:
                    total += 1
                    deg = bin(in_adj[i] & r_mask).count('1')
                    in_deg[i] = deg
                    if deg == 0:
                        q.append(i)
            head = 0
            while head < len(q):
                u = q[head]
                head += 1
                count += 1
                out = adj[u] & r_mask
                while out:
                    lsb = out & -out
                    v = lsb.bit_length() - 1
                    in_deg[v] -= 1
                    if in_deg[v] == 0:
                        q.append(v)
                    out ^= lsb
            return count == total
            
        ans = []
        for k in range(n + 1):
            for comb in combinations(range(n), k):
                d_mask = sum(1 << i for i in comb)
                r_mask = ((1 << n) - 1) ^ d_mask
                if is_dag(r_mask):
                    freq = [0] * 26
                    for ch in nodes:
                        freq[ord(ch) - ord('a')] = 1
                    for i in comb:
                        freq[ord(nodes[i]) - ord('a')] = 2
                    ans.append(freq)
            if ans:
                break
        return ans
