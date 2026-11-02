class Solution:
    def splitWordsBySeparator(self, words: list[str], separator: str) -> list[str]:
        ans = []
        for word in words:
            for token in word.split(separator):
                if token:
                    ans.append(token)
        return ans