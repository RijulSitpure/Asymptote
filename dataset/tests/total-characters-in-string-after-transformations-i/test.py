from solution import Solution

def run_tests():
    s = Solution()
    assert s.lengthAfterTransformations("abcyy", 2) == 7, "Example 1 failed"
    assert s.lengthAfterTransformations("azbk", 1) == 5, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

