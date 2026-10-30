from solution import Solution
s = Solution()
assert s.isCircularSentence('leetcode exercises sound delightful') == True
assert s.isCircularSentence('eetcode') == True
assert s.isCircularSentence('Leetcode is cool') == False
print('All tests passed for circular-sentence!')
