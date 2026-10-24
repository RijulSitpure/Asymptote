from typing import List

class Solution:
    def findAndReplacePattern(self, words: List[str], pattern: str) -> List[str]:
        def match(w: str) -> bool:
            m1, m2 = {}, {}
            for c1, c2 in zip(w, pattern):
                if m1.setdefault(c1, c2) != c2 or m2.setdefault(c2, c1) != c1:
                    return False
            return True

        return [w for w in words if match(w)]

def test():
    sol = Solution()
    res1 = sol.findAndReplacePattern(["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb")
    assert res1 == ["mee", "aqq"], f"test 1 failed: {res1}"
    res2 = sol.findAndReplacePattern(["a", "b", "c"], "a")
    assert res2 == ["a", "b", "c"], f"test 2 failed: {res2}"
    print("✓ find-and-replace-pattern passed")

if __name__ == "__main__":
    test()
