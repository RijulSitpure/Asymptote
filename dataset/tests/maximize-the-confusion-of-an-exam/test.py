from solution import Solution

s = Solution()
assert s.maxConsecutiveAnswers('TTFF', 2) == 4
assert s.maxConsecutiveAnswers('TFFT', 1) == 3
assert s.maxConsecutiveAnswers('TTFTTFTT', 1) == 5
print('OK')