from typing import List
from collections import deque

class Solution:
    def longestPalindrome(self, n: int, edges: List[List[int]], labels: str) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        visited_states = set()
        queue = deque()
        max_len = 1
        
        for i in range(n):
            mask = (1 << i)
            visited_states.add((mask, i, i))
            queue.append((mask, i, i, 1))
            
        for u, v in edges:
            if labels[u] == labels[v]:
                mask = (1 << u) | (1 << v)
                visited_states.add((mask, u, v))
                visited_states.add((mask, v, u))
                queue.append((mask, u, v, 2))
                queue.append((mask, v, u, 2))
                max_len = max(max_len, 2)
                
        while queue:
            mask, u, v, length = queue.popleft()
            if length > max_len:
                max_len = length
                
            for nu in adj[u]:
                if mask & (1 << nu):
                    continue
                for nv in adj[v]:
                    if nu == nv or (mask & (1 << nv)):
                        continue
                    if labels[nu] == labels[nv]:
                        new_mask = mask | (1 << nu) | (1 << nv)
                        if (new_mask, nu, nv) not in visited_states:
                            visited_states.add((new_mask, nu, nv))
                            queue.append((new_mask, nu, nv, length + 2))
                            
        return max_len

def run_tests():
    s = Solution()
    res1 = s.longestPalindrome(3, [[0, 1], [1, 2]], "aba")
    assert res1 == 3, f"Expected 3, got {res1}" # 0 -> 1 -> 2: "aba"
    res2 = s.longestPalindrome(2, [[0, 1]], "ab")
    assert res2 == 1, f"Expected 1, got {res2}"
    print("3615 longest-palindromic-path-in-graph PASSED")

if __name__ == "__main__":
    run_tests()
