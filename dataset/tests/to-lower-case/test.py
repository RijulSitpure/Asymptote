import sys

class Solution:
    def toLowerCase(self, s: str) -> str:
        res = []
        for c in s:
            if "A" <= c <= "Z":
                res.append(chr(ord(c) | 32))
            else:
                res.append(c)
        return "".join(res)

def test():
    sol = Solution()
    assert sol.toLowerCase("Hello") == "hello", "test 1 failed"
    assert sol.toLowerCase("here") == "here", "test 2 failed"
    assert sol.toLowerCase("LOVELY") == "lovely", "test 3 failed"
    print("✓ to-lower-case passed")

if __name__ == "__main__":
    test()
