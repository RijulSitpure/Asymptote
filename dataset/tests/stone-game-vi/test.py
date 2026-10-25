class Solution:
    def stoneGameVI(self, aliceValues: list[int], bobValues: list[int]) -> int:
        stones = sorted(zip(aliceValues, bobValues), key=lambda x: x[0] + x[1], reverse=True)
        alice_score = sum(stones[i][0] for i in range(0, len(stones), 2))
        bob_score = sum(stones[i][1] for i in range(1, len(stones), 2))
        if alice_score > bob_score:
            return 1
        elif alice_score < bob_score:
            return -1
        return 0

def test():
    sol = Solution()
    assert sol.stoneGameVI([1,3], [2,1]) == 1
    assert sol.stoneGameVI([1,2], [3,1]) == 0
    assert sol.stoneGameVI([2,4,3], [1,6,7]) == -1

    print("✓ stone-game-vi passed")

if __name__ == '__main__':
    test()
