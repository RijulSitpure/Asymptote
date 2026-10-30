from solution import Solution

def run_tests():
    s = Solution()
    assert s.nextBeautifulNumber(1) == 22
    assert s.nextBeautifulNumber(1000) == 1333
    assert s.nextBeautifulNumber(3000) == 3133
    print("All tests passed for next-greater-numerically-balanced-number!")

if __name__ == "__main__":
    run_tests()
