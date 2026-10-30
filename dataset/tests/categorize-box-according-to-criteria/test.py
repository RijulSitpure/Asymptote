from solution import Solution
s = Solution()
assert s.categorizeBox(1000, 35, 700, 300) == 'Heavy'
assert s.categorizeBox(200, 50, 800, 50) == 'Neither'
print('All tests passed for categorize-box-according-to-criteria!')
