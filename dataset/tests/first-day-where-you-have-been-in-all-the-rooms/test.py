from solution import Solution

def run_tests():
    s = Solution()
    assert s.firstDayBeenInAllRooms([0, 0]) == 2
    assert s.firstDayBeenInAllRooms([0, 0, 2]) == 6
    assert s.firstDayBeenInAllRooms([0, 1, 2, 0]) == 6
    print("All tests passed for first-day-where-you-have-been-in-all-the-rooms!")

if __name__ == "__main__":
    run_tests()
