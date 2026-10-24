class Solution:
    def decodeAtIndex(self, s: str, k: int) -> str:
        size = 0
        for ch in s:
            if ch.isdigit():
                size *= int(ch)
            else:
                size += 1

        for ch in reversed(s):
            k %= size
            if k == 0 and ch.isalpha():
                return ch
            if ch.isdigit():
                size //= int(ch)
            else:
                size -= 1
        return ""

def test():
    sol = Solution()
    assert sol.decodeAtIndex("leet2code3", 10) == "o", "test 1 failed"
    assert sol.decodeAtIndex("ha22", 5) == "h", "test 2 failed"
    assert sol.decodeAtIndex("a2345678999999999999999", 1) == "a", "test 3 failed"
    print("✓ decoded-string-at-index passed")

if __name__ == "__main__":
    test()
