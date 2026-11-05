class Solution:
    def shiftDistance(self, s: str, t: str, nextCost: list[int], previousCost: list[int]) -> int:
        cost_matrix = [[0] * 26 for _ in range(26)]
        for u in range(26):
            for v in range(26):
                if u == v:
                    continue
                fwd = 0
                curr = u
                while curr != v:
                    fwd += nextCost[curr]
                    curr = (curr + 1) % 26
                bwd = 0
                curr = u
                while curr != v:
                    bwd += previousCost[curr]
                    curr = (curr - 1 + 26) % 26
                cost_matrix[u][v] = min(fwd, bwd)
        
        total = 0
        for sc, tc in zip(s, t):
            total += cost_matrix[ord(sc) - 97][ord(tc) - 97]
        return total
