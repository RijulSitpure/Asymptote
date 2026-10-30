from solution import Solution
s = Solution()
assert s.largestWordCount(["Hello userTwooo","Hi userThree","Wonderful day Alice","Nice day userThree"], ["Alice","userTwo","userThree","Alice"]) == "Alice"
assert s.largestWordCount(["How is leetcode for everyone","Leetcode is useful for practice"], ["Bob","Charlie"]) == "Charlie"
print("All tests passed for sender-with-largest-word-count!")
