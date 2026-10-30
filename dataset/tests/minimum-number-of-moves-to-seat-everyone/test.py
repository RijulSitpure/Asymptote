from solution import Solution

def run_tests():
    s = Solution()
    assert s.minMovesToSeat([3, 1, 5], [2, 7, 4]) == 4
    assert s.minMovesToSeat([4, 1, 5, 9], [1, 3, 2, 6]) == 7
    assert s.minMovesToSeat([2, 2, 6, 6], [1, 3, 2, 6]) == 4
    print("All tests passed for minimum-number-of-moves-to-seat-everyone!")

if __name__ == "__main__":
    run_tests()
