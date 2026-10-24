class Solution:
    def minHeightShelves(self, books: list[list[int]], shelfWidth: int) -> int:
        n = len(books)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        
        for i in range(1, n + 1):
            width = 0
            height = 0
            for j in range(i, 0, -1):
                width += books[j - 1][0]
                if width > shelfWidth:
                    break
                height = max(height, books[j - 1][1])
                dp[i] = min(dp[i], dp[j - 1] + height)
        return dp[n]

def test():
    sol = Solution()
    b1 = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]]
    assert sol.minHeightShelves(b1, 4) == 6, "test 1 failed"
    b2 = [[1,3],[2,4],[3,2]]
    assert sol.minHeightShelves(b2, 6) == 4, "test 2 failed"
    print("✓ filling-bookcase-shelves passed")

if __name__ == "__main__":
    test()
