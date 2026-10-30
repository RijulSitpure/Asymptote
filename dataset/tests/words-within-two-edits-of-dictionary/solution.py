class Solution:
    def twoEditWords(self, queries: list[str], dictionary: list[str]) -> list[str]:
        ans = []
        for q in queries:
            for d in dictionary:
                if sum(1 for c1, c2 in zip(q, d) if c1 != c2) <= 2:
                    ans.append(q)
                    break
        return ans
