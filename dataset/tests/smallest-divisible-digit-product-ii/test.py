from solution import Solution

def run_tests():
    s = Solution()
    assert s.smallestNumber("1234", 256) == "1488", "Example 1 failed"
    assert s.smallestNumber("12355", 50) == "12355", "Example 2 failed"
    assert s.smallestNumber("11111", 26) == "-1", "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

