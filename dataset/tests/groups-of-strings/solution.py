from typing import List

class Solution:
    def groupStrings(self, words: List[str]) -> List[int]:
        n = len(words)
        parent = list(range(n))
        size = [1] * n
        
        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]
            
        def union(i, j):
            pi, pj = find(i), find(j)
            if pi != pj:
                parent[pi] = pj
                size[pj] += size[pi]
                
        mask_to_id = {}
        del_to_id = {}
        for idx, w in enumerate(words):
            m = 0
            for ch in w:
                m |= 1 << (ord(ch) - ord('a'))
            if m in mask_to_id:
                union(idx, mask_to_id[m])
            else:
                mask_to_id[m] = idx
                
            for i in range(26):
                if (m >> i) & 1:
                    sub = m ^ (1 << i)
                    if sub in mask_to_id:
                        union(idx, mask_to_id[sub])
                    if sub in del_to_id:
                        union(idx, del_to_id[sub])
                    else:
                        del_to_id[sub] = idx
        
        num_groups = 0
        max_group = 0
        for i in range(n):
            if parent[i] == i:
                num_groups += 1
                max_group = max(max_group, size[i])
        return [num_groups, max_group]
