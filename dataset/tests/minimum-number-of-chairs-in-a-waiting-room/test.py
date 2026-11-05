from solution import Solution

s = Solution()
assert s.minimumChairs('EEEEEEE') == 7
assert s.minimumChairs('ELELEEL') == 2
assert s.minimumChairs('ELEELEELLL') == 3
print('All tests passed successfully.')