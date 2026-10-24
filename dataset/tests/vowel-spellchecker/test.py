from typing import List

class Solution:
    def spellchecker(self, wordlist: List[str], queries: List[str]) -> List[str]:
        exact = set(wordlist)
        cap_map = {}
        vowel_map = {}
        def devowel(w: str) -> str:
            return "".join("*" if c in "aeiou" else c for c in w.lower())
        for w in wordlist:
            lower = w.lower()
            cap_map.setdefault(lower, w)
            vowel_map.setdefault(devowel(w), w)
        res = []
        for q in queries:
            if q in exact:
                res.append(q)
            elif q.lower() in cap_map:
                res.append(cap_map[q.lower()])
            elif devowel(q) in vowel_map:
                res.append(vowel_map[devowel(q)])
            else:
                res.append("")
        return res

def test():
    sol = Solution()
    w1 = ["KiTe","kite","hare","Hare"]
    q1 = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
    expected1 = ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
    assert sol.spellchecker(w1, q1) == expected1, "test 1 failed"
    print("✓ vowel-spellchecker passed")

if __name__ == "__main__":
    test()
