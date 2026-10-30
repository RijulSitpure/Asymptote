from solution import Solution
s = Solution()
assert abs(s.calculateTax([[3,50],[7,10],[12,25]], 10) - 2.65000) < 1e-5
assert abs(s.calculateTax([[1,0],[4,25],[5,50]], 2) - 0.25000) < 1e-5
assert abs(s.calculateTax([[2,50]], 0) - 0.0) < 1e-5
print("All tests passed for calculate-amount-paid-in-taxes!")
