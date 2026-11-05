class Solution:
    def compressedString(self, word: str) -> str:
        comp = []
        n = len(word)
        i = 0
        while i < n:
            ch = word[i]
            cnt = 0
            while i < n and word[i] == ch and cnt < 9:
                cnt += 1
                i += 1
            comp.append(f"{cnt}{ch}")
        return "".join(comp)