from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxDistance([1, 1, 1, 6, 1, 1, 1]) == 3
    assert s.maxDistance([1, 8, 3, 8, 3]) == 4
    assert s.maxDistance([0, 1]) == 1
    print("All tests passed for two-furthest-houses-with-different-colors!")

if __name__ == "__main__":
    run_tests()
