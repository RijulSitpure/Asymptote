class Solution:
    def halvesAreAlike(self, s: str) -> bool:
        vowels = set("aeiouAEIOU")
        mid = len(s) // 2
        c1 = sum(1 for c in s[:mid] if c in vowels)
        c2 = sum(1 for c in s[mid:] if c in vowels)
        return c1 == c2

def test():
    sol = Solution()
    assert sol.halvesAreAlike("book") == True
    assert sol.halvesAreAlike("textbook") == False

    print("✓ determine-if-string-halves-are-alike passed")

if __name__ == '__main__':
    test()
