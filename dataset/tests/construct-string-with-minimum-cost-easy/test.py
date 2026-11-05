from solution import Solution
sol = Solution()
assert sol.minimumCost("abcdef", ["abdef","abc","d","def","ef"], [100,1,1,10,5]) == 7
assert sol.minimumCost("aaaa", ["z","zz","zzz"], [1,10,100]) == -1
print("All tests passed successfully.")
