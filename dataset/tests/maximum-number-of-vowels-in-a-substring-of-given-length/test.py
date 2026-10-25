class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set("aeiou")
        cur = sum(1 for ch in s[:k] if ch in vowels)
        max_v = cur
        for i in range(k, len(s)):
            if s[i] in vowels:
                cur += 1
            if s[i - k] in vowels:
                cur -= 1
            max_v = max(max_v, cur)
        return max_v

def test():
    sol = Solution()
    assert sol.maxVowels("abciiidef", 3) == 3, "test 1 failed"
    assert sol.maxVowels("aeiou", 2) == 2, "test 2 failed"
    assert sol.maxVowels("leetcode", 3) == 2, "test 3 failed"
    print("✓ maximum-number-of-vowels-in-a-substring-of-given-length passed")

if __name__ == "__main__":
    test()
