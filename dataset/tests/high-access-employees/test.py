from solution import Solution
s = Solution()
assert s.findHighAccessEmployees([('a', '0549'), ('b', '0457'), ('a', '0532'), ('a', '0621'), ('b', '0540')]) == ['a']
assert s.findHighAccessEmployees([('d', '0002'), ('c', '0808'), ('c', '0829'), ('e', '0215'), ('d', '1508'), ('d', '1444'), ('d', '1410'), ('c', '0809')]) == ['d', 'c']
print('high-access-employees passed')
