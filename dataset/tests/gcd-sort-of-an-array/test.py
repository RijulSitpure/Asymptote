from solution import Solution

def run_tests():
    s = Solution()
    assert s.gcdSort([7, 21, 3]) is True
    assert s.gcdSort([5, 2, 6, 2]) is False
    assert s.gcdSort([10, 5, 9, 3, 15]) is True
    print("All tests passed for gcd-sort-of-an-array!")

if __name__ == "__main__":
    run_tests()
