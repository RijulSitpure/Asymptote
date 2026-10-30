class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        def max_for_char(target: str) -> int:
            l = 0
            flips = 0
            best = 0
            for r in range(len(answerKey)):
                if answerKey[r] != target:
                    flips += 1
                while flips > k:
                    if answerKey[l] != target:
                        flips -= 1
                    l += 1
                best = max(best, r - l + 1)
            return best
        return max(max_for_char('T'), max_for_char('F'))
