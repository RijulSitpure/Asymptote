class Solution:
    def removeVowels(self, s: str) -> str:
        vowels = {'a', 'e', 'i', 'o', 'u'}
        return "".join(c for c in s if c not in vowels)

def test():
    sol = Solution()
    assert sol.removeVowels("leetcodeisacommunityforcoders") == "ltcdscmmntyfrcdrs", "test 1 failed"
    assert sol.removeVowels("aeiou") == "", "test 2 failed"
    print("✓ remove-vowels-from-a-string passed")

if __name__ == "__main__":
    test()
