class Solution:
    def removeAnagrams(self, words: list[str]) -> list[str]:
        ans = []
        prev_key = ""
        for w in words:
            k = "".join(sorted(w))
            if k != prev_key:
                ans.append(w)
                prev_key = k
        return ans
