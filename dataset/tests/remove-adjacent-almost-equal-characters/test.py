from solution import Solution
s = Solution()
assert s.removeAlmostEqualCharacters('aaaaa') == 2
assert s.removeAlmostEqualCharacters('abddez') == 2
assert s.removeAlmostEqualCharacters('zyxyxyz') == 3
print('remove-adjacent-almost-equal-characters passed')
