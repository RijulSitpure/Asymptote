from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfUniqueGoodSubsequences("001") == 2
    assert s.numberOfUniqueGoodSubsequences("11") == 2
    assert s.numberOfUniqueGoodSubsequences("101") == 5
    print("All tests passed for number-of-unique-good-subsequences!")

if __name__ == "__main__":
    run_tests()
