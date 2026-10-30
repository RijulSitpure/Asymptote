class Solution:
    def oddString(self, words: list[str]) -> str:
        diffs = {}
        for w in words:
            d = tuple(ord(w[i + 1]) - ord(w[i]) for i in range(len(w) - 1))
            diffs.setdefault(d, []).append(w)
        for w_list in diffs.values():
            if len(w_list) == 1:
                return w_list[0]
        return ""
