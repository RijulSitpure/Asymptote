import sys

class Solution:
    def generatePalindromes(self, s: str) -> list:
        from collections import Counter
        counts = Counter(s)
        odd_char = ""
        for c, cnt in counts.items():
            if cnt % 2 == 1:
                if odd_char:
                    return []
                odd_char = c
        half = []
        for c, cnt in counts.items():
            half.extend([c] * (cnt // 2))
        half.sort()
        res = []
        visited = [False] * len(half)
        def backtrack(path):
            if len(path) == len(half):
                h = "".join(path)
                res.append(h + odd_char + h[::-1])
                return
            for i in range(len(half)):
                if visited[i]:
                    continue
                if i > 0 and half[i] == half[i - 1] and not visited[i - 1]:
                    continue
                visited[i] = True
                path.append(half[i])
                backtrack(path)
                path.pop()
                visited[i] = False
        backtrack([])
        return res

def test():
    sol = Solution()
    res1 = sorted(sol.generatePalindromes("aabb"))
    assert res1 == ["abba", "baab"], "test 1 failed"
    assert sol.generatePalindromes("abc") == [], "test 2 failed"
    print("✓ palindrome-permutation-ii passed")

if __name__ == "__main__":
    test()
