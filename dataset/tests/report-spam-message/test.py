from solution import Solution

def run_tests():
    s = Solution()
    assert s.reportSpam(["hello", "world", "leetcode"], ["world", "hello"]) == True, "Example 1 failed"
    assert s.reportSpam(["hello", "programming", "fun"], ["world", "programming", "leetcode"]) == False, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
