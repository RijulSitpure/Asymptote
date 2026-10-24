from typing import List

class Solution:
    def diStringMatch(self, s: str) -> List[int]:
        low = 0
        high = len(s)
        res = []
        for ch in s:
            if ch == "I":
                res.append(low)
                low += 1
            else:
                res.append(high)
                high -= 1
        res.append(low)
        return res

def verify_di(s, res):
    for i in range(len(s)):
        if s[i] == "I" and res[i] >= res[i + 1]:
            return False
        if s[i] == "D" and res[i] <= res[i + 1]:
            return False
    return True

def test():
    sol = Solution()
    r1 = sol.diStringMatch("IDID")
    assert verify_di("IDID", r1), "test 1 failed"
    r2 = sol.diStringMatch("III")
    assert verify_di("III", r2), "test 2 failed"
    r3 = sol.diStringMatch("DDI")
    assert verify_di("DDI", r3), "test 3 failed"
    print("✓ di-string-match passed")

if __name__ == "__main__":
    test()
