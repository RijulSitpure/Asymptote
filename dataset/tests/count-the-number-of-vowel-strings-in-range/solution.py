class Solution:
    def vowelStrings(self, words: list[str], left: int, right: int) -> int:
        vowels = set('aeiou')
        ans = 0
        for i in range(left, right + 1):
            w = words[i]
            if w[0] in vowels and w[-1] in vowels:
                ans += 1
        return ans
