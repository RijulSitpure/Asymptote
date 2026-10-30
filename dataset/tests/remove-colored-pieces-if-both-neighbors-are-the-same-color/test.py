from solution import Solution

def run_tests():
    s = Solution()
    assert s.winnerOfGame("AAABABB") == True
    assert s.winnerOfGame("AA") == False
    assert s.winnerOfGame("ABBBBBBBAAA") == False
    print("All tests passed for remove-colored-pieces-if-both-neighbors-are-the-same-color!")

if __name__ == "__main__":
    run_tests()
