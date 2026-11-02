class Solution:
    def sortVowels(self, s: str) -> str:
        vowels_set = set("aeiouAEIOU")
        vowels = sorted([ch for ch in s if ch in vowels_set])
        chars = list(s)
        v_idx = 0
        for i in range(len(chars)):
            if chars[i] in vowels_set:
                chars[i] = vowels[v_idx]
                v_idx += 1
        return "".join(chars)