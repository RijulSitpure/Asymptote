from solution import Solution

s = Solution()
assert s.capitalizeTitle("capiTalIze tHe titLe") == "Capitalize The Title"
assert s.capitalizeTitle("First leTTeR of EACH Word") == "First Letter of Each Word"
assert s.capitalizeTitle("i lOve leetcode") == "i Love LeetCode" or s.capitalizeTitle("i lOve leetcode") == "i Love Leetcode"
print("All tests passed for capitalize-the-title!")
