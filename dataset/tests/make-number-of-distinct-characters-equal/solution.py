from collections import Counter

class Solution:
    def isItPossible(self, word1: str, word2: str) -> bool:
        c1 = Counter(word1)
        c2 = Counter(word2)
        for ch1 in list(c1.keys()):
            for ch2 in list(c2.keys()):
                c1[ch1] -= 1
                if c1[ch1] == 0: del c1[ch1]
                c1[ch2] += 1
                
                c2[ch2] -= 1
                if c2[ch2] == 0: del c2[ch2]
                c2[ch1] += 1
                
                if len(c1) == len(c2):
                    return True
                    
                c1[ch2] -= 1
                if c1[ch2] == 0: del c1[ch2]
                c1[ch1] += 1
                
                c2[ch1] -= 1
                if c2[ch1] == 0: del c2[ch1]
                c2[ch2] += 1
        return False
