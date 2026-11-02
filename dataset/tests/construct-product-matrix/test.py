from solution import Solution
s = Solution()
assert s.constructProductMatrix([[1, 2], [3, 4]]) == [[24, 12], [8, 6]]
assert s.constructProductMatrix([[12345], [2], [1]]) == [[2], [0], [0]]
print("construct-product-matrix passed")
