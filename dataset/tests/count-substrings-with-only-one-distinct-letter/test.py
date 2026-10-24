class Solution:
    def countLetters(self, s: str) -> int:
        total = 0
        streak = 0
        prev = None
        for c in s:
            if c == prev:
                streak += 1
            else:
                streak = 1
                prev = c
            total += streak
        return total

def test():
    sol = Solution()
    assert sol.countLetters("aaaba") == 8, "test 1 failed"
    assert sol.countLetters("aaaaaaaaaa") == 55, "test 2 failed"
    print("✓ count-substrings-with-only-one-distinct-letter passed")

if __name__ == "__main__":
    test()
