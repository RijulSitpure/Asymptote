from solution import Solution
s = Solution()
assert s.shortestBeautifulSubstring('100011001', 3) == '11001'
assert s.shortestBeautifulSubstring('1011', 2) == '11'
assert s.shortestBeautifulSubstring('0000', 1) == ''
print("shortest-and-lexicographically-smallest-beautiful-string passed")
