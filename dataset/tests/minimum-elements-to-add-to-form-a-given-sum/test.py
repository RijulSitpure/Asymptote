class Solution:
    def minElements(self, nums: list[int], limit: int, goal: int) -> int:
        diff = abs(goal - sum(nums))
        return (diff + limit - 1) // limit

def test():
    sol = Solution()
    assert sol.minElements([1,-1,1], 3, -4) == 2
    assert sol.minElements([1,-10,9,1], 100, 0) == 1

    print("✓ minimum-elements-to-add-to-form-a-given-sum passed")

if __name__ == '__main__':
    test()
