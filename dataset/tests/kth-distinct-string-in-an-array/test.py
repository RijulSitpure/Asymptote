from solution import Solution

def run_tests():
    s = Solution()
    assert s.kthDistinct(["d", "b", "c", "b", "c", "a"], 2) == "a"
    assert s.kthDistinct(["aaa", "aa", "a"], 1) == "aaa"
    assert s.kthDistinct(["a", "b", "a"], 3) == ""
    print("All tests passed for kth-distinct-string-in-an-array!")

if __name__ == "__main__":
    run_tests()
