class Solution:
    def vowelStrings(self, words: list[str], queries: list[list[int]]) -> list[int]:
        vowels = set('aeiou')
        n = len(words)
        pref = [0] * (n + 1)
        for i, w in enumerate(words):
            is_v = 1 if w[0] in vowels and w[-1] in vowels else 0
            pref[i + 1] = pref[i] + is_v
        return [pref[r + 1] - pref[l] for l, r in queries]
