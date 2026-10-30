from solution import Solution

s = Solution()
assert s.divideString("abcdefghi", 3, "x") == ["abc","def","ghi"]
assert s.divideString("abcdefghij", 3, "x") == ["abc","def","ghi","jxx"]
print("All tests passed for divide-a-string-into-groups-of-size-k!")
