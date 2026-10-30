class Solution:
    def countVowelSubstrings(self, word: str) -> int:
        vowels = set('aeiou')
        ans = 0
        n = len(word)

        for i in range(n):
            seen = set()
            for j in range(i, n):
                if word[j] not in vowels:
                    break
                seen.add(word[j])
                if len(seen) == 5:
                    ans += 1

        return ans
