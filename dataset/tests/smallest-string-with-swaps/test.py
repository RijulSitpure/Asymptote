from collections import defaultdict

class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: list[list[int]]) -> str:
        parent = list(range(len(s)))
        
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
            
        def union(i, j):
            root_i, root_j = find(i), find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                
        for u, v in pairs:
            union(u, v)
            
        groups = defaultdict(list)
        for i in range(len(s)):
            groups[find(i)].append(i)
            
        res = list(s)
        for idxs in groups.values():
            chars = sorted(res[i] for i in idxs)
            idxs.sort()
            for i, c in zip(idxs, chars):
                res[i] = c
                
        return ''.join(res)

def test():
    sol = Solution()
    assert sol.smallestStringWithSwaps("dcab", [[0, 3], [1, 2]]) == "bacd", "test 1 failed"
    assert sol.smallestStringWithSwaps("dcab", [[0, 3], [1, 2], [0, 2]]) == "abcd", "test 2 failed"
    assert sol.smallestStringWithSwaps("cba", [[0, 1], [1, 2]]) == "abc", "test 3 failed"
    print("✓ smallest-string-with-swaps passed")

if __name__ == "__main__":
    test()
