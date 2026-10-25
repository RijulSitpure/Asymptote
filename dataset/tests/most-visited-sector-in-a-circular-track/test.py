class Solution:
    def mostVisited(self, n: int, rounds: list[int]) -> list[int]:
        start, end = rounds[0], rounds[-1]
        if start <= end:
            return list(range(start, end + 1))
        else:
            return list(range(1, end + 1)) + list(range(start, n + 1))

def test():
    sol = Solution()
    assert sol.mostVisited(4, [1,3,1,2]) == [1,2], "test 1 failed"
    assert sol.mostVisited(2, [2,1,2,1,2,1,2,1,2]) == [2], "test 2 failed"
    assert sol.mostVisited(7, [1,3,5,7]) == [1,2,3,4,5,6,7], "test 3 failed"
    print("✓ most-visited-sector-in-a-circular-track passed")

if __name__ == "__main__":
    test()
