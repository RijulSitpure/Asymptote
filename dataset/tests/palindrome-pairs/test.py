from typing import List

class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        def is_palindrome(s: str) -> bool:
            return s == s[::-1]

        lookup = {w: i for i, w in enumerate(words)}
        res = []

        for i, word in enumerate(words):
            m = len(word)
            for j in range(m + 1):
                pref = word[:j]
                suff = word[j:]
                if is_palindrome(pref):
                    back = suff[::-1]
                    if back in lookup and lookup[back] != i:
                        res.append([lookup[back], i])
                if j < m and is_palindrome(suff):
                    back = pref[::-1]
                    if back in lookup and lookup[back] != i:
                        res.append([i, lookup[back]])

        return res

def test():
    sol = Solution()
    def norm(lst):
        return sorted([tuple(x) for x in lst])
    t1 = ["abcd","dcba","lls","s","sssll"]
    assert norm(sol.palindromePairs(t1)) == norm([[0,1],[1,0],[3,2],[2,4]]), "test 1 failed"
    t2 = ["bat","tab","cat"]
    assert norm(sol.palindromePairs(t2)) == norm([[0,1],[1,0]]), "test 2 failed"
    t3 = ["a",""]
    assert norm(sol.palindromePairs(t3)) == norm([[0,1],[1,0]]), "test 3 failed"
    print("✓ palindrome-pairs passed")

if __name__ == "__main__":
    test()
