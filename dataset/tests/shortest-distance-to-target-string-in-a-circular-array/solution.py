class Solution:
    def closetTarget(self, words: list[str], target: str, startIndex: int) -> int:
        n = len(words)
        ans = float('inf')
        for i, w in enumerate(words):
            if w == target:
                diff = abs(i - startIndex)
                dist = min(diff, n - diff)
                if dist < ans:
                    ans = dist
        return ans if ans != float('inf') else -1
