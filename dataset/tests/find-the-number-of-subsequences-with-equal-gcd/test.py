from solution import Solution

def run_tests():
    s = Solution()
    assert s.subsequencePairCount([1, 2, 3, 4]) == 10, "Example 1 failed"
    assert s.subsequencePairCount([10, 20, 30]) == 2, "Example 2 failed"
    assert s.subsequencePairCount([1, 1, 1, 1]) == 50, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

