from solution import Solution

def run_tests():
    s = Solution()
    assert s.findMiddleIndex([2, 3, -1, 8, 4]) == 3
    assert s.findMiddleIndex([1, -1, 4]) == 2
    assert s.findMiddleIndex([2, 5]) == -1
    print("All tests passed for find-the-middle-index-in-array!")

if __name__ == "__main__":
    run_tests()
