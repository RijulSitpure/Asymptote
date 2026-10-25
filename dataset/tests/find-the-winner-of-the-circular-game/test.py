class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        ans = 0
        for i in range(2, n + 1):
            ans = (ans + k) % i
        return ans + 1

def test():
    sol = Solution()
    assert sol.findTheWinner(5, 2) == 3
    assert sol.findTheWinner(6, 5) == 1

if __name__ == '__main__':
    test()
