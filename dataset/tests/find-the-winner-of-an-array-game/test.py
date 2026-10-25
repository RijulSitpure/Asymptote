class Solution:
    def getWinner(self, arr: list[int], k: int) -> int:
        cur = arr[0]
        wins = 0
        for i in range(1, len(arr)):
            if arr[i] > cur:
                cur = arr[i]
                wins = 1
            else:
                wins += 1
            if wins == k:
                return cur
        return cur

def test():
    sol = Solution()
    assert sol.getWinner([2,1,3,5,4,6,7], 2) == 5, "test 1 failed"
    assert sol.getWinner([3,2,1], 10) == 3, "test 2 failed"
    print("✓ find-the-winner-of-an-array-game passed")

if __name__ == "__main__":
    test()
