from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfBeams(["011001","000000","010100","001000"]) == 8
    assert s.numberOfBeams(["000","111","000"]) == 0
    print("All tests passed for number-of-laser-beams-in-a-bank!")

if __name__ == '__main__':
    run_tests()
