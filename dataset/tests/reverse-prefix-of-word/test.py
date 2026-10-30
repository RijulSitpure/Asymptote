from solution import Solution

def run_tests():
    s = Solution()
    assert s.reversePrefix("abcdefd", "d") == "dcbaefd"
    assert s.reversePrefix("xyxzxe", "z") == "zxyxxe"
    assert s.reversePrefix("abcd", "z") == "abcd"
    print("All tests passed for reverse-prefix-of-word!")

if __name__ == "__main__":
    run_tests()
