class Solution:
    def numOfUnplacedFruits(self, fruits: list[int], baskets: list[int]) -> int:
        n = len(fruits)
        unplaced = 0
        b = list(baskets)
        for fruit in fruits:
            placed = False
            for j in range(n):
                if b[j] >= fruit:
                    b[j] = 0
                    placed = True
                    break
            if not placed:
                unplaced += 1
        return unplaced

def test_fruits_into_baskets_ii():
    sol = Solution()
    assert sol.numOfUnplacedFruits([4, 2, 5], [3, 5, 4]) == 1
    assert sol.numOfUnplacedFruits([3, 6, 1], [6, 4, 7]) == 0

if __name__ == '__main__':
    test_fruits_into_baskets_ii()
    print('All tests passed.')
