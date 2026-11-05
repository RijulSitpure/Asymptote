class Solution:
    def validSubstringCount(self, word1: str, word2: str) -> int:
        from collections import Counter
        target = Counter(word2)
        needed = len(target)
        
        window = Counter()
        satisfied = 0
        left = 0
        ans = 0
        n = len(word1)
        
        for right in range(n):
            ch = word1[right]
            window[ch] += 1
            if ch in target and window[ch] == target[ch]:
                satisfied += 1
                
            while satisfied == needed:
                # Every substring ending from right to n - 1 is valid
                ans += n - right
                l_ch = word1[left]
                if l_ch in target and window[l_ch] == target[l_ch]:
                    satisfied -= 1
                window[l_ch] -= 1
                left += 1
                
        return ans
