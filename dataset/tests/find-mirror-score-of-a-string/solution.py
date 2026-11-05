class Solution:
    def calculateScore(self, s: str) -> int:
        from collections import defaultdict
        stacks = defaultdict(list)
        total_score = 0
        
        for i, ch in enumerate(s):
            mirror = chr(ord('z') - (ord(ch) - ord('a')))
            if stacks[mirror]:
                j = stacks[mirror].pop()
                total_score += (i - j)
            else:
                stacks[ch].append(i)
                
        return total_score
