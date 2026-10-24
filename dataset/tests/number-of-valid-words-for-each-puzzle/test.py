from collections import Counter

class Solution:
    def findNumOfValidWords(self, words: list[str], puzzles: list[str]) -> list[int]:
        word_counts = Counter()
        for w in words:
            mask = 0
            for c in w:
                mask |= (1 << (ord(c) - ord('a')))
            if bin(mask).count('1') <= 7:
                word_counts[mask] += 1
        
        res = []
        for p in puzzles:
            first_bit = 1 << (ord(p[0]) - ord('a'))
            rest_mask = 0
            for c in p[1:]:
                rest_mask |= (1 << (ord(c) - ord('a')))
            
            total = word_counts[first_bit]
            submask = rest_mask
            while submask > 0:
                total += word_counts[submask | first_bit]
                submask = (submask - 1) & rest_mask
            res.append(total)
        return res

def test():
    sol = Solution()
    w1 = ["aaaa","asas","able","ability","actt","actor","access"]
    p1 = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
    assert sol.findNumOfValidWords(w1, p1) == [1,1,3,2,4,0], "test 1 failed"
    print("✓ number-of-valid-words-for-each-puzzle passed")

if __name__ == "__main__":
    test()
