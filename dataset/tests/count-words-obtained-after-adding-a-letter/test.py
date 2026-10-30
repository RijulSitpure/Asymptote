from solution import Solution

s = Solution()
assert s.wordCount(["ant","act","tack"], ["tack","act","acti"]) == 2
assert s.wordCount(["ab","a"], ["abc","abcd"]) == 1
print("All tests passed for count-words-obtained-after-adding-a-letter!")
