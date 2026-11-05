class Solution:
    def validSequence(self, word1: str, word2: str) -> list[int]:
        n, m = len(word1), len(word2)
        
        # Precompute suffix match positions: right[j] is min index in word1
        # that can match word2[j:] without any mismatch
        right = [float('inf')] * (m + 1)
        right[m] = n
        
        curr = n - 1
        for j in range(m - 1, -1, -1):
            while curr >= 0 and word1[curr] != word2[j]:
                curr -= 1
            if curr >= 0:
                right[j] = curr
                curr -= 1
            else:
                right[j] = float('inf')
                
        # Greedily match left to right
        ans = []
        used_mismatch = False
        i = 0
        
        for j in range(m):
            while i < n and word1[i] != word2[j]:
                if not used_mismatch and right[j + 1] > i:
                    break
                i += 1
            if i == n:
                return []
            if word1[i] != word2[j]:
                used_mismatch = True
            ans.append(i)
            i += 1
            
        return ans
