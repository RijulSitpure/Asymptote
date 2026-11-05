import bisect

class Solution:
    def shortestMatchingSubstring(self, s: str, p: str) -> int:
        parts = p.split("*")
        a, b, c = parts[0], parts[1], parts[2]
        
        def find_all(sub: str) -> list[int]:
            if not sub:
                return list(range(len(s) + 1))
            pi = [0] * len(sub)
            for i in range(1, len(sub)):
                j = pi[i - 1]
                while j > 0 and sub[i] != sub[j]:
                    j = pi[j - 1]
                if sub[i] == sub[j]:
                    j += 1
                pi[i] = j
            matches = []
            j = 0
            for i in range(len(s)):
                while j > 0 and s[i] != sub[j]:
                    j = pi[j - 1]
                if s[i] == sub[j]:
                    j += 1
                if j == len(sub):
                    matches.append(i - len(sub) + 1)
                    j = pi[j - 1]
            return matches

        posA = find_all(a)
        posB = find_all(b)
        posC = find_all(c)
        
        if not posA or not posB or not posC:
            return -1
            
        lenA, lenB, lenC = len(a), len(b), len(c)
        ans = float("inf")
        
        for startB in posB:
            endB = startB + lenB
            idxA = bisect.bisect_right(posA, startB - lenA) - 1
            if idxA < 0:
                continue
            startA = posA[idxA]
            
            idxC = bisect.bisect_left(posC, endB)
            if idxC >= len(posC):
                continue
            startC = posC[idxC]
            endC = startC + lenC
            
            cand = endC - startA
            if cand < ans:
                ans = cand
                
        return ans if ans != float("inf") else -1
