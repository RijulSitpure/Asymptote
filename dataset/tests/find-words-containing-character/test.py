from solution import Solution
s = Solution()
assert s.findWordsContaining(['leet', 'code'], 'e') == [0, 1]
assert s.findWordsContaining(['abc', 'bcd', 'aaaa', 'cbc'], 'a') == [0, 2]
assert s.findWordsContaining(['abc', 'bcd', 'aaaa', 'cbc'], 'z') == []
print('find-words-containing-character passed')
