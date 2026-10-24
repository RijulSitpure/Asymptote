class Solution:
    def makeLargestSpecial(self, s: str) -> str:
        count = 0
        i = 0
        parts = []
        for j, ch in enumerate(s):
            count += 1 if ch == "1" else -1
            if count == 0:
                parts.append("1" + self.makeLargestSpecial(s[i + 1:j]) + "0")
                i = j + 1
        parts.sort(reverse=True)
        return "".join(parts)

def test():
    sol = Solution()
    assert sol.makeLargestSpecial("11011000") == "11100100", "test 1 failed"
    assert sol.makeLargestSpecial("10") == "10", "test 2 failed"
    print("✓ special-binary-string passed")

if __name__ == "__main__":
    test()
