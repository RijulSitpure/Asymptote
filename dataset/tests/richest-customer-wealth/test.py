class Solution:
    def maximumWealth(self, accounts: list[list[int]]) -> int:
        return max(sum(row) for row in accounts)

def test():
    sol = Solution()
    assert sol.maximumWealth([[1,2,3],[3,2,1]]) == 6
    assert sol.maximumWealth([[1,5],[7,3],[3,5]]) == 10
    assert sol.maximumWealth([[2,8,7],[7,1,3],[1,9,5]]) == 17

    print("✓ richest-customer-wealth passed")

if __name__ == '__main__':
    test()
