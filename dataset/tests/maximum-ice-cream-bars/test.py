class Solution:
    def maxIceCream(self, costs: list[int], coins: int) -> int:
        costs.sort()
        count = 0
        for c in costs:
            if coins >= c:
                coins -= c
                count += 1
            else:
                break
        return count

def test():
    sol = Solution()
    assert sol.maxIceCream([1,3,2,4,1], 7) == 4
    assert sol.maxIceCream([10,6,8,7,7,8], 5) == 0
    assert sol.maxIceCream([1,6,3,1,2,5], 20) == 6

if __name__ == '__main__':
    test()
