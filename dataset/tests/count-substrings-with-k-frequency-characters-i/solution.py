class Solution:
    def numberOfSubstrings(self, s: str, k: int) -> int:
        from collections import Counter
        counts = Counter()
        left = 0
        ans = 0
        n = len(s)
        
        for right in range(n):
            counts[s[right]] += 1
            while counts[s[right]] >= k:
                ans += n - right
                counts[s[left]] -= 1
                left += 1
                
        return ans
