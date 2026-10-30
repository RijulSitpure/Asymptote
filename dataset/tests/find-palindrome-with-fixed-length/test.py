from solution import Solution
s = Solution()
assert s.kthPalindrome([1,2,3,4,5,90], 3) == [101,111,121,131,141,999]
assert s.kthPalindrome([2,4,6], 4) == [1111,1331,1551]
print("All tests passed for find-palindrome-with-fixed-length!")
