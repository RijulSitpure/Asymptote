class Solution:
    def maxNumberOfApples(self, weight: list[int]) -> int:
        weight.sort()
        total = 0
        count = 0
        for w in weight:
            if total + w <= 5000:
                total += w
                count += 1
            else:
                break
        return count

def test():
    sol = Solution()
    assert sol.maxNumberOfApples([100, 200, 150, 1000]) == 4, "test 1 failed"
    assert sol.maxNumberOfApples([900, 950, 800, 1000, 700, 800]) == 5, "test 2 failed"
    print("✓ how-many-apples-can-you-put-into-the-basket passed")

if __name__ == "__main__":
    test()
