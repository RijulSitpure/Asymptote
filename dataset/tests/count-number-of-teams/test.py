class Solution:
    def numTeams(self, rating: list[int]) -> int:
        n = len(rating)
        teams = 0
        for j in range(n):
            left_less = sum(1 for i in range(j) if rating[i] < rating[j])
            left_greater = j - left_less
            right_less = sum(1 for k in range(j + 1, n) if rating[k] < rating[j])
            right_greater = (n - 1 - j) - right_less
            teams += left_less * right_greater + left_greater * right_less
        return teams

def test():
    sol = Solution()
    assert sol.numTeams([2,5,3,4,1]) == 3, "test 1 failed"
    assert sol.numTeams([2,1,3]) == 0, "test 2 failed"
    assert sol.numTeams([1,2,3,4]) == 4, "test 3 failed"
    print("✓ count-number-of-teams passed")

if __name__ == "__main__":
    test()
