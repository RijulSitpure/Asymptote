from solution import Solution

def run_tests():
    s = Solution()
    p1 = [["EUR","USD"],["USD","JPY"]]
    r1 = [2.0, 3.0]
    p2 = [["JPY","USD"],["USD","CHF"],["CHF","EUR"]]
    r2 = [4.0, 5.0, 6.0]
    assert abs(s.maxAmount("EUR", p1, r1, p2, r2) - 720.0) < 1e-4, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

