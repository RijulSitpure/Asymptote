import sys

class Solution:
    def isNumber(self, s: str) -> bool:
        seen_digit = False
        seen_dot = False
        seen_exp = False
        n = len(s)

        for i, ch in enumerate(s):
            if ch.isdigit():
                seen_digit = True
            elif ch in "+-":
                if i > 0 and s[i - 1] not in "eE":
                    return False
            elif ch in "eE":
                if seen_exp or not seen_digit:
                    return False
                seen_exp = True
                seen_digit = False
            elif ch == ".":
                if seen_dot or seen_exp:
                    return False
                seen_dot = True
            else:
                return False

        return seen_digit

def test():
    sol = Solution()
    assert sol.isNumber("0") is True, "test 1 failed"
    assert sol.isNumber(" 0.1 ") is False, "test 2 failed"
    assert sol.isNumber("abc") is False, "test 3 failed"
    assert sol.isNumber("1e10") is True, "test 4 failed"
    assert sol.isNumber("-90E3") is True, "test 5 failed"
    print("✓ valid-number passed")

if __name__ == "__main__":
    test()
