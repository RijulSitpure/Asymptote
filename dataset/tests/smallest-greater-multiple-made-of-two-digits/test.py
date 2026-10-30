from solution import Solution

def run_tests():
    s = Solution()
    assert s.findInteger(2, 0, 2) == 20
    assert s.findInteger(3, 4, 2) == 24
    assert s.findInteger(2, 2, 2) == 22
    print("All tests passed for smallest-greater-multiple-made-of-two-digits!")

if __name__ == "__main__":
    run_tests()
