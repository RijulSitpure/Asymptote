from solution import Solution

def run_tests():
    s = Solution()
    assert s.kthLargestNumber(["3", "6", "7", "10"], 4) == "3"
    assert s.kthLargestNumber(["2", "21", "12", "1"], 3) == "2"
    assert s.kthLargestNumber(["0", "0"], 2) == "0"
    print("All tests passed for find-the-kth-largest-integer-in-the-array!")

if __name__ == "__main__":
    run_tests()
